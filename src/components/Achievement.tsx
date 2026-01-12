"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const achievements = [
  {
    year: "2025",
    title: "1st Place LKS Provincial Level",
    organization: "Student Competency Competition - Graphic Design Technology",
    description:
      "Achieved 1st place in the Student Competency Competition (LKS) for Graphic Design Technology at the South Sulawesi Provincial level.",
    icon: "trophy",
  },
  {
    year: "2025",
    title: "Medalion of Excellence LKS National",
    organization: "Student Competency Competition - Graphic Design Technology",
    description:
      "Awarded Medalion of Excellence at the National LKS in Graphic Design Technology, representing South Sulawesi.",
    icon: "trophy",
  },
  {
    year: "2024",
    title: "2nd Place at ENIAC 2024",
    organization: "Graphic Design - SMAN 11 Makassar",
    description:
      "Achieved 2nd place in the Graphic Design competition at ENIAC 2024 event hosted by SMAN 11 Makassar.",
    icon: "trophy",
  },
  {
    year: "2024",
    title: "3rd Place at Electro Invention Race 2024",
    organization: "Graphic Design Technology - PNUP",
    description:
      "Achieved 3rd place in Electro Invention Race 2024 for Graphic Design Technology at the Provincial level, hosted by Politeknik Negeri Ujung Pandang.",
    icon: "trophy",
  },
  {
    year: "2023",
    title: "2nd Place at ENIAC 2023",
    organization: "Graphic Design - SMAN 11 Makassar",
    description:
      "Achieved 2nd place in the Graphic Design competition at ENIAC 2023 event hosted by SMAN 11 Makassar.",
    icon: "trophy",
  },
  {
    year: "2025",
    title: "LKS Finalist - School Level",
    organization: "SMK Telkom Makassar",
    description:
      "Selected as a finalist for LKS Graphic Design Technology at SMK Telkom Makassar, recognized as one of the top graphic design students in the school.",
    icon: "certificate",
  },
];

const iconComponents = {
  trophy: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  certificate: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
};

export default function Achievement() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section id="achievement" className="relative py-24 md:py-32" ref={ref}>
      <div className="max-w-5xl mx-auto px-8 md:px-12">
        {/* Section Header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-neutral-500 text-sm tracking-widest uppercase mb-3 block">
            Recognition & Awards
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Achievement<span className="text-neutral-500">.</span>
          </h2>
        </div>

        {/* Achievement Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`group relative p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-all duration-500 hover:bg-neutral-900/80 ${
                isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
              }`}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
            >
              {/* Year Badge */}
              <div className="absolute top-4 right-4">
                <span className="text-xs font-medium text-neutral-600 tracking-wider">
                  {achievement.year}
                </span>
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center mb-4 text-neutral-400 group-hover:text-white group-hover:border-neutral-600 transition-all duration-300">
                {iconComponents[achievement.icon as keyof typeof iconComponents]}
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-neutral-200 transition-colors">
                {achievement.title}
              </h3>
              <p className="text-neutral-500 text-sm mb-3">{achievement.organization}</p>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {achievement.description}
              </p>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div
          className={`mt-12 flex flex-wrap justify-center gap-8 md:gap-16 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white">5+</div>
            <div className="text-neutral-500 text-sm tracking-widest uppercase mt-1">
              Awards
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white">1</div>
            <div className="text-neutral-500 text-sm tracking-widest uppercase mt-1">
              National
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white">5+</div>
            <div className="text-neutral-500 text-sm tracking-widest uppercase mt-1">
              Competitions
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
