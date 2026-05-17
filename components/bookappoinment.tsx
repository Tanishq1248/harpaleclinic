"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { DOCTORS, CLINIC } from "@/lib/clinic-data";
import { db } from "@/lib/firebase";
import { ref, push, set } from "firebase/database";

// ── Booking-specific data ──────────────────────────────────────────
const bookingServices = ["General Consultation", "Surgery Assessment", "Maternity Care", "Post-Op Followup"];

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
];

const STEPS = [
  { number: "1", label: "Doctor" },
  { number: "2", label: "Service" },
  { number: "3", label: "Time" },
  { number: "4", label: "Details" },
] as const;

// ── Types ──────────────────────────────────────────────────────────
interface BookingState {
  doctor: string;
  service: string;
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  notes: string;
}

// ── Component ──────────────────────────────────────────────────────
export default function BookAppointment() {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<BookingState>({
    doctor: DOCTORS[0].name,
    service: "",
    date: "",
    time: "",
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = useCallback(
    <K extends keyof BookingState>(field: K, value: BookingState[K]) => {
      setBooking((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  // Validation per step
  const canProceed = (): boolean => {
    switch (step) {
      case 1:
        return !!booking.doctor;
      case 2:
        return !!booking.service;
      case 3:
        return !!booking.date && !!booking.time;
      case 4:
        return !!booking.patientName && !!booking.patientPhone;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (canProceed() && step < 4) setStep((s) => s + 1);
  };
  const prevStep = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;
    
    try {
      const newApptRef = push(ref(db, "appointments"));
      await set(newApptRef, {
        id: `PT-${Math.floor(1000 + Math.random() * 9000)}`,
        patientName: booking.patientName,
        patientPhone: booking.patientPhone,
        doctor: booking.doctor,
        service: booking.service,
        date: booking.date,
        time: booking.time,
        notes: booking.notes || "",
        status: "Pending",
        createdAt: new Date().toISOString()
      });
      setSubmitted(true);
    } catch (e) {
      console.error(e);
      alert("Failed to book appointment. Please check your connection or contact us directly.");
    }
  };

  // Get today in YYYY-MM-DD format for date input min
  const today = new Date().toISOString().split("T")[0];

  // ── Submitted state ────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-16 md:px-12">
        <div className="mx-auto flex max-w-lg flex-col items-center gap-6 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-on-secondary">
            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
          </div>
          <h1 className="text-headline-lg-mobile text-on-surface md:text-headline-lg">Booking Request Sent!</h1>
          <p className="text-body-lg text-on-surface-variant">
            Your appointment request has been sent via WhatsApp. Our team will confirm your booking shortly.
          </p>
          <div className="ce-card w-full p-6">
            <div className="flex flex-col gap-3 text-left">
              <div className="flex justify-between">
                <span className="text-label-md text-on-surface-variant">Doctor</span>
                <span className="text-body-md font-medium text-on-surface">{booking.doctor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-label-md text-on-surface-variant">Service</span>
                <span className="text-body-md font-medium text-on-surface">{booking.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-label-md text-on-surface-variant">Date & Time</span>
                <span className="text-body-md font-medium text-on-surface">
                  {booking.date} at {booking.time}
                </span>
              </div>
            </div>
          </div>
          <button onClick={() => { setSubmitted(false); setStep(1); setBooking({ doctor: DOCTORS[0].name, service: "", date: "", time: "", patientName: "", patientPhone: "", patientEmail: "", notes: "" }); }} className="ce-button-secondary">
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  // ── Main form ──────────────────────────────────────────────────
  return (
    <div className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-8 md:px-12 md:py-12">
      <div className="mb-8">
        <h1 className="text-headline-lg-mobile text-on-surface md:text-headline-lg">Schedule an Appointment</h1>
        <p className="mt-2 text-body-md text-on-surface-variant">
          Complete the steps below to secure your consultation at {CLINIC.name}.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-6">
        <section className="flex flex-col gap-6 lg:col-span-8">
          {/* ── Step indicator ──────────────────────────────── */}
          <div className="relative mb-2 flex items-center justify-between gap-2">
            <div className="absolute left-0 top-1/2 -z-10 h-[2px] w-full -translate-y-1/2 bg-surface-container-high" />
            <div
              className="absolute left-0 top-1/2 -z-10 h-[2px] -translate-y-1/2 bg-secondary transition-all duration-500"
              style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
            />
            {STEPS.map((s, i) => {
              const isActive = step === i + 1;
              const isCompleted = step > i + 1;
              return (
                <button
                  key={s.number}
                  onClick={() => { if (i + 1 < step) setStep(i + 1); }}
                  className="flex flex-col items-center gap-2 bg-background px-1 text-center"
                  disabled={i + 1 > step}
                >
                  <div
                    className={[
                      "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                      isActive || isCompleted ? "bg-secondary text-on-secondary" : "bg-surface-container-high text-on-surface-variant",
                    ].join(" ")}
                  >
                    {isCompleted ? (
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    ) : (
                      s.number
                    )}
                  </div>
                  <span
                    className={[
                      "text-label-sm transition-colors",
                      isActive ? "text-on-surface font-semibold" : "text-on-surface-variant",
                    ].join(" ")}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Step 1: Choose Doctor ───────────────────────── */}
          {step === 1 && (
            <article className="ce-card p-6 animate-in fade-in duration-300">
              <h2 className="mb-6 text-headline-md text-on-surface">Choose Your Doctor</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {DOCTORS.map((doctor) => (
                  <label key={doctor.name} className="cursor-pointer">
                    <input
                      type="radio"
                      name="doctor"
                      className="peer sr-only"
                      checked={booking.doctor === doctor.name}
                      onChange={() => update("doctor", doctor.name)}
                    />
                    <div className="flex gap-4 rounded-lg border border-outline-variant p-4 transition-all peer-checked:border-secondary peer-checked:bg-surface-container-low peer-checked:shadow-md">
                      <div className="ce-avatar-lg overflow-hidden shrink-0">
                        <Image src={doctor.image} alt={doctor.alt} width={64} height={64} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col gap-1">
                        <h3 className="text-headline-sm text-on-surface">{doctor.name}</h3>
                        <p className="text-body-md text-on-surface-variant">{doctor.title}</p>
                        <p className="text-label-sm text-secondary">{doctor.credential}</p>
                      </div>
                      <span
                        className="material-symbols-outlined self-start text-secondary opacity-0 transition-opacity peer-checked:opacity-100"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </article>
          )}

          {/* ── Step 2: Choose Service ──────────────────────── */}
          {step === 2 && (
            <article className="ce-card p-6 animate-in fade-in duration-300">
              <h2 className="mb-6 text-headline-md text-on-surface">Select a Service</h2>
              <div className="flex flex-wrap gap-3">
                {bookingServices.map((service) => (
                  <label key={service} className="cursor-pointer">
                    <input
                      type="radio"
                      name="service"
                      className="peer sr-only"
                      checked={booking.service === service}
                      onChange={() => update("service", service)}
                    />
                    <div className="rounded-full border border-outline-variant px-5 py-2.5 text-label-md text-on-surface-variant transition-all peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-on-secondary peer-checked:shadow-md hover:bg-surface-container-low">
                      {service}
                    </div>
                  </label>
                ))}
              </div>
            </article>
          )}

          {/* ── Step 3: Date & Time ────────────────────────── */}
          {step === 3 && (
            <article className="ce-card p-6 animate-in fade-in duration-300">
              <h2 className="mb-6 text-headline-md text-on-surface">Pick Date &amp; Time</h2>

              <div className="mb-8">
                <label className="mb-2 block text-label-md font-semibold text-on-surface" htmlFor="booking-date">
                  Preferred Date
                </label>
                <input
                  id="booking-date"
                  type="date"
                  min={today}
                  value={booking.date}
                  onChange={(e) => update("date", e.target.value)}
                  className="ce-input max-w-xs"
                />
              </div>

              <div>
                <p className="mb-3 text-label-md font-semibold text-on-surface">Available Slots</p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                  {timeSlots.map((slot) => (
                    <label key={slot} className="cursor-pointer">
                      <input
                        type="radio"
                        name="time"
                        className="peer sr-only"
                        checked={booking.time === slot}
                        onChange={() => update("time", slot)}
                      />
                      <div className="rounded-lg border border-outline-variant px-3 py-2 text-center text-label-md text-on-surface-variant transition-all peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-on-secondary peer-checked:shadow-md hover:bg-surface-container-low">
                        {slot}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </article>
          )}

          {/* ── Step 4: Patient Details ────────────────────── */}
          {step === 4 && (
            <article className="ce-card p-6 animate-in fade-in duration-300">
              <h2 className="mb-6 text-headline-md text-on-surface">Your Details</h2>

              <div className="flex flex-col gap-5">
                <div>
                  <label className="mb-1.5 block text-label-md font-semibold text-on-surface" htmlFor="patient-name">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="patient-name"
                    type="text"
                    value={booking.patientName}
                    onChange={(e) => update("patientName", e.target.value)}
                    placeholder="Enter your full name"
                    className="ce-input"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-label-md font-semibold text-on-surface" htmlFor="patient-phone">
                    Phone Number <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="patient-phone"
                    type="tel"
                    value={booking.patientPhone}
                    onChange={(e) => update("patientPhone", e.target.value)}
                    placeholder="+91 98765 43210"
                    className="ce-input"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-label-md font-semibold text-on-surface" htmlFor="patient-email">
                    Email <span className="text-sm font-normal text-on-surface-variant">(optional)</span>
                  </label>
                  <input
                    id="patient-email"
                    type="email"
                    value={booking.patientEmail}
                    onChange={(e) => update("patientEmail", e.target.value)}
                    placeholder="you@example.com"
                    className="ce-input"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-label-md font-semibold text-on-surface" htmlFor="patient-notes">
                    Additional Notes <span className="text-sm font-normal text-on-surface-variant">(optional)</span>
                  </label>
                  <textarea
                    id="patient-notes"
                    value={booking.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    placeholder="Any symptoms, allergies, or special requests..."
                    rows={3}
                    className="ce-input resize-none"
                  />
                </div>
              </div>
            </article>
          )}

          {/* ── Navigation buttons ─────────────────────────── */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className={[
                "flex items-center gap-1 rounded-full px-5 py-2.5 text-label-md transition-all",
                step === 1
                  ? "cursor-not-allowed text-outline"
                  : "text-on-surface-variant hover:bg-surface-container-low",
              ].join(" ")}
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Back
            </button>

            {step < 4 ? (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={[
                  "ce-button-primary transition-opacity",
                  !canProceed() ? "cursor-not-allowed opacity-50" : "",
                ].join(" ")}
              >
                Next Step
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className={[
                  "ce-button-primary bg-secondary transition-opacity",
                  !canProceed() ? "cursor-not-allowed opacity-50" : "",
                ].join(" ")}
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                Confirm &amp; Send via WhatsApp
              </button>
            )}
          </div>
        </section>

        {/* ── Sidebar summary ──────────────────────────────── */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 flex flex-col gap-6 rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
            <h3 className="border-b border-surface-container-high pb-2 text-headline-sm text-on-surface">
              Booking Summary
            </h3>

            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-4">
                <span className="text-label-md text-on-surface-variant">Physician</span>
                <span className="text-body-md font-medium text-on-surface text-right">
                  {booking.doctor || "—"}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-label-md text-on-surface-variant">Service</span>
                <span className="text-body-md font-medium text-on-surface text-right">
                  {booking.service || <span className="italic text-on-surface-variant">Not selected</span>}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-label-md text-on-surface-variant">Date &amp; Time</span>
                <span className="text-body-md font-medium text-on-surface text-right">
                  {booking.date && booking.time ? (
                    `${booking.date} at ${booking.time}`
                  ) : (
                    <span className="italic text-on-surface-variant">Pending</span>
                  )}
                </span>
              </div>
              {booking.patientName && (
                <div className="flex items-start justify-between gap-4">
                  <span className="text-label-md text-on-surface-variant">Patient</span>
                  <span className="text-body-md font-medium text-on-surface text-right">{booking.patientName}</span>
                </div>
              )}
            </div>

            <div className="border-t border-surface-container-high pt-6">
              <div className="flex items-start gap-4 rounded-lg bg-surface-container-low p-4">
                <span
                  className="material-symbols-outlined mt-1 text-secondary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  forum
                </span>
                <div>
                  <h4 className="text-label-md font-semibold text-on-surface">Instant Confirmation</h4>
                  <p className="mt-1 text-sm text-on-surface-variant">
                    A WhatsApp confirmation will be sent immediately upon completing your booking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}