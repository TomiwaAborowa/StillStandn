"use client";

import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "Reading others' stories here gave me the courage to share my own for the first time. I had carried my pain alone for 12 years. This community changed that.",
    name: "Anita R.",
    location: "Atlanta, GA",
  },
  {
    text: "I was at my lowest when I stumbled onto this site at 2 AM. I read three stories and cried happy tears. I woke up the next morning ready to fight again.",
    name: "James P.",
    location: "Lagos, Nigeria",
  },
  {
    text: "Still Stand'n is more than a website — it's a reminder that the struggles I've walked through aren't wasted. They become fuel for someone else's journey.",
    name: "Maria L.",
    location: "Houston, TX",
  },
  {
    text: "I submitted my story not knowing if anyone would read it. Fifty prayers and forty likes later, I felt seen in a way I hadn't felt in years.",
    name: "David O.",
    location: "London, UK",
  },
];

export default function TestimonialSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((a) => (a + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[active];

  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-amber-600 text-sm font-medium uppercase tracking-widest mb-3">
            Community Voices
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-stone-900">
            Words from the{" "}
            <span className="text-gradient-gold italic">Standing</span>
          </h2>
        </div>

        {/* Card */}
        <div className="relative glass rounded-3xl p-8 sm:p-12 text-center overflow-hidden">
          {/* bg decoration */}
          <div
            className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #fde68a, transparent)" }}
          />
          <div
            className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #bae6fd, transparent)" }}
          />

          <Quote size={40} className="text-amber-300 mx-auto mb-6 opacity-60" />

          <blockquote
            key={active}
            className="font-display text-xl sm:text-2xl italic text-stone-700 leading-relaxed mb-8 animate-fade-in"
          >
            "{t.text}"
          </blockquote>

          <div className="animate-fade-in" key={`name-${active}`}>
            <p className="font-semibold text-stone-800">{t.name}</p>
            <p className="text-stone-400 text-sm">{t.location}</p>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active
                    ? "bg-amber-400 w-8"
                    : "bg-stone-300 w-2 hover:bg-amber-300"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
