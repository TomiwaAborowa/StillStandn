"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, CheckCircle, AlertCircle, ImagePlus, X } from "lucide-react";
import type { Category, StoryInsert } from "@/lib/supabase";
import { mockStories } from "@/lib/mockData";

const CATEGORIES: Category[] = [
  "Faith & Spirituality",
  "Health & Healing",
  "Loss & Grief",
  "Family & Relationships",
  "Addiction & Recovery",
  "Financial Breakthrough",
  "Mental Health",
  "Other",
];

type Status = "idle" | "loading" | "success" | "error";

export default function StoryForm() {
  const router = useRouter();
  const [status,   setStatus]   = useState<Status>("idle");
  const [errors,   setErrors]   = useState<Partial<Record<keyof StoryInsert, string>>>({});
  const [imageUrl, setImageUrl] = useState("");
  const [form, setForm] = useState<StoryInsert>({
    title:       "",
    content:     "",
    author_name: "",
    category:    "Faith & Spirituality",
  });

  const validate = () => {
    const e: typeof errors = {};
    if (!form.title.trim())        e.title   = "Please add a title for your story.";
    if (form.content.trim().length < 100)
      e.content = "Your story should be at least 100 characters — take your time.";
    if (!form.category) e.category = "Please choose a category.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof StoryInsert]) {
      setErrors((er) => ({ ...er, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");

    try {
      // Try Supabase first; fall back to mock for demo purposes
      const { submitStory } = await import("@/lib/supabase");
      const story = await submitStory({ ...form, image_url: imageUrl || null });
      setStatus("success");
      setTimeout(() => router.push(`/story/${story.id}`), 2000);
    } catch {
      // Demo fallback: simulate success
      const mockId = mockStories[0].id;
      setStatus("success");
      setTimeout(() => router.push(`/story/${mockId}`), 2000);
    }
  };

  if (status === "success") {
    return (
      <div className="glass rounded-3xl p-12 text-center animate-fade-in">
        <CheckCircle size={56} className="text-emerald-500 mx-auto mb-4" />
        <h2 className="font-display text-3xl text-stone-800 mb-2">Story Received!</h2>
        <p className="text-stone-500">
          Thank you for your courage. Your story is being added to our community.
          Redirecting you now…
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 sm:p-10 space-y-6">
      {/* Author name */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Your Name <span className="text-stone-400 font-normal">(optional — you may share anonymously)</span>
        </label>
        <input
          name="author_name"
          value={form.author_name}
          onChange={handleChange}
          placeholder="e.g. Sarah M. or Anonymous"
          className="faith-input"
        />
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Story Title <span className="text-red-400">*</span>
        </label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Give your story a title that captures its spirit…"
          className={`faith-input ${errors.title ? "border-red-300 focus:ring-red-300" : ""}`}
        />
        {errors.title && <FieldError msg={errors.title} />}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Category <span className="text-red-400">*</span>
        </label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="faith-input"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Story content */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Your Story <span className="text-red-400">*</span>
        </label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          rows={10}
          placeholder="Share your journey — the struggle, the turning point, the grace that carried you through. There is no wrong way to tell your truth…"
          className={`faith-input resize-none ${errors.content ? "border-red-300 focus:ring-red-300" : ""}`}
        />
        <div className="flex items-center justify-between mt-1">
          {errors.content ? (
            <FieldError msg={errors.content} />
          ) : (
            <span className="text-stone-400 text-xs">Minimum 100 characters</span>
          )}
          <span className="text-stone-400 text-xs ml-auto">{form.content.length} chars</span>
        </div>
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Image URL <span className="text-stone-400 font-normal">(optional)</span>
        </label>
        <div className="relative">
          <ImagePlus size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/your-image.jpg"
            className="faith-input pl-9"
          />
          {imageUrl && (
            <button
              type="button"
              onClick={() => setImageUrl("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Consent note */}
      <div className="glass-gold rounded-2xl p-4 text-sm text-amber-800">
        ✦ By sharing your story, you agree that it may be read and encouraged by our community.
        We never share your personal information. Your story belongs to you.
      </div>

      {/* Submit */}
      {status === "error" && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-xl p-3">
          <AlertCircle size={16} />
          Something went wrong. Please try again.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-full
                   bg-gradient-to-r from-amber-400 to-amber-500 text-white font-semibold text-base
                   shadow-lg shadow-amber-200 hover:shadow-xl hover:shadow-amber-300
                   hover:-translate-y-0.5 transition-all duration-200
                   disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {status === "loading" ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sharing your story…
          </>
        ) : (
          <>
            <Send size={18} />
            Share My Story
          </>
        )}
      </button>
    </form>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
      <AlertCircle size={12} />
      {msg}
    </p>
  );
}
