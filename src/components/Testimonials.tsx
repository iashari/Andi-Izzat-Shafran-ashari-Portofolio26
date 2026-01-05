"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    content:
      "Working with Izzat was an absolute pleasure. His attention to detail and creative vision transformed our brand identity completely.",
    avatar: "S",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager, InnovateCo",
    content:
      "The website he designed exceeded all our expectations. Fast, beautiful, and user-friendly. Highly recommended!",
    avatar: "M",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Founder, DesignHub",
    content:
      "Izzat has a unique ability to understand what you need before you even explain it. Truly a talented designer and developer.",
    avatar: "E",
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Marketing Director",
    content:
      "Professional, creative, and incredibly skilled. The UI/UX work delivered was beyond what we imagined possible.",
    avatar: "D",
  },
];

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section id="testimonials" className="relative py-24 md:py-32" ref={ref}>
      {/* Section Header */}
      <div className="max-w-5xl mx-auto px-8 md:px-12">
        <div
          className={`mb-12 text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-neutral-500 text-sm tracking-widest uppercase mb-3 block">
            What People Say
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Testimonials<span className="text-neutral-500">.</span>
          </h2>
        </div>
      </div>

      {/* Testimonials Marquee - Full Width */}
      <div
        className={`relative w-full overflow-hidden transition-opacity duration-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling track */}
        <div className="flex w-max animate-scroll-left hover:[animation-play-state:paused]">
          {/* First set */}
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="px-3">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {testimonials.map((testimonial) => (
            <div key={`dup-${testimonial.id}`} className="px-3">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-8 md:px-12">
        <div
          className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {[
            { value: "50+", label: "Happy Clients" },
            { value: "100+", label: "Projects Done" },
            { value: "3+", label: "Years Experience" },
            { value: "99%", label: "Client Satisfaction" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center group transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? `${index * 100 + 400}ms` : "0ms" }}
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-neutral-500 text-sm tracking-widest uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) {
  return (
    <div className="w-80 md:w-96 p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 group">
      {/* Quote icon */}
      <div className="mb-4 text-neutral-700 group-hover:text-neutral-500 transition-colors">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Content */}
      <p className="text-neutral-300 leading-relaxed mb-6 group-hover:text-white transition-colors">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center text-white font-semibold group-hover:from-neutral-600 group-hover:to-neutral-700 transition-all duration-300">
          {testimonial.avatar}
        </div>

        {/* Info */}
        <div>
          <div className="text-white font-medium">{testimonial.name}</div>
          <div className="text-neutral-500 text-sm">{testimonial.role}</div>
        </div>
      </div>
    </div>
  );
}
