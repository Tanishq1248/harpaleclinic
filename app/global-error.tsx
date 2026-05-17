"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CLINIC } from "@/lib/clinic-data";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#f8f9ff] px-4 py-20 text-center font-sans text-[#0b1c30]">
        <div className="flex flex-col items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#ffe0e0]">
            <span
              className="material-symbols-outlined text-5xl text-[#ba1a1a]"
              style={{ fontVariationSettings: "'FILL' 1" }}
              aria-hidden="true"
            >
              error
            </span>
          </div>

          <h1 className="text-3xl font-bold">Something went wrong</h1>
          <p className="max-w-md text-lg text-[#45464d]">
            We encountered an unexpected error. Please try again or contact us if the problem persists.
          </p>

          {error.digest && (
            <p className="rounded bg-[#eff4ff] px-3 py-1 font-mono text-sm text-[#45464d]">
              Error ID: {error.digest}
            </p>
          )}

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full bg-[#131b2e] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#006a61]"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">refresh</span>
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-[#006a61] bg-[#86f2e4] px-6 py-3 text-sm font-semibold text-[#006f66] transition-colors hover:bg-[#006a61] hover:text-white"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">home</span>
              Go Home
            </Link>
            <a
              href={`tel:${CLINIC.phone}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#006a61] bg-[#86f2e4] px-6 py-3 text-sm font-semibold text-[#006f66] transition-colors hover:bg-[#006a61] hover:text-white"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">call</span>
              Call Us
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
