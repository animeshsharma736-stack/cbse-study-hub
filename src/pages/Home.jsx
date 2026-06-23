<h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-red-500">
  HELLO ANIMESH 🚀
</h1>import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Target, BookOpen, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const features = [
  {
    icon: Sparkles,
    title: "AI Tutor",
    description: "Ask any CBSE doubt. Get step-by-step explanations powered by Claude.",
    color: "#DDD6FE",
    link: "/tutor",
  },
  {
    icon: Target,
    title: "Focus & Planner",
    description: "Build a study streak. Block distractions. Plan your day.",
    color: "#A7F3D0",
    link: "/focus",
  },
  {
    icon: BookOpen,
    title: "CBSE-First",
    description: "Every answer aligns to NCERT. Class 9-12. All subjects.",
    color: "#FDE68A",
    link: "/about",
  },
];

export default function Home() {
  const { user, login } = useAuth();

  return (
    <div className="space-y-16" data-testid="home-page">
      {/* Hero */}
      <section className="grid lg:grid-cols-12 gap-8 items-center py-8">
        <div className="lg:col-span-7 space-y-6">
          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05]">
            Study smarter,<br />
            <span className="bg-[#DDD6FE] border-2 border-black px-3 inline-block rounded-lg">
              not harder.
            </span>
          </h1>
          <p className="text-lg text-neutral-700 max-w-xl">
            Your AI tutor answers every doubt. Your planner keeps you accountable. Together, they make CBSE Class 9-12 feel less lonely.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            {user ? (
              <>
                <Link to="/tutor" className="nb-btn nb-btn-primary !py-3 !px-6 text-base">
                  <Sparkles className="w-5 h-5" strokeWidth={2.5} /> Ask a Doubt
                </Link>
                <Link to="/focus" className="nb-btn !py-3 !px-6 text-base">
                  <Target className="w-5 h-5" strokeWidth={2.5} /> Plan Today
                </Link>
              </>
            ) : (
              <>
                <button onClick={login} className="nb-btn nb-btn-primary !py-3 !px-6 text-base">
                  Sign in with Google
                </button>
                <Link to="/about" className="nb-btn !py-3 !px-6 text-base">
                  Learn more <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="nb-card p-8 bg-[#BAE6FD]">
            <div className="font-display font-black text-4xl mb-2">Built for you</div>
            <p className="text-sm text-neutral-700">
              No fluff. No app fatigue. Just a tutor, a planner, and focus mode — all in one tab.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6">
        {features.map((f) => (
          <Link key={f.link} to={f.link} className="nb-card p-6 hover:scale-105 transition-transform">
            <div className="w-12 h-12 rounded-xl border-2 border-black flex items-center justify-center mb-4" style={{ background: f.color }}>
              <f.icon className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <h3 className="font-display font-bold text-xl mb-2">{f.title}</h3>
            <p className="text-sm text-neutral-700">{f.description}</p>
          </Link>
        ))}
      </section>

      {/* CTA */}
      <section className="nb-card p-8 bg-[#0A0A0A] text-white text-center" data-testid="home-cta">
        <h2 className="font-display font-black text-3xl mb-3">Ready to study smarter?</h2>
        <p className="mb-6 text-neutral-200">Join hundreds of CBSE students building their streak.</p>
        {!user && (
          <button onClick={login} className="nb-btn nb-btn-primary">
            Sign in with Google
          </button>
        )}
      </section>
    </div>
  );
}
