# Still Stand'n 🌟

> *A faith-based community platform for sharing stories of resilience, hope, and divine grace.*

Still Stand'n is a warm, beautifully designed web application where individuals can share personal testimonies of overcoming life's challenges, inspire others, and find encouragement. Built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**, backed by **Supabase**.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🏠 **Landing Page** | Hero section, featured stories, testimonials, daily encouragement |
| 📖 **Stories Page** | Browse all stories with search + category filtering |
| 📝 **Story Detail** | Full story view with like / pray / encourage reactions |
| ✍️ **Submit Story** | Form with validation — anonymous submission supported |
| 👥 **Community Page** | Events, encouragement posts, daily word |
| 📿 **Daily Encouragement** | Scripture-based quote that rotates daily |
| 💎 **Glassmorphism UI** | Soft golds, sky blues, cream — warm & inviting |
| ✨ **Animations** | Parallax hero, floating particles, smooth transitions |
| 💀 **Loading Skeletons** | Graceful loading states for all data |
| 📱 **Fully Responsive** | Mobile-first, beautiful on all screen sizes |
| 🔒 **Anonymous Posts** | No sign-up required to share your story |

---

## 🗂️ Project Structure

```
still-standn/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← Root layout (Navbar + Footer)
│   │   ├── globals.css         ← Global styles, design tokens
│   │   ├── page.tsx            ← Home / Landing page
│   │   ├── not-found.tsx       ← 404 page
│   │   ├── stories/
│   │   │   └── page.tsx        ← Stories listing with search/filter
│   │   ├── story/
│   │   │   └── [id]/
│   │   │       └── page.tsx    ← Story detail with reactions
│   │   ├── submit/
│   │   │   └── page.tsx        ← Submit story page
│   │   └── community/
│   │       └── page.tsx        ← Community events & encouragements
│   │
│   ├── components/
│   │   ├── Navbar.tsx          ← Responsive navbar with scroll effect
│   │   ├── Footer.tsx          ← Footer with links & scripture
│   │   ├── HeroSection.tsx     ← Animated hero with parallax
│   │   ├── StoryCard.tsx       ← Story card + skeleton
│   │   ├── StoryForm.tsx       ← Validated submission form
│   │   ├── TestimonialSection.tsx ← Auto-rotating testimonials
│   │   └── DailyEncouragement.tsx ← Daily scripture quote
│   │
│   └── lib/
│       ├── supabase.ts         ← Supabase client + all DB helpers
│       ├── quotes.ts           ← Encouragement quotes data
│       └── mockData.ts         ← Fallback data for demo/dev
│
├── supabase-schema.sql         ← Run this in Supabase SQL Editor
├── .env.local.example          ← Environment variable template
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-username/still-standn.git
cd still-standn
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free project
2. In your Supabase dashboard, open the **SQL Editor**
3. Paste and run the contents of `supabase-schema.sql`
4. Go to **Project Settings → API** and copy your URL and anon key

### 3. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

> **Note:** The app ships with mock data and works fully without Supabase configured. All pages render, stories display, and the form shows a success state. Connect Supabase when ready for real persistence.

---

## 🗄️ Database Schema

The core `stories` table:

| Column | Type | Description |
|---|---|---|
| `id` | UUID | Primary key |
| `title` | TEXT | Story title |
| `content` | TEXT | Full story text |
| `excerpt` | TEXT | Auto-generated 200-char preview |
| `author_name` | TEXT | Display name (defaults to "Anonymous") |
| `category` | TEXT | One of 8 categories |
| `image_url` | TEXT? | Optional hero image |
| `likes` | INTEGER | Like reaction count |
| `prayers` | INTEGER | Prayer reaction count |
| `encouragements` | INTEGER | Encouragement reaction count |
| `is_featured` | BOOLEAN | Show in featured section |
| `created_at` | TIMESTAMPTZ | Submission timestamp |

**Row-Level Security** is enabled:
- ✅ Anyone can **read** all stories
- ✅ Anyone can **insert** a story (anonymous submissions)
- 🔒 Only authenticated admins can **update** or **delete**

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| **Gold** | `#f59e0b` / `#fbbf24` | Primary accent, CTAs, icons |
| **Sky** | `#0ea5e9` / `#38bdf8` | Secondary accent, gradients |
| **Cream** | `#faf8f4` | Background |
| **Sand** | `#f5f0e8` | Section backgrounds |
| **Display font** | Cormorant Garamond | Headings, quotes |
| **Body font** | DM Sans | All body text |

**Key CSS classes:**
- `.glass` — White glassmorphism card
- `.glass-gold` — Warm gold tint glass
- `.glass-sky` — Sky blue tint glass
- `.text-gradient-gold` — Gradient gold text
- `.font-display` — Display/serif font
- `.story-card` — Hover lift card
- `.faith-input` — Styled form input
- `.skeleton` — Shimmer loading state

---

## 🔧 Extending the App

### Adding Real-time Story Updates

```typescript
// In your stories page, subscribe to new inserts:
const channel = supabase
  .channel('stories')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'stories' }, (payload) => {
    setStories((prev) => [payload.new as Story, ...prev]);
  })
  .subscribe();
```

### Adding Image Upload

```typescript
// Upload to Supabase Storage:
const { data } = await supabase.storage
  .from('story-images')
  .upload(`${Date.now()}-${file.name}`, file);

const imageUrl = supabase.storage.from('story-images').getPublicUrl(data.path).data.publicUrl;
```

### Adding Story Moderation

Set `is_featured` and add an `is_approved` flag. Update the RLS policy so only approved stories appear in public queries.

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Add your environment variables in the Vercel dashboard under **Settings → Environment Variables**.

### Other Platforms

The app is a standard Next.js 14 application and deploys to any platform supporting Node.js — Netlify, Railway, Render, etc.

---

## 📖 Categories

- Faith & Spirituality
- Health & Healing
- Loss & Grief
- Family & Relationships
- Addiction & Recovery
- Financial Breakthrough
- Mental Health
- Other

---

## 🙏 Scripture & Inspiration

The Daily Encouragement section rotates through 10 hand-curated scripture verses, cycling daily based on the day of year — no database query needed, always fresh.

---

## 📄 License

MIT License — share freely, use it to bless others.

---

*"And we know that in all things God works for the good of those who love him." — Romans 8:28*
