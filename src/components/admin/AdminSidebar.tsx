"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Kanban, Home, LogOut } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { label: "Kanban Board", href: "/admin/kanban", icon: Kanban },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    sessionStorage.removeItem("karthen_admin_auth");
    window.location.reload();
  };

  return (
    /* sticky — stays in the flex flow so it never overlaps main content */
    <aside
      className="w-72 flex-shrink-0 sticky top-0 h-screen overflow-y-auto flex flex-col border-r border-white/8"
      style={{ background: "linear-gradient(180deg, #111827 0%, #0d1520 100%)" }}
    >
      {/* ── Logo ── */}
      <div className="px-8 pt-10 pb-8 border-b border-white/8">
        <Link href="/" className="flex items-center gap-4 mb-5">
          <div className="w-11 h-11 bg-k-cream flex items-center justify-center flex-shrink-0">
            <span className="font-serif font-bold text-k-dark text-2xl leading-none">K</span>
          </div>
          <span className="font-serif font-semibold text-k-cream tracking-[0.2em] text-base uppercase">
            KARTHEN
          </span>
        </Link>
        <div className="flex items-center gap-3 ml-1">
          <div className="w-2 h-2 rounded-full bg-k-gold opacity-80" />
          <p className="text-k-cream-muted text-xs font-sans tracking-[0.3em] uppercase">
            Admin Panel
          </p>
        </div>
      </div>

      {/* ── Gold separator ── */}
      <div className="px-8 py-6">
        <div
          className="w-full h-px"
          style={{ background: "linear-gradient(90deg, rgba(200,168,75,0.5), transparent)" }}
        />
      </div>

      {/* ── Section label ── */}
      <p className="text-k-muted text-xs tracking-[0.4em] uppercase font-sans px-8 mb-3">
        Navigation
      </p>

      {/* ── Nav items ── */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group relative flex items-center gap-4 px-4 py-4 text-sm font-sans transition-all duration-200"
              style={{
                color: active ? "#f2ead8" : "#a89f8c",
                background: active ? "rgba(200,168,75,0.1)" : "transparent",
              }}
            >
              {active && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-k-gold"
                />
              )}
              <item.icon
                size={17}
                style={{ color: active ? "#c8a84b" : "#4a5568" }}
              />
              <span className="tracking-wide font-medium">{item.label}</span>
              {active && (
                <span
                  className="ml-auto w-1.5 h-1.5 rounded-full"
                  style={{ background: "#c8a84b" }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Bottom actions ── */}
      <div className="px-4 pb-8 pt-4 border-t border-white/8 space-y-1 mt-auto">
        <Link
          href="/"
          className="flex items-center gap-4 px-4 py-4 text-sm font-sans text-k-cream-muted hover:text-k-cream hover:bg-white/5 transition-all duration-200"
        >
          <Home size={16} className="text-k-muted" />
          <span className="tracking-wide">Back to Site</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-4 text-sm font-sans text-k-cream-muted hover:text-red-400 transition-all duration-200"
          style={{}}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.06)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <LogOut size={16} className="text-k-muted" />
          <span className="tracking-wide">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
