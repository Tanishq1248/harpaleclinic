"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

/* ─── Gallery Data ──────────────────────────────────────── */
interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  label: string;
  category: string;
  span?: "tall" | "wide" | "normal";
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    src: "/beds.jpeg",
    alt: "ECG facility at Harpale Clinic",
    label: "ECG Facility",
    category: "Facilities",
    span: "wide",
  },
  {
    id: 2,
    src: "/liftfloor.jpeg",
    alt: "Gastroenterology department",
    label: "Gastroenterology",
    category: "Departments",
    span: "tall",
  },
  {
    id: 3,
    src: "/waitingarea.jpeg",
    alt: "Pathology laboratory",
    label: "Pathology Lab",
    category: "Facilities",
  },
  {
    id: 4,
    src: "/surgery.jpg",
    alt: "Surgery department",
    label: "Surgery Suite",
    category: "Departments",
    span: "tall",
  },
  {
    id: 5,
    src: "/maternity.jpg",
    alt: "Maternity care ward",
    label: "Maternity Care",
    category: "Departments",
  },
  {
    id: 6,
    src: "/xrayfacility.jpg",
    alt: "X-ray facility",
    label: "X-Ray Facility",
    category: "Facilities",
  },
  {
    id: 7,
    src: "/pediatrics.jpg",
    alt: "Pediatrics care",
    label: "Pediatrics",
    category: "Departments",
  },
  {
    id: 8,
    src: "/homoeopathy.jpg",
    alt: "Homoeopathy treatment",
    label: "Homoeopathy",
    category: "Departments",
    span: "wide",
  },
  {
    id: 9,
    src: "/laparoscopy.jpg",
    alt: "Laparoscopy procedure",
    label: "Laparoscopy",
    category: "Procedures",
  },
  {
    id: 10,
    src: "/cosmetology.jpg",
    alt: "Cosmetology treatment",
    label: "Cosmetology",
    category: "Departments",
  },
];

const CATEGORIES = ["All", "Facilities", "Departments", "Procedures"];

/* ─── Lightbox ───────────────────────────────────────────── */
function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(14,27,38,0.92)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
    >
      {/* Close */}
      <button
        className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Prev */}
      <button
        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Next */}
      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Image container */}
      <div
        className="relative mx-16 flex max-h-[85dvh] max-w-[90vw] flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "lightboxFadeIn 0.25s ease-out both" }}
      >
        <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl" style={{ maxHeight: "75dvh" }}>
          <img
            src={item.src}
            alt={item.alt}
            className="block max-h-[75dvh] max-w-full object-contain"
            style={{ display: "block" }}
          />
        </div>
        {/* Caption */}
        <div className="flex items-center gap-3">
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{ background: "rgba(11,110,139,0.9)", color: "#fff", fontFamily: "var(--font-sans), sans-serif" }}
          >
            {item.category}
          </span>
          <span className="text-base font-semibold text-white" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
            {item.label}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes lightboxFadeIn {
          from { opacity: 0; transform: scale(0.94) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ─── Gallery Card ───────────────────────────────────────── */
function GalleryCard({
  item,
  onClick,
  index,
}: {
  item: GalleryItem;
  onClick: () => void;
  index: number;
}) {
  const [loaded, setLoaded] = useState(false);

  const colSpan =
    item.span === "wide" ? "md:col-span-2" : "";
  const rowSpan =
    item.span === "tall" ? "md:row-span-2" : "";

  return (
    <div
      className={`gallery-card relative overflow-hidden rounded-2xl bg-surface-container cursor-pointer group ${colSpan} ${rowSpan}`}
      style={{
        aspectRatio: item.span === "tall" ? undefined : "4/3",
        minHeight: item.span === "tall" ? "360px" : "220px",
        animationDelay: `${index * 60}ms`,
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View ${item.label}`}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {/* Skeleton shimmer */}
      {!loaded && (
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: "linear-gradient(90deg, #e4edf7 25%, #d8e6f2 50%, #e4edf7 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        />
      )}

      <Image
        src={item.src}
        alt={item.alt}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-108"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onLoad={() => setLoaded(true)}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(to top, rgba(14,27,38,0.82) 0%, rgba(14,27,38,0.1) 60%, transparent 100%)",
        }}
      >
        <span
          className="mb-1 w-fit rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
          style={{ background: "rgba(11,110,139,0.85)", color: "#fff", fontFamily: "var(--font-sans), sans-serif" }}
        >
          {item.category}
        </span>
        <p
          className="text-sm font-semibold text-white"
          style={{ fontFamily: "var(--font-sans), sans-serif" }}
        >
          {item.label}
        </p>
      </div>

      {/* Zoom icon */}
      <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0b6e8b" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="11" y1="8" x2="11" y2="14" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </div>
    </div>
  );
}

/* ─── Main Gallery Component ─────────────────────────────── */
export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + filtered.length) % filtered.length
    );
  }, [filtered.length]);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % filtered.length
    );
  }, [filtered.length]);

  return (
    <section
      className="w-full py-16 md:py-24"
      style={{ background: "linear-gradient(160deg, #f0f7fb 0%, #e8f2f9 50%, #f4f8fc 100%)" }}
      aria-label="Clinic gallery"
    >
      <div className="mx-auto max-w-[1280px] px-4 md:px-12">
        {/* Header */}
        <ScrollReveal className="mb-12 flex flex-col items-center text-center gap-4">
          <span
            className="inline-flex items-center gap-2 rounded-full border border-outline-variant bg-surface-container-lowest px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary shadow-sm"
            style={{ fontFamily: "var(--font-sans), sans-serif" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            Our Clinic Gallery
          </span>

          <h2
            className="text-4xl md:text-5xl text-primary leading-tight"
            style={{ fontFamily: "var(--font-heading), serif" }}
          >
            A Glimpse Inside<br className="hidden md:block" /> Harpale Clinic
          </h2>
          <p
            className="max-w-lg text-[15px] text-on-surface-variant"
            style={{ fontFamily: "var(--font-sans), sans-serif" }}
          >
            Explore our world-class facilities, modern departments, and the compassionate environment we've built for every patient.
          </p>
        </ScrollReveal>

        {/* Category Filter */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200"
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                background: activeCategory === cat ? "var(--primary)" : "var(--surface-container-lowest)",
                color: activeCategory === cat ? "#fff" : "var(--on-surface-variant)",
                border: activeCategory === cat ? "1.5px solid var(--primary)" : "1.5px solid var(--outline-variant)",
                boxShadow: activeCategory === cat ? "0 4px 16px rgba(11,110,139,0.22)" : "0 1px 4px rgba(11,110,139,0.07)",
                transform: activeCategory === cat ? "translateY(-1px)" : "none",
              }}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 stagger-children"
          style={{ gridAutoRows: "minmax(220px, auto)" }}
        >
          {filtered.map((item, i) => (
            <ScrollReveal key={item.id} variant="up" delay={i * 60}>
              <GalleryCard
                item={item}
                onClick={() => openLightbox(i)}
                index={i}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal className="mt-12 flex justify-center">
          <div
            className="flex items-center gap-3 rounded-2xl border border-outline-variant bg-surface-container-lowest px-6 py-4 shadow-sm"
            style={{ fontFamily: "var(--font-sans), sans-serif" }}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ background: "rgba(11,110,139,0.1)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0b6e8b" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface">Visit us in person</p>
              <p className="text-xs text-on-surface-variant">Sinhagad Road, Pune — Mon to Sat, 9 AM – 9 PM</p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          item={filtered[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .gallery-card {
          animation: galleryCardIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes galleryCardIn {
          from { opacity: 0; transform: scale(0.95) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .group:hover .group-hover\\:scale-108 {
          transform: scale(1.08);
        }
      `}</style>
    </section>
  );
}
