"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { CLINIC, DOCTORS } from "@/lib/clinic-data";
import { db } from "@/lib/firebase";
import { ref, onValue, update } from "firebase/database";

// ── Password ──────────────────────────────────────────────────────────
const ADMIN_PASSWORD = "harpale@2024";

// ── Types ─────────────────────────────────────────────────────────────
interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  doctor: string;
  service: string;
  time: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  date: string;
  notes?: string;
  firebaseKey?: string;
}

interface HomeVisit {
  id: string;
  patientName: string;
  patientPhone: string;
  address: string;
  service: string;
  timeSlot: string;
  date: string;
  notes?: string;
  priority: "Normal" | "Urgent";
  status: "Pending" | "Dispatched" | "Completed";
  firebaseKey?: string;
}

// ── Demo data ─────────────────────────────────────────────────────────
const today = new Date().toISOString().split("T")[0];

const DEMO_APPOINTMENTS: Appointment[] = [
  { id: "PT-1001", patientName: "Priya Sharma", patientPhone: "9876543210", doctor: DOCTORS[0].name, service: "General Consult", time: "09:00 AM", status: "Pending", date: today },
  { id: "PT-1002", patientName: "Rahul Deshmukh", patientPhone: "9823456789", doctor: DOCTORS[1].name, service: "Maternity Care", time: "09:30 AM", status: "Confirmed", date: today },
  { id: "PT-1003", patientName: "Anita Kulkarni", patientPhone: "9812345678", doctor: DOCTORS[0].name, service: "Surgery Assessment", time: "10:00 AM", status: "Confirmed", date: today },
  { id: "PT-1004", patientName: "Suresh Patil", patientPhone: "9898765432", doctor: DOCTORS[0].name, service: "Post-Op Followup", time: "10:30 AM", status: "Pending", date: today },
  { id: "PT-1005", patientName: "Meena Joshi", patientPhone: "9867543210", doctor: DOCTORS[1].name, service: "Prenatal Care", time: "11:00 AM", status: "Confirmed", date: today },
  { id: "PT-1006", patientName: "Vikram Gaikwad", patientPhone: "9845612378", doctor: DOCTORS[0].name, service: "General Consult", time: "11:30 AM", status: "Pending", date: today },
];

const DEMO_HOMEVISITS: HomeVisit[] = [
  { id: "HV-201", patientName: "Sunita Bhosale", patientPhone: "9834567890", address: "142 Karve Nagar, Pune", service: "Blood Test", timeSlot: "Morning", date: today, notes: "Requires fasting blood sugar test.", priority: "Urgent", status: "Pending" },
  { id: "HV-202", patientName: "Ramesh Waghmare", patientPhone: "9812340987", address: "88 Sinhagad Road, Pune", service: "ECG", timeSlot: "Afternoon", date: today, notes: "Routine cardiac follow-up.", priority: "Normal", status: "Pending" },
];

// ── Helpers ───────────────────────────────────────────────────────────
function getDoctorInitials(name: string) {
  return name.split(" ").filter(w => w.length > 2).map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

function statusColor(s: string) {
  switch (s) {
    case "Confirmed": case "Completed": case "Dispatched": return "text-secondary";
    case "Pending": return "text-amber-600";
    case "Cancelled": return "text-destructive";
    default: return "text-on-surface-variant";
  }
}

function statusDot(s: string) {
  switch (s) {
    case "Confirmed": case "Completed": case "Dispatched": return "bg-secondary";
    case "Pending": return "bg-amber-500";
    case "Cancelled": return "bg-destructive";
    default: return "bg-outline";
  }
}

// ══════════════════════════════════════════════════════════════════════
// LOGIN GATE
// ══════════════════════════════════════════════════════════════════════
function LoginGate({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem("hc_admin", "1");
      onAuth();
    } else {
      setError(true);
      setPw("");
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-20">
      <div className="w-full max-w-sm">
        <div className="ce-card-elevated p-8">
          <div className="mb-6 flex flex-col items-center gap-3 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-container text-on-primary">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">admin_panel_settings</span>
            </div>
            <h1 className="text-headline-md text-on-surface">Admin Console</h1>
            <p className="text-body-md text-on-surface-variant">Enter the doctor&apos;s password to continue</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="admin-pw" className="block text-label-md font-semibold text-on-surface">Password</label>
              <div className="relative">
                <input
                  id="admin-pw"
                  type={show ? "text" : "password"}
                  value={pw}
                  onChange={(e) => { setPw(e.target.value); setError(false); }}
                  placeholder="Enter admin password"
                  className={`ce-input pr-12 ${error ? "border-destructive" : ""}`}
                  autoFocus
                  aria-invalid={error}
                  required
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface" aria-label={show ? "Hide password" : "Show password"}>
                  <span className="material-symbols-outlined text-[20px]">{show ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
              {error && <p className="text-sm text-destructive" role="alert">Incorrect password. Please try again.</p>}
            </div>
            <button type="submit" className="ce-button-primary w-full rounded-lg py-3">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">lock_open</span>
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-on-surface-variant">Access restricted to authorized clinic staff only.</p>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// ADMIN DASHBOARD
// ══════════════════════════════════════════════════════════════════════
export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>(DEMO_APPOINTMENTS);
  const [homeVisits, setHomeVisits] = useState<HomeVisit[]>(DEMO_HOMEVISITS);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const perPage = 5;

  // Check session
  useEffect(() => {
    if (sessionStorage.getItem("hc_admin") === "1") setAuthed(true);
  }, []);

  // Realtime Database Sync
  useEffect(() => {
    if (!authed) return;

    const apptsRef = ref(db, "appointments");
    const visitsRef = ref(db, "homeVisits");

    const unsubAppts = onValue(apptsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsed = Object.entries(data).map(([key, val]: any) => ({
          ...val,
          firebaseKey: key
        })).sort((a: any, b: any) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        setAppointments(parsed);
      } else {
        setAppointments([]); // Shows empty state if database is clear
      }
    });

    const unsubVisits = onValue(visitsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsed = Object.entries(data).map(([key, val]: any) => ({
          ...val,
          firebaseKey: key
        })).sort((a: any, b: any) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        setHomeVisits(parsed);
      } else {
        setHomeVisits([]);
      }
    });

    return () => {
      unsubAppts();
      unsubVisits();
    };
  }, [authed]);

  const updateApptStatus = async (key: string | undefined, status: Appointment["status"]) => {
    if (!key) return;
    try {
      await update(ref(db, `appointments/${key}`), { status });
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  const updateVisitStatus = async (key: string | undefined, status: HomeVisit["status"]) => {
    if (!key) return;
    try {
      await update(ref(db, `homeVisits/${key}`), { status });
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  const logout = () => { sessionStorage.removeItem("hc_admin"); setAuthed(false); };

  if (!authed) return <LoginGate onAuth={() => setAuthed(true)} />;

  // Filtered & paginated appointments
  const q = filter.toLowerCase();
  const filtered = appointments.filter((a) =>
    !q || a.patientName.toLowerCase().includes(q) || a.id.toLowerCase().includes(q) || a.doctor.toLowerCase().includes(q),
  );
  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice(page * perPage, (page + 1) * perPage);
  const pendingVisits = homeVisits.filter((v) => v.status === "Pending");
  const todayFormatted = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  // ── Render ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      {/* ── Top bar ──────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-outline-variant bg-surface px-4 md:px-8">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8 overflow-hidden rounded-md bg-white shadow-sm">
              <Image src="/logo.png" alt="Clinic Logo" fill className="object-contain p-0.5" />
            </div>
            <span className="text-headline-sm font-bold text-on-surface">{CLINIC.name}</span>
            <span className="hidden text-body-md text-on-surface-variant sm:inline">Admin Console</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-1.5 text-body-md text-on-surface-variant sm:flex">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">calendar_today</span>
              {todayFormatted}
            </span>
            <button onClick={logout} className="flex items-center gap-2 rounded-full border border-outline-variant px-4 py-2 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container hover:text-destructive" aria-label="Sign out">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">logout</span>
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Main content ─────────────────────────────────────── */}
      <div className="mx-auto max-w-[1400px] px-4 py-6 md:px-8 md:py-8">
        {/* Title */}
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-headline-lg-mobile text-on-surface md:text-headline-lg">Daily Operations Overview</h1>
            <p className="mt-1 text-body-md text-on-surface-variant">Manage today&apos;s clinical schedules and incoming field requests.</p>
          </div>
          <button onClick={() => window.print()} className="ce-button-secondary shrink-0 self-start">
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">print</span>
            Print Manifest
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* ════════════ BOOKINGS TABLE ════════════ */}
          <section className="ce-card p-0 xl:col-span-8" aria-label="Today's bookings">
            {/* Table header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant p-4 md:p-6">
              <div className="flex items-center gap-3">
                <h2 className="text-headline-sm text-on-surface">Today&apos;s Bookings</h2>
                <span className="rounded-full bg-secondary px-3 py-1 text-label-sm font-bold text-on-secondary">{appointments.length} Appointments</span>
              </div>
              <div className="relative w-full max-w-xs">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-outline" aria-hidden="true">search</span>
                <input type="search" placeholder="Filter patients..." value={filter} onChange={(e) => { setFilter(e.target.value); setPage(0); }} className="ce-input pl-10 py-2 text-sm" aria-label="Filter patients" />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm" role="table">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface-container-lowest text-label-sm uppercase tracking-wider text-on-surface-variant">
                    <th className="px-4 py-3 font-semibold md:px-6">Patient Details</th>
                    <th className="px-4 py-3 font-semibold">Attending Doctor</th>
                    <th className="px-4 py-3 font-semibold">Time &amp; Service</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((appt) => (
                    <tr key={appt.id} className="border-b border-outline-variant/50 transition-colors hover:bg-surface-container-lowest">
                      <td className="px-4 py-4 md:px-6">
                        <div className="font-medium text-on-surface">{appt.patientName}</div>
                        <div className="text-xs text-on-surface-variant">ID: {appt.id}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-container text-xs font-bold text-on-primary">{getDoctorInitials(appt.doctor)}</div>
                          <span className="text-body-md text-on-surface">{appt.doctor.replace("Dr. ", "Dr. ").split(" ").slice(0, 2).join(" ")}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-medium text-on-surface">{appt.time}</div>
                        <div className="text-xs text-on-surface-variant">{appt.service}</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-label-md font-semibold ${statusColor(appt.status)}`}>
                          <span className={`inline-block h-2 w-2 rounded-full ${statusDot(appt.status)}`} />
                          {appt.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {appt.status === "Pending" && (
                            <button onClick={() => updateApptStatus(appt.firebaseKey, "Confirmed")} className="rounded-lg px-3 py-1.5 text-xs font-semibold text-secondary transition-colors hover:bg-secondary-container" title="Confirm">
                              <span className="material-symbols-outlined text-[16px]">check_circle</span>
                            </button>
                          )}
                          {appt.status !== "Completed" && appt.status !== "Cancelled" && (
                            <button onClick={() => updateApptStatus(appt.firebaseKey, "Completed")} className="rounded-lg px-3 py-1.5 text-xs font-semibold text-on-surface-variant transition-colors hover:bg-surface-container" title="Mark complete">
                              <span className="material-symbols-outlined text-[16px]">task_alt</span>
                            </button>
                          )}
                          <a href={`https://wa.me/91${appt.patientPhone}?text=${encodeURIComponent(`Hello ${appt.patientName}, this is ${CLINIC.name}. Your appointment is ${appt.status === "Confirmed" ? "confirmed" : "being reviewed"} for ${appt.time} today.`)}`} target="_blank" rel="noopener noreferrer" className="rounded-lg px-3 py-1.5 text-xs font-semibold text-on-surface-variant transition-colors hover:bg-surface-container" title="WhatsApp">
                            <span className="material-symbols-outlined text-[16px]">chat</span>
                          </a>
                          {appt.status !== "Cancelled" && (
                            <button onClick={() => updateApptStatus(appt.firebaseKey, "Cancelled")} className="rounded-lg px-3 py-1.5 text-xs font-semibold text-on-surface-variant transition-colors hover:bg-surface-container hover:text-destructive" title="Cancel">
                              <span className="material-symbols-outlined text-[16px]">cancel</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paged.length === 0 && (
                    <tr><td colSpan={5} className="px-6 py-12 text-center text-on-surface-variant">No appointments match your filter.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-outline-variant px-4 py-3 text-sm text-on-surface-variant md:px-6">
              <span>Showing {filtered.length === 0 ? 0 : page * perPage + 1}-{Math.min((page + 1) * perPage, filtered.length)} of {filtered.length} appointments</span>
              <div className="flex gap-1">
                <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} className="rounded-lg border border-outline-variant p-1.5 transition-colors hover:bg-surface-container disabled:opacity-40" aria-label="Previous page">
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1} className="rounded-lg border border-outline-variant p-1.5 transition-colors hover:bg-surface-container disabled:opacity-40" aria-label="Next page">
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>
          </section>

          {/* ════════════ HOME VISITS PANEL ════════════ */}
          <section className="xl:col-span-4" aria-label="Home visits">
            <div className="ce-card overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between bg-primary-container p-4 text-on-primary md:p-5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">home_health</span>
                  <h2 className="text-headline-sm font-bold">Home Visits</h2>
                </div>
                {pendingVisits.length > 0 && (
                  <span className="rounded-full bg-destructive px-3 py-1 text-label-sm font-bold text-white">{pendingVisits.length} Action Req</span>
                )}
              </div>
              <div className="p-4 md:p-5">
                {pendingVisits.length === 0 && homeVisits.filter(v => v.status !== "Pending").length > 0 && (
                  <p className="py-6 text-center text-body-md text-on-surface-variant">All home visits have been dispatched. ✓</p>
                )}
                {pendingVisits.length === 0 && homeVisits.filter(v => v.status !== "Pending").length === 0 && (
                  <p className="py-6 text-center text-body-md text-on-surface-variant">No home visit requests today.</p>
                )}
                <p className="mb-4 text-sm text-on-surface-variant">Pending field operations needing immediate dispatch.</p>

                <div className="flex flex-col gap-4">
                  {homeVisits.map((visit) => (
                    <div key={visit.id} className={`rounded-xl border p-4 transition-all ${visit.status === "Pending" ? "border-l-4" : "border-outline-variant/50 opacity-70"} ${visit.priority === "Urgent" && visit.status === "Pending" ? "border-l-destructive" : "border-l-secondary"}`}>
                      {/* Patient row */}
                      <div className="mb-3 flex items-start justify-between">
                        <div>
                          <div className="font-semibold text-on-surface">{visit.patientName}</div>
                          <a href={`tel:${visit.patientPhone}`} className="flex items-center gap-1 text-sm text-on-surface-variant hover:text-secondary">
                            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">call</span>
                            +91 {visit.patientPhone}
                          </a>
                        </div>
                        <div className="text-right">
                          {visit.priority === "Urgent" && visit.status === "Pending" && <span className="text-label-sm font-bold text-destructive">URGENT</span>}
                          {visit.status === "Dispatched" && <span className="text-label-sm font-bold text-secondary">DISPATCHED</span>}
                          {visit.status === "Completed" && <span className="text-label-sm font-bold text-secondary">DONE</span>}
                          {visit.status === "Pending" && visit.priority !== "Urgent" && <span className="text-label-sm text-on-surface-variant">{visit.date === today ? "Today" : visit.date}, {visit.timeSlot}</span>}
                        </div>
                      </div>

                      {/* Info box */}
                      <div className="mb-3 rounded-lg bg-surface-container-low p-3">
                        <div className="flex items-start gap-1.5 text-sm text-on-surface-variant">
                          <span className="material-symbols-outlined mt-0.5 text-[14px]" aria-hidden="true">location_on</span>
                          {visit.address}
                        </div>
                        {visit.notes && <p className="mt-1 pl-5 text-sm text-on-surface-variant">{visit.notes}</p>}
                      </div>

                      {/* Actions */}
                      {visit.status === "Pending" && (
                        <div className="grid grid-cols-2 gap-2">
                          <a href={`https://wa.me/91${visit.patientPhone}?text=${encodeURIComponent(`Hello ${visit.patientName}, this is ${CLINIC.name}. We are confirming your home visit for ${visit.service} today (${visit.timeSlot}).`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 rounded-lg border border-outline-variant py-2 text-label-md text-on-surface transition-colors hover:bg-surface-container">
                            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">chat</span>
                            Message
                          </a>
                          <button onClick={() => updateVisitStatus(visit.firebaseKey, "Dispatched")} className="flex items-center justify-center gap-1.5 rounded-lg bg-primary-container py-2 text-label-md font-semibold text-on-primary transition-colors hover:bg-secondary">
                            Dispatch Doc
                          </button>
                        </div>
                      )}
                      {visit.status === "Dispatched" && (
                        <button onClick={() => updateVisitStatus(visit.firebaseKey, "Completed")} className="w-full rounded-lg border border-secondary py-2 text-center text-label-md font-semibold text-secondary transition-colors hover:bg-secondary hover:text-on-secondary">
                          Mark Completed
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats summary */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { label: "Confirmed", value: appointments.filter(a => a.status === "Confirmed").length, icon: "check_circle", color: "text-secondary" },
                { label: "Pending", value: appointments.filter(a => a.status === "Pending").length, icon: "schedule", color: "text-amber-600" },
                { label: "Completed", value: appointments.filter(a => a.status === "Completed").length, icon: "task_alt", color: "text-secondary" },
                { label: "Cancelled", value: appointments.filter(a => a.status === "Cancelled").length, icon: "cancel", color: "text-destructive" },
              ].map((s) => (
                <div key={s.label} className="ce-card flex items-center gap-3 p-4">
                  <span className={`material-symbols-outlined text-2xl ${s.color}`} aria-hidden="true">{s.icon}</span>
                  <div>
                    <div className="text-headline-sm text-on-surface">{s.value}</div>
                    <div className="text-label-sm text-on-surface-variant">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
