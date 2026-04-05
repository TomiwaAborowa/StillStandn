import StoryForm from "@/components/StoryForm";
import { Feather, Shield, Heart } from "lucide-react";

export const metadata = {
  title: "Share Your Story — Still Stand'n",
  description: "Share your testimony of faith, resilience, and hope with our community.",
};

export default function SubmitPage() {
  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full
                          bg-gradient-to-br from-amber-100 to-amber-200 mb-6 animate-float">
            <Feather size={28} className="text-amber-600" />
          </div>
          <p className="text-amber-600 text-sm font-medium uppercase tracking-widest mb-2">
            Your Testimony
          </p>
          <h1 className="font-display text-5xl sm:text-6xl text-stone-900 mb-4">
            Share Your{" "}
            <span className="text-gradient-gold italic">Story</span>
          </h1>
          <p className="text-stone-500 leading-relaxed max-w-lg mx-auto">
            You don't need a finished journey — just a willing heart. Your words may be the
            lifeline someone else is desperately searching for.
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {[
            { icon: Shield, text: "Anonymous sharing allowed" },
            { icon: Heart,  text: "Reviewed with care"        },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 glass rounded-full px-4 py-2
                         text-stone-600 text-xs font-medium"
            >
              <Icon size={13} className="text-amber-500" />
              {text}
            </div>
          ))}
        </div>

        {/* Form */}
        <StoryForm />

        {/* Encouragement note */}
        <div className="mt-8 text-center text-stone-400 text-sm">
          <p>
            "Being vulnerable is not weakness — it is the birthplace of connection and courage."
          </p>
          <p className="mt-1 text-amber-500 font-medium">— Brené Brown</p>
        </div>
      </div>
    </div>
  );
}
