"use client";

import { useState, useCallback } from "react";
import { CLINIC } from "@/lib/clinic-data";
import ScrollReveal from "@/components/ScrollReveal";

// ── Types ─────────────────────────────────────────────────────────────
interface ContactForm {
  name: string;
  phone: string;
  subject: string;
  message: string;
}

// ── Component ─────────────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm] = useState<ContactForm>({ name: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = useCallback(<K extends keyof ContactForm>(field: K, value: ContactForm[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const validate = (): boolean => {
    const e: Partial<Record<keyof ContactForm, string>> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[\d\s+\-()]{10,15}$/.test(form.phone.trim())) e.phone = "Enter a valid phone number";
    if (!form.message.trim()) e.message = "Please enter your message";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    const msg = [
      `📩 *Contact Inquiry*`,
      ``,
      `*Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      form.subject ? `*Subject:* ${form.subject}` : "",
      ``,
      `*Message:*`,
      form.message,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`${CLINIC.whatsappLink}?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
  };

  // ── Success ────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center md:px-12">
        <ScrollReveal className="flex flex-col items-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-on-secondary">
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
              mark_email_read
            </span>
          </div>
          <h1 className="text-headline-lg-mobile text-on-surface md:text-headline-lg">Message Sent!</h1>
          <p className="max-w-md text-body-lg text-on-surface-variant">
            Your message has been sent via WhatsApp. We&apos;ll get back to you shortly.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ name: "", phone: "", subject: "", message: "" });
            }}
            className="ce-button-secondary"
          >
            Send Another Message
          </button>
        </ScrollReveal>
      </div>
    );
  }

  // ── Main ───────────────────────────────────────────────────────
  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col gap-12 px-4 py-8 md:px-12 md:py-16">
      <ScrollReveal as="section" className="max-w-2xl">
        <h1 className="text-headline-lg-mobile text-on-surface md:text-headline-lg">Get in touch with us</h1>
        <p className="mt-3 text-body-lg text-on-surface-variant">
          We&apos;re here to assist you with any questions, appointments, or medical inquiries. Find our location or
          reach out directly.
        </p>
      </ScrollReveal>

      <section className="grid items-start grid-cols-1 gap-6 lg:grid-cols-12">
        {/* ── Left column ──────────────────────────────────── */}
        <ScrollReveal className="flex flex-col gap-6 lg:col-span-4">
          <article className="ce-card-elevated relative overflow-hidden p-6" aria-label="Contact information">
            <div className="absolute left-0 top-0 h-1 w-full bg-secondary" aria-hidden="true" />
            <h2 className="text-headline-sm text-on-surface">Contact Information</h2>

            <div className="mt-8 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="ce-avatar flex-shrink-0" aria-hidden="true">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <p className="mb-1 text-label-sm uppercase tracking-wider text-on-surface-variant">
                    Emergency &amp; Appointments
                  </p>
                  <a
                    href={`tel:${CLINIC.phone}`}
                    className="text-headline-sm text-on-surface transition-colors hover:text-secondary focus-visible:text-secondary focus-visible:outline-none focus-visible:underline"
                  >
                    {CLINIC.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="ce-avatar flex-shrink-0" aria-hidden="true">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <p className="mb-1 text-label-sm uppercase tracking-wider text-on-surface-variant">OPD Timings</p>
                  <p className="text-body-md font-medium text-on-surface">{CLINIC.hours.weekdays}</p>
                  <p className="text-body-md text-on-surface-variant">{CLINIC.hours.weekends}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="ce-avatar flex-shrink-0" aria-hidden="true">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <p className="mb-1 text-label-sm uppercase tracking-wider text-on-surface-variant">Clinic Address</p>
                  <p className="text-body-md text-on-surface">{CLINIC.address.line1}</p>
                  <p className="text-body-md text-on-surface-variant">{CLINIC.address.line2}</p>
                </div>
              </div>
            </div>
          </article>

          {/* Contact form card */}
          <article className="ce-card-elevated p-6" aria-label="Send us a message">
            <h3 className="mb-4 text-headline-sm text-on-surface">Send a Message</h3>
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div className="space-y-1.5">
                <label className="block text-label-md font-semibold text-on-surface" htmlFor="ct-name">
                  Name <span className="text-destructive">*</span>
                </label>
                <input
                  id="ct-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Your name"
                  className={`ce-input ${errors.name ? "border-destructive" : ""}`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "ct-name-err" : undefined}
                  required
                />
                {errors.name && <p id="ct-name-err" className="text-sm text-destructive" role="alert">{errors.name}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-label-md font-semibold text-on-surface" htmlFor="ct-phone">
                  Phone <span className="text-destructive">*</span>
                </label>
                <input
                  id="ct-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className={`ce-input ${errors.phone ? "border-destructive" : ""}`}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "ct-phone-err" : undefined}
                  required
                />
                {errors.phone && <p id="ct-phone-err" className="text-sm text-destructive" role="alert">{errors.phone}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-label-md font-semibold text-on-surface" htmlFor="ct-subject">
                  Subject <span className="text-sm font-normal text-on-surface-variant">(optional)</span>
                </label>
                <input
                  id="ct-subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  placeholder="What is your inquiry about?"
                  className="ce-input"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-label-md font-semibold text-on-surface" htmlFor="ct-message">
                  Message <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="ct-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Type your message here..."
                  className={`ce-input resize-none ${errors.message ? "border-destructive" : ""}`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "ct-msg-err" : undefined}
                  required
                />
                {errors.message && <p id="ct-msg-err" className="text-sm text-destructive" role="alert">{errors.message}</p>}
              </div>

              <button type="submit" className="ce-button-primary w-full rounded-lg py-3">
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">send</span>
                Send via WhatsApp
              </button>
            </form>
          </article>
        </ScrollReveal>

        {/* ── Map ──────────────────────────────────────────── */}
        <ScrollReveal
          as="article"
          delay={100}
          className="ce-card-elevated flex min-h-[400px] flex-col overflow-hidden lg:col-span-8 lg:min-h-[600px]"
          aria-label="Location map"
        >
          <div className="flex items-center gap-2 border-b border-outline-variant bg-surface-container-lowest p-4">
            <span className="material-symbols-outlined text-on-surface-variant" aria-hidden="true">map</span>
            <span className="text-label-md text-on-surface">Location Map</span>
          </div>

          <div className="relative flex flex-1">
            <iframe
              src={CLINIC.googleMapsEmbed}
              className="absolute inset-0 h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${CLINIC.name} location on Google Maps`}
            />
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}