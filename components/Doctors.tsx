import Image from "next/image";
import Link from "next/link";
import { DOCTORS } from "@/lib/clinic-data";
import ScrollReveal from "@/components/ScrollReveal";

export default function Doctors() {
  return (
    <div className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-8 md:px-12 md:py-12">
      <ScrollReveal as="section" className="max-w-2xl pb-8 md:pb-10">
        <h1 className="text-headline-lg-mobile text-on-surface md:text-headline-lg">Our Medical Experts</h1>
        <p className="mt-3 text-body-lg text-on-surface-variant">
          Meet our highly qualified specialists dedicated to providing compassionate and precise care for your health journey.
        </p>
      </ScrollReveal>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2" aria-label="Doctor profiles">
        {DOCTORS.map((doctor, i) => (
          <ScrollReveal key={doctor.name} variant={i % 2 === 0 ? "left" : "right"} delay={i * 100}>
            <article className="ce-card overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr]">
                <div className="relative aspect-[4/5] md:aspect-auto md:min-h-full bg-surface-variant">
                  <Image
                    src={doctor.image}
                    alt={doctor.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 220px"
                  />
                </div>

                <div className="flex flex-col justify-between gap-5 p-5 md:p-6">
                  <div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="text-headline-md text-on-surface">{doctor.name}</h2>
                        <p className="mt-1 text-label-md text-secondary">{doctor.credential}</p>
                      </div>

                      <span className="ce-chip-neutral w-fit bg-secondary-container text-on-secondary-container">
                        <span className="material-symbols-outlined text-[16px]" aria-hidden="true">{doctor.badgeIcon}</span>
                        {doctor.title}
                      </span>
                    </div>

                    <p className="mt-4 text-body-md text-on-surface-variant">{doctor.description}</p>

                    <div className="mt-5 flex flex-col gap-3">
                      <h3 className="text-label-sm uppercase tracking-wider text-on-surface-variant">
                        Specialties
                      </h3>
                      <div className="flex flex-wrap gap-2" role="list" aria-label={`${doctor.name}'s specialties`}>
                        {doctor.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            role="listitem"
                            className="rounded border border-outline-variant/50 bg-surface px-2.5 py-1 text-sm text-on-surface-variant"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/book-appointment"
                    className="ce-button-primary w-full rounded-lg py-3 text-center"
                    aria-label={`Book appointment with ${doctor.name}`}
                  >
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">calendar_month</span>
                    Book Appointment
                  </Link>
                </div>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </section>
    </div>
  );
}