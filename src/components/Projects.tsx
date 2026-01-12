"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

const projects = [
  {
    id: 1,
    slug: "seeds-movie-website",
    title: "SeEDS Movie Website",
    category: "Web Design",
    description: "Mood-based movie streaming website that recommends films based on how you feel. Features mood selection, watchlists, and personalized recommendations.",
    tags: ["Web Design", "Streaming", "UI"],
    image: "/project footage/Car rental project school 2/Seeds movie website.png",
  },
  {
    id: 2,
    slug: "kanesia-ecommerce",
    title: "Kanesia E-Commerce",
    category: "UI/UX Design",
    description: "Mobile e-commerce app for handmade fabric crafts from Makassar, Indonesia. Features product categories, recommendations, and seamless shopping experience.",
    tags: ["Figma", "E-Commerce", "Mobile"],
    image: "/project footage/Car rental project school 2/Kanesia e-com.png",
  },
  {
    id: 3,
    slug: "lumiere-photography",
    title: "Lumière Photography",
    category: "Web Design",
    description: "Professional photography services website with gallery showcase, testimonials, and elegant dark theme design.",
    tags: ["Web Design", "Photography", "UI"],
    image: "/project footage/Car rental project school 2/lumiere photography.png",
  },
  {
    id: 4,
    slug: "sporty-car-rentals",
    title: "Sporty Car Rentals",
    category: "Web Design",
    description: "Sports car rental website featuring luxury vehicles with clean teal and white design.",
    tags: ["Web Design", "Automotive", "UI"],
    image: "/project footage/Car rental project school 2/Rent Car Project v1.png",
  },
  {
    id: 5,
    slug: "sports-car-rental-v2",
    title: "Sports Car Rental v2",
    category: "Web Design",
    description: "Modern dark-themed car rental website for sports cars in Indonesia with sleek interface and premium feel.",
    tags: ["Web Design", "Dark Theme", "UI"],
    image: "/project footage/Car rental project school 2/rent car project v2.png",
  },
];

const categories = ["All", "UI/UX Design", "Web Design"];

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
          className={`mb-12 transition-[transform,opacity] duration-700 ${
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
          className={`flex flex-wrap gap-3 mb-12 transition-[transform,opacity] duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              aria-label={`Filter projects by ${category}`}
              aria-pressed={activeCategory === category}
              className="px-5 py-2 rounded-full text-sm tracking-wide transition-[transform,opacity,background-color,border-color] duration-300 border"
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
              className={`group relative rounded-2xl overflow-hidden transition-[transform,opacity] duration-700 block ${
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
                {/* Project Image */}
                <Image
                  src={project.image}
                  alt={`${project.title} - ${project.category} project by Izzat`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: theme === "dark"
                      ? "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)"
                      : "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)",
                  }}
                />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  {/* Top - Category */}
                  <div className="flex justify-between items-start">
                    <span className="text-sm tracking-widest uppercase text-white/70">
                      {project.category}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transform transition-[transform,opacity,background-color,border-color] duration-300 bg-white/20 backdrop-blur-sm ${
                        hoveredProject === project.id
                          ? "rotate-0 scale-100 opacity-100"
                          : "-rotate-45 scale-75 opacity-0"
                      }`}
                    >
                      <svg
                        className="w-5 h-5 text-white"
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
                    <h3 className="text-2xl font-bold mb-2 text-white group-hover:translate-x-2 transition-transform duration-300">
                      {project.title}
                    </h3>
                    <p
                      className={`mb-4 text-white/80 transition-[transform,opacity,background-color,border-color] duration-300 ${
                        hoveredProject === project.id
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                    >
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-3 py-1 rounded-full text-xs bg-white/20 backdrop-blur-sm text-white transition-[transform,opacity,background-color,border-color] duration-300 ${
                            hoveredProject === project.id
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-2"
                          }`}
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
          className={`mt-12 text-center transition-[transform,opacity] duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border transition-[transform,opacity,background-color,border-color] duration-300"
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
