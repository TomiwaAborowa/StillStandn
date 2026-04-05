import Link from "next/link";
import { Calendar, Users, MessageCircle, ArrowRight, MapPin } from "lucide-react";
import { getDailyQuote } from "@/lib/quotes";

export const metadata = {
  title: "Community — Still Stand'n",
  description: "Connect with our global community of resilience, faith, and hope.",
};

const events = [
  {
    title:    "Virtual Prayer Night",
    date:     "Every Thursday • 8 PM EST",
    desc:     "An open, non-denominational space to pray together and encourage one another.",
    type:     "Recurring",
    icon:     "🕯️",
  },
  {
    title:    "Story Circle — Loss & Grief",
    date:     "Jan 25, 2025 • 7 PM EST",
    desc:     "A safe space for those navigating grief to share, listen, and find comfort in community.",
    type:     "Upcoming",
    icon:     "🌿",
  },
  {
    title:    "Financial Freedom Workshop",
    date:     "Feb 8, 2025 • 2 PM EST",
    desc:     "Practical faith-based financial guidance from those who have walked through breakthrough.",
    type:     "Upcoming",
    icon:     "💡",
  },
  {
    title:    "Addiction Recovery Support Group",
    date:     "Every Monday • 6 PM EST",
    desc:     "Weekly gathering for those in recovery and their families. Confidential and compassionate.",
    type:     "Recurring",
    icon:     "🌱",
  },
];

const encouragements = [
  {
    text:   "I prayed for every person reading this. You are seen, you are loved, and you are not alone.",
    author: "Grace T.",
    time:   "2 hours ago",
  },
  {
    text:   "To whoever is about to give up tonight — please don't. I almost did 3 years ago and I'm so glad I didn't. It does get better.",
    author: "Michael R.",
    time:   "Yesterday",
  },
  {
    text:   "Reading these stories reminds me why I'm still here. Thank you for this community.",
    author: "Fatima A.",
    time:   "2 days ago",
  },
  {
    text:   "My pastor says the darkest hour is just before the dawn. I believe that now in a way I never did before.",
    author: "James P.",
    time:   "3 days ago",
  },
];

export default function CommunityPage() {
  const quote = getDailyQuote();

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-amber-600 text-sm font-medium uppercase tracking-widest mb-2">
            <Users size={12} className="inline mr-1" />
            Our Community
          </p>
          <h1 className="font-display text-5xl sm:text-6xl text-stone-900 mb-4">
            Better{" "}
            <span className="text-gradient-sky italic">Together</span>
          </h1>
          <p className="text-stone-500 max-w-xl mx-auto">
            Resilience grows stronger in community. Join events, share encouragement, and be
            part of something larger than yourself.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Events column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Calendar size={18} className="text-amber-500" />
              <h2 className="font-display text-2xl text-stone-900">Events & Gatherings</h2>
            </div>
            <div className="space-y-4">
              {events.map((ev) => (
                <div
                  key={ev.title}
                  className="glass rounded-2xl p-6 flex gap-4 hover:shadow-lg transition-all
                             duration-300 hover:-translate-y-0.5 group"
                >
                  <span className="text-3xl shrink-0">{ev.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-stone-800 group-hover:text-amber-700 transition-colors">
                        {ev.title}
                      </h3>
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${
                          ev.type === "Recurring"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-sky-50 text-sky-700 border border-sky-200"
                        }`}
                      >
                        {ev.type}
                      </span>
                    </div>
                    <p className="text-amber-600 text-sm font-medium mt-1 flex items-center gap-1">
                      <MapPin size={11} />
                      {ev.date} · Virtual
                    </p>
                    <p className="text-stone-500 text-sm mt-2 leading-relaxed">{ev.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Daily quote */}
            <div className="glass-gold rounded-2xl p-6">
              <p className="text-amber-600 text-xs font-semibold uppercase tracking-wider mb-3">
                Today's Word
              </p>
              <blockquote className="font-display text-base italic text-stone-700 leading-relaxed mb-2">
                "{quote.text}"
              </blockquote>
              <p className="text-amber-600 text-sm font-medium">— {quote.ref}</p>
            </div>

            {/* Encouragements */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle size={16} className="text-amber-500" />
                <h3 className="font-display text-xl text-stone-900">Encouragements</h3>
              </div>
              <div className="space-y-3">
                {encouragements.map((e, i) => (
                  <div key={i} className="glass rounded-2xl p-4">
                    <p className="text-stone-600 text-sm leading-relaxed mb-2 italic">
                      "{e.text}"
                    </p>
                    <div className="flex justify-between text-xs text-stone-400">
                      <span className="font-medium text-stone-600">{e.author}</span>
                      <span>{e.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="glass rounded-2xl p-6 text-center border border-amber-200/50">
              <p className="text-stone-700 font-medium mb-1">Ready to contribute?</p>
              <p className="text-stone-500 text-sm mb-4">
                Your story could be the one that changes everything for someone today.
              </p>
              <Link
                href="/submit"
                className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full
                           bg-gradient-to-r from-amber-400 to-amber-500 text-white text-sm font-medium
                           shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Share Your Story <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
