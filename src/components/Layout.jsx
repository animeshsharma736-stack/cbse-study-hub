import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { BookOpen, Sparkles, Target, Star, Info, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { to: "/", label: "Home", icon: BookOpen, testId: "nav-home" },
  { to: "/tutor", label: "AI Tutor", icon: Sparkles, testId: "nav-tutor" },
  { to: "/focus", label: "Focus", icon: Target, testId: "nav-focus" },
  { to: "/ratings", label: "Ratings", icon: Star, testId: "nav-ratings" },
  { to: "/about", label: "About", icon: Info, testId: "nav-about" },
];

export default function Layout() {
  const { user, login, logout } = useAuth();

  return (
    <div className="App min-h-screen">
      <header
        className="sticky top-0 z-40 border-b-2 border-black backdrop-blur-md"
        style={{ background: "rgba(253,253,249,0.9)" }}
        data-testid="site-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" data-testid="brand-link">
            <div className="w-9 h-9 rounded-lg border-2 border-black bg-[#DDD6FE] flex items-center justify-center font-black font-display">9-12</div>
            <span className="font-display font-black text-xl tracking-tight">CBSE Study Hub</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                end={it.to === "/"}
                data-testid={it.testId}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg font-semibold text-sm flex items-center gap-1.5 border-2 ${
                    isActive ? "bg-[#FDE68A] border-black" : "border-transparent hover:border-black"
                  }`
                }
              >
                <it.icon className="w-4 h-4" strokeWidth={2.5} />
                {it.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-black bg-white">
                  {user.picture ? (
                    <img src={user.picture} alt="" className="w-6 h-6 rounded-full" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#A7F3D0] border border-black" />
                  )}
                  <span className="text-sm font-semibold" data-testid="user-name">{user.name?.split(" ")[0]}</span>
                </div>
                <button onClick={logout} className="nb-btn nb-btn-peach !py-1.5 !px-3 text-sm" data-testid="logout-btn">
                  <LogOut className="w-4 h-4" strokeWidth={2.5} /> Logout
                </button>
              </>
            ) : (
              <button onClick={login} className="nb-btn nb-btn-primary !py-1.5 !px-4 text-sm" data-testid="login-btn">
                Sign in with Google
              </button>
            )}
          </div>
        </div>

        {/* mobile bottom nav */}
        <nav className="md:hidden border-t-2 border-black flex items-center justify-between px-3 py-1 overflow-x-auto">
          {navItems.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.to === "/"}
              data-testid={`${it.testId}-mobile`}
              className={({ isActive }) =>
                `flex flex-col items-center px-2 py-1 text-[11px] font-semibold ${isActive ? "text-black" : "text-neutral-500"}`
              }
            >
              <it.icon className="w-4 h-4" strokeWidth={2.5} />
              {it.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="border-t-2 border-black mt-12 py-8" data-testid="site-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="font-display font-black text-lg">CBSE Study Hub</div>
          <div className="text-sm text-neutral-600">Built for Class 9-12 learners. NCERT-aligned. Anti-procrastination first.</div>
        </div>
      </footer>
    </div>
  );
}