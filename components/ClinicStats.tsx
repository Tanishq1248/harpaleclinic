"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  icon: React.ReactNode;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sublabel: string;
  animate: boolean;
}

function CalendarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="3" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <rect x="7" y="13" width="3" height="3" rx="0.5" />
      <rect x="11" y="13" width="3" height="3" rx="0.5" />
    </svg>
  );
}

function BedIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7v10" />
      <path d="M21 17V9a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v8" />
      <path d="M3 17h18" />
      <path d="M3 13h4" />
      <circle cx="10.5" cy="11" r="1" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3L4 7v5c0 5.25 3.5 10.15 8 11.5C16.5 22.15 20 17.25 20 12V7L12 3z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const steps = Math.ceil(duration / 30);
    const increment = target / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [active, target, duration]);

  return count;
}

function StatCard({
  stat,
  index,
  isVisible,
}: {
  stat: Stat;
  index: number;
  isVisible: boolean;
}) {
  const [countActive, setCountActive] = useState(false);
  const count = useCountUp(stat.value, 900, countActive && stat.animate);

  useEffect(() => {
    if (isVisible) {
      const t = setTimeout(() => setCountActive(true), 300 + index * 150);
      return () => clearTimeout(t);
    }
  }, [isVisible, index]);

  const displayValue = stat.animate && countActive ? count : stat.value;

  return (
    <div
      className="stat-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
      }}
    >
      {/* Pulse ring */}
      <div
        className="pulse-ring"
        style={{ animationDelay: `${0.7 + index * 0.15}s` }}
      />

      <div className="icon-box">
        {stat.icon}
      </div>

      <div className="stat-number">
        {stat.prefix}
        {displayValue}
        {stat.suffix}
      </div>

      <p className="stat-label">{stat.label}</p>
      <p className="stat-sub">{stat.sublabel}</p>
    </div>
  );
}

const STATS: Stat[] = [
  {
    icon: <CalendarIcon />,
    value: 2000,
    prefix: "Since ",
    label: "Established",
    sublabel: "Decades of trusted care",
    animate: false,
  },
  {
    icon: <BedIcon />,
    value: 15,
    suffix: " Beds",
    label: "Capacity",
    sublabel: "State-of-the-art facilities",
    animate: true,
  },
  {
    icon: <ShieldIcon />,
    value: 22,
    suffix: " Insurers",
    label: "Network",
    sublabel: "Wide network coverage",
    animate: true,
  },
];

export default function ClinicStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .clinic-stats-section {
          width: 100%;
          padding: 4rem 1.5rem;
          background: #f0f7f5;
          font-family: var(--font-dm-sans), sans-serif;
        }

        .stats-grid {
          display: flex;
          align-items: stretch;
          justify-content: center;
          max-width: 860px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #b8c9d4;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(11, 110, 139, 0.07);
        }

        .stat-card {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 2rem 2.5rem;
          position: relative;
          border-right: 1px solid #b8c9d4;
          text-align: center;
          transition: background 0.25s ease;
        }

        .stat-card:last-child {
          border-right: none;
        }

        .stat-card:hover {
          background: #eef3fa;
        }

        .pulse-ring {
          position: absolute;
          top: 2.4rem;
          left: 50%;
          transform: translateX(-50%);
          width: 52px;
          height: 52px;
          border-radius: 14px;
          border: 2px solid #0b6e8b;
          opacity: 0;
          animation: pulseOut 1.3s ease-out forwards;
          pointer-events: none;
        }

        @keyframes pulseOut {
          0% { opacity: 0.55; transform: translateX(-50%) scale(1); }
          100% { opacity: 0; transform: translateX(-50%) scale(1.7); }
        }

        .icon-box {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: #b3e8f8;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #004f66;
          margin-bottom: 1.25rem;
          position: relative;
          z-index: 1;
        }

        .stat-number {
          font-family: var(--font-heading), serif;
          font-size: 2.25rem;
          color: #0b6e8b;
          line-height: 1;
          margin-bottom: 0.4rem;
          letter-spacing: -0.5px;
        }

        .stat-label {
          font-size: 0.7rem;
          font-weight: 600;
          color: #0b6e8b;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0 0 0.3rem 0;
        }

        .stat-sub {
          font-size: 0.9rem;
          color: #3a4a55;
          font-weight: 400;
          margin: 0;
        }

        @media (max-width: 640px) {
          .stats-grid {
            flex-direction: column;
          }
          .stat-card {
            border-right: none;
            border-bottom: 1px solid #b8c9d4;
            padding: 2rem 1.5rem;
          }
          .stat-card:last-child {
            border-bottom: none;
          }
        }
      `}</style>

      <section className="clinic-stats-section" aria-label="Clinic highlights">
        <div className="stats-grid" ref={ref}>
          {STATS.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} isVisible={isVisible} />
          ))}
        </div>
      </section>
    </>
  );
}
