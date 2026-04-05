import Link from "next/link";
import { Heart, Sparkles, HandHeart, Calendar, Tag } from "lucide-react";
import type { Story } from "@/lib/supabase";
import clsx from "clsx";

const CATEGORY_COLORS: Record<string, string> = {
  "Faith & Spirituality":  "bg-amber-50  text-amber-700  border-amber-200",
  "Health & Healing":      "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Loss & Grief":          "bg-blue-50   text-blue-700   border-blue-200",
  "Family & Relationships":"bg-rose-50   text-rose-700   border-rose-200",
  "Addiction & Recovery":  "bg-purple-50 text-purple-700 border-purple-200",
  "Financial Breakthrough":"bg-lime-50   text-lime-700   border-lime-200",
  "Mental Health":         "bg-sky-50    text-sky-700    border-sky-200",
  "Other":                 "bg-stone-50  text-stone-600  border-stone-200",
};

interface Props {
  story:     Story;
  featured?: boolean;
}

export default function StoryCard({ story, featured = false }: Props) {
  const formattedDate = new Date(story.created_at).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });

  return (
    <Link href={`/story/${story.id}`} className="block group">
      <article
        className={clsx(
          "story-card glass rounded-3xl overflow-hidden h-full flex flex-col",
          featured && "ring-2 ring-amber-300/50"
        )}
      >
        {/* Decorative top bar */}
        <div className="h-1 w-full bg-gradient-to-r from-amber-300 via-amber-400 to-sky-400" />

        <div className="p-6 flex flex-col flex-1 gap-3">
          {/* Header row */}
          <div className="flex items-start justify-between gap-2">
            <span
              className={clsx(
                "text-xs font-medium px-2.5 py-1 rounded-full border",
                CATEGORY_COLORS[story.category] ?? CATEGORY_COLORS["Other"]
              )}
            >
              <Tag size={10} className="inline mr-1" />
              {story.category}
            </span>
            {featured && (
              <span className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                <Sparkles size={12} />
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className="font-display text-xl font-semibold text-stone-800 leading-snug
                       group-hover:text-amber-700 transition-colors line-clamp-2"
          >
            {story.title}
          </h3>

          {/* Excerpt */}
          <p className="text-stone-500 text-sm leading-relaxed line-clamp-3 flex-1">
            {story.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-stone-100 mt-auto">
            <div>
              <p className="text-stone-700 text-sm font-medium">
                {story.author_name || "Anonymous"}
              </p>
              <p className="text-stone-400 text-xs flex items-center gap-1 mt-0.5">
                <Calendar size={10} />
                {formattedDate}
              </p>
            </div>

            {/* Reactions */}
            <div className="flex items-center gap-3 text-stone-400 text-xs">
              <span className="flex items-center gap-1">
                <Heart size={13} className="text-rose-400" />
                {story.likes}
              </span>
              <span className="flex items-center gap-1">
                <HandHeart size={13} className="text-sky-400" />
                {story.prayers}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ── Skeleton ─────────────────────────────────────────────────────────────────

export function StoryCardSkeleton() {
  return (
    <div className="glass rounded-3xl overflow-hidden">
      <div className="h-1 w-full bg-stone-200" />
      <div className="p-6 space-y-3">
        <div className="skeleton h-5 w-24 rounded-full" />
        <div className="skeleton h-6 w-4/5 rounded-lg" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-4 w-5/6 rounded" />
        <div className="flex justify-between pt-3 border-t border-stone-100">
          <div className="skeleton h-4 w-20 rounded" />
          <div className="skeleton h-4 w-16 rounded" />
        </div>
      </div>
    </div>
  );
}
