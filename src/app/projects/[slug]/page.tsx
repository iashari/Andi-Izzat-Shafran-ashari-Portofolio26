import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";

const projects = [
  {
    id: 1,
    slug: "seeds-movie-website",
    title: "SeEDS Movie Website",
    category: "Web Design",
    description: "Mood-based movie streaming website.",
    fullDescription: "A unique movie streaming website that recommends films based on your current mood. Features include mood selection (Happy, Feeling Blue, Hot Head, Yuck, On Edge), personalized watchlists, celebrity profiles, and curated recommendations.",
    tags: ["Web Design", "Streaming", "UI", "Entertainment"],
    year: "2024",
    client: "School Project",
    duration: "3 Weeks",
    role: "UI/UX Designer",
    features: [
      "Mood-based movie recommendations",
      "User profiles and watchlists",
      "Celebrity and actor profiles",
      "Top picks and fan favorites",
      "Social features integration",
    ],
    image: "/project footage/Car rental project school 2/Seeds movie website.png",
  },
  {
    id: 2,
    slug: "kanesia-ecommerce",
    title: "Kanesia E-Commerce",
    category: "UI/UX Design",
    description: "Mobile e-commerce app for handmade crafts.",
    fullDescription: "A mobile e-commerce application for handmade fabric crafts (kain perca) from Makassar, Indonesia. Features product categories, personalized recommendations, and a seamless shopping experience for unique handmade items.",
    tags: ["Figma", "E-Commerce", "Mobile", "UI/UX"],
    year: "2024",
    client: "School Project",
    duration: "4 Weeks",
    role: "UI/UX Designer",
    features: [
      "Product categories and search",
      "Personalized recommendations",
      "Shopping cart and checkout",
      "User reviews and ratings",
      "Location-based services",
    ],
    image: "/project footage/Car rental project school 2/Kanesia e-com.png",
  },
  {
    id: 3,
    slug: "lumiere-photography",
    title: "Lumière Photography",
    category: "Web Design",
    description: "Professional photography services website.",
    fullDescription: "An elegant website for professional photography services featuring a stunning gallery showcase, client testimonials, and service offerings. Built with a sophisticated dark theme that highlights the visual work.",
    tags: ["Web Design", "Photography", "UI", "Portfolio"],
    year: "2024",
    client: "School Project",
    duration: "2 Weeks",
    role: "Web Designer",
    features: [
      "Gallery showcase with lightbox",
      "Client testimonials section",
      "Service packages display",
      "Contact and booking form",
      "Elegant dark theme design",
    ],
    image: "/project footage/Car rental project school 2/lumiere photography.png",
  },
  {
    id: 4,
    slug: "sporty-car-rentals",
    title: "Sporty Car Rentals",
    category: "Web Design",
    description: "Sports car rental website.",
    fullDescription: "A clean and modern website for sports car rentals featuring luxury vehicles. Designed with a fresh teal and white color scheme that conveys elegance and professionalism.",
    tags: ["Web Design", "Automotive", "UI", "Rental"],
    year: "2023",
    client: "School Project",
    duration: "2 Weeks",
    role: "Web Designer",
    features: [
      "Car catalog with specifications",
      "Exclusive collection showcase",
      "Pricing and rental options",
      "About and profile sections",
      "Clean teal and white design",
    ],
    image: "/project footage/Car rental project school 2/Rent Car Project v1.png",
  },
  {
    id: 5,
    slug: "sports-car-rental-v2",
    title: "Sports Car Rental v2",
    category: "Web Design",
    description: "Modern dark-themed car rental website.",
    fullDescription: "A premium car rental website with a sleek dark theme and red accents. Features sports cars available for rent in Indonesia with a modern, professional interface that appeals to luxury car enthusiasts.",
    tags: ["Web Design", "Dark Theme", "UI", "Automotive"],
    year: "2024",
    client: "School Project",
    duration: "2 Weeks",
    role: "Web Designer",
    features: [
      "Premium dark theme design",
      "Car gallery and specifications",
      "Contact and inquiry form",
      "Company information section",
      "Modern sleek interface",
    ],
    image: "/project footage/Car rental project school 2/rent car project v2.png",
  },
];

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - ${project.category}`,
    description: project.fullDescription,
    openGraph: {
      title: `${project.title} | Izzat Portfolio`,
      description: project.fullDescription,
      type: "article",
      images: [project.image],
    },
  };
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

          {/* Project Image */}
          <div className="relative aspect-video rounded-2xl mb-12 overflow-hidden border border-neutral-800">
            <Image
              src={project.image}
              alt={`${project.title} - ${project.category} project screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
              priority
            />
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
