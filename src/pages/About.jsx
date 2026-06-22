import React from "react";
import { GraduationCap, Heart, Sparkles, Target } from "lucide-react";

const values = [
  {
    icon: GraduationCap,
    title: "CBSE-first, always",
    body: "Every answer aligns to NCERT and the CBSE Class 9-12 syllabus — no random internet noise.",
    color: "#DDD6FE",
  },
  {
    icon: Sparkles,
    title: "Real AI, real reasoning",
    body: "Powered by Claude Sonnet 4.5 — step-by-step explanations, not copy-paste textbook lines.",
    color: "#A7F3D0",
  },
  {
    icon: Target,
    title: "Anti-procrastination by design",
    body: "Daily planner, streaks and a distraction blocker built into the same tab as your tutor.",
    color: "#FDE68A",
  },
  {
    icon: Heart,
    title: "Made for students like you",
    body: "Designed with feedback from boards aspirants. Less corporate, more 'study with friends'.",
    color: "#FECACA",
  },
];

export default function About() {
  return (
    <div className="space-y-12" data-testid="about-page">
      <section className="grid lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-black bg-[#BAE6FD] font-semibold text-sm">
            About Us
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
            We built CBSE Study Hub because<br />
            <span className="bg-[#DDD6FE] border-2 border-black px-3 inline-block rounded-lg">studying alone is hard.</span>
          </h1>
          <p className="text-lg text-neutral-700 max-w-2xl">
            Class 9-12 is intense. Notes pile up. Doubts sit unanswered. Phones win every battle for attention.
            We're building one tool that fixes all three — a tutor that actually explains, a planner that holds you accountable,
            and a focus mode that gets your phone out of the way.
          </p>
        </div>
        <div className="lg:col-span-4">
          <div className="nb-card p-6 bg-[#FDE68A]">
            <div className="text-xs uppercase tracking-[0.2em] font-bold mb-2">Mission</div>
            <div className="font-display font-black text-2xl leading-tight">Make every CBSE student finish what they start.</div>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        {values.map((v) => (
          <div key={v.title} className="nb-card p-6">
            <div className="w-12 h-12 rounded-xl border-2 border-black flex items-center justify-center mb-3" style={{ background: v.color }}>
              <v.icon className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div className="font-display font-bold text-xl mb-1">{v.title}</div>
            <p className="text-sm text-neutral-700 leading-relaxed">{v.body}</p>
          </div>
        ))}
      </section>

      <section className="nb-card p-8 bg-[#0A0A0A] text-white" data-testid="about-cta">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="font-display font-black text-3xl mb-2">How it works</h2>
            <ol className="space-y-2 text-neutral-200 list-decimal pl-5">
              <li>Sign in with Google in one click.</li>
              <li>Pick your class and subject — ask any doubt.</li>
              <li>Plan today's study list. Tick tasks off. Watch your streak grow.</li>
              <li>Stuck again? Open the tutor — it remembers your chat.</li>
            </ol>
          </div>
          <div className="space-y-3">
            <div className="nb-card p-4 bg-white text-black">
              <div className="text-xs uppercase tracking-[0.2em] font-bold">Subjects covered</div>
              <div className="font-display font-bold mt-1">Maths · Physics · Chemistry · Biology · English · Social Studies · Computer Science · Hindi</div>
            </div>
            <div className="nb-card p-4 bg-white text-black">
              <div className="text-xs uppercase tracking-[0.2em] font-bold">Classes</div>
              <div className="font-display font-bold mt-1">9, 10, 11, 12 (CBSE)</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}