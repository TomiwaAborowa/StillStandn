"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Heart, HandHeart, Sparkles, Calendar, Tag,
  ArrowLeft, Share2, CheckCheck,
} from "lucide-react";
import { mockStories } from "@/lib/mockData";

const REACTION_LABELS = {
  likes:          { icon: Heart,     label: "Like",      active: "text-rose-500",  bg: "bg-rose-50  border-rose-200" },
  prayers:        { icon: HandHeart, label: "Pray",      active: "text-sky-500",   bg: "bg-sky-50   border-sky-200" },
  encouragements: { icon: Sparkles,  label: "Encourage", active: "text-amber-500", bg: "bg-amber-50 border-amber-200" },
} as const;

type Reaction = keyof typeof REACTION_LABELS;

export default function StoryDetailPage({ params }: { params: { id: string } }) {
  const story = mockStories.find((s) => s.id === params.id);
  if (!story) notFound();

  const [reactions, setReactions] = useState({
    likes:          story.likes,
    prayers:        story.prayers,
    encouragements: story.encouragements,
  });
  const [reacted,  setReacted]  = useState<Set<Reaction>>(new Set());
  const [copied,   setCopied]   = useState(false);

  const handleReact = async (type: Reaction) => {
    if (reacted.has(type)) return;
    setReactions((r) => ({ ...r, [type]: r[type] + 1 }));
    setReacted((r) => new Set(r).add(type));

    try {
      const { reactToStory } = await import("@/lib/supabase");
      await reactToStory(story.id, type);
    } catch { /* demo mode */ }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch { /* silent */ }
  };

  const formattedDate = new Date(story.created_at).toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });

  const paragraphs = story.content.split("\n\n").filter(Boolean);

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <Link
          href="/stories"
          className="inline-flex items-center gap-1.5 text-stone-500 hover:text-amber-600
                     text-sm font-medium transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Stories
        </Link>

        {/* Category */}
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700
                           bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
            <Tag size={10} />
            {story.category}
          </span>
          {story.is_featured && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-sky-700
                             bg-sky-50 border border-sky-200 rounded-full px-3 py-1">
              <Sparkles size={10} />
              Featured Story
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-stone-900
                       leading-tight mb-6">
          {story.title}
        </h1>

        {/* Author + date */}
        <div className="flex items-center justify-between gap-4 mb-10 pb-6 border-b border-stone-200">
          <div>
            <p className="font-semibold text-stone-800">
              {story.author_name || "Anonymous"}
            </p>
            <p className="text-stone-400 text-sm flex items-center gap-1 mt-0.5">
              <Calendar size={12} />
              {formattedDate}
            </p>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-stone-500 hover:text-amber-600
                       text-sm font-medium transition-colors glass rounded-full px-4 py-2"
          >
            {copied ? <CheckCheck size={15} className="text-emerald-500" /> : <Share2 size={15} />}
            {copied ? "Copied!" : "Share"}
          </button>
        </div>

        {/* Story body */}
        <div className="story-prose mb-12">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
          <span className="text-amber-400 text-lg">✦</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
        </div>

        {/* Reactions */}
        <div className="glass rounded-3xl p-8 text-center mb-10">
          <p className="text-stone-600 font-medium mb-6">
            Did this story move you? Let {story.author_name || "the author"} know.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {(Object.entries(REACTION_LABELS) as [Reaction, typeof REACTION_LABELS[Reaction]][]).map(
              ([type, cfg]) => {
                const Icon     = cfg.icon;
                const hasReacted = reacted.has(type);
                return (
                  <button
                    key={type}
                    onClick={() => handleReact(type)}
                    disabled={hasReacted}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full border
                                text-sm font-medium transition-all duration-200
                                ${hasReacted
                                  ? `${cfg.bg} ${cfg.active} border-current scale-105`
                                  : "glass border-stone-200 text-stone-600 hover:scale-105 hover:border-amber-300"
                                }`}
                  >
                    <Icon size={18} fill={hasReacted ? "currentColor" : "none"} />
                    <span>{cfg.label}</span>
                    <span className="font-semibold">{reactions[type]}</span>
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Encouragement note */}
        <div className="glass-gold rounded-3xl p-8 text-center">
          <p className="font-display text-xl italic text-stone-700 mb-2">
            "Your story is not over. The best chapters are still being written."
          </p>
          <p className="text-amber-600 text-sm font-medium">— The Still Stand&apos;n Community</p>
          <div className="mt-6">
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                         bg-gradient-to-r from-amber-400 to-amber-500 text-white text-sm font-semibold
                         shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Share Your Own Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
