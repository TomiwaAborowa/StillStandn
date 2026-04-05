import { BookOpen, Star } from "lucide-react";
import { getDailyQuote } from "@/lib/quotes";

export default function DailyEncouragement() {
  const quote = getDailyQuote();

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #fef9e7 0%, #fffbeb 40%, #e0f2fe 100%)",
            border: "1px solid rgba(245,158,11,0.2)",
          }}
        >
          {/* Decorative stars */}
          <Star size={60} className="absolute -top-4 -right-4 text-amber-200 opacity-30" fill="currentColor" />
          <Star size={30} className="absolute bottom-4 left-4 text-sky-200 opacity-40" fill="currentColor" />

          <div className="relative p-8 sm:p-12 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest mb-6">
              <BookOpen size={12} />
              Daily Encouragement
            </div>

            <blockquote className="font-display text-2xl sm:text-3xl italic text-stone-800 leading-relaxed mb-4">
              "{quote.text}"
            </blockquote>

            <p className="text-amber-600 font-semibold text-base">{quote.ref}</p>
            <p className="text-stone-500 text-sm mt-1">— {quote.author}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
