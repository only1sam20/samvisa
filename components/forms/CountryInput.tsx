"use client";

import { useEffect, useId, useMemo, useRef, useState, type InputHTMLAttributes, type KeyboardEvent } from "react";
import { Check, ChevronDown } from "lucide-react";
import { countries } from "@/lib/data/countries";
import "./CountryInput.css";

export type CountryInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "role" | "value" | "defaultValue" | "onChange"> & {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

function normalize(text: string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

export default function CountryInput({
  id: suppliedId,
  name = "country",
  defaultValue = "",
  onValueChange,
  className = "form-input",
  autoComplete = "country-name",
  placeholder = "Select or type your country",
  disabled,
  readOnly,
  onFocus,
  onBlur,
  onKeyDown,
  "aria-describedby": describedBy,
  ...inputProps
}: CountryInputProps) {
  const generatedId = useId();
  const id = suppliedId ?? `country-${generatedId}`;
  const listId = `${id}-options`;
  const hintId = `${id}-hint`;
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [value, setValue] = useState(defaultValue);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [upward, setUpward] = useState(false);
  const [listHeight, setListHeight] = useState(288);

  const matches = useMemo(() => {
    const search = normalize(query);
    return search ? countries.filter(country => [country.name, country.code, ...(country.aliases ?? [])].some(label => normalize(label).includes(search))) : countries;
  }, [query]);
  const activeCountry = open && activeIndex >= 0 ? matches[activeIndex] : undefined;

  function closeList() {
    setOpen(false);
    setActiveIndex(-1);
  }

  function positionList() {
    const rect = inputRef.current?.getBoundingClientRect();
    if (!rect) return;
    const below = window.innerHeight - rect.bottom;
    const above = rect.top;
    const showAbove = below < 240 && above > below;
    setUpward(showAbove);
    setListHeight(Math.max(120, Math.min(288, (showAbove ? above : below) - 76)));
  }

  function openList(search: string) {
    if (disabled || readOnly) return;
    positionList();
    setQuery(search);
    setActiveIndex(-1);
    setOpen(true);
  }

  function updateValue(next: string) {
    setValue(next);
    onValueChange?.(next);
  }

  function selectCountry(countryName: string) {
    updateValue(countryName);
    closeList();
    inputRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    function outsidePointer(event: PointerEvent) {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("pointerdown", outsidePointer);
    return () => document.removeEventListener("pointerdown", outsidePointer);
  }, [open]);

  useEffect(() => {
    if (!activeCountry || !listRef.current) return;
    const option = document.getElementById(`${listId}-${activeCountry.code}`);
    if (!option) return;
    const optionBounds = option.getBoundingClientRect();
    const listBounds = listRef.current.getBoundingClientRect();
    if (optionBounds.top < listBounds.top) listRef.current.scrollTop += optionBounds.top - listBounds.top;
    else if (optionBounds.bottom > listBounds.bottom) listRef.current.scrollTop += optionBounds.bottom - listBounds.bottom;
  }, [activeCountry, listId]);

  useEffect(() => {
    const form = inputRef.current?.form;
    function reset() {
      setValue(defaultValue);
      setQuery("");
      setOpen(false);
      setActiveIndex(-1);
      onValueChange?.(defaultValue);
    }
    form?.addEventListener("reset", reset);
    return () => form?.removeEventListener("reset", reset);
  }, [defaultValue, onValueChange]);

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented || disabled || readOnly || event.nativeEvent.isComposing) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const available = open ? matches : countries;
      if (!open) openList("");
      if (!available.length) return;
      const selectedIndex = available.findIndex(country => country.name === value);
      const next = !open
        ? selectedIndex >= 0 ? selectedIndex : event.key === "ArrowDown" ? 0 : available.length - 1
        : event.key === "ArrowDown" ? Math.min(activeIndex + 1, available.length - 1) : activeIndex < 0 ? available.length - 1 : Math.max(activeIndex - 1, 0);
      setActiveIndex(next);
    } else if (open && event.key === "Enter") {
      event.preventDefault();
      if (activeCountry) selectCountry(activeCountry.name);
      else closeList(); // Free text stays valid; never force a suggestion into the field.
    } else if (open && event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closeList();
    } else if (event.key === "Tab") {
      closeList();
    } else if (open && activeIndex >= 0 && !event.ctrlKey && !event.metaKey && (event.key === "Home" || event.key === "End")) {
      event.preventDefault();
      setActiveIndex(event.key === "Home" ? 0 : matches.length - 1);
    }
  }

  return (
    <div className="country-combobox" ref={rootRef}>
      <div className="country-combobox-control">
        <input
          {...inputProps}
          ref={inputRef}
          id={id}
          name={name}
          type="text"
          className={`${className} country-combobox-input`}
          value={value}
          autoComplete={autoComplete}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          role="combobox"
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-activedescendant={activeCountry ? `${listId}-${activeCountry.code}` : undefined}
          aria-describedby={[describedBy, hintId].filter(Boolean).join(" ")}
          onChange={event => { updateValue(event.target.value); openList(event.target.value); }}
          onFocus={event => { onFocus?.(event); if (!event.defaultPrevented) openList(value); }}
          onBlur={event => { if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) closeList(); onBlur?.(event); }}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className="country-combobox-toggle"
          tabIndex={-1}
          disabled={disabled || readOnly}
          aria-label={open ? "Close country list" : "Show all countries"}
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          onPointerDown={event => event.preventDefault()}
          onClick={() => {
            const wasOpen = open;
            inputRef.current?.focus();
            if (wasOpen) closeList();
            else openList("");
          }}
        ><ChevronDown size={20} aria-hidden="true" /></button>
      {open && <div className={`country-combobox-popup${upward ? " is-above" : ""}`}>
        <p className="country-combobox-count" role="status" aria-live="polite">{matches.length ? `${matches.length} ${matches.length === 1 ? "country or territory" : "countries and territories"}` : "Your own entry is welcome"}</p>
        <ul ref={listRef} id={listId} className="country-combobox-list" role="listbox" aria-label="Countries and territories" style={{ maxHeight: listHeight }}>
          {matches.map((country, index) => <li
            key={country.code}
            id={`${listId}-${country.code}`}
            role="option"
            aria-selected={activeCountry?.code === country.code}
            className={`country-combobox-option${activeCountry?.code === country.code ? " is-active" : ""}`}
            onPointerDown={event => event.preventDefault()}
            onPointerMove={event => { if (event.pointerType === "mouse") setActiveIndex(index); }}
            onClick={() => selectCountry(country.name)}
          ><span>{country.name}</span>{value === country.name && <Check size={18} aria-hidden="true" />}</li>)}
          {!matches.length && <li className="country-combobox-empty" role="option" aria-disabled="true" aria-selected="false">No matching country. Keep your entry or try another search.</li>}
        </ul>
      </div>}
      </div>
      <p id={hintId} className="country-combobox-hint">Choose from the list or enter your country manually.</p>
    </div>
  );
}
