import Link from "next/link";
import { CLINIC } from "@/lib/clinic-data";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col items-center justify-center gap-8 px-4 py-20 text-center md:px-12">
      {/* Animated illustration */}
      <div className="relative">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-surface-container">
          <span
            className="material-symbols-outlined text-7xl text-secondary"
            style={{ fontVariationSettings: "'FILL' 1" }}
            aria-hidden="true"
          >
            explore_off
          </span>
        </div>
        <div className="absolute -bottom-2 -right-2 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-on-secondary shadow-lg">
          <span className="material-symbols-outlined text-2xl" aria-hidden="true">question_mark</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <p className="text-label-md uppercase tracking-widest text-secondary">Error 404</p>
        <h1 className="text-headline-lg-mobile text-on-surface md:text-headline-lg">Page Not Found</h1>
        <p className="max-w-md text-body-lg text-on-surface-variant">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us help you find what you need.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link href="/" className="ce-button-primary">
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">home</span>
          Go Home
        </Link>
        <Link href="/book-appointment" className="ce-button-secondary">
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">calendar_month</span>
          Book Appointment
        </Link>
        <a href={`tel:${CLINIC.phone}`} className="ce-button-secondary">
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">call</span>
          Call {CLINIC.phoneFormatted}
        </a>
      </div>

      {/* Quick links */}
      <nav className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-outline-variant/50 pt-8 text-body-md text-on-surface-variant" aria-label="Quick links">
        <Link href="/services" className="transition-colors hover:text-secondary">Services</Link>
        <Link href="/doctors" className="transition-colors hover:text-secondary">Doctors</Link>
        <Link href="/insurance" className="transition-colors hover:text-secondary">Insurance</Link>
        <Link href="/contact" className="transition-colors hover:text-secondary">Contact</Link>
      </nav>
    </div>
  );
}
