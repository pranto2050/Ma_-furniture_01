"use client";

import { useEffect, useState } from "react";
import styles from "./Loader.module.css";
import { contactData } from "../../public/data";

interface Particle {
  id: number;
  width: number;
  height: number;
  left: number;
  delay: number;
  duration: number;
}

const Loader = () => {
  const [mounted, setMounted] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles only on the client side to avoid hydration mismatch
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      width: Math.random() * 4 + 2,
      height: Math.random() * 4 + 2,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: Math.random() * 4 + 4,
    }));
    setParticles(newParticles);

    // Detect when the window has fully loaded
    const handleLoad = () => {
      // Total visible duration: ~3.5 to 4 seconds as requested
      const timer = setTimeout(() => {
        setFadeOut(true);
        const unmountTimer = setTimeout(() => {
          setMounted(false);
        }, 600); // 600ms fade-out transition
        return () => clearTimeout(unmountTimer);
      }, 3500);
      return () => clearTimeout(timer);
    };

    if (document.readyState === "complete") {
      const cleanup = handleLoad();
      return () => cleanup && cleanup();
    } else {
      window.addEventListener("load", handleLoad);
      return () => {
        window.removeEventListener("load", handleLoad);
      };
    }
  }, []);

  if (!mounted) return null;

  const shopName = contactData.shopName;
  const address = "সাতারপাড়া বাজার, দৌলতপুর, কুষ্টিয়া";

  return (
    <div
      className={`fixed inset-0 z-9999 flex items-center justify-center overflow-hidden bg-bg transition-opacity duration-600 ease-out ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Wood Grain Background Texture */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <div className={`absolute inset-0 ${styles.animateGrain}`} 
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, var(--color-primary) 41px, var(--color-primary) 42px, transparent 43px)`,
            backgroundSize: '200% 200%'
          }}
        />
      </div>

      {/* Floating Sawdust Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className={`absolute bg-accent rounded-full opacity-30 ${styles.animateFloat}`}
            style={{
              width: `${p.width}px`,
              height: `${p.height}px`,
              left: `${p.left}%`,
              bottom: `-20px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Center Loading Card */}
      <div className={`relative z-10 p-8 md:p-12 max-w-[90vw] md:max-w-md w-full bg-bg border border-gray-medium/20 rounded-lg shadow-2xl ${styles.animateCardPulse} flex flex-col items-center`}>
        
        {/* Decorative Woodworking Border Corners */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-gray-medium/40 rounded-tl-md" />
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-gray-medium/40 rounded-tr-md" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-gray-medium/40 rounded-bl-md" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-gray-medium/40 rounded-br-md" />

        {/* Tool Silhouettes in Corners */}
        <div className="absolute -top-4 -left-4 text-gray-medium/30 transform -rotate-12">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.18 10l-8.66-8.66c-.78-.78-2.05-.78-2.83 0L3.14 6.89c-.39.39-.39 1.02 0 1.41l1.41 1.41c.39.39 1.02.39 1.41 0L8.09 7.58l.71.71-3.54 3.54c-.39.39-.39 1.02 0 1.41l1.41 1.41c.39.39 1.02.39 1.41 0l3.54-3.54.71.71-2.12 2.12c-.39.39-.39 1.02 0 1.41l1.41 1.41c.39.39 1.02.39 1.41 0l8.66-8.66c.78-.78.78-2.05 0-2.83z"/>
          </svg>
        </div>

        {/* 1. HAND-DRAWN SVG ICON ANIMATION (Chair) */}
        <div className="mb-6">
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            className="text-accent"
          >
            <path
              d="M30 80 L30 40 L70 40 L70 80 M30 50 L70 50 M30 40 L30 20 C30 15 70 15 70 20 L70 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.animateDrawSvg}
              style={{ strokeDasharray: 300, strokeDashoffset: 300 }}
            />
          </svg>
        </div>

        {/* 4. SHOP NAME — BENGALI TYPOGRAPHY */}
        <div className="text-center mb-6">
          <h1 className={`text-4xl md:text-5xl font-bold mb-2 ${styles.fontSerif} ${styles.headingText} ${styles.animateFadeIn} opacity-0`} style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            {shopName}
          </h1>
          <p className={`text-gray-medium text-sm md:text-base font-medium ${styles.animateFadeIn} opacity-0`} style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
            {address}
          </p>
        </div>

        {/* 5. ANIMATED PROGRESS BAR */}
        <div className="w-full max-w-[240px]">
          <div className="h-1.5 w-full bg-gray-medium/20 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full bg-accent rounded-full ${styles.animateProgressFill} relative`}
              style={{ boxShadow: '0 0 8px var(--color-accent)' }}
            />
          </div>
          <p className="text-xs text-gray-medium font-medium text-center animate-pulse">
            লোড হচ্ছে...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
