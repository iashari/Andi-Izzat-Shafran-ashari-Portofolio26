"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    // Animate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Hide loader after animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  if (!isLoading) return null;

  const bgColor = theme === "dark" ? "#0a0a0a" : "#f5f5f5";
  const textColor = theme === "dark" ? "#ffffff" : "#171717";
  const mutedColor = theme === "dark" ? "#525252" : "#a3a3a3";
  const barBg = theme === "dark" ? "#262626" : "#e5e5e5";

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-500"
      style={{
        backgroundColor: bgColor,
        opacity: progress >= 100 ? 0 : 1,
        pointerEvents: progress >= 100 ? "none" : "auto",
      }}
    >
      {/* Logo */}
      <div className="mb-8">
        <h1
          className="text-4xl font-bold tracking-tight"
          style={{ color: textColor }}
        >
          Izzat<span style={{ color: mutedColor }}>.</span>
        </h1>
      </div>

      {/* Progress bar */}
      <div
        className="w-48 h-1 rounded-full overflow-hidden"
        style={{ backgroundColor: barBg }}
      >
        <div
          className="h-full rounded-full transition-all duration-200"
          style={{
            width: `${Math.min(progress, 100)}%`,
            backgroundColor: textColor,
          }}
        />
      </div>

      {/* Loading text */}
      <p
        className="mt-4 text-xs tracking-[0.2em] uppercase"
        style={{ color: mutedColor }}
      >
        Loading
      </p>
    </div>
  );
}
