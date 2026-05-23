import Link from "next/link";
import Image from "next/image";
import { CLINIC, FOOTER_LINKS, NAV_ITEMS } from "@/lib/clinic-data";

export default function Footer() {
  return (
    <footer className="mt-auto w-full bg-inverse-surface px-4 py-12 text-inverse-on-surface md:px-12" role="contentinfo" aria-label="Site footer">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-8 text-center">
        {/* Logo + tagline */}
        <div className="flex flex-col items-center gap-2">
          <Link href="/" className="flex items-center gap-2 text-headline-sm font-semibold text-inverse-on-surface">
            <div className="relative h-8 w-8 overflow-hidden rounded-md bg-surface-container-lowest">
              <Image src="/cliniclogo.png" alt="Clinic Logo" fill className="object-contain p-1" />
            </div>
            {CLINIC.name}
          </Link>
          <p className="text-body-md text-inverse-on-surface">{CLINIC.tagline}</p>
        </div>

        {/* Quick links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-body-md text-inverse-on-surface">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-primary-fixed"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Contact row */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-body-md text-inverse-on-surface">
          <a href={`tel:${CLINIC.phone}`} className="flex items-center gap-2 transition-colors hover:text-primary-fixed">
            <span className="material-symbols-outlined text-[18px]">call</span>
            {CLINIC.phoneFormatted}
          </a>
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">location_on</span>
            {CLINIC.address.full}
          </span>
        </div>

        {/* Legal links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-body-md text-inverse-on-surface">
          {FOOTER_LINKS.map((item) => (
            <a key={item} href="#" className="transition-colors hover:text-primary-fixed">
              {item}
            </a>
          ))}
        </div>

        <div className="text-body-md text-inverse-on-surface">
          © {new Date().getFullYear()} {CLINIC.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
