"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const experiences = [
  {
    year: "2024",
    title: "Frontend Developer Intern",
    company: "Ashari Tech",
    description:
      "Working on modern web applications using React and Next.js. Collaborating with design team to implement pixel-perfect UIs.",
    skills: ["React", "Next.js", "TypeScript"],
    type: "work",
  },
  {
    year: "2023",
    title: "Freelance Graphic Designer",
    company: "Self-employed",
    description:
      "Created brand identities, logos, and marketing materials for various clients. Developed strong client communication skills.",
    skills: ["Figma", "Illustrator", "Photoshop"],
    type: "work",
  },
  {
    year: "2022",
    title: "UI/UX Design Course",
    company: "Online Certification",
    description:
      "Completed comprehensive UI/UX design program covering user research, wireframing, prototyping, and design systems.",
    skills: ["User Research", "Prototyping", "Design Systems"],
    type: "education",
  },
  {
    year: "2021",
    title: "Started Learning Web Development",
    company: "Self-taught",
    description:
      "Began journey into web development, learning HTML, CSS, JavaScript, and modern frameworks through online resources.",
    skills: ["HTML", "CSS", "JavaScript"],
    type: "education",
  },
];

export default function Experience() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section id="experience" className="relative py-24 md:py-32" ref={ref}>
      <div className="max-w-5xl mx-auto px-8 md:px-12">
        {/* Section Header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-neutral-500 text-sm tracking-widest uppercase mb-3 block">
            My Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Experience<span className="text-neutral-500">.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-neutral-800 transform md:-translate-x-1/2">
            {/* Animated glow on line */}
            <div
              className={`absolute top-0 left-0 w-full bg-gradient-to-b from-white via-white to-transparent transition-all duration-1000 ${
                isVisible ? "h-full opacity-20" : "h-0 opacity-0"
              }`}
            ></div>
          </div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-16 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                style={{ transitionDelay: isVisible ? `${index * 150}ms` : "0ms" }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 transform -translate-x-1/2 md:-translate-x-1/2">
                  <div className="w-full h-full rounded-full bg-neutral-900 border-2 border-neutral-600 group-hover:border-white transition-colors">
                    {/* Inner dot */}
                    <div
                      className={`absolute inset-1 rounded-full transition-all duration-500 ${
                        exp.type === "work" ? "bg-white" : "bg-neutral-600"
                      } ${isVisible ? "scale-100" : "scale-0"}`}
                      style={{ transitionDelay: isVisible ? `${index * 150 + 200}ms` : "0ms" }}
                    ></div>
                  </div>
                </div>

                {/* Year */}
                <div
                  className={`md:w-1/2 ${
                    index % 2 === 0 ? "md:text-left md:pl-16" : "md:text-right md:pr-16"
                  } pl-8 md:pl-0`}
                >
                  <span className="text-2xl font-bold text-neutral-600">{exp.year}</span>
                </div>

                {/* Content */}
                <div
                  className={`md:w-1/2 ${
                    index % 2 === 0 ? "md:text-right md:pr-16" : "md:text-left md:pl-16"
                  } pl-8 md:pl-0`}
                >
                  <div className="group">
                    {/* Type Badge */}
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs tracking-wider uppercase mb-3 ${
                        exp.type === "work"
                          ? "bg-white/10 text-white"
                          : "bg-neutral-800 text-neutral-400"
                      }`}
                    >
                      {exp.type}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-neutral-200 transition-colors">
                      {exp.title}
                    </h3>

                    {/* Company */}
                    <p className="text-neutral-500 mb-3">{exp.company}</p>

                    {/* Description */}
                    <p className="text-neutral-400 leading-relaxed mb-4">{exp.description}</p>

                    {/* Skills */}
                    <div
                      className={`flex flex-wrap gap-2 ${
                        index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                      }`}
                    >
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-500 text-sm hover:border-neutral-700 hover:text-neutral-300 transition-all duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
