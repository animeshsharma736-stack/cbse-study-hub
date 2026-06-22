import React, { useEffect, useState } from "react";
import { Star, Send } from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const TARGETS = [
  "Website Overall",
  "AI Tutor",
  "Focus / Planner",
  "Maths",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Social Studies",
  "Computer Science",
  "Hindi",
];

export default function Ratings() {
  const { user } = useAuth();
  const [ratings, setRatings] = useState([]);
  const [count, setCount] = useState(0);
  const [average, setAverage] = useState(0);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [target, setTarget] = useState(TARGETS[0]);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    try {
      const res = await api.get("/ratings");
      setRatings(res.data.ratings || []);
      setCount(res.data.count || 0);
      setAverage(res.data.average || 0);
    } catch (e) { /* ignore */ }
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!rating) { toast("Please pick a star rating first"); return; }
    setSubmitting(true);
    try {
      await api.post("/ratings", {
        rating,
        target,
        comment: comment.trim(),
        name: name.trim() || (user?.name || "Anonymous"),
      });
      toast.success("Thanks for the feedback!");
      setRating(0); setComment(""); setName(""); setTarget(TARGETS[0]);
      load();
    } catch (e) {
      toast.error("Could not submit your rating");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8" data-testid="ratings-page">
      <section className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-3">
          <h1 className="font-display font-black text-4xl sm:text-5xl tracking-tight">Ratings & Reviews</h1>
          <p className="text-neutral-700">Tell us what's working, what isn't and what subject needs more love. Rate the website overall or any specific subject/feature.</p>
        </div>
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          <div className="nb-card p-5 bg-[#FDE68A]">
            <div className="text-xs uppercase tracking-[0.2em] font-bold">Average</div>
            <div className="font-display font-black text-4xl mt-1" data-testid="avg-rating">{average} <span className="text-base">/ 5</span></div>
          </div>
          <div className="nb-card p-5 bg-[#A7F3D0]">
            <div className="text-xs uppercase tracking-[0.2em] font-bold">Reviews</div>
            <div className="font-display font-black text-4xl mt-1" data-testid="ratings-count">{count}</div>
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-12 gap-6">
        {/* Submit form */}
        <form onSubmit={submit} className="lg:col-span-5 nb-card p-6 space-y-4" data-testid="rating-form">
          <div className="font-display font-black text-2xl">Leave a review</div>

          <div>
            <div className="text-xs uppercase tracking-[0.2em] font-bold mb-2">Rate</div>
            <div className="flex gap-1" data-testid="star-input">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onMouseEnter={() => setHover(n)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(n)}
                  className="p-1"
                  data-testid={`star-${n}`}
                >
                  <Star
                    className="w-7 h-7"
                    strokeWidth={2.5}
                    fill={(hover || rating) >= n ? "#FDE68A" : "transparent"}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.2em] font-bold mb-2">What are you reviewing?</div>
            <select
              className="nb-input"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              data-testid="rating-target-select"
            >
              {TARGETS.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          {!user && (
            <input
              className="nb-input"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-testid="rating-name-input"
            />
          )}

          <textarea
            className="nb-input"
            placeholder="What did you like / what should we improve?"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            data-testid="rating-comment-input"
          />

          <button type="submit" disabled={submitting} className="nb-btn nb-btn-primary w-full" data-testid="submit-rating">
            <Send className="w-4 h-4" strokeWidth={2.5} /> {submitting ? "Sending…" : "Submit Review"}
          </button>
        </form>

        {/* Reviews list */}
        <div className="lg:col-span-7 space-y-4" data-testid="ratings-list">
          {ratings.length === 0 && (
            <div className="nb-card p-6 text-neutral-600 italic">Be the first to review!</div>
          )}
          {ratings.map((r) => (
            <div key={r.id} className="nb-card p-5" data-testid={`rating-${r.id}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full border-2 border-black bg-[#DDD6FE] flex items-center justify-center font-display font-bold">
                    {(r.name || "A").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-display font-bold">{r.name}</div>
                    <div className="text-xs text-neutral-500">{new Date(r.created_at).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex">
                  {[1,2,3,4,5].map((n) => (
                    <Star key={n} className="w-4 h-4" strokeWidth={2.5} fill={r.rating >= n ? "#FDE68A" : "transparent"} />
                  ))}
                </div>
              </div>
              <div className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-500 mb-1">{r.target}</div>
              {r.comment && <p className="text-sm leading-relaxed">{r.comment}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}