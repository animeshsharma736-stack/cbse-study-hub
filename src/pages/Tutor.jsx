import React, { useEffect, useRef, useState } from "react";
import { Send, BookOpen, Sparkles, RotateCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const SUBJECTS = [
  { name: "Maths", color: "#DDD6FE" },
  { name: "Physics", color: "#BAE6FD" },
  { name: "Chemistry", color: "#A7F3D0" },
  { name: "Biology", color: "#FDE68A" },
  { name: "English", color: "#FECACA" },
  { name: "Social Studies", color: "#DDD6FE" },
  { name: "Computer Science", color: "#A7F3D0" },
  { name: "Hindi", color: "#FDE68A" },
];
const GRADES = ["9", "10", "11", "12"];

const STARTERS = [
  "Explain photosynthesis in simple words.",
  "Solve: factorise x² - 5x + 6.",
  "Summarise the chapter 'The Last Lesson'.",
  "What caused the French Revolution?",
];

export default function Tutor() {
  const { user, login } = useAuth();
  const [subject, setSubject] = useState("Maths");
  const [grade, setGrade] = useState("10");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sending]);

  const send = async (text) => {
    const content = (text ?? input).trim();
    if (!content || sending) return;
    if (!user) {
      toast("Sign in to chat with your AI tutor");
      login();
      return;
    }
    setInput("");
    const userMsg = { role: "user", content, id: `local-${Date.now()}` };
    setMessages((m) => [...m, userMsg]);
    setSending(true);
    try {
      const res = await api.post("/chat", {
        subject,
        grade,
        message: content,
        session_id: sessionId,
      });
      setSessionId(res.data.session_id);
      setMessages((m) => [...m, res.data.message]);
    } catch (e) {
      toast.error("Tutor is unavailable right now. Please try again.");
      setMessages((m) => [...m, { role: "assistant", content: "Sorry, I couldn't respond. Please try again.", id: `err-${Date.now()}` }]);
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setMessages([]);
    setSessionId(null);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-6" data-testid="tutor-page">
      {/* Sidebar */}
      <aside className="lg:col-span-3 space-y-4">
        <div className="nb-card p-5">
          <div className="text-xs uppercase tracking-[0.2em] font-bold mb-2">Class</div>
          <div className="flex flex-wrap gap-2">
            {GRADES.map((g) => (
              <button
                key={g}
                onClick={() => setGrade(g)}
                aria-pressed={grade === g}
                className="nb-pill"
                data-testid={`grade-${g}`}
              >
                Class {g}
              </button>
            ))}
          </div>
        </div>
        <div className="nb-card p-5">
          <div className="text-xs uppercase tracking-[0.2em] font-bold mb-2">Subject</div>
          <div className="flex flex-col gap-2">
            {SUBJECTS.map((s) => (
              <button
                key={s.name}
                onClick={() => { setSubject(s.name); reset(); }}
                className="text-left px-3 py-2 rounded-lg border-2 border-black font-semibold flex items-center gap-2 transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px]"
                style={{ background: subject === s.name ? s.color : "#fff", boxShadow: subject === s.name ? "3px 3px 0 #0A0A0A" : "none" }}
                data-testid={`subject-${s.name.replace(/\s+/g, "-").toLowerCase()}`}
              >
                <BookOpen className="w-4 h-4" strokeWidth={2.5} /> {s.name}
              </button>
            ))}
          </div>
        </div>
        <button onClick={reset} className="nb-btn w-full" data-testid="reset-chat">
          <RotateCcw className="w-4 h-4" strokeWidth={2.5} /> New Chat
        </button>
      </aside>

      {/* Chat panel */}
      <section className="lg:col-span-9">
        <div className="nb-card p-0 flex flex-col" style={{ minHeight: "70vh" }}>
          <div className="p-4 border-b-2 border-black flex items-center justify-between bg-[#FDFDF9]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" strokeWidth={2.5} />
              <div className="font-display font-bold">CBSE Buddy · {subject} · Class {grade}</div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4" data-testid="chat-window">
            {messages.length === 0 && (
              <div className="text-center py-10">
                <div className="font-display font-black text-2xl mb-2">Ask me anything in {subject}</div>
                <p className="text-neutral-600 mb-6">I'm your CBSE Class {grade} tutor. Try one of these:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {STARTERS.map((s) => (
                    <button key={s} className="nb-pill" onClick={() => send(s)} data-testid={`starter-${s.slice(0, 10)}`}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] border-2 border-black rounded-2xl px-4 py-3 ${
                    m.role === "user" ? "bg-[#DDD6FE] rounded-tr-sm" : "bg-white rounded-tl-sm"
                  }`}
                >
                  {m.role === "assistant" ? (
                    <div className="md-content text-sm">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <div className="text-sm whitespace-pre-wrap">{m.content}</div>
                  )}
                </div>
              </div>
            ))}

            {sending && (
              <div className="flex justify-start">
                <div className="bg-white border-2 border-black rounded-2xl rounded-tl-sm px-4 py-3" data-testid="typing">
                  <span className="dot-flash"></span><span className="dot-flash"></span><span className="dot-flash"></span>
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="p-4 border-t-2 border-black flex gap-2"
          >
            <input
              className="nb-input flex-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask a ${subject} doubt for Class ${grade}…`}
              data-testid="chat-input"
              disabled={sending}
            />
            <button type="submit" className="nb-btn nb-btn-primary" disabled={sending} data-testid="chat-send">
              <Send className="w-4 h-4" strokeWidth={2.5} /> Send
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}