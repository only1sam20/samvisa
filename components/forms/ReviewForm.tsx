"use client";

import { useState, type FormEvent } from "react";
import { Star } from "lucide-react";
import { reviewSchema, serviceOptions } from "../../lib/validation";
import { Consent, FormFeedback, FormField, Honeypot, SubmitButton, useSubmission } from "./FormParts";

export default function ReviewForm() {
  const submission = useSubmission("/api/reviews");
  const [rating, setRating] = useState(0);
  const { field, errors, status } = submission;
  const pending = status === "submitting";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    await submission.submit(reviewSchema, { ...Object.fromEntries(values.entries()), rating, consent: values.get("consent") === "on" });
  }

  if (status === "success") {
    return (
      <div className="form-grid">
        <FormFeedback submission={submission} />
        <button className="button button-secondary form-full" type="button" onClick={() => { submission.reset(); setRating(0); }}>Share another experience</button>
      </div>
    );
  }

  return (
    <form className="form-grid" onSubmit={onSubmit} noValidate aria-label="Share your experience" aria-busy={pending}>
      <p className="form-note form-full">Every review is checked before publication. Your privacy preference will be respected. Fields marked * are required.</p>
      <FormFeedback submission={submission} />
      <Honeypot id={field("website").id} />
      <FormField id={field("name").id} label="Full name" required error={errors.name}>
        <input {...field("name")} className="form-input" autoComplete="name" required minLength={2} maxLength={100} placeholder="Your full name" />
      </FormField>
      <FormField id={field("professionalTitle").id} label="Professional title" required error={errors.professionalTitle}>
        <input {...field("professionalTitle")} className="form-input" autoComplete="organization-title" required minLength={2} maxLength={150} placeholder="Your professional role" />
      </FormField>
      <FormField id={field("company").id} label="Company / organization" optional full error={errors.company}>
        <input {...field("company")} className="form-input" autoComplete="organization" maxLength={150} placeholder="Company or organization" />
      </FormField>
      <FormField id={field("service").id} label="Service used" required full error={errors.service}>
        <select {...field("service")} className="form-input" defaultValue="" required>
          <option value="" disabled>Select a service</option>
          {serviceOptions.map((service) => <option value={service} key={service}>{service}</option>)}
        </select>
      </FormField>
      <fieldset className="form-field form-full rating-fieldset" aria-describedby={errors.rating ? `${field("rating").id}-error` : undefined}>
        <legend className="form-label">Your rating <span aria-hidden="true">*</span></legend>
        <div className="rating-options">
          {[1, 2, 3, 4, 5].map((value) => (
            <label className={`rating-option${value <= rating ? " is-selected" : ""}`} key={value}>
              <input className="sr-only" type="radio" name="rating" value={value} checked={rating === value} onChange={() => setRating(value)} required aria-label={`${value} ${value === 1 ? "star" : "stars"}`} />
              <Star size={29} aria-hidden="true" fill={value <= rating ? "currentColor" : "none"} />
            </label>
          ))}
          <span className="form-note" aria-live="polite">{rating ? `${rating} out of 5` : "Select a rating"}</span>
        </div>
        {errors.rating?.[0] && <p className="form-error" id={`${field("rating").id}-error`}>Please choose a rating from 1 to 5 stars.</p>}
      </fieldset>
      <FormField id={field("review").id} label="Review / testimonial" required full error={errors.review}>
        <textarea {...field("review")} className="form-input" rows={5} required minLength={20} maxLength={3000} placeholder="What was your experience of working with Samuel?" />
      </FormField>
      <FormField id={field("privacyPreference").id} label="Privacy preference" required full error={errors.privacyPreference}>
        <select {...field("privacyPreference")} className="form-input" defaultValue="anonymous" required>
          <option value="full-name">Display my full name</option>
          <option value="first-name">Display first name only</option>
          <option value="anonymous">Display anonymously</option>
        </select>
        <p className="form-note">Your full submission is sent privately to Samuel for review. An anonymous testimonial will omit your name, company and professional title. Please avoid identifying details in the review text if you prefer anonymity.</p>
      </FormField>
      <Consent id={field("consent").id} error={errors.consent}>I give permission for this testimonial to be displayed on the website. *</Consent>
      <div className="form-full form-actions"><SubmitButton pending={pending} label="Submit Review" /></div>
    </form>
  );
}
