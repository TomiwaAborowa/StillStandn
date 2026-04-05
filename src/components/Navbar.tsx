"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Star } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { href: "/",          label: "Home" },
  { href: "/stories",   label: "Stories" },
  { href: "/community", label: "Community" },
  { href: "/submit",    label: "Share Your Story" },
];

export default function Navbar() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass shadow-md shadow-black/5 py-3"
          : "bg-transparent py-5"
      )}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-amber-500 group-hover:animate-pulse-soft transition-all">
            <Star size={22} fill="currentColor" />
          </span>
          <span className="font-display text-2xl font-semibold text-stone-800 tracking-wide">
            Still Stand<span className="text-amber-500">'</span>n
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <li key={l.href}>
              {l.href === "/submit" ? (
                <Link
                  href={l.href}
                  className="ml-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500
                             text-white text-sm font-medium shadow-md shadow-amber-200
                             hover:shadow-lg hover:shadow-amber-300 hover:-translate-y-0.5
                             transition-all duration-200"
                >
                  {l.label}
                </Link>
              ) : (
                <Link
                  href={l.href}
                  className={clsx(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    pathname === l.href
                      ? "bg-amber-50 text-amber-700"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-100/70"
                  )}
                >
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden glass border-t border-white/60 px-4 pt-3 pb-6 mt-1">
          <ul className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "block px-4 py-3 rounded-xl text-sm font-medium transition",
                    pathname === l.href
                      ? "bg-amber-50 text-amber-700"
                      : l.href === "/submit"
                      ? "bg-gradient-to-r from-amber-400 to-amber-500 text-white text-center mt-2 shadow-md"
                      : "text-stone-600 hover:bg-stone-100"
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
