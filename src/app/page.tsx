import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import TestimonialSection from "@/components/TestimonialSection";
import DailyEncouragement from "@/components/DailyEncouragement";
import StoryCard from "@/components/StoryCard";
import { mockStories } from "@/lib/mockData";

export default function HomePage() {
  const featured = mockStories.filter((s) => s.is_featured).slice(0, 3);

  return (
    <>
      <HeroSection />

      {/* Daily Encouragement */}
      <DailyEncouragement />

      {/* Featured Stories */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-amber-600 text-sm font-medium uppercase tracking-widest mb-2">
                <Sparkles size={12} className="inline mr-1" />
                Featured
              </p>
              <h2 className="font-display text-4xl sm:text-5xl text-stone-900">
                Stories That{" "}
                <span className="text-gradient-gold italic">Move Us</span>
              </h2>
            </div>
            <Link
              href="/stories"
              className="flex items-center gap-1 text-amber-600 font-medium hover:text-amber-700
                         hover:gap-2 transition-all text-sm shrink-0"
            >
              View all stories <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((story) => (
              <StoryCard key={story.id} story={story} featured />
            ))}
          </div>
        </div>
      </section>

      {/* Why this matters */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-transparent to-amber-50/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl sm:text-5xl text-stone-900 mb-4">
              Why We{" "}
              <span className="text-gradient-sky italic">Share</span>
            </h2>
            <p className="text-stone-500 max-w-xl mx-auto">
              There is healing in testimony. When we speak our survival aloud, we give
              someone else permission to believe they can survive too.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🕊️",
                title: "You Are Not Alone",
                desc:  "No valley is too deep, no struggle too dark. Thousands have walked before you and are still here.",
              },
              {
                icon: "🌱",
                title: "Your Story Has Power",
                desc:  "What you've overcome is not just your story — it's someone else's roadmap to hope.",
              },
              {
                icon: "✨",
                title: "Grace Is Real",
                desc:  "This community believes in second chances, fresh starts, and the power of divine grace to restore.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="glass rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300
                           hover:-translate-y-1 group"
              >
                <span className="text-4xl mb-4 block group-hover:animate-float">{item.icon}</span>
                <h3 className="font-display text-xl font-semibold text-stone-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSection />

      {/* CTA banner */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="relative rounded-3xl p-12 sm:p-16 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #fbbf24 0%, #f59e0b 40%, #0ea5e9 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white mb-4 relative z-10">
              Your Story Deserves to Be Told
            </h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto relative z-10">
              You don't need perfect grammar or a finished journey. You just need the
              courage to begin. We'll hold the rest.
            </p>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 bg-white text-amber-600 font-semibold
                         px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1
                         transition-all duration-200 relative z-10"
            >
              Share Your Story <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
