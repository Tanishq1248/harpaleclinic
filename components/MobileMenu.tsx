"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, CLINIC } from "@/lib/clinic-data";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Animated Hamburger Toggle */}
      <button
        className="relative z-[60] flex h-8 w-10 flex-col items-center justify-center gap-[6px] md:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={`h-[2px] w-6 rounded-full bg-on-surface transition-all duration-300 ease-out ${
            open ? "translate-y-[8px] rotate-45" : ""
          }`}
        />
        <span
          className={`h-[2px] w-6 rounded-full bg-on-surface transition-all duration-300 ease-out ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`h-[2px] w-6 rounded-full bg-on-surface transition-all duration-300 ease-out ${
            open ? "-translate-y-[8px] -rotate-45" : ""
          }`}
        />
      </button>

      {mounted && createPortal(
        <>
          {/* Backdrop Overlay */}
          <div
            className={`fixed inset-0 z-[100] bg-primary/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
              open ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-out Sidebar */}
          <aside
            className={`fixed bottom-0 right-0 top-0 z-[101] flex w-[300px] max-w-[85vw] flex-col bg-surface-container-lowest shadow-[0_12px_40px_rgba(11,110,139,0.14)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
            aria-label="Mobile navigation"
            role="dialog"
            aria-modal="true"
          >
            {/* Sidebar Header */}
            <div className="flex h-20 items-center justify-between border-b border-outline-variant/30 bg-surface-container-lowest px-6">
              <span className="font-heading text-lg font-bold text-on-surface">Menu</span>
              <button onClick={() => setOpen(false)} className="rounded-full p-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface" aria-label="Close menu">
                 <span className="material-symbols-outlined text-[24px]">close</span>
               </button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-4">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`group flex items-center rounded-xl px-4 py-4 text-base font-medium transition-all ${
                      isActive
                        ? "bg-primary-fixed text-on-primary-fixed-variant"
                        : "text-on-surface hover:bg-surface-container-low"
                    }`}
                  >
                    <span className={`transition-transform duration-300 ${isActive ? "translate-x-2" : "group-hover:translate-x-2"}`}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* CTA Footer */}
            <div className="border-t border-outline-variant/50 bg-surface-container-lowest p-6 pb-8">
              <Link
                href="/book-appointment"
                className="ce-button-primary w-full py-3.5"
                onClick={() => setOpen(false)}
              >
                Book Appointment
              </Link>

              <a
                href={`tel:${CLINIC.phone}`}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-outline-variant py-3.5 text-sm font-medium text-on-surface transition-colors hover:border-secondary hover:text-secondary"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                {CLINIC.phoneFormatted}
              </a>
            </div>
          </aside>
        </>,
        document.body
      )}
    </>
  );
}
