import Link from "next/link";
import { Star, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200/60 bg-white/50 backdrop-blur-sm mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Star size={20} className="text-amber-500" fill="currentColor" />
              <span className="font-display text-xl font-semibold text-stone-800">
                Still Stand<span className="text-amber-500">'</span>n
              </span>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed max-w-xs">
              A safe space for stories of faith, resilience, and hope. Every story matters.
              Every voice deserves to be heard.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-stone-700 mb-4 text-sm uppercase tracking-wider">
              Navigate
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/",          label: "Home" },
                { href: "/stories",   label: "All Stories" },
                { href: "/community", label: "Community" },
                { href: "/submit",    label: "Share Your Story" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-stone-500 hover:text-amber-600 text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Scripture */}
          <div className="glass-gold rounded-2xl p-5">
            <p className="font-display text-base italic text-stone-700 leading-relaxed">
              "And we know that in all things God works for the good of those who love him."
            </p>
            <p className="text-amber-600 text-sm font-medium mt-2">— Romans 8:28</p>
          </div>
        </div>

        <div className="border-t border-stone-200/60 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-400 text-xs">
          <p>© {new Date().getFullYear()} Still Stand&apos;n. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={12} className="text-red-400 inline" fill="currentColor" /> and faith
          </p>
        </div>
      </div>
    </footer>
  );
}
