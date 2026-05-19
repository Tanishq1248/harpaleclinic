import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CLINIC, DOCTORS } from "@/lib/clinic-data";
import ScrollReveal from "@/components/ScrollReveal";
import ClinicStats from "@/components/ClinicStats";
import TestimonialCarousel from "@/components/Testimonials";

const specialties = [
  {
    title: "Surgery",
    description: "State-of-the-art surgical procedures with minimally invasive techniques for faster recovery.",
    image: "/surgery.jpg",
  },
  {
    title: "Maternity",
    description: "Comprehensive maternity care from prenatal to postpartum, ensuring a safe experience.",
    image: "/maternity.jpg",
  },
  {
    title: "Homoeopathy",
    description: "Alternative holistic treatments focusing on natural remedies to stimulate healing.",
    image: "/homoeopathy.jpg",
  },
  {
    title: "Cosmetology",
    description: "Advanced aesthetic treatments and dermatological care for your natural appearance.",
    image: "/cosmetology.jpg",
  },
];

export default function Home() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="relative isolate flex min-h-[85dvh] w-full items-center justify-center overflow-hidden bg-black md:min-h-[90dvh]"
        aria-label="Welcome hero"
      >
        {/* Mobile Safari Autoplay Fix via direct HTML injection */}
        <div
          className="absolute inset-0 h-full w-full"
          dangerouslySetInnerHTML={{
            __html: `
              <video
                autoplay
                loop
                muted
                playsinline
                class="pointer-events-none h-full w-full object-cover"
              >
                <source src="/heroveo.mp4" type="video/mp4" />
              </video>
            `,
          }}
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-center gap-6 px-4 py-8 text-center md:px-12">
          <div className="flex max-w-3xl flex-col items-center gap-2">
            <span className="text-label-md uppercase tracking-wider text-secondary-container">
              Welcome to {CLINIC.name}
            </span>
            <h1 className="max-w-4xl text-headline-lg-mobile font-bold text-white md:text-[56px] md:leading-[64px]">
             HARPALE CLINIC AND GENERAL HOSPITAL

            </h1>
          </div>
          <p className="max-w-2xl text-body-lg text-white/90">
            Providing Compassionate Care Since {CLINIC.since}. Our state-of-the-art facility and dedicated specialists
            are here to guide you on your health journey with precision and empathy.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button asChild variant="secondary" className="h-auto rounded-full px-6 py-3 shadow-lg">
              <Link href="/book-appointment">
                Book Appointment
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">arrow_forward</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto rounded-full border-2 border-secondary px-6 py-3 text-secondary shadow-[0_0_20px_rgba(0,106,97,0.3)] transition-all hover:scale-105 hover:bg-secondary hover:text-white active:scale-95"
            >
              <Link href="/insurance">
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">verified_user</span>
                Check Insurance Coverage
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────── */}
      <ClinicStats />

      {/* ── Key Specialties ───────────────────────────────────── */}
      <section className="mx-auto flex w-full max-w-[1280px] flex-col gap-12 px-4 py-12 md:px-12 md:py-20" aria-label="Key specialties">
        <ScrollReveal className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="flex flex-col gap-2">
            <span className="text-label-md uppercase tracking-wider text-secondary">Our Departments</span>
            <h2 className="text-headline-lg-mobile text-on-surface md:text-headline-lg">Key Specialties</h2>
          </div>
          <Link href="/services" className="flex items-center gap-1 text-label-md text-secondary transition-colors hover:text-secondary-container">
            View All Services
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 stagger-children">
          {specialties.map((specialty, i) => (
            <ScrollReveal key={specialty.title} variant="up" delay={i * 80}>
              <Link
                href="/services"
                className="ce-card-hover group flex flex-col gap-4 p-6"
              >
                <div className="relative flex h-40 w-55 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface-container transition-transform group-hover:scale-105">
                  <Image src={specialty.image} alt={specialty.title} fill className="object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-headline-sm text-on-surface transition-colors group-hover:text-secondary">
                    {specialty.title}
                  </h3>
                  <p className="text-body-md text-on-surface-variant">{specialty.description}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Meet Our Specialists ──────────────────────────────── */}
      <section className="border-t border-outline-variant bg-surface-container-lowest py-12 md:py-20" aria-label="Our doctors">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-12 px-4 md:px-12">
          <ScrollReveal className="mx-auto flex max-w-2xl flex-col items-center gap-2 text-center">
            <span className="text-label-md uppercase tracking-wider text-secondary">Expert Team</span>
            <h2 className="text-headline-lg-mobile text-on-surface md:text-headline-lg">Meet Our Specialists</h2>
            <p className="text-body-md text-on-surface-variant">
              Our renowned medical professionals are dedicated to delivering evidence-based, compassionate care tailored
              to your specific needs.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {DOCTORS.map((doctor, i) => (
              <ScrollReveal key={doctor.name} variant={i === 0 ? "left" : "right"} delay={i * 120}>
                <article className="overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-card">
                  <div className="grid grid-cols-1 md:grid-cols-[40%_60%]">
                    <div className="relative aspect-[4/5] md:aspect-auto">
                      <Image src={doctor.image} alt={doctor.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
                    </div>
                    <div className="flex flex-col justify-center gap-4 p-6">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-headline-md text-on-surface">{doctor.name}</h3>
                        <span className="w-fit rounded bg-surface-container px-3 py-1 text-label-sm text-secondary">
                          {doctor.title}
                        </span>
                      </div>
                      <p className="text-body-md text-on-surface-variant">{doctor.description}</p>
                      <Link href="/doctors" className="mt-1 flex items-center gap-1 text-label-md text-secondary hover:underline focus-visible:underline">
                        View Full Profile
                        <span className="material-symbols-outlined text-[16px]" aria-hidden="true">chevron_right</span>
                      </Link>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────── */}
      <TestimonialCarousel />

      {/* ── Visit Our Clinic ──────────────────────────────────── */}
      <ScrollReveal as="section" className="mx-auto w-full max-w-[1280px] px-4 py-12 md:px-12 md:py-20">
        <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-[36%_64%]">
            <div className="flex flex-col gap-6 border-b border-outline-variant bg-surface-container-lowest p-6 md:border-b-0 md:border-r">
              <div className="flex flex-col gap-2">
                <h2 className="text-headline-sm text-on-surface">Visit Our Clinic</h2>
                <p className="text-body-md text-on-surface-variant">
                  Conveniently located on Sinhagad Road, Pune, with ample parking for patients.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { icon: "location_on", label: "Address", value: CLINIC.address.full },
                  { icon: "call", label: "Phone", value: CLINIC.phoneFormatted, href: `tel:${CLINIC.phone}` },
                  { icon: "schedule", label: "Hours", value: CLINIC.hours.short },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <span className="material-symbols-outlined mt-1 text-secondary" aria-hidden="true">{item.icon}</span>
                    <div className="flex flex-col">
                      <span className="text-label-md text-on-surface">{item.label}</span>
                      {item.href ? (
                        <a href={item.href} className="text-body-md text-on-surface-variant transition-colors hover:text-secondary">
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-body-md text-on-surface-variant">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[400px] bg-surface-container">
              <iframe src={CLINIC.googleMapsEmbed} className="absolute inset-0 h-full w-full border-0" allowFullScreen loading="lazy"  title="Harpale Clinic location on Google Maps"></iframe>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}