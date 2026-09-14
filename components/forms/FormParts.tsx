"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import type { z } from "zod";
import type { FieldErrors } from "../../lib/validation";

export function useSubmission(endpoint: string) {
  const prefix = useId();
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "success">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const feedbackRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => () => controllerRef.current?.abort(), []);
  useEffect(() => {
    if (status === "error" || status === "success") feedbackRef.current?.focus();
  }, [status, message, errors]);

  function field(name: string) {
    return {
      id: `${prefix}-${name}`,
      name,
      "aria-invalid": Boolean(errors[name]?.length),
      "aria-describedby": errors[name]?.length ? `${prefix}-${name}-error` : undefined,
    };
  }

  async function submit(schema: z.ZodType, data: unknown) {
    if (controllerRef.current) return;
    setErrors({});
    const validated = schema.safeParse(data);
    if (!validated.success) {
      setErrors(validated.error.flatten().fieldErrors as FieldErrors);
      setMessage("Please check the highlighted fields and try again.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setMessage("");
    const controller = new AbortController();
    controllerRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 20_000);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated.data),
        signal: controller.signal,
      });
      const result: unknown = await response.json().catch(() => null);
      const payload = result && typeof result === "object" ? result as Record<string, unknown> : null;
      const successMessage = payload?.ok === true && typeof payload.message === "string" && payload.message.trim() ? payload.message : null;
      if (!response.ok || !successMessage) {
        const returnedErrors: FieldErrors = {};
        if (payload?.fieldErrors && typeof payload.fieldErrors === "object") {
          for (const [name, messages] of Object.entries(payload.fieldErrors)) {
            if (Array.isArray(messages) && messages.every((message) => typeof message === "string")) returnedErrors[name] = messages;
          }
        }
        setErrors(returnedErrors);
        setMessage(payload?.ok === false && typeof payload.message === "string"
          ? payload.message
          : "We could not confirm your submission. It may have reached Samuel. Your entries are still here; please wait a few minutes before trying again.");
        setStatus("error");
        return;
      }
      setMessage(successMessage);
      setStatus("success");
    } catch {
      setMessage("We could not confirm your submission. It may have reached Samuel. Check your connection and wait a few minutes before trying again. Your entries are still here.");
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      controllerRef.current = null;
    }
  }

  function reset() { setStatus("idle"); setMessage(""); setErrors({}); }
  return { status, message, errors, field, submit, reset, feedbackRef };
}

export function FormField({ id, label, optional, required, full, error, children }: {
  id: string; label: string; optional?: boolean; required?: boolean; full?: boolean; error?: string[]; children: ReactNode;
}) {
  return (
    <div className={`form-field${full ? " form-full" : ""}`}>
      <label className="form-label" htmlFor={id}>
        {label}{optional && <span className="form-optional"> (optional)</span>}{required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {error?.[0] && <p className="form-error" id={`${id}-error`}>{error[0]}</p>}
    </div>
  );
}

export function Honeypot({ id }: { id: string }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }}>
      <label htmlFor={id}>Leave this field empty</label>
      <input id={id} name="website" type="text" tabIndex={-1} autoComplete="off" maxLength={200} />
    </div>
  );
}

export function FormFeedback({ submission }: { submission: ReturnType<typeof useSubmission> }) {
  if (!submission.message) return null;
  const success = submission.status === "success";
  return (
    <div
      className={`form-status form-full ${success ? "form-status-success" : "form-status-error"}`}
      role={success ? "status" : "alert"}
      tabIndex={-1}
      ref={submission.feedbackRef}
    >
      {success && <CheckCircle2 size={22} aria-hidden="true" />}
      <p>{submission.message}</p>
    </div>
  );
}

export function Consent({ id, children, error }: { id: string; children: ReactNode; error?: string[] }) {
  return (
    <div className="form-field form-full">
      <label className="form-checkbox" htmlFor={id}>
        <input id={id} name="consent" type="checkbox" required aria-invalid={Boolean(error?.length)} aria-describedby={error?.length ? `${id}-error` : undefined} />
        <span>{children}</span>
      </label>
      {error?.[0] && <p id={`${id}-error`} className="form-error">{error[0]}</p>}
      <p className="form-note">Read how your information is handled in the <Link href="/privacy" className="text-link">Privacy Policy</Link>.</p>
    </div>
  );
}

export function SubmitButton({ pending, label }: { pending: boolean; label: string }) {
  return (
    <button className="button button-primary" disabled={pending} type="submit">
      {pending && <LoaderCircle size={17} className="animate-spin" aria-hidden="true" />}
      {pending ? "Sending…" : label}
    </button>
  );
}
