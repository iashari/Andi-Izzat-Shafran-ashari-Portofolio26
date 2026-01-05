import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import { type ReactNode } from "react";

const projects = [
  {
    id: 1,
    slug: "web-app-project",
    title: "E-Commerce Dashboard",
    category: "Web Development",
    description: "Modern dashboard interface with analytics and data visualization.",
    fullDescription: "A comprehensive e-commerce dashboard featuring real-time analytics, inventory management, and sales tracking. Built with modern technologies for optimal performance and user experience.",
    color: "from-white/5 to-neutral-400/15",
    tags: ["React", "Next.js", "Tailwind", "TypeScript"],
    year: "2024",
    client: "Demo Project",
    duration: "4 Weeks",
    role: "Full-Stack Developer",
    features: [
      "Real-time analytics and data visualization",
      "Inventory management system",
      "Sales tracking and reporting",
      "Responsive dashboard design",
      "Dark/Light mode support",
    ],
    icon: "dashboard",
  },
  {
    id: 2,
    slug: "brand-identity",
    title: "Brand Identity Design",
    category: "Graphic Design",
    description: "Complete brand identity package with logo and guidelines.",
    fullDescription: "A complete brand identity project including logo design, color palette selection, typography choices, and comprehensive brand guidelines document for consistent brand application.",
    color: "from-neutral-400/10 to-neutral-500/20",
    tags: ["Branding", "Logo Design", "Identity", "Guidelines"],
    year: "2024",
    client: "Demo Project",
    duration: "3 Weeks",
    role: "Brand Designer",
    features: [
      "Logo design with variations",
      "Color palette and typography",
      "Brand guidelines document",
      "Business card and stationery",
      "Social media templates",
    ],
    icon: "brand",
  },
  {
    id: 3,
    slug: "mobile-app-design",
    title: "Mobile App UI/UX",
    category: "UI/UX Design",
    description: "User-centered mobile app design with intuitive navigation.",
    fullDescription: "A mobile application design focused on user experience, featuring intuitive navigation, clean interface design, and seamless user flows. Designed with accessibility and usability in mind.",
    color: "from-neutral-500/10 to-neutral-600/20",
    tags: ["Figma", "Prototype", "Mobile", "UI/UX"],
    year: "2024",
    client: "Demo Project",
    duration: "5 Weeks",
    role: "UI/UX Designer",
    features: [
      "User research and personas",
      "Wireframes and prototypes",
      "High-fidelity UI design",
      "Interactive prototype",
      "Design system components",
    ],
    icon: "mobile",
  },
  {
    id: 4,
    slug: "portfolio-website",
    title: "Portfolio Website",
    category: "Web Development",
    description: "This portfolio website with modern animations and design.",
    fullDescription: "This portfolio website you are currently viewing, showcasing modern web development practices with smooth animations, responsive design, and interactive elements like the resizable chat widget.",
    color: "from-neutral-600/10 to-neutral-700/20",
    tags: ["Next.js", "TypeScript", "Tailwind", "React"],
    year: "2024",
    client: "Personal Project",
    duration: "2 Weeks",
    role: "Developer & Designer",
    features: [
      "Modern responsive design",
      "Dark/Light mode toggle",
      "Smooth scroll animations",
      "Interactive chat widget",
      "Loading screen animation",
      "Typing effect animation",
    ],
    icon: "web",
  },
];

// Icons for each project type
const projectIcons: Record<string, ReactNode> = {
  dashboard: (
    <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={0.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
    </svg>
  ),
  brand: (
    <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={0.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  mobile: (
    <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={0.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  web: (
    <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={0.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
};

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Find next and previous projects
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[currentIndex + 1] || projects[0];
  const prevProject = projects[currentIndex - 1] || projects[projects.length - 1];

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />

      {/* Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950 pointer-events-none"></div>

      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Projects
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-neutral-500 text-sm tracking-widest uppercase">
                {project.category}
              </span>
              <span className="w-1 h-1 rounded-full bg-neutral-700"></span>
              <span className="text-neutral-500 text-sm">{project.year}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
              {project.title}<span className="text-neutral-500">.</span>
            </h1>
            <p className="text-neutral-400 text-xl leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Project Image Placeholder with Icon */}
          <div className={`relative aspect-video rounded-2xl bg-gradient-to-br ${project.color} mb-12 overflow-hidden`}>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white/30">
              {projectIcons[project.icon]}
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800">
              <span className="text-neutral-500 text-sm tracking-widest uppercase block mb-2">Client</span>
              <span className="text-white text-lg">{project.client}</span>
            </div>
            <div className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800">
              <span className="text-neutral-500 text-sm tracking-widest uppercase block mb-2">Duration</span>
              <span className="text-white text-lg">{project.duration}</span>
            </div>
            <div className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800">
              <span className="text-neutral-500 text-sm tracking-widest uppercase block mb-2">Role</span>
              <span className="text-white text-lg">{project.role}</span>
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-12">
            <h2 className="text-neutral-500 text-sm tracking-widest uppercase mb-4">Technologies & Tools</h2>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h2 className="text-neutral-500 text-sm tracking-widest uppercase mb-4">Key Features</h2>
            <ul className="space-y-3">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0"></span>
                  <span className="text-neutral-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-neutral-800 mb-12"></div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex items-center gap-3 text-neutral-400 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <div className="text-left">
                <span className="text-neutral-500 text-xs tracking-widest uppercase block">Previous</span>
                <span className="text-white">{prevProject.title}</span>
              </div>
            </Link>

            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex items-center gap-3 text-neutral-400 hover:text-white transition-colors"
            >
              <div className="text-right">
                <span className="text-neutral-500 text-xs tracking-widest uppercase block">Next</span>
                <span className="text-white">{nextProject.title}</span>
              </div>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
