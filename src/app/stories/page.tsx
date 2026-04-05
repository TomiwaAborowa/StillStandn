"use client";

import { useState, useMemo } from "react";
import { Search, Filter, X } from "lucide-react";
import StoryCard, { StoryCardSkeleton } from "@/components/StoryCard";
import { mockStories } from "@/lib/mockData";
import type { Category } from "@/lib/supabase";
import clsx from "clsx";

const CATEGORIES: (Category | "All")[] = [
  "All",
  "Faith & Spirituality",
  "Health & Healing",
  "Loss & Grief",
  "Family & Relationships",
  "Addiction & Recovery",
  "Financial Breakthrough",
  "Mental Health",
  "Other",
];

export default function StoriesPage() {
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [loading]               = useState(false); // set true when wiring Supabase

  const filtered = useMemo(() => {
    return mockStories.filter((s) => {
      const matchCat = category === "All" || s.category === category;
      const matchQ   = !search || s.title.toLowerCase().includes(search.toLowerCase()) ||
                       s.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchQ;
    });
  }, [search, category]);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-amber-600 text-sm font-medium uppercase tracking-widest mb-2">
            Community Stories
          </p>
          <h1 className="font-display text-5xl sm:text-6xl text-stone-900 mb-4">
            Every Story{" "}
            <span className="text-gradient-gold italic">Matters</span>
          </h1>
          <p className="text-stone-500 max-w-xl mx-auto">
            Browse testimonies of resilience, faith, and grace. Search for a story that speaks
            to where you are today.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search stories…"
            className="faith-input pl-11 pr-10 py-3.5 rounded-full shadow-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Filter size={16} className="text-stone-400 self-center mr-1" />
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={clsx(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                category === c
                  ? "bg-amber-400 text-white shadow-md shadow-amber-200"
                  : "glass text-stone-600 hover:border-amber-300 hover:text-amber-700"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-stone-400 text-sm mb-6">
          {filtered.length} {filtered.length === 1 ? "story" : "stories"} found
          {search && ` for "${search}"`}
          {category !== "All" && ` in ${category}`}
        </p>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <StoryCardSkeleton key={i} />)}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((story) => (
              <StoryCard key={story.id} story={story} featured={story.is_featured} />
            ))}
          </div>
        ) : (
          <EmptyState search={search} category={category} onReset={() => { setSearch(""); setCategory("All"); }} />
        )}
      </div>
    </div>
  );
}

function EmptyState({
  search, category, onReset,
}: { search: string; category: string; onReset: () => void }) {
  return (
    <div className="glass rounded-3xl p-16 text-center">
      <p className="text-5xl mb-4">🕊️</p>
      <h3 className="font-display text-2xl text-stone-800 mb-2">No stories found</h3>
      <p className="text-stone-500 mb-6">
        {search || category !== "All"
          ? "Try adjusting your search or filter."
          : "Be the first to share your story in this category."}
      </p>
      <button
        onClick={onReset}
        className="px-6 py-2.5 rounded-full bg-amber-400 text-white text-sm font-medium
                   hover:bg-amber-500 transition"
      >
        Show All Stories
      </button>
    </div>
  );
}
