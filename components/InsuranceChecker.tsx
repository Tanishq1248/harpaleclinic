"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { CLINIC } from "@/lib/clinic-data";

// ── Data ──────────────────────────────────────────────────────────────
const insurers = [
  { code: "SB", name: "Star Health", type: "Cashless" as const, note: "Full network coverage", image: "/star-health.png" },
  { code: "NI", name: "New India Assurance", type: "Cashless" as const, note: "Government insurer", image: "/new-india.png" },
  { code: "IC", name: "ICICI Lombard", type: "Cashless" as const, note: "Direct integration", image: "/icici.png" },
  { code: "HD", name: "HDFC ERGO", type: "Cashless" as const, note: "Premium tier active", image: "/hdfc.png" },
  { code: "BJ", name: "Bajaj Allianz", type: "Cashless" as const, note: "Wide network", image: "/bajaj.png" },
  { code: "CG", name: "Care Health", type: "Cashless" as const, note: "Formerly Religare", image: "/care-health.png" },
  { code: "MN", name: "Manipal Cigna", type: "Cashless" as const, note: "Comprehensive plans", image: "/manipal.png" },
  { code: "MX", name: "Max Bupa", type: "Cashless" as const, note: "Family floater active", image: "/max-bupa.png" },
  { code: "NV", name: "Niva Bupa", type: "Cashless" as const, note: "Health gain plans", image: "/niva-bupa.png" },
  { code: "RS", name: "Royal Sundaram", type: "Cashless" as const, note: "Lifeline plans", image: "/royal-sundaram.png" },
  { code: "TA", name: "Tata AIG", type: "Cashless" as const, note: "Medicare plans", image: "/tata-aig.png" },
  { code: "UN", name: "United India", type: "Reimbursement" as const, note: "Claim processing 5-7 days", image: "/united-india.png" },
  { code: "GI", name: "GoDigit", type: "Cashless" as const, note: "Quick claims", image: "/godigit.png" },
  { code: "OR", name: "Oriental Insurance", type: "Reimbursement" as const, note: "Government insurer", image: "/oriental.png" },
  { code: "AI", name: "Aditya Birla Health", type: "Cashless" as const, note: "Activ Health plans", image: "/aditya-birla.png" },
  { code: "EC", name: "ECGC", type: "Reimbursement" as const, note: "Standard processing", image: "/ecgc.png" },
  { code: "CH", name: "Cholamandalam", type: "Cashless" as const, note: "Group policies", image: "/cholamandalam.png" },
  { code: "LI", name: "Liberty General", type: "Reimbursement" as const, note: "Requires pre-auth", image: "/liberty.png" },
  { code: "SH", name: "SBI General", type: "Cashless" as const, note: "Arogya Sanjeevani", image: "/sbi.png" },
  { code: "IF", name: "IFFCO Tokio", type: "Cashless" as const, note: "Swasthya Kavach", image: "/iffco.png" },
  { code: "RL", name: "Reliance General", type: "Cashless" as const, note: "Critical illness cover", image: "/reliance.png" },
  { code: "FH", name: "Future Generali", type: "Cashless" as const, note: "Health Total plans", image: "/future-generali.png" },
];

type FilterType = "All" | "Cashless" | "Reimbursement";

// ── Component ─────────────────────────────────────────────────────────
export default function InsuranceChecker() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("All");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return insurers.filter((ins) => {
      const matchesSearch = !q || ins.name.toLowerCase().includes(q) || ins.code.toLowerCase().includes(q);
      const matchesFilter = filter === "All" || ins.type === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const cashlessCount = insurers.filter((i) => i.type === "Cashless").length;
  const reimbursementCount = insurers.filter((i) => i.type === "Reimbursement").length;

  return (
    <div className="flex-1">
      {/* ── Hero Search ──────────────────────────────────────── */}
      <section className="border-b border-surface-variant bg-surface-container-lowest py-12 md:py-16">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center px-4 text-center md:px-12">
          <h1 className="text-headline-lg-mobile text-on-surface md:text-headline-lg">Verify Your Insurance</h1>
          <p className="mt-3 max-w-2xl text-body-lg text-on-surface-variant">
            Find your provider easily — no phone calls required.
          </p>

          <div className="group relative mt-8 w-full max-w-2xl">
            <span
              className="material-symbols-outlined absolute left-4 top-1/2 z-10 -translate-y-1/2 text-outline transition-colors group-focus-within:text-secondary"
              aria-hidden="true"
            >
              search
            </span>
            <input
              type="search"
              placeholder="Search for your insurer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ce-input pl-12 pr-4 shadow-sm hover:shadow-md"
              aria-label="Search insurers"
              id="insurance-search"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
                aria-label="Clear search"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Results ──────────────────────────────────────────── */}
      <section className="bg-background py-12 md:py-16" aria-label="Insurance providers list">
        <div className="mx-auto w-full max-w-[1280px] px-4 md:px-12">
          {/* Filter toolbar */}
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-headline-sm text-on-surface">
              Supported Insurers{" "}
              <span className="ml-1 text-body-md font-normal text-outline">
                ({filtered.length} of {insurers.length})
              </span>
            </h2>

            <div className="flex items-center gap-2" role="radiogroup" aria-label="Filter by insurance type">
              {(["All", "Cashless", "Reimbursement"] as const).map((type) => {
                const isActive = filter === type;
                const count = type === "All" ? insurers.length : type === "Cashless" ? cashlessCount : reimbursementCount;
                return (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    role="radio"
                    aria-checked={isActive}
                    className={[
                      "flex items-center gap-1.5 rounded-full px-4 py-2 text-label-md font-medium transition-all",
                      isActive
                        ? "bg-secondary text-on-secondary shadow-sm"
                        : "border border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:border-secondary hover:text-secondary",
                    ].join(" ")}
                  >
                    {type}
                    <span
                      className={[
                        "rounded-full px-1.5 py-0.5 text-[11px] font-bold leading-none",
                        isActive ? "bg-on-secondary/20 text-on-secondary" : "bg-surface-container-high text-on-surface-variant",
                      ].join(" ")}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((insurer, i) => (
                <article
                  key={`${insurer.code}-${insurer.name}`}
                  className="ce-card-hover group flex h-full flex-col p-5"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <div className="mb-4 flex items-start gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-22 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-outline-variant/50 bg-surface-container-lowest" aria-hidden="true">
                        <Image src={insurer.image} alt={`${insurer.name} logo`} fill className="object-contain p-1.5" />
                      </div>
                      <span
                        className={[
                          "ce-chip-status shadow-sm",
                          insurer.type === "Cashless" ? "ce-chip-status-cashless" : "ce-chip-status-reimbursement",
                        ].join(" ")}
                      >
                        <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                          {insurer.type === "Cashless" ? "check_circle" : "receipt_long"}
                        </span>
                        {insurer.type}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-headline-sm text-on-surface">{insurer.name}</h3>
                  <p className="mt-1 text-body-md text-on-surface-variant">{insurer.note}</p>
                </article>
              ))}
            </div>
          ) : (
            /* ── Empty state ──────────────────────────────── */
            <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-outline-variant py-16 text-center">
              <span className="material-symbols-outlined text-5xl text-outline" aria-hidden="true">
                search_off
              </span>
              <h3 className="text-headline-sm text-on-surface">No insurers found</h3>
              <p className="max-w-md text-body-md text-on-surface-variant">
                We couldn&apos;t find &quot;{search}&quot;
                {filter !== "All" ? ` in ${filter} category` : ""}. Try a different search or contact us for help.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setSearch("");
                    setFilter("All");
                  }}
                  className="ce-button-secondary"
                >
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">restart_alt</span>
                  Reset Filters
                </button>
                <a
                  href={`${CLINIC.whatsappLink}?text=${encodeURIComponent("Hi, I'd like to check if my insurance is accepted at Harpale Clinic.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ce-button-primary"
                >
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">chat</span>
                  Ask via WhatsApp
                </a>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-8 flex justify-center">
            <Link href="/contact" className="ce-button-secondary">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">help</span>
              Can&apos;t find your insurer? Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}