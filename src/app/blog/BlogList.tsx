"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";
import { PostMeta } from "@/lib/mdx";

interface BlogListProps {
  posts: PostMeta[];
}

export default function BlogList({ posts }: BlogListProps) {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const colors = {
    bg: theme === "dark" ? "#0a0a0a" : "#faf8f5",
    bgCard: theme === "dark" ? "#171717" : "#ffffff",
    border: theme === "dark" ? "#262626" : "#e8e4dc",
    text: theme === "dark" ? "#ffffff" : "#2d2a26",
    textMuted: theme === "dark" ? "#a3a3a3" : "#5c574e",
    textLabel: theme === "dark" ? "#737373" : "#8a857c",
    accent: theme === "dark" ? "#ffffff" : "#2d2a26",
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg }}>
      <Navbar />

      {/* Subtle grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"} 1px, transparent 1px), linear-gradient(90deg, ${theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div
            className={`mb-12 transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <span style={{ color: colors.textLabel }} className="text-sm tracking-widest uppercase mb-3 block">
              My Thoughts
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: colors.text }}>
              Blog<span style={{ color: colors.textLabel }}>.</span>
            </h1>
            <p className="mt-4 text-lg" style={{ color: colors.textMuted }}>
              Sharing my journey in design, development, and creativity.
            </p>
          </div>

          {/* Posts Grid */}
          {posts.length === 0 ? (
            <div
              className={`text-center py-16 transition-all duration-500 delay-200 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <p style={{ color: colors.textMuted }}>No posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {posts.map((post, index) => (
                <article
                  key={post.slug}
                  className={`transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div
                      className="group p-6 rounded-2xl transition-all duration-300 hover:scale-[1.01]"
                      style={{
                        backgroundColor: colors.bgCard,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          {/* Date */}
                          <span className="text-sm" style={{ color: colors.textLabel }}>
                            {formatDate(post.date)}
                          </span>

                          {/* Title */}
                          <h2
                            className="text-xl md:text-2xl font-semibold mt-2 group-hover:opacity-80 transition-opacity"
                            style={{ color: colors.text }}
                          >
                            {post.title}
                          </h2>

                          {/* Excerpt */}
                          <p className="mt-2 line-clamp-2" style={{ color: colors.textMuted }}>
                            {post.excerpt}
                          </p>

                          {/* Tags */}
                          {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {post.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-3 py-1 rounded-full text-xs"
                                  style={{
                                    backgroundColor: colors.bg,
                                    color: colors.textMuted,
                                    border: `1px solid ${colors.border}`,
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Arrow */}
                        <div
                          className="hidden md:flex w-10 h-10 rounded-full items-center justify-center transition-transform group-hover:translate-x-1"
                          style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            style={{ color: colors.textMuted }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}

          {/* Back to Home */}
          <div
            className={`mt-12 text-center transition-all duration-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: colors.textMuted }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <BackToTop />
    </div>
  );
}
