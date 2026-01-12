"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 50);

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setIsLoading(false), 500);
    }, 800);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  if (!isLoading) return null;

  const bgColor = theme === "dark" ? "#0a0a0a" : "#f5f5f5";
  const textColor = theme === "dark" ? "#ffffff" : "#171717";
  const mutedColor = theme === "dark" ? "#525252" : "#a3a3a3";
  const glowColor = theme === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.08)";

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none animate-fade-in"
        style={{
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Animated rings */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full border animate-ring"
          style={{
            borderColor: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}

      {/* Logo container */}
      <div className="relative z-10 animate-logo-appear">
        {/* Glow behind logo */}
        <div
          className="absolute inset-0 blur-3xl animate-pulse-slow"
          style={{
            background: theme === "dark"
              ? "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(0,0,0,0.15) 0%, transparent 70%)",
            transform: "scale(2)",
          }}
        />

        {/* Main logo */}
        <div className="animate-scale-pulse">
          <Image
            src={theme === "dark" ? "/Logos/jat logo white.png" : "/Logos/jat logo black.png"}
            alt="Jat Logo"
            width={200}
            height={100}
            className="object-contain relative z-10"
            style={{
              filter: theme === "dark"
                ? "drop-shadow(0 0 30px rgba(255,255,255,0.3))"
                : "drop-shadow(0 0 30px rgba(0,0,0,0.15))",
            }}
            priority
          />
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 mt-12 w-[200px] animate-progress-appear">
        <div
          className="h-[2px] rounded-full overflow-hidden"
          style={{ backgroundColor: theme === "dark" ? "#262626" : "#e5e5e5" }}
        >
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{
              backgroundColor: textColor,
              width: `${Math.min(progress, 100)}%`
            }}
          />
        </div>

        {/* Percentage text */}
        <p
          className="mt-4 text-center text-sm font-medium tracking-widest animate-fade-in-delayed"
          style={{ color: mutedColor }}
        >
          {Math.min(Math.round(progress), 100)}%
        </p>
      </div>

      <style jsx>{`
        @keyframes ring {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(5);
            opacity: 0;
          }
        }
        @keyframes logo-appear {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes scale-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }
        @keyframes progress-appear {
          0% {
            opacity: 0;
            transform: scaleX(0);
          }
          100% {
            opacity: 1;
            transform: scaleX(1);
          }
        }
        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-ring {
          width: 100px;
          height: 100px;
          animation: ring 2s ease-out infinite;
          will-change: transform, opacity;
        }
        .animate-logo-appear {
          animation: logo-appear 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) 0.2s both;
          will-change: transform, opacity;
        }
        .animate-scale-pulse {
          animation: scale-pulse 2s ease-in-out infinite;
          will-change: transform;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
          will-change: opacity;
        }
        .animate-progress-appear {
          animation: progress-appear 0.5s ease-out 0.5s both;
          transform-origin: left;
          will-change: transform, opacity;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out both;
          will-change: opacity;
        }
        .animate-fade-in-delayed {
          animation: fade-in 0.5s ease-out 0.7s both;
          will-change: opacity;
        }
      `}</style>
    </div>
  );
}
