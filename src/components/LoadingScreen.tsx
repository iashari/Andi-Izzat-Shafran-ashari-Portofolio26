"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    // Animate progress faster
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 80);

    // Hide loader faster to improve FCP/LCP
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

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
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: bgColor }}
      initial={{ opacity: 1 }}
      animate={{ opacity: progress >= 100 ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => {
        if (progress >= 100) setIsLoading(false);
      }}
    >
      {/* Background radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Animated rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            borderColor: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
          }}
          initial={{ width: 100, height: 100, opacity: 0 }}
          animate={{
            width: [100, 400 + i * 100],
            height: [100, 400 + i * 100],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.4,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Logo container with glow */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.2
        }}
      >
        {/* Glow behind logo */}
        <motion.div
          className="absolute inset-0 blur-3xl"
          style={{
            background: theme === "dark"
              ? "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(0,0,0,0.15) 0%, transparent 70%)",
            transform: "scale(2)",
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main logo */}
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
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
        </motion.div>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: 200 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="relative z-10 mt-12"
      >
        <div
          className="h-[2px] rounded-full overflow-hidden"
          style={{ backgroundColor: theme === "dark" ? "#262626" : "#e5e5e5" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: textColor }}
            initial={{ width: "0%" }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>

        {/* Percentage text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-4 text-center text-sm font-medium tracking-widest"
          style={{ color: mutedColor }}
        >
          {Math.min(Math.round(progress), 100)}%
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
