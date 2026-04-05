import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-center">
      <div>
        <p className="text-7xl mb-6">🕊️</p>
        <h1 className="font-display text-5xl text-stone-900 mb-3">Page Not Found</h1>
        <p className="text-stone-500 mb-8 max-w-sm mx-auto">
          This page doesn't exist, but your journey does. Let's find your way back.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                     bg-gradient-to-r from-amber-400 to-amber-500 text-white font-medium
                     shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
