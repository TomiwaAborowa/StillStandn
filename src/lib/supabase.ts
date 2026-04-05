import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// ── Types ────────────────────────────────────────────────────────────────────

export type Category =
  | "Faith & Spirituality"
  | "Health & Healing"
  | "Loss & Grief"
  | "Family & Relationships"
  | "Addiction & Recovery"
  | "Financial Breakthrough"
  | "Mental Health"
  | "Other";

export interface Story {
  id:          string;
  title:       string;
  content:     string;
  excerpt:     string;
  author_name: string;
  category:    Category;
  image_url:   string | null;
  likes:       number;
  prayers:     number;
  encouragements: number;
  created_at:  string;
  is_featured: boolean;
}

export interface StoryInsert {
  title:       string;
  content:     string;
  author_name: string;
  category:    Category;
  image_url?:  string | null;
}

// ── Story helpers ────────────────────────────────────────────────────────────

export async function getStories(opts?: {
  category?: Category;
  search?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Story[]> {
  let q = supabase
    .from("stories")
    .select("*")
    .order("created_at", { ascending: false });

  if (opts?.featured) q = q.eq("is_featured", true);
  if (opts?.category)  q = q.eq("category", opts.category);
  if (opts?.search)    q = q.ilike("title", `%${opts.search}%`);
  if (opts?.limit)     q = q.limit(opts.limit);

  const { data, error } = await q;
  if (error) throw error;
  return data as Story[];
}

export async function getStory(id: string): Promise<Story | null> {
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as Story;
}

export async function submitStory(story: StoryInsert): Promise<Story> {
  const excerpt = story.content.slice(0, 200) + (story.content.length > 200 ? "…" : "");
  const { data, error } = await supabase
    .from("stories")
    .insert([{ ...story, excerpt, likes: 0, prayers: 0, encouragements: 0, is_featured: false }])
    .select()
    .single();
  if (error) throw error;
  return data as Story;
}

export async function reactToStory(
  id: string,
  reaction: "likes" | "prayers" | "encouragements"
): Promise<void> {
  const { data } = await supabase.from("stories").select(reaction).eq("id", id).single();
  if (!data) return;
  const current = (data as Record<string, number>)[reaction] ?? 0;
  await supabase.from("stories").update({ [reaction]: current + 1 }).eq("id", id);
}
