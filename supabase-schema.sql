-- ============================================================
-- Still Stand'n — Supabase Database Schema
-- Run this in your Supabase SQL Editor to set up the project
-- ============================================================

-- 1. Create the stories table
CREATE TABLE IF NOT EXISTS stories (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title            TEXT NOT NULL,
  content          TEXT NOT NULL,
  excerpt          TEXT NOT NULL,
  author_name      TEXT NOT NULL DEFAULT 'Anonymous',
  category         TEXT NOT NULL DEFAULT 'Other',
  image_url        TEXT,
  likes            INTEGER NOT NULL DEFAULT 0,
  prayers          INTEGER NOT NULL DEFAULT 0,
  encouragements   INTEGER NOT NULL DEFAULT 0,
  is_featured      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER stories_updated_at
  BEFORE UPDATE ON stories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 3. Row-Level Security — allow anonymous reads and inserts
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

-- Anyone can read published stories
CREATE POLICY "stories_select_public"
  ON stories FOR SELECT
  USING (true);

-- Anyone can submit a story (no auth required)
CREATE POLICY "stories_insert_public"
  ON stories FOR INSERT
  WITH CHECK (true);

-- Only authenticated users (admins) can update
CREATE POLICY "stories_update_authenticated"
  ON stories FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Only authenticated users (admins) can delete
CREATE POLICY "stories_delete_authenticated"
  ON stories FOR DELETE
  USING (auth.role() = 'authenticated');

-- 4. Indexes for common queries
CREATE INDEX stories_category_idx    ON stories(category);
CREATE INDEX stories_created_at_idx  ON stories(created_at DESC);
CREATE INDEX stories_is_featured_idx ON stories(is_featured) WHERE is_featured = TRUE;
CREATE INDEX stories_title_search_idx ON stories USING gin(to_tsvector('english', title || ' ' || content));

-- 5. Seed with sample data (optional — remove in production)
INSERT INTO stories (title, content, excerpt, author_name, category, likes, prayers, encouragements, is_featured)
VALUES
(
  'Through the Valley — How I Found Peace After Loss',
  E'The phone call came at 3:14 AM on a Tuesday. I remember the exact time because I had been lying awake, somehow sensing that something was about to change. My mother had passed.\n\nFor months I walked through a fog so thick I could barely breathe. My faith, which had always felt like solid ground beneath my feet, suddenly seemed like sand.\n\nBut one morning, about six months after her passing, I sat in her favorite chair — the one by the east window where she used to watch the sunrise — and the light came in differently. It was golden and warm and it filled the whole room.\n\nToday I run a grief support group at my local church. The valley is not the destination. You''re just passing through. Keep walking. Keep standing.',
  'The phone call came at 3:14 AM on a Tuesday. I remember the exact time because I had been lying awake, somehow sensing that something was about to change…',
  'Evelyn M.',
  'Loss & Grief',
  142, 89, 57,
  TRUE
),
(
  'Fifteen Years Sober — Grace Found Me in the Darkest Hour',
  E'I never thought I''d be someone who shares their story publicly. I spent so many years hiding — in bottles, in excuses, in shame. But I''m fifteen years sober today.\n\nA nurse named Sandra sat with me on her break and prayed over me. Just quietly, gently. She didn''t ask permission. She just held my hand and spoke life over me.\n\nFifteen years later I am a counselor in that same program. I am a father, a husband, a man of faith. I am still standing — not by my own strength, but by grace I did nothing to deserve and everything to be grateful for.',
  'I never thought I''d be someone who shares their story publicly. I spent so many years hiding — in bottles, in excuses, in shame…',
  'Marcus T.',
  'Addiction & Recovery',
  203, 167, 94,
  TRUE
);
