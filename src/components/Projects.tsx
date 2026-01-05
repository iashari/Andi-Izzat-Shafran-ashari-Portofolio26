"use client";

import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

const projects = [
  {
    id: 1,
    slug: "web-app-project",
    title: "E-Commerce Dashboard",
    category: "Web Development",
    description: "Modern dashboard interface with analytics, inventory management, and real-time data visualization.",
    color: "from-white/5 to-neutral-400/15",
    tags: ["React", "Next.js", "Tailwind"],
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
      </svg>
    ),
  },
  {
    id: 2,
    slug: "brand-identity",
    title: "Brand Identity Design",
    category: "Graphic Design",
    description: "Complete brand identity package including logo, color palette, typography, and brand guidelines.",
    color: "from-neutral-400/10 to-neutral-500/20",
    tags: ["Branding", "Logo", "Identity"],
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    id: 3,
    slug: "mobile-app-design",
    title: "Mobile App UI/UX",
    category: "UI/UX Design",
    description: "User-centered mobile app design with intuitive navigation, clean interface, and seamless user experience.",
    color: "from-neutral-500/10 to-neutral-600/20",
    tags: ["Figma", "Prototype", "Mobile"],
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 4,
    slug: "portfolio-website",
    title: "Portfolio Website",
    category: "Web Development",
    description: "This portfolio website showcasing modern web development with animations and responsive design.",
    color: "from-neutral-600/10 to-neutral-700/20",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
];

const categories = ["All", "Web Development", "UI/UX Design", "Graphic Design"];

export default function Projects() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const { theme } = useTheme();

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-24 md:py-32" ref={ref}>
      <div className="max-w-5xl mx-auto px-8 md:px-12">
        {/* Section Header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-neutral-500 text-sm tracking-widest uppercase mb-3 block">
            My Work
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Projects<span className="text-neutral-500">.</span>
          </h2>
        </div>

        {/* Category Filter */}
        <div
          className={`flex flex-wrap gap-3 mb-12 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="px-5 py-2 rounded-full text-sm tracking-wide transition-all duration-300 border"
              style={{
                backgroundColor: activeCategory === category
                  ? (theme === "dark" ? "#ffffff" : "#171717")
                  : (theme === "dark" ? "#171717" : "#ffffff"),
                color: activeCategory === category
                  ? (theme === "dark" ? "#171717" : "#ffffff")
                  : (theme === "dark" ? "#a3a3a3" : "#525252"),
                borderColor: activeCategory === category
                  ? "transparent"
                  : (theme === "dark" ? "#262626" : "#e5e5e5"),
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-700 block ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? `${(index + 2) * 100}ms` : "0ms" }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Card */}
              <div
                className="relative aspect-[4/3] rounded-2xl overflow-hidden transition-colors border"
                style={{
                  backgroundColor: theme === "dark" ? "#171717" : "#ffffff",
                  borderColor: theme === "dark" ? "#262626" : "#e5e5e5",
                }}
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>

                {/* Center Icon */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                  style={{ color: theme === "dark" ? "#ffffff" : "#171717" }}
                >
                  {project.icon}
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  {/* Top - Category */}
                  <div className="flex justify-between items-start">
                    <span
                      className="text-sm tracking-widest uppercase transition-colors"
                      style={{ color: theme === "dark" ? "#737373" : "#737373" }}
                    >
                      {project.category}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transform transition-all duration-300 border ${
                        hoveredProject === project.id
                          ? "rotate-0 scale-100 opacity-100"
                          : "-rotate-45 scale-75 opacity-0"
                      }`}
                      style={{
                        backgroundColor: theme === "dark" ? "#262626" : "#f5f5f5",
                        borderColor: theme === "dark" ? "#404040" : "#d4d4d4",
                      }}
                    >
                      <svg
                        className="w-5 h-5"
                        style={{ color: theme === "dark" ? "#ffffff" : "#171717" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom - Info */}
                  <div>
                    <h3
                      className="text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform duration-300"
                      style={{ color: theme === "dark" ? "#ffffff" : "#171717" }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`mb-4 transition-all duration-300 ${
                        hoveredProject === project.id
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                      style={{ color: theme === "dark" ? "#a3a3a3" : "#525252" }}
                    >
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-3 py-1 rounded-full text-xs transition-all duration-300 ${
                            hoveredProject === project.id
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-2"
                          }`}
                          style={{
                            backgroundColor: theme === "dark" ? "rgba(38, 38, 38, 0.8)" : "rgba(229, 229, 229, 0.8)",
                            color: theme === "dark" ? "#a3a3a3" : "#525252",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover border glow */}
                <div
                  className="absolute inset-0 rounded-2xl border opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ borderColor: theme === "dark" ? "#404040" : "#d4d4d4" }}
                ></div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border transition-all duration-300"
            style={{
              backgroundColor: theme === "dark" ? "#171717" : "#ffffff",
              borderColor: theme === "dark" ? "#262626" : "#e5e5e5",
              color: theme === "dark" ? "#ffffff" : "#171717",
            }}
          >
            <span>View All Projects</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
