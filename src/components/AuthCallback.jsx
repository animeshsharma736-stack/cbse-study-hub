import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const hash = window.location.hash || "";
    const match = hash.match(/session_id=([^&]+)/);
    if (!match) {
      navigate("/", { replace: true });
      return;
    }
    const session_id = match[1];

    (async () => {
      try {
        const res = await api.post("/auth/session", { session_id });
        setUser(res.data);
        // clear hash and go to tutor
        window.history.replaceState({}, document.title, window.location.pathname);
        navigate("/tutor", { replace: true, state: { user: res.data } });
      } catch (e) {
        navigate("/", { replace: true });
      }
    })();
  }, [navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center" data-testid="auth-callback">
      <div className="nb-card p-8 text-center">
        <div className="font-display text-2xl font-bold mb-2">Signing you in…</div>
        <div className="flex items-center justify-center mt-3">
          <span className="dot-flash"></span><span className="dot-flash"></span><span className="dot-flash"></span>
        </div>
      </div>
    </div>
  );
}