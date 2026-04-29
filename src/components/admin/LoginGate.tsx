"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

const SESSION_KEY = "karthen_admin_auth";
const ADMIN_PASSWORD = "karthen2024";

export default function LoginGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(SESSION_KEY) === "true");
    setChecked(true);
  }, []);

  if (!checked) return null;
  if (authed) return <>{children}</>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setAuthed(true);
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setTimeout(() => setError(false), 2500);
      setInput("");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0c1219",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(200,168,75,0.05) 0%, transparent 65%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: "100%", maxWidth: "380px", position: "relative", zIndex: 1 }}
      >
        {/* Top accent */}
        <div style={{ width: "2.5rem", height: "1px", background: "#c8a84b", margin: "0 auto 3rem" }} />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "3rem" }}>
          <div style={{ width: "3rem", height: "3rem", background: "#f2ead8", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="font-serif font-bold text-2xl leading-none" style={{ color: "#0c1219" }}>K</span>
          </div>
          <span className="font-serif font-semibold text-lg uppercase" style={{ color: "#f2ead8", letterSpacing: "0.3em" }}>KARTHEN</span>
        </div>

        <p className="font-sans text-xs uppercase text-center" style={{ color: "#a89f8c", letterSpacing: "0.4em", marginBottom: "2.5rem" }}>
          Admin Access
        </p>

        <motion.form
          onSubmit={handleSubmit}
          animate={shaking ? { x: [-10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.45 }}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div style={{ position: "relative" }}>
            <Lock
              size={14}
              style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#4a5568" }}
            />
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter password"
              autoFocus
              className="font-sans"
              style={{
                width: "100%",
                background: "#111827",
                border: `1px solid ${error ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
                color: "#f2ead8",
                fontSize: "0.875rem",
                padding: "0.85rem 1rem 0.85rem 2.75rem",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => { if (!error) e.currentTarget.style.borderColor = "rgba(200,168,75,0.5)"; }}
              onBlur={(e) => { if (!error) e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-sans text-xs text-center"
              style={{ color: "#f87171", letterSpacing: "0.05em" }}
            >
              Incorrect password. Please try again.
            </motion.p>
          )}

          <button
            type="submit"
            className="font-sans font-semibold text-xs uppercase"
            style={{
              background: "#c8a84b",
              color: "#0c1219",
              padding: "0.9rem",
              letterSpacing: "0.15em",
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s",
              marginTop: "0.5rem",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#d4b76a")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#c8a84b")}
          >
            Enter Admin
          </button>
        </motion.form>

        <div style={{ width: "2.5rem", height: "1px", background: "#c8a84b", margin: "3rem auto 0" }} />
      </motion.div>
    </div>
  );
}
