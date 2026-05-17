"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { CLINIC } from "@/lib/clinic-data";
import { db } from "@/lib/firebase";
import { ref, push, set } from "firebase/database";
import ScrollReveal from "@/components/ScrollReveal";

// ── Data ──────────────────────────────────────────────────────────────
const visitServices = [
  { label: "Blood Test", icon: "bloodtype" },
  { label: "ECG", icon: "monitor_heart" },
  { label: "X-Ray", icon: "radiology" },
];

const timeWindows = [
  { value: "morning", label: "Morning (8 AM – 12 PM)" },
  { value: "afternoon", label: "Afternoon (12 – 4 PM)" },
  { value: "evening", label: "Evening (4 – 8 PM)" },
];

// ── Types ─────────────────────────────────────────────────────────────
interface FormState {
  service: string;
  name: string;
  phone: string;
  address: string;
  timeSlot: string;
  date: string;
  notes: string;
}

// ── Component ─────────────────────────────────────────────────────────
export default function Homevisit() {
  const [form, setForm] = useState<FormState>({
    service: "Blood Test",
    name: "",
    phone: "",
    address: "",
    timeSlot: "",
    date: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const update = useCallback(<K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[\d\s+\-()]{10,15}$/.test(form.phone.trim())) newErrors.phone = "Enter a valid phone number";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.timeSlot) newErrors.timeSlot = "Please select a time window";
    if (!form.date) newErrors.date = "Please select a date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const newVisitRef = push(ref(db, "homeVisits"));
      await set(newVisitRef, {
        id: `HV-${Math.floor(100 + Math.random() * 900)}`,
        patientName: form.name,
        patientPhone: form.phone,
        address: form.address,
        service: form.service,
        timeSlot: timeWindows.find((t) => t.value === form.timeSlot)?.label ?? form.timeSlot,
        date: form.date,
        notes: form.notes || "",
        priority: form.notes.toLowerCase().includes("urgent") || form.notes.toLowerCase().includes("emergency") ? "Urgent" : "Normal",
        status: "Pending",
        createdAt: new Date().toISOString()
      });
      setSubmitted(true);
    } catch (e) {
      console.error(e);
      alert("Failed to send request. Please check your connection or contact us directly.");
    }
  };

  // ── Success state ──────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-16 md:px-12">
        <ScrollReveal className="mx-auto flex max-w-lg flex-col items-center gap-6 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-on-secondary">
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
              check_circle
            </span>
          </div>
          <h1 className="text-headline-lg-mobile text-on-surface md:text-headline-lg">Request Sent!</h1>
          <p className="text-body-lg text-on-surface-variant">
            Your home visit request for <strong>{form.service}</strong> has been sent via WhatsApp. Our team will
            confirm your visit shortly.
          </p>
          <div className="ce-card w-full p-6 text-left">
            {[
              { label: "Service", value: form.service },
              { label: "Date", value: form.date },
              { label: "Time", value: timeWindows.find((t) => t.value === form.timeSlot)?.label ?? "" },
              { label: "Address", value: form.address },
            ].map((row) => (
              <div key={row.label} className="flex justify-between border-b border-outline-variant/30 py-2 last:border-0">
                <span className="text-label-md text-on-surface-variant">{row.label}</span>
                <span className="text-body-md font-medium text-on-surface text-right">{row.value}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({ service: "Blood Test", name: "", phone: "", address: "", timeSlot: "", date: "", notes: "" });
            }}
            className="ce-button-secondary"
          >
            Submit Another Request
          </button>
        </ScrollReveal>
      </div>
    );
  }

  // ── Main form ──────────────────────────────────────────────────
  return (
    <div className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-12 md:px-12 md:py-16">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
        {/* ── Left: info column ───────────────────────────── */}
        <ScrollReveal as="section" className="flex flex-col gap-8 lg:col-span-5" aria-label="Home visit information">
          <div className="space-y-4">
            <span className="ce-chip-neutral inline-flex items-center gap-2 px-3 py-1">
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">home_health</span>
              At-Home Care Services
            </span>

            <h1 className="text-headline-lg-mobile text-on-surface md:text-headline-lg">
              Professional Medical Care, Delivered to Your Door.
            </h1>

            <p className="text-body-lg text-on-surface-variant">
              Avoid the waiting room. Request a specialized clinician to visit your home for essential diagnostics and
              routine check-ups.
            </p>
          </div>

          <div className="relative h-64 overflow-hidden rounded-xl border border-outline-variant/30 shadow-sm md:h-80">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQrQ-E9cHk1nuk25Hafc9Hv-TbusXiJrk3SunlnubvNBgxzj8fsXHgmLZGQq560ajeR9FyWZ-2fvHdbxk3iMs_phj6YDbKiC747oKu7zf0KGY7Z6Hs6_gg4QYXiHuWA3gxyIa4NWI5881iDnlHPFCuJdzpaJhAIHyEMagBvyKxSkDfyc1sEFYupc5j56YE0FV9SM3YcA_NtXRzKOEtu7DqVabqoJRyHreHMF8R1YgoU41u19auHxtQMtMVS9S1DHH9FPCsEXhfnMdl"
              alt="Medical professional providing home visit care"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-container/20 to-transparent" />
          </div>

          <div className="flex items-center gap-6 border-t border-outline-variant/30 pt-4">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-secondary" aria-hidden="true">verified_user</span>
              <span className="text-label-md">Certified Staff</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-secondary" aria-hidden="true">schedule</span>
              <span className="text-label-md">Flexible Timing</span>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Right: form ─────────────────────────────────── */}
        <ScrollReveal as="section" delay={100} className="lg:col-span-7">
          <div className="ce-card-elevated p-6 md:p-8">
            <div className="mb-8">
              <h2 className="mb-2 text-headline-md text-on-surface">Request a Home Visit</h2>
              <p className="text-body-md text-on-surface-variant">
                Fill out the details below and our scheduling team will assist you promptly.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              {/* Service selection */}
              <fieldset className="space-y-3">
                <legend className="block text-label-md font-semibold text-on-surface">Select Required Service</legend>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {visitServices.map((service) => (
                    <label key={service.label} className="cursor-pointer">
                      <input
                        type="radio"
                        name="service_type"
                        value={service.label}
                        checked={form.service === service.label}
                        onChange={() => update("service", service.label)}
                        className="peer sr-only"
                      />
                      <div className="flex flex-col items-center gap-2 rounded-lg border border-outline-variant p-4 text-center transition-all hover:bg-surface-container-low peer-checked:border-2 peer-checked:border-secondary peer-checked:bg-surface-container-low peer-focus-visible:ring-2 peer-focus-visible:ring-secondary peer-focus-visible:ring-offset-2">
                        <span className="material-symbols-outlined text-on-surface-variant transition-colors peer-checked:text-secondary" aria-hidden="true">
                          {service.icon}
                        </span>
                        <span className="text-label-md text-on-surface">{service.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Name & Phone row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="block text-label-md font-semibold text-on-surface" htmlFor="hv-name">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="hv-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Your full name"
                    className={`ce-input ${errors.name ? "border-destructive" : ""}`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "hv-name-err" : undefined}
                    required
                  />
                  {errors.name && <p id="hv-name-err" className="text-sm text-destructive" role="alert">{errors.name}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="block text-label-md font-semibold text-on-surface" htmlFor="hv-phone">
                    Phone <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="hv-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    className={`ce-input ${errors.phone ? "border-destructive" : ""}`}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "hv-phone-err" : undefined}
                    required
                  />
                  {errors.phone && <p id="hv-phone-err" className="text-sm text-destructive" role="alert">{errors.phone}</p>}
                </div>
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label className="block text-label-md font-semibold text-on-surface" htmlFor="hv-address">
                  Home Address <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="hv-address"
                  rows={3}
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  placeholder="Full street address, apartment number, and PIN code"
                  className={`ce-input resize-none ${errors.address ? "border-destructive" : ""}`}
                  aria-invalid={!!errors.address}
                  aria-describedby={errors.address ? "hv-address-err" : undefined}
                  required
                />
                {errors.address && <p id="hv-address-err" className="text-sm text-destructive" role="alert">{errors.address}</p>}
              </div>

              {/* Date & Time row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="block text-label-md font-semibold text-on-surface" htmlFor="hv-date">
                    Preferred Date <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="hv-date"
                    type="date"
                    min={today}
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                    className={`ce-input ${errors.date ? "border-destructive" : ""}`}
                    aria-invalid={!!errors.date}
                    aria-describedby={errors.date ? "hv-date-err" : undefined}
                    required
                  />
                  {errors.date && <p id="hv-date-err" className="text-sm text-destructive" role="alert">{errors.date}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="block text-label-md font-semibold text-on-surface" htmlFor="hv-time">
                    Preferred Time <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="hv-time"
                      value={form.timeSlot}
                      onChange={(e) => update("timeSlot", e.target.value)}
                      className={`ce-input cursor-pointer appearance-none ${errors.timeSlot ? "border-destructive" : ""}`}
                      aria-invalid={!!errors.timeSlot}
                      aria-describedby={errors.timeSlot ? "hv-time-err" : undefined}
                      required
                    >
                      <option value="" disabled>Select a time window</option>
                      {timeWindows.map((tw) => (
                        <option key={tw.value} value={tw.value}>{tw.label}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-on-surface-variant" aria-hidden="true">
                      <span className="material-symbols-outlined">expand_more</span>
                    </div>
                  </div>
                  {errors.timeSlot && <p id="hv-time-err" className="text-sm text-destructive" role="alert">{errors.timeSlot}</p>}
                </div>
              </div>

              {/* Notes (optional) */}
              <div className="space-y-1.5">
                <label className="block text-label-md font-semibold text-on-surface" htmlFor="hv-notes">
                  Additional Notes <span className="text-sm font-normal text-on-surface-variant">(optional)</span>
                </label>
                <textarea
                  id="hv-notes"
                  rows={2}
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="Any medical conditions, allergies, or special instructions..."
                  className="ce-input resize-none"
                />
              </div>

              {/* WhatsApp info */}
              <div className="ce-card mt-6 flex items-start gap-3 p-4">
                <span
                  className="material-symbols-outlined mt-0.5 text-secondary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  aria-hidden="true"
                >
                  mark_chat_unread
                </span>
                <div>
                  <h3 className="text-label-md font-semibold text-on-surface">Quick Scheduling via WhatsApp</h3>
                  <p className="mt-1 text-sm text-on-surface-variant">
                    This request goes directly to our staff via WhatsApp. We will message you to confirm the exact time
                    and any necessary preparations.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="ce-button-primary flex w-full justify-center rounded-lg py-4 text-headline-sm"
                >
                  Send Request via WhatsApp
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">send</span>
                </button>
              </div>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}