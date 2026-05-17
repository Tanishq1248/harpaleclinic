"use client";

import { useEffect, useRef, type ReactNode, createElement } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in ms */
  delay?: number;
  /** Animation variant */
  variant?: "up" | "left" | "right" | "scale";
  /** IntersectionObserver threshold (0–1) */
  threshold?: number;
  /** HTML tag to render */
  as?: "div" | "section" | "article" | "aside" | "span";
}

/**
 * Wraps children in an element that fades-in when scrolled into view.
 * Uses IntersectionObserver for performance. Falls back gracefully
 * for users with `prefers-reduced-motion`.
 */
export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
  threshold = 0.15,
  as = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect user preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("reveal-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-visible");
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const variantClass = {
    up: "reveal-up",
    left: "reveal-left",
    right: "reveal-right",
    scale: "reveal-scale",
  }[variant];

  return createElement(
    as,
    {
      ref,
      className: `${variantClass} ${className}`.trim(),
      style: delay ? { transitionDelay: `${delay}ms` } : undefined,
    },
    children,
  );
}
