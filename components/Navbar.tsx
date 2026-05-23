"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { NAV_ITEMS, CLINIC } from "@/lib/clinic-data";
import MobileMenu from "./MobileMenu";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  // Admin Shortcut (Ctrl + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "a") {
        e.preventDefault(); // Prevent text selection
        router.push("/admin");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  // Triple click logo shortcut
  const handleLogoClick = (e: React.MouseEvent) => {
    if (e.detail >= 3) {
      e.preventDefault();
      router.push("/admin");
    }
  };

  // Minimal scroll effect: add shadow only when scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
      className={`ce-surface-glass absolute left-4 right-4 top-2 z-50 rounded-2xl transition-all duration-300 ${
        scrolled ? "shadow-[0_10px_30px_rgba(11,110,139,0.12)]" : "shadow-[0_6px_20px_rgba(11,110,139,0.08)]"
      }`}
      role="banner"
    >
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="group flex items-center gap-3 transition-opacity hover:opacity-80"
          aria-label={`${CLINIC.name} — Home`}
        >
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-surface-container-lowest transition-transform group-hover:scale-105">
            <Image src="/cliniclogo.png" alt="Clinic Logo" fill className="object-contain" priority />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight text-on-surface">
            {CLINIC.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                aria-current={isActive ? "page" : undefined}
                href={item.href}
                className="group relative py-2 text-sm font-medium transition-colors"
              >
                <span
                  className={
                    isActive
                      ? "text-primary"
                      : "text-on-surface-variant group-hover:text-on-surface"
                  }
                >
                  {item.label}
                </span>
                {/* Minimal animated underline */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-primary transition-all duration-300 ease-out ${
                    isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/book-appointment"
            className="hidden items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-primary-container hover:shadow-lg md:flex"
          >
            Book Appointment
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
      {pathname !== "/" && <div className="h-28 w-full shrink-0" aria-hidden="true" />}
    </>
  );
}
