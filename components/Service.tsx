import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/lib/clinic-data";
import ScrollReveal from "@/components/ScrollReveal";

export default function Service() {
  return (
    <div className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-12 md:px-12 md:py-16">
      <ScrollReveal as="section" className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
        <h1 className="mb-4 text-headline-lg-mobile text-on-surface md:text-headline-lg">Our Medical Specialties</h1>
        <p className="text-body-lg text-on-surface-variant">
          Comprehensive, compassionate care across a wide range of disciplines. Explore our specialized services
          designed to support your health journey with clinical precision.
        </p>
      </ScrollReveal>

      <section aria-label="All services">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.title} variant="scale" delay={i * 50}>
              <article className="ce-card-hover group flex flex-col gap-4 p-6">
                {/* Image Container (Edge-to-edge at top) */}
                <div className="relative -mx-6 -mt-6 mb-2 h-56 overflow-hidden rounded-t-[inherit] bg-surface-container-lowest">
                  <Image 
                    src={service.image} 
                    alt={`${service.title} service`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Floating Icon Badge */}
                  <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-white shadow-lg" aria-hidden="true">
                    <span className="material-symbols-outlined">{service.icon}</span>
                  </div>
                </div>

                <h2 className="text-headline-sm text-on-surface">{service.title}</h2>
                <p className="flex-1 text-body-md text-on-surface-variant">{service.description}</p>

                <Link
                  href="/book-appointment"
                  className="ce-button-secondary mt-auto text-center"
                  aria-label={`Book ${service.title} appointment`}
                >
                  Book Now
                </Link>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}