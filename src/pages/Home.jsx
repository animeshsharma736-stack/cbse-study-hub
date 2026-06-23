import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Target, BookOpen, ArrowRight, Search, Zap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const features = [
  { icon: Sparkles, title: "AI Tutor", desc: "NCERT-aligned explanations.", color: "bg-[#DDD6FE]", link: "/tutor" },
  { icon: Target, title: "Focus Mode", desc: "Build streaks & block noise.", color: "bg-[#A7F3D0]", link: "/focus" },
  { icon: BookOpen, title: "Library", desc: "All subjects, Grades 9-12.", color: "bg-[#FDE68A]", link: "/about" },
];

export default function Home() {
  const { user, login } = useAuth();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-black/10 text-sm font-medium">
          <Zap className="w-4 h-4 text-orange-500" />
          <span>JEE 2028 Ready: Now including Advanced Foundation</span>
        </div>
        
        <h1 className="font-display font-black text-6xl md:text-8xl tracking-tighter">
          Study smarter,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-indigo-600">not harder.</span>
        </h1>
        
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          The all-in-one hub for CBSE students. AI-powered tutoring, distraction-free planning, and high-yield resources in one tab.
        </p>

        {/* Search Bar Prompt */}
        <div className="max-w-md mx-auto relative">
          <input 
            type="text" 
            placeholder="Search chapters, topics, or PYQs..." 
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
          />
          <Search className="absolute left-4 top-4 text-neutral-400" />
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid md:grid-cols-3 gap-6">
        {features.map((f) => (
          <Link key={f.link} to={f.link} className="group nb-card p-8 border-2 border-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
            <div className={`w-14 h-14 ${f.color} rounded-2xl border-2 border-black flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform`}>
              <f.icon className="w-7 h-7" strokeWidth={2.5} />
            </div>
            <h3 className="font-display font-bold text-2xl mb-2">{f.title}</h3>
            <p className="text-neutral-600 mb-4">{f.desc}</p>
            <span className="flex items-center font-bold underline underline-offset-4">Explore <ArrowRight className="ml-2 w-4 h-4" /></span>
          </Link>
        ))}
      </section>

      {/* Dark CTA Section */}
      <section className="bg-black text-white rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-4xl font-black mb-2">Join 500+ students</h2>
          <p className="text-neutral-400">Your path to academic excellence starts with one streak.</p>
        </div>
        {!user ? (
          <button onClick={login} className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-neutral-200 transition-colors">
            Get Started Free
          </button>
        ) : (
          <Link to="/tutor" className="bg-white text-black px-8 py-4 rounded-xl font-bold">Open Dashboard</Link>
        )}
      </section>
    </div>
  );
}
