import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Flame,
  GraduationCap,
  Layers3,
  PlayCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Zap,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const features = [
  {
    icon: Sparkles,
    title: "AI doubt solver",
    desc: "Ask any NCERT, board, or foundation question and get structured answers with steps, examples, and checks.",
    color: "bg-[#DDD6FE]",
    link: "/tutor",
  },
  {
    icon: Target,
    title: "Focus command center",
    desc: "Convert revision anxiety into a short daily hit list, track streaks, and finish one chapter at a time.",
    color: "bg-[#A7F3D0]",
    link: "/focus",
  },
  {
    icon: BookOpen,
    title: "Class 9-12 library",
    desc: "Maths, Science, SST, English, Hindi, CS and senior-secondary subjects in one CBSE-first workspace.",
    color: "bg-[#FDE68A]",
    link: "/about",
  },
];

const stats = [
  { value: "9-12", label: "CBSE classes" },
  { value: "8+", label: "Core subjects" },
  { value: "24/7", label: "Study support" },
];

const subjects = ["Maths", "Physics", "Chemistry", "Biology", "English", "SST", "Hindi", "Computer Science"];

const plan = [
  "Diagnose weak chapter",
  "Learn with examples",
  "Practice PYQ-style questions",
  "Review and repeat tomorrow",
];

const testimonials = [
  {
    name: "Aarav",
    className: "Class 10",
    quote: "The tutor breaks answers into board-style steps, so I know exactly what to write in exams.",
  },
  {
    name: "Meera",
    className: "Class 12",
    quote: "Focus mode makes my study list feel manageable instead of scary. I actually finish tasks now.",
  },
  {
    name: "Kabir",
    className: "Class 11",
    quote: "It feels like a study desk, planner, and senior mentor inside one clean tab.",
  },
];

export default function Home() {
  const { user, login } = useAuth();

  return (
    <div className="relative overflow-hidden rounded-[2rem]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,#DDD6FE_0,transparent_28%),radial-gradient(circle_at_85%_5%,#BAE6FD_0,transparent_24%),radial-gradient(circle_at_70%_82%,#FDE68A_0,transparent_28%)]" />
      <div className="space-y-24 pb-10">
        <section className="grid min-h-[76vh] items-center gap-10 pt-8 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-black shadow-[4px_4px_0_#0A0A0A]">
              <Zap className="h-4 w-4 text-orange-500" fill="currentColor" />
              Board prep · JEE/NEET foundation · daily focus streaks
            </div>

            <div className="space-y-5">
              <h1 className="font-display text-5xl font-black leading-[0.95] tracking-tighter sm:text-7xl lg:text-8xl">
                Your CBSE study desk,
                <span className="hero-highlight mt-2 block w-fit rotate-[-1deg] px-3 pb-2">upgraded.</span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-neutral-700 sm:text-xl">
                A premium learning cockpit for Classes 9-12: ask doubts, build exam-ready answers, plan focused study blocks, and keep every subject moving.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {!user ? (
                <button onClick={login} className="nb-btn nb-btn-dark text-base">
                  Start studying free <ArrowRight className="h-5 w-5" />
                </button>
              ) : (
                <Link to="/tutor" className="nb-btn nb-btn-dark text-base">
                  Open your tutor <ArrowRight className="h-5 w-5" />
                </Link>
              )}
              <Link to="/focus" className="nb-btn nb-btn-yellow text-base">
                Build today&apos;s plan <CalendarCheck className="h-5 w-5" />
              </Link>
            </div>

            <div className="grid max-w-2xl grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border-2 border-black bg-white/85 p-4 shadow-[4px_4px_0_#0A0A0A] backdrop-blur">
                  <div className="font-display text-2xl font-black">{stat.value}</div>
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="hero-console nb-card relative overflow-hidden bg-white p-5 sm:p-6">
              <div className="absolute right-5 top-5 rounded-full border-2 border-black bg-[#A7F3D0] px-3 py-1 text-xs font-black uppercase tracking-[0.16em]">
                Live desk
              </div>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black bg-[#DDD6FE]">
                  <GraduationCap className="h-7 w-7" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="font-display text-xl font-black">Class 10 · Science</div>
                  <div className="text-sm font-semibold text-neutral-500">Chapter sprint in progress</div>
                </div>
              </div>

              <div className="rounded-2xl border-2 border-black bg-[#0A0A0A] p-4 text-white shadow-inner">
                <div className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">
                  <span>Today&apos;s mission</span>
                  <span className="text-[#FDE68A]">72%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full border-2 border-white bg-neutral-800">
                  <div className="h-full w-[72%] bg-[#FDE68A]" />
                </div>
                <div className="mt-5 space-y-3">
                  {plan.map((item, index) => (
                    <div key={item} className="flex items-center gap-3 rounded-xl bg-white/10 p-3">
                      <CheckCircle2 className={`h-5 w-5 ${index < 2 ? "text-[#A7F3D0]" : "text-white/45"}`} fill={index < 2 ? "currentColor" : "none"} />
                      <span className={index < 2 ? "font-semibold" : "text-white/60"}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border-2 border-black bg-[#FECACA] p-4">
                  <Flame className="mb-2 h-6 w-6" fill="currentColor" />
                  <div className="font-display text-3xl font-black">14</div>
                  <div className="text-sm font-bold">day streak</div>
                </div>
                <div className="rounded-2xl border-2 border-black bg-[#BAE6FD] p-4">
                  <Clock3 className="mb-2 h-6 w-6" />
                  <div className="font-display text-3xl font-black">45m</div>
                  <div className="text-sm font-bold">deep work</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {features.map((f) => (
            <Link key={f.link} to={f.link} className="group nb-card p-7">
              <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-black ${f.color} transition-transform group-hover:rotate-3 group-hover:scale-105`}>
                <f.icon className="h-8 w-8" strokeWidth={2.5} />
              </div>
              <h3 className="mb-2 font-display text-2xl font-black">{f.title}</h3>
              <p className="mb-5 leading-7 text-neutral-700">{f.desc}</p>
              <span className="inline-flex items-center gap-2 font-black underline decoration-2 underline-offset-4">
                Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </section>

        <section className="grid items-center gap-8 rounded-[2rem] border-2 border-black bg-white p-6 shadow-[8px_8px_0_#0A0A0A] lg:grid-cols-12 lg:p-10">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#FDE68A] px-3 py-1 text-sm font-black">
              <ShieldCheck className="h-4 w-4" /> NCERT-aligned workflow
            </div>
            <h2 className="font-display text-4xl font-black leading-tight sm:text-5xl">From doubt to distinction in four moves.</h2>
            <p className="text-lg leading-8 text-neutral-700">Stop jumping between apps. Search, ask, plan, revise, and rate what helps you — all in a single energetic workspace.</p>
          </div>
          <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
            {[
              { icon: Search, title: "Find the topic", body: "Start with a chapter, formula, poem, concept, or exam-style question." },
              { icon: Sparkles, title: "Understand it", body: "Get stepwise explanations that match how CBSE evaluates answers." },
              { icon: Layers3, title: "Practice smarter", body: "Move from examples to revision prompts and PYQ-style thinking." },
              { icon: Award, title: "Stay accountable", body: "Use streaks and reviews to keep the study loop improving." },
            ].map((item, index) => (
              <div key={item.title} className="rounded-2xl border-2 border-black bg-[#FDFDF9] p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-[#DDD6FE] font-black">{index + 1}</div>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-700">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="mb-2 text-sm font-black uppercase tracking-[0.22em] text-neutral-500">Subject runway</div>
              <h2 className="font-display text-4xl font-black">Everything you revise, beautifully organized.</h2>
            </div>
            <Link to="/tutor" className="nb-btn nb-btn-primary w-fit">
              Try AI Tutor <PlayCircle className="h-5 w-5" />
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            {subjects.map((subject, index) => (
              <span key={subject} className={`rounded-full border-2 border-black px-5 py-3 font-display text-lg font-black shadow-[4px_4px_0_#0A0A0A] ${index % 4 === 0 ? "bg-[#DDD6FE]" : index % 4 === 1 ? "bg-[#A7F3D0]" : index % 4 === 2 ? "bg-[#FDE68A]" : "bg-[#BAE6FD]"}`}>
                {subject}
              </span>
            ))}
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="nb-card bg-white p-6">
              <div className="mb-4 flex text-[#F59E0B]">
                {[1, 2, 3, 4, 5].map((n) => <Star key={n} className="h-5 w-5" fill="currentColor" />)}
              </div>
              <p className="mb-5 leading-7 text-neutral-700">“{item.quote}”</p>
              <div className="font-display text-lg font-black">{item.name}</div>
              <div className="text-sm font-bold text-neutral-500">{item.className}</div>
            </div>
          ))}
        </section>

        <section className="relative overflow-hidden rounded-[2rem] border-2 border-black bg-[#0A0A0A] p-8 text-white shadow-[8px_8px_0_#0A0A0A] lg:p-12">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[#DDD6FE] opacity-30 blur-2xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="font-display text-4xl font-black leading-tight sm:text-5xl">Ready to turn today into a completed checklist?</h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-neutral-300">Open your study cockpit, ask the first doubt, and let momentum do the rest.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              {!user ? (
                <button onClick={login} className="nb-btn bg-white text-black">
                  Get started free <ArrowRight className="h-5 w-5" />
                </button>
              ) : (
                <Link to="/tutor" className="nb-btn bg-white text-black">
                  Continue learning <ArrowRight className="h-5 w-5" />
                </Link>
              )}
              <Link to="/ratings" className="nb-btn nb-btn-mint">
                See reviews
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
