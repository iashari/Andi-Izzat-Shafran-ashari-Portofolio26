"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

const projects = [
  {
    id: 1,
    slug: "seeds-movie-website",
    title: "SeEDS Movie Website",
    category: "Web Design",
    description: "Mood-based movie streaming website that recommends films based on how you feel. Features mood selection, watchlists, and personalized recommendations.",
    tags: ["Web Design", "Streaming", "UI"],
    year: "2024",
    image: "/project footage/Car rental project school 2/Seeds movie website.png",
  },
  {
    id: 2,
    slug: "kanesia-ecommerce",
    title: "Kanesia E-Commerce",
    category: "UI/UX Design",
    description: "Mobile e-commerce app for handmade fabric crafts from Makassar, Indonesia. Features product categories, recommendations, and seamless shopping experience.",
    tags: ["Figma", "E-Commerce", "Mobile"],
    year: "2024",
    image: "/project footage/Car rental project school 2/Kanesia e-com.png",
  },
  {
    id: 3,
    slug: "lumiere-photography",
    title: "Lumière Photography",
    category: "Web Design",
    description: "Professional photography services website with gallery showcase, testimonials, and elegant dark theme design.",
    tags: ["Web Design", "Photography", "UI"],
    year: "2024",
    image: "/project footage/Car rental project school 2/lumiere photography.png",
  },
  {
    id: 4,
    slug: "sporty-car-rentals",
    title: "Sporty Car Rentals",
    category: "Web Design",
    description: "Sports car rental website featuring luxury vehicles with clean teal and white design.",
    tags: ["Web Design", "Automotive", "UI"],
    year: "2023",
    image: "/project footage/Car rental project school 2/Rent Car Project v1.png",
  },
  {
    id: 5,
    slug: "sports-car-rental-v2",
    title: "Sports Car Rental v2",
    category: "Web Design",
    description: "Modern dark-themed car rental website for sports cars in Indonesia with sleek interface and premium feel.",
    tags: ["Web Design", "Dark Theme", "UI"],
    year: "2024",
    image: "/project footage/Car rental project school 2/rent car project v2.png",
  },
];

const categories = ["All", "UI/UX Design", "Web Design"];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />

      {/* Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950 pointer-events-none"></div>

      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-6"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
              All Projects<span className="text-neutral-500">.</span>
            </h1>
            <p className="text-neutral-400 text-lg max-w-2xl">
              A collection of my work across web development, UI/UX design, and graphic design.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm tracking-wide transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-white text-neutral-900"
                    : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-neutral-600 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group relative rounded-2xl overflow-hidden"
              >
                <div className="relative aspect-[4/3] bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden group-hover:border-neutral-700 transition-all duration-300">
                  {/* Project Image */}
                  <Image
                    src={project.image}
                    alt={`${project.title} - ${project.category} project`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span className="text-white/70 text-xs tracking-widest uppercase">
                        {project.category}
                      </span>
                      <span className="text-white/50 text-sm">{project.year}</span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform duration-300">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-md bg-white/20 backdrop-blur-sm text-white text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
