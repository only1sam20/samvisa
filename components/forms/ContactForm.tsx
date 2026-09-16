"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import { contactSchema, serviceOptions } from "../../lib/validation";
import { Consent, FormFeedback, FormField, Honeypot, SubmitButton, useSubmission } from "./FormParts";
import CountryInput from "./CountryInput";

function requestedServiceSnapshot() {
  const requested = new URLSearchParams(window.location.search).get("service");
  if (!requested) return "";
  const aliases: Record<string, string> = {
    "FIET Fellowship Support": "FIET Fellowship",
    "FBCS Fellowship Support": "FBCS Fellowship",
    "Scholarly Articles & Publication Strategy": "Scholarly Publication Strategy",
    "Citation & Research Visibility Strategy": "Citation Strategy",
    "Citation Development & Research Visibility": "Citation Strategy",
  };
  const matched = aliases[requested] || requested;
  return serviceOptions.find((service) => service === matched) || "Other";
}

function subscribeToNavigation(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

const emptyServiceSnapshot = () => "";

export default function ContactForm() {
  const submission = useSubmission("/api/contact");
  const [contactMethod, setContactMethod] = useState("Email");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  // Read the browser URL with a hydration-safe external snapshot. Server markup
  // starts empty; the supplied service is applied once the client is available.
  const requestedService = useSyncExternalStore(subscribeToNavigation, requestedServiceSnapshot, emptyServiceSnapshot);
  const { field, errors, status } = submission;
  const pending = status === "submitting";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const data = Object.fromEntries(values.entries());
    await submission.submit(contactSchema, { ...data, consent: values.get("consent") === "on", linkedin: data.linkedin || "" });
  }

  if (status === "success") {
    return (
      <div className="form-grid">
        <FormFeedback submission={submission} />
        <button className="button button-secondary form-full" type="button" onClick={() => { submission.reset(); setContactMethod("Email"); setSelectedService(""); }}>Send another inquiry</button>
      </div>
    );
  }

  return (
    <form className="form-grid" onSubmit={onSubmit} aria-label="Request a consultation" aria-busy={pending}>
      <p className="form-note form-full">Tell me a little about your professional background and goals. Fields marked * are required.</p>
      <FormFeedback submission={submission} />
      <Honeypot id={field("website").id} />
      <FormField id={field("name").id} label="Full name" required error={errors.name}>
        <input {...field("name")} className="form-input" autoComplete="name" required minLength={2} maxLength={100} placeholder="Your full name" />
      </FormField>
      <FormField id={field("email").id} label="Email address" required error={errors.email}>
        <input {...field("email")} className="form-input" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} required maxLength={254} placeholder="you@example.com" />
      </FormField>
      <FormField id={field("phone").id} label="Phone number" required error={errors.phone}>
        <input {...field("phone")} className="form-input" type="tel" inputMode="tel" autoComplete="tel" required minLength={7} maxLength={40} placeholder="Include your country code" />
      </FormField>
      <FormField id={field("country").id} label="Country" required error={errors.country}>
        <CountryInput {...field("country")} required minLength={2} maxLength={100} />
      </FormField>
      <FormField id={field("profession").id} label="Profession / job title" required error={errors.profession}>
        <input {...field("profession")} className="form-input" autoComplete="organization-title" required minLength={2} maxLength={150} placeholder="e.g. Senior software engineer" />
      </FormField>
      <FormField id={field("experience").id} label="Years of professional experience" required error={errors.experience}>
        <input {...field("experience")} className="form-input" type="number" inputMode="numeric" min={0} max={80} step={1} required placeholder="e.g. 10" />
      </FormField>
      <FormField id={field("service").id} label="Target service" required full error={errors.service}>
        <select {...field("service")} className="form-input" value={selectedService ?? requestedService} onChange={(event) => setSelectedService(event.target.value)} required>
          <option value="" disabled>Select a service</option>
          {serviceOptions.map((service) => <option key={service} value={service}>{service}</option>)}
        </select>
      </FormField>
      <FormField id={field("situation").id} label="Current situation" required full error={errors.situation}>
        <textarea {...field("situation")} className="form-input" rows={4} required minLength={10} maxLength={3000} placeholder="Share your background, achievements and where you are in your journey." />
      </FormField>
      <FormField id={field("help").id} label="What would you like help with?" required full error={errors.help}>
        <textarea {...field("help")} className="form-input" rows={4} required minLength={10} maxLength={3000} placeholder="Tell me about your goals and the support you are looking for." />
      </FormField>
      <FormField id={field("contactMethod").id} label="Preferred contact method" required full error={errors.contactMethod}>
        <select {...field("contactMethod")} className="form-input" value={contactMethod} onChange={(event) => setContactMethod(event.target.value)} required>
          <option value="Email">Email</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="LinkedIn">LinkedIn</option>
        </select>
      </FormField>
      {contactMethod === "LinkedIn" && (
        <FormField id={field("linkedin").id} label="Your LinkedIn profile URL" required full error={errors.linkedin}>
          <input {...field("linkedin")} className="form-input" type="url" autoComplete="url" required maxLength={300} placeholder="https://www.linkedin.com/in/your-name/" />
        </FormField>
      )}
      <Consent id={field("consent").id} error={errors.consent}>I agree to the use of my information to respond to this inquiry. *</Consent>
      <div className="form-full form-actions">
        <SubmitButton pending={pending} label="Request Consultation" />
        <p className="form-note">Please share only the information needed for an initial conversation. Do not include identity documents or sensitive records.</p>
      </div>
    </form>
  );
}
