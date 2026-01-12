export default function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://izzat-portofolio26.vercel.app";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "A. Izzat Shafran Ashari",
    url: siteUrl,
    image: `${siteUrl}/profile2.jpeg`,
    jobTitle: "Full Stack Developer & Graphic Designer",
    worksFor: {
      "@type": "Organization",
      name: "Ashari Tech",
    },
    alumniOf: {
      "@type": "Organization",
      name: "SMK Telkom Makassar",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "UI/UX Design",
      "Graphic Design",
      "Figma",
      "Adobe Photoshop",
      "Adobe Illustrator",
    ],
    sameAs: [
      "https://github.com/AndiIzzat",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "Indonesia",
      addressRegion: "South Sulawesi",
    },
    award: [
      "1st Place LKS Provincial Level 2025 - Graphic Design Technology",
      "Medalion of Excellence LKS National 2025 - Graphic Design Technology",
      "2nd Place ENIAC 2024 - Graphic Design",
      "3rd Place Electro Invention Race 2024 - Graphic Design Technology",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Izzat Portfolio",
    url: siteUrl,
    description: "Portfolio of A. Izzat Shafran Ashari - Graphic Designer & Full Stack Developer",
    author: {
      "@type": "Person",
      name: "A. Izzat Shafran Ashari",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
