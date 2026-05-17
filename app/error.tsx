"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col items-center justify-center gap-6 px-4 py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ffe0e0]">
        <span
          className="material-symbols-outlined text-4xl text-destructive"
          style={{ fontVariationSettings: "'FILL' 1" }}
          aria-hidden="true"
        >
          warning
        </span>
      </div>

      <h1 className="text-headline-lg-mobile text-on-surface md:text-headline-lg">Oops! Something went wrong</h1>
      <p className="max-w-md text-body-lg text-on-surface-variant">
        We ran into an issue loading this page. Please try again.
      </p>

      {error.digest && (
        <p className="rounded-lg bg-surface-container px-4 py-2 font-mono text-sm text-on-surface-variant">
          Reference: {error.digest}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <button onClick={reset} className="ce-button-primary">
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">refresh</span>
          Try Again
        </button>
        <Link href="/" className="ce-button-secondary">
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">home</span>
          Go Home
        </Link>
      </div>
    </div>
  );
}
