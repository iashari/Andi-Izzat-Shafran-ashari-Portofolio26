"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

// Theme Toggle Component - Rounded Monochromatic Design
function ThemeToggle({ theme, toggleTheme, size = "default" }: { theme: string; toggleTheme: () => void; size?: "default" | "small" }) {
  const isLight = theme === "light";
  const dimensions = size === "small" ? { width: 48, height: 24 } : { width: 56, height: 28 };
  const knobDimensions = size === "small" ? { width: 16, height: 16 } : { width: 20, height: 20 };
  const translateX = size === "small" ? 24 : 28;

  return (
    <button
      onClick={toggleTheme}
      className="relative rounded-full transition-all duration-300 ease-out overflow-hidden"
      style={{
        width: dimensions.width,
        height: dimensions.height,
        backgroundColor: isLight ? "#e5e5e5" : "#262626",
      }}
      aria-label="Toggle theme"
    >
      {/* Sliding knob with icon */}
      <div
        className="absolute rounded-full shadow-md transition-all duration-300 ease-out flex items-center justify-center"
        style={{
          width: knobDimensions.width,
          height: knobDimensions.height,
          top: 4,
          left: 4,
          transform: `translateX(${isLight ? translateX : 0}px)`,
          backgroundColor: isLight ? "#171717" : "#ffffff",
        }}
      >
        {/* Sun icon */}
        <svg
          className="absolute transition-all duration-300"
          style={{
            width: 10,
            height: 10,
            opacity: isLight ? 1 : 0,
            transform: isLight ? "rotate(0deg)" : "rotate(90deg)",
            color: "#ffffff",
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>

        {/* Moon icon */}
        <svg
          className="absolute transition-all duration-300"
          style={{
            width: 10,
            height: 10,
            opacity: isLight ? 0 : 1,
            transform: isLight ? "rotate(-90deg)" : "rotate(0deg)",
            color: "#171717",
          }}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </div>
    </button>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: "Home", href: "/#home", section: "home" },
    { name: "About", href: "/#about", section: "about" },
    { name: "Skills", href: "/#skills", section: "skills" },
    { name: "Services", href: "/#services", section: "services" },
    { name: "Projects", href: "/projects", section: "projects" },
    { name: "Experience", href: "/#experience", section: "experience" },
    { name: "Contact", href: "/#contact", section: "contact" },
  ];

  // Track active section on homepage using Intersection Observer
  useEffect(() => {
    if (!isHomePage) return;

    const sections = ["home", "about", "skills", "services", "projects", "experience", "contact"];

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [isHomePage]);

  // For homepage, use simple anchor links for smooth scrolling
  const getHref = (href: string) => {
    if (isHomePage && href.startsWith("/#")) {
      return href.replace("/", "");
    }
    return href;
  };

  // Check if a nav link is active
  const isActive = (link: typeof navLinks[0]) => {
    // On projects pages, highlight Projects link
    if (pathname.startsWith("/projects")) {
      return link.section === "projects";
    }
    // On homepage, highlight based on scroll position
    if (isHomePage) {
      return activeSection === link.section;
    }
    return false;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Navbar background with blur */}
      <div
        className="absolute inset-0 backdrop-blur-md"
        style={{
          backgroundColor: theme === "dark" ? "rgba(10, 10, 10, 0.8)" : "rgba(255, 255, 255, 0.8)",
          borderBottom: `1px solid ${theme === "dark" ? "rgba(38, 38, 38, 0.5)" : "rgba(229, 229, 229, 0.5)"}`,
        }}
      ></div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Name */}
          <Link
            href="/"
            className="font-bold text-lg tracking-tight transition-colors duration-300"
            style={{ color: theme === "dark" ? "#ffffff" : "#171717" }}
          >
            Izzat<span style={{ color: theme === "dark" ? "#737373" : "#a3a3a3" }}>.</span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={getHref(link.href)}
                className="text-sm tracking-widest uppercase transition-colors duration-300 relative"
                style={{
                  color: isActive(link)
                    ? (theme === "dark" ? "#ffffff" : "#171717")
                    : (theme === "dark" ? "#a3a3a3" : "#525252"),
                }}
              >
                {link.name}
                {/* Active indicator dot */}
                {isActive(link) && (
                  <span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ backgroundColor: theme === "dark" ? "#ffffff" : "#171717" }}
                  ></span>
                )}
              </Link>
            ))}
          </div>

          {/* Right side - Theme Toggle */}
          <div className="hidden md:flex items-center">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} size="small" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center group"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block w-5 h-px transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-[3.5px]" : ""
                }`}
                style={{ backgroundColor: theme === "dark" ? "#a3a3a3" : "#525252" }}
              ></span>
              <span
                className={`block w-5 h-px transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
                }`}
                style={{ backgroundColor: theme === "dark" ? "#a3a3a3" : "#525252" }}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 pb-6" : "max-h-0"
          }`}
        >
          <div
            className="flex flex-col gap-4 pt-4"
            style={{ borderTop: `1px solid ${theme === "dark" ? "rgba(38, 38, 38, 0.5)" : "rgba(229, 229, 229, 0.5)"}` }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={getHref(link.href)}
                onClick={() => setIsMenuOpen(false)}
                className="text-sm tracking-widest uppercase transition-colors duration-300 flex items-center gap-2"
                style={{
                  color: isActive(link)
                    ? (theme === "dark" ? "#ffffff" : "#171717")
                    : (theme === "dark" ? "#a3a3a3" : "#525252"),
                }}
              >
                {/* Active indicator for mobile */}
                {isActive(link) && (
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: theme === "dark" ? "#ffffff" : "#171717" }}
                  ></span>
                )}
                {link.name}
              </Link>
            ))}

            {/* Theme Toggle for Mobile */}
            <div
              className="flex items-center justify-between pt-4 mt-2"
              style={{ borderTop: `1px solid ${theme === "dark" ? "rgba(38, 38, 38, 0.5)" : "rgba(229, 229, 229, 0.5)"}` }}
            >
              <span
                className="text-sm tracking-widest uppercase"
                style={{ color: theme === "dark" ? "#737373" : "#737373" }}
              >
                {theme === "dark" ? "Dark Mode" : "Light Mode"}
              </span>
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} size="small" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
