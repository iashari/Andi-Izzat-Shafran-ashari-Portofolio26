"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const botResponses = [
  "Thanks for reaching out! I'm Izzat's virtual assistant. He typically responds within 24 hours.",
  "Great question! Feel free to check out the Projects section for examples of Izzat's work.",
  "Izzat specializes in UI/UX Design and Frontend Development. Would you like to know more?",
  "You can reach Izzat directly via the Contact form or email at hello@izzat.dev",
  "I appreciate your interest! Is there anything specific about Izzat's services you'd like to know?",
  "That's interesting! I'll make sure Izzat sees your message.",
  "Thanks for your message! While I'm just a bot, Izzat will get back to you soon.",
];

const STORAGE_KEY = "izzat-chat-history";

const SIZE_STORAGE_KEY = "izzat-chat-size";
const DEFAULT_SIZE = { width: 360, height: 480 };
const MIN_SIZE = { width: 300, height: 350 };

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.map((msg: Message) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
      }
    }
    return [];
  });
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [size, setSize] = useState(() => {
    if (typeof window !== "undefined") {
      const savedSize = localStorage.getItem(SIZE_STORAGE_KEY);
      if (savedSize) {
        return JSON.parse(savedSize);
      }
    }
    return DEFAULT_SIZE;
  });
  const [isResizing, setIsResizing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  
  // Handle resize from different edges/corners
  const handleResize = (e: React.MouseEvent, direction: string) => {
    if (isFullscreen) return;

    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;
    const maxWidth = window.innerWidth - 48;
    const maxHeight = window.innerHeight - 120;

    const handleMouseMove = (e: MouseEvent) => {
      let newWidth = startWidth;
      let newHeight = startHeight;

      // Handle horizontal resizing
      if (direction.includes("left")) {
        newWidth = Math.min(maxWidth, Math.max(MIN_SIZE.width, startWidth + (startX - e.clientX)));
      } else if (direction.includes("right")) {
        newWidth = Math.min(maxWidth, Math.max(MIN_SIZE.width, startWidth + (e.clientX - startX)));
      }

      // Handle vertical resizing
      if (direction.includes("top")) {
        newHeight = Math.min(maxHeight, Math.max(MIN_SIZE.height, startHeight + (startY - e.clientY)));
      } else if (direction.includes("bottom")) {
        newHeight = Math.min(maxHeight, Math.max(MIN_SIZE.height, startHeight + (e.clientY - startY)));
      }

      // Trigger fullscreen if dragged to near maximum size
      if (newWidth >= maxWidth - 50 && newHeight >= maxHeight - 50) {
        setIsFullscreen(true);
        setIsResizing(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        return;
      }

      setSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Save size when resizing ends
  useEffect(() => {
    if (!isResizing && size.width !== DEFAULT_SIZE.width || size.height !== DEFAULT_SIZE.height) {
      localStorage.setItem(SIZE_STORAGE_KEY, JSON.stringify(size));
    }
  }, [isResizing, size]);

  // Theme colors
  const colors = {
    bg: theme === "dark" ? "#0a0a0a" : "#ffffff",
    bgSecondary: theme === "dark" ? "#171717" : "#f5f5f5",
    border: theme === "dark" ? "#262626" : "#e5e5e5",
    text: theme === "dark" ? "#ffffff" : "#171717",
    textSecondary: theme === "dark" ? "#a3a3a3" : "#525252",
    textMuted: theme === "dark" ? "#525252" : "#a3a3a3",
    accent: theme === "dark" ? "#ffffff" : "#171717",
    accentBg: theme === "dark" ? "#171717" : "#f5f5f5",
    dot: theme === "dark" ? "#ffffff" : "#171717",
    dotBot: theme === "dark" ? "#525252" : "#a3a3a3",
    timeline: theme === "dark" ? "#262626" : "#e5e5e5",
  };

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Show welcome message when chat opens for first time
  const showWelcomeMessage = () => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now(),
        text: "Hello! I'm Izzat Bot. How can I help you today? Feel free to ask about my work, services, or just say hi!",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    showWelcomeMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    audioRef.current = new Audio("/notification.mp3");
    audioRef.current.volume = 0.5;
  }, []);

  const playNotificationSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage: Message = {
        id: Date.now(),
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      playNotificationSound();
    }, 1500 + Math.random() * 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const clearChat = () => {
    localStorage.removeItem(STORAGE_KEY);
    setMessages([]);
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Panel */}
      <div
        ref={chatRef}
        className={`fixed z-50 ${isFullscreen ? "inset-0 rounded-none" : "bottom-24 right-6 rounded-2xl"} ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-8 pointer-events-none"
        } ${isResizing ? "" : "transition-all duration-300 ease-out"}`}
        style={{
          width: isFullscreen ? "100%" : size.width,
          height: isFullscreen ? "100%" : size.height,
          backgroundColor: colors.bg,
          border: isFullscreen ? "none" : `1px solid ${colors.border}`,
          boxShadow: isFullscreen ? "none" : (theme === "dark"
            ? "0 0 60px rgba(0, 0, 0, 0.5)"
            : "0 25px 50px -12px rgba(0, 0, 0, 0.25)"),
        }}
      >
        {/* Resize Handles - only show when not fullscreen */}
        {!isFullscreen && (
          <>
            {/* Corners */}
            <div
              onMouseDown={(e) => handleResize(e, "top-left")}
              className="absolute -top-1 -left-1 w-4 h-4 cursor-nwse-resize z-20"
            />
            <div
              onMouseDown={(e) => handleResize(e, "top-right")}
              className="absolute -top-1 -right-1 w-4 h-4 cursor-nesw-resize z-20"
            />
            <div
              onMouseDown={(e) => handleResize(e, "bottom-left")}
              className="absolute -bottom-1 -left-1 w-4 h-4 cursor-nesw-resize z-20"
            />
            <div
              onMouseDown={(e) => handleResize(e, "bottom-right")}
              className="absolute -bottom-1 -right-1 w-4 h-4 cursor-nwse-resize z-20"
            />
            {/* Edges */}
            <div
              onMouseDown={(e) => handleResize(e, "top")}
              className="absolute -top-1 left-3 right-3 h-2 cursor-ns-resize z-20"
            />
            <div
              onMouseDown={(e) => handleResize(e, "bottom")}
              className="absolute -bottom-1 left-3 right-3 h-2 cursor-ns-resize z-20"
            />
            <div
              onMouseDown={(e) => handleResize(e, "left")}
              className="absolute top-3 bottom-3 -left-1 w-2 cursor-ew-resize z-20"
            />
            <div
              onMouseDown={(e) => handleResize(e, "right")}
              className="absolute top-3 bottom-3 -right-1 w-2 cursor-ew-resize z-20"
            />
          </>
        )}
        {/* Header */}
        <div
          className={`px-5 py-4 flex items-center justify-between ${isFullscreen ? "" : "rounded-t-2xl"}`}
          style={{ borderBottom: `1px solid ${colors.border}` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: colors.dot }}
            ></div>
            <span
              className="text-xs tracking-[0.2em] uppercase"
              style={{ color: colors.textSecondary }}
            >
              Chat with Izzat
            </span>
          </div>
          <div className="flex items-center gap-1">
            {/* Fullscreen / Minimize toggle */}
            <button
              onClick={() => {
                if (isFullscreen) {
                  setIsFullscreen(false);
                  setSize(DEFAULT_SIZE);
                  localStorage.setItem(SIZE_STORAGE_KEY, JSON.stringify(DEFAULT_SIZE));
                } else {
                  setIsFullscreen(true);
                }
              }}
              className="p-2 transition-colors"
              style={{ color: colors.textMuted }}
              title={isFullscreen ? "Minimize" : "Fullscreen"}
            >
              {isFullscreen ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              )}
            </button>
            <button
              onClick={clearChat}
              className="p-2 transition-colors"
              style={{ color: colors.textMuted }}
              title="Clear chat"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 transition-colors"
              style={{ color: colors.textMuted }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages - Timeline Style */}
        <div
          className="overflow-y-auto px-5 py-4"
          style={{ height: isFullscreen ? "calc(100vh - 130px)" : size.height - 130 }}
        >
          <div className="space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className="relative">
                {/* Timeline connector */}
                <div
                  className="absolute left-[3px] top-3 bottom-0 w-px"
                  style={{ backgroundColor: colors.timeline }}
                ></div>

                {/* Message */}
                <div className="flex gap-4">
                  {/* Timeline dot */}
                  <div
                    className="relative z-10 w-[7px] h-[7px] rounded-full mt-2 flex-shrink-0"
                    style={{
                      backgroundColor: msg.sender === "user" ? colors.dot : colors.dotBot
                    }}
                  ></div>

                  <div className="flex-1 min-w-0">
                    {/* Sender & Time */}
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs tracking-wide"
                        style={{
                          color: msg.sender === "user" ? colors.text : colors.textSecondary
                        }}
                      >
                        {msg.sender === "user" ? "You" : "Izzat Bot"}
                      </span>
                      <span
                        className="text-[10px]"
                        style={{ color: colors.textMuted }}
                      >
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>

                    {/* Message Text */}
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: msg.sender === "user" ? colors.text : colors.textSecondary
                      }}
                    >
                      {msg.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="relative">
                <div
                  className="absolute left-[3px] top-3 bottom-0 w-px"
                  style={{ backgroundColor: colors.timeline }}
                ></div>
                <div className="flex gap-4">
                  <div
                    className="relative z-10 w-[7px] h-[7px] rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: colors.dotBot }}
                  ></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs tracking-wide"
                        style={{ color: colors.textSecondary }}
                      >
                        Izzat Bot
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: colors.textMuted }}
                      ></span>
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: colors.textMuted, animationDelay: "0.2s" }}
                      ></span>
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: colors.textMuted, animationDelay: "0.4s" }}
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div
          className="px-5 py-4 rounded-b-2xl"
          style={{ borderTop: `1px solid ${colors.border}` }}
        >
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type something..."
                className="w-full bg-transparent text-sm focus:outline-none py-2 transition-colors"
                style={{
                  color: colors.text,
                  borderBottom: `1px solid ${colors.border}`,
                }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="p-2 transition-colors disabled:opacity-30"
              style={{ color: colors.textMuted }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => isOpen ? setIsOpen(false) : handleOpen()}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Toggle chat"
      >
        <div className="relative w-12 h-12 flex items-center justify-center transition-all duration-300">
          {/* Background */}
          <div
            className="absolute inset-0 border transition-all duration-300 rounded-xl"
            style={{
              backgroundColor: isOpen
                ? (theme === "dark" ? "#ffffff" : "#171717")
                : (theme === "dark" ? "#171717" : "#ffffff"),
              borderColor: isOpen
                ? (theme === "dark" ? "#ffffff" : "#171717")
                : (theme === "dark" ? "#404040" : "#e5e5e5"),
            }}
          ></div>

          {/* Icon */}
          <div
            className="relative z-10 transition-all duration-300"
            style={{
              color: isOpen
                ? (theme === "dark" ? "#171717" : "#ffffff")
                : (theme === "dark" ? "#ffffff" : "#171717"),
            }}
          >
            {isOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            )}
          </div>

          {/* Glow on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
            style={{
              boxShadow: theme === "dark"
                ? "0 0 20px rgba(255, 255, 255, 0.1)"
                : "0 0 20px rgba(0, 0, 0, 0.15)"
            }}
          ></div>
        </div>
      </button>
    </>
  );
}
