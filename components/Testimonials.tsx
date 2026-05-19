"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─── Types ─────────────────────────────────────────── */
interface Testimonial {
  id: number;
  name: string;
  initials: string;
  avatarColor: string;
  date: string;
  rating: number;
  text: string;
  treatment: string;
}

/* ─── Data ───────────────────────────────────────────── */
const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    initials: "PS",
    avatarColor: "#1a73e8",
    date: "2 weeks ago",
    rating: 5,
    text: "Absolutely wonderful experience. The staff was incredibly warm and the doctor explained every step of my root canal clearly. I was nervous coming in, but left feeling completely at ease. The clinic is spotless and modern.",
    treatment: "Root Canal Treatment",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    initials: "RM",
    avatarColor: "#ea4335",
    date: "1 month ago",
    rating: 5,
    text: "Best dental clinic in Pune, no question. Got my braces done here and the entire 18-month journey was smooth. Regular check-ins, great follow-up, and the results speak for themselves. Highly recommend to anyone!",
    treatment: "Orthodontic Braces",
  },
  {
    id: 3,
    name: "Sneha Kulkarni",
    initials: "SK",
    avatarColor: "#34a853",
    date: "3 weeks ago",
    rating: 5,
    text: "I had severe tooth sensitivity and was dreading the visit. The doctor was so patient and gentle. The treatment was quick, effective, and surprisingly painless. Already booked my family's appointments here.",
    treatment: "Sensitivity Treatment",
  },
  {
    id: 4,
    name: "Amit Desai",
    initials: "AD",
    avatarColor: "#fbbc04",
    date: "5 days ago",
    rating: 5,
    text: "Came in for teeth whitening before my wedding — the results were stunning. The team worked around my schedule and made sure I was comfortable throughout. Worth every rupee. Thank you so much!",
    treatment: "Teeth Whitening",
  },
  {
    id: 5,
    name: "Kavita Joshi",
    initials: "KJ",
    avatarColor: "#9334e6",
    date: "2 months ago",
    rating: 4,
    text: "Very professional setup. My kids actually enjoy coming here now — the staff has a great way with children. The waiting area is clean and comfortable. Minor wait times but completely worth it for the quality of care.",
    treatment: "Pediatric Dentistry",
  },
  {
    id: 6,
    name: "Vikram Nair",
    initials: "VN",
    avatarColor: "#0f9d58",
    date: "3 months ago",
    rating: 5,
    text: "Got dental implants done after years of hesitation. The doctor walked me through the entire process with so much patience. Recovery was smooth and the implants look completely natural. Life-changing procedure.",
    treatment: "Dental Implants",
  },
];

/* ─── Google Star ────────────────────────────────────── */
function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "#fbbc04" : "#e0e0e0"}
      className="inline-block"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

/* ─── Google G Logo ──────────────────────────────────── */
function GoogleG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

/* ─── Verified Badge ─────────────────────────────────── */
function GoogleVerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#dadce0] px-2.5 py-1 text-[11px] font-medium text-[#5f6368] shadow-sm select-none">
      <GoogleG />
      <span>Google Review</span>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="#1a73e8" aria-label="Verified">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
    </span>
  );
}

/* ─── Gmail Avatar ───────────────────────────────────── */
function GmailAvatar({ initials, color, size = 48 }: { initials: string; color: string; size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center font-semibold text-white select-none flex-shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        fontSize: size * 0.36,
        fontFamily: "'Google Sans', 'DM Sans', var(--font-sans), sans-serif",
        letterSpacing: "0.02em",
      }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

/* ─── Individual Card ────────────────────────────────── */
function TestimonialCard({
  testimonial,
  isActive,
}: {
  testimonial: Testimonial;
  isActive: boolean;
}) {
  return (
    <div
      className={`
        relative flex flex-col gap-4 rounded-2xl p-6 bg-white
        transition-all duration-500 ease-out h-full
        ${isActive
          ? "shadow-[0_8px_40px_rgba(15,92,71,0.13)] scale-100 opacity-100"
          : "shadow-md scale-95 opacity-60"}
      `}
    >
      {/* Top row: avatar + name + badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <GmailAvatar initials={testimonial.initials} color={testimonial.avatarColor} size={46} />
          <div>
            <p className="text-[15px] font-semibold text-[#1a1a1a] leading-tight" style={{ fontFamily: "var(--font-sans), 'DM Sans', sans-serif" }}>
              {testimonial.name}
            </p>
            <p className="text-[12px] text-[#80968f] mt-0.5">{testimonial.date}</p>
          </div>
        </div>
        <GoogleVerifiedBadge />
      </div>

      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} filled={i < testimonial.rating} />
        ))}
      </div>

      {/* Review text */}
      <p
        className="text-[14.5px] leading-relaxed text-[#3c4a45] flex-1"
        style={{ fontFamily: "var(--font-sans), 'DM Sans', sans-serif" }}
      >
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Treatment tag */}
      <div className="flex items-center gap-2 pt-1 border-t border-[#edf2f0]">
        <span className="w-2 h-2 rounded-full bg-[#0f7c60] flex-shrink-0" />
        <span className="text-[12px] font-medium text-[#0f7c60]" style={{ fontFamily: "var(--font-sans), 'DM Sans', sans-serif" }}>
          {testimonial.treatment}
        </span>
      </div>
    </div>
  );
}

/* ─── Dot indicator ──────────────────────────────────── */
function Dot({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Go to slide"
      className={`rounded-full transition-all duration-300 ${
        active
          ? "bg-[#0f7c60] w-6 h-2"
          : "bg-[#c5ddd7] w-2 h-2 hover:bg-[#0f7c60]/50"
      }`}
    />
  );
}

/* ─── Main Carousel ──────────────────────────────────── */
export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = TESTIMONIALS.length;

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent((index + total) % total);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating, total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(next, 4500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next, isPaused]);

  // Swipe support
  const touchStart = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStart.current = null;
  };

  // Visible indices: prev, current, next
  const indices = [
    (current - 1 + total) % total,
    current,
    (current + 1) % total,
  ];

  return (
    <section
      className="w-full py-20 px-4"
      style={{ background: "linear-gradient(160deg, #f0f7f5 0%, #e8f5f1 100%)" }}
      aria-label="Patient testimonials"
    >
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 rounded-full bg-white border border-[#c5ddd7] px-4 py-1.5 mb-5 shadow-sm">
          <GoogleG />
          <span className="text-[13px] font-medium text-[#5f6368]" style={{ fontFamily: "var(--font-sans), 'DM Sans', sans-serif" }}>
            Verified Google Reviews
          </span>
        </div>

        <h2
          className="text-4xl text-[#0d5c47] mb-3 leading-tight"
          style={{ fontFamily: "var(--font-sans), 'DM Serif Display', serif" }}
        >
          What Our Patients Say
        </h2>
        <p className="text-[15px] text-[#5a8e82] max-w-md mx-auto" style={{ fontFamily: "var(--font-sans), 'DM Sans', sans-serif" }}>
          Real experiences from real patients — every review is Google verified.
        </p>

        {/* Aggregate rating */}
        <div className="inline-flex items-center gap-3 mt-6 bg-white rounded-xl px-5 py-3 shadow-sm border border-[#edf2f0]">
          <span className="text-3xl font-bold text-[#0d5c47]" style={{ fontFamily: "var(--font-sans), 'DM Serif Display', serif" }}>
            5.0
          </span>
          <div>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} filled />)}
            </div>
            <p className="text-[11px] text-[#80968f] mt-0.5">Based on {total} reviews</p>
          </div>
          <div className="w-px h-8 bg-[#edf2f0]" />
          <GoogleG />
        </div>
      </div>

      {/* Carousel */}
      <div
        className="max-w-5xl mx-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Cards — desktop 3-up, mobile 1-up */}
        <div className="hidden md:grid grid-cols-3 gap-5 items-stretch">
          {indices.map((idx, pos) => (
            <TestimonialCard
              key={TESTIMONIALS[idx].id}
              testimonial={TESTIMONIALS[idx]}
              isActive={pos === 1}
            />
          ))}
        </div>

        {/* Mobile single card */}
        <div className="md:hidden">
          <TestimonialCard
            testimonial={TESTIMONIALS[current]}
            isActive
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-5 mt-10">
          {/* Prev */}
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-white border border-[#c5ddd7] flex items-center justify-center text-[#0f7c60] hover:bg-[#0f7c60] hover:text-white hover:border-[#0f7c60] transition-all duration-200 shadow-sm"
            aria-label="Previous review"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <Dot key={i} active={i === current} onClick={() => goTo(i)} />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-white border border-[#c5ddd7] flex items-center justify-center text-[#0f7c60] hover:bg-[#0f7c60] hover:text-white hover:border-[#0f7c60] transition-all duration-200 shadow-sm"
            aria-label="Next review"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Auto-play progress bar */}
        {!isPaused && (
          <div className="mt-6 max-w-xs mx-auto h-0.5 bg-[#c5ddd7] rounded-full overflow-hidden">
            <div
              key={current}
              className="h-full bg-[#0f7c60] rounded-full"
              style={{
                animation: "progressBar 4.5s linear forwards",
              }}
            />
          </div>
        )}
      </div>

      <style>{`
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
