"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);

  // Parallax on mouse move
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const dx = (clientX - cx) / cx;
      const dy = (clientY - cy) / cy;
      el.style.transform = `translate(${dx * 12}px, ${dy * 8}px)`;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 animate-float"
          style={{ background: "radial-gradient(circle, #fde68a 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 animate-float"
          style={{ background: "radial-gradient(circle, #bae6fd 0%, transparent 70%)", animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-[250px] h-[250px] rounded-full opacity-10 animate-float"
          style={{ background: "radial-gradient(circle, #fcd34d 0%, transparent 70%)", animationDelay: "4s" }}
        />
      </div>

      {/* Floating particles */}
      <div ref={ref} className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out">
        {[...Array(8)].map((_, i) => (
          <Star
            key={i}
            size={i % 2 === 0 ? 12 : 8}
            fill="currentColor"
            className="absolute text-amber-300 opacity-40 animate-float"
            style={{
              top:             `${15 + i * 10}%`,
              left:            `${8 + i * 11}%`,
              animationDelay:  `${i * 0.8}s`,
              animationDuration:`${5 + i}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 glass-gold rounded-full px-5 py-2 mb-8
                     text-amber-700 text-sm font-medium animate-fade-in"
        >
          <Star size={14} fill="currentColor" />
          A Community of Resilience & Faith
          <Star size={14} fill="currentColor" />
        </div>

        {/* Headline */}
        <h1
          className="font-display text-6xl sm:text-7xl md:text-8xl font-semibold leading-[1.05]
                     text-stone-900 animate-slide-up mb-6"
          style={{ animationDelay: "0.1s" }}
        >
          You Are{" "}
          <span className="text-gradient-gold italic">Still</span>
          <br />
          <span className="text-gradient-sky">Stand</span>
          <span className="text-stone-900">'n</span>
        </h1>

        {/* Sub-headline */}
        <p
          className="text-stone-600 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-12 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          Every storm has a story. Every scar has a testimony. This is a place where the
          broken, the brave, and the beautiful share how they made it through —{" "}
          <em className="text-amber-600 not-italic font-medium">and they're still standing</em>.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <Link
            href="/submit"
            className="group flex items-center gap-2 px-8 py-4 rounded-full
                       bg-gradient-to-r from-amber-400 to-amber-500 text-white font-semibold
                       shadow-lg shadow-amber-200 hover:shadow-xl hover:shadow-amber-300
                       hover:-translate-y-1 transition-all duration-200 text-base"
          >
            Share Your Story
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/stories"
            className="flex items-center gap-2 px-8 py-4 rounded-full
                       glass border border-stone-200 text-stone-700 font-medium
                       hover:border-amber-300 hover:text-amber-700 hover:-translate-y-1
                       transition-all duration-200 text-base"
          >
            Read Stories
          </Link>
        </div>

        {/* Stats */}
        <div
          className="flex flex-wrap items-center justify-center gap-8 mt-16 animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          {[
            { num: "2,400+", label: "Stories Shared" },
            { num: "18K+",   label: "Lives Encouraged" },
            { num: "140+",   label: "Countries Reached" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-semibold text-gradient-gold">{s.num}</p>
              <p className="text-stone-500 text-sm mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float opacity-50">
        <div className="w-6 h-10 rounded-full border-2 border-stone-400 flex justify-center pt-2">
          <div className="w-1 h-2.5 bg-stone-400 rounded-full animate-pulse-soft" />
        </div>
      </div>
    </section>
  );
}
