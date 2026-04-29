"use client";

import { useState } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { Plus, X, Check } from "lucide-react";
import KanbanCard from "./KanbanCard";
import type { KanbanColumnType, KanbanCardType, CardTag } from "@/lib/types";
import { TAG_COLORS } from "@/lib/types";

interface Props {
  column: KanbanColumnType;
  onAddCard: (columnId: string, card: Omit<KanbanCardType, "id">) => void;
  onDeleteCard: (columnId: string, cardId: string) => void;
}

const COLUMN_CONFIG: Record<string, { accent: string; bg: string }> = {
  backlog:       { accent: "#64748b", bg: "rgba(100,116,139,0.08)" },
  "in-progress": { accent: "#3b82f6", bg: "rgba(59,130,246,0.08)"  },
  review:        { accent: "#f59e0b", bg: "rgba(245,158,11,0.08)"  },
  done:          { accent: "#22c55e", bg: "rgba(34,197,94,0.08)"   },
};

export default function KanbanColumn({ column, onAddCard, onDeleteCard }: Props) {
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState<CardTag>("gold");

  const { setNodeRef, isOver } = useDroppable({ id: column.id });
  const cfg = COLUMN_CONFIG[column.id] ?? { accent: "#c8a84b", bg: "rgba(200,168,75,0.08)" };

  const handleAdd = () => {
    if (!title.trim()) return;
    onAddCard(column.id, { title: title.trim(), description: description.trim() || undefined, tag });
    setTitle(""); setDescription(""); setTag("gold"); setAdding(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "320px", flexShrink: 0 }}>

      {/* ── Column header ── */}
      <div
        style={{
          background: cfg.bg,
          border: `1px solid rgba(255,255,255,0.07)`,
          padding: "1rem 1.25rem",
          marginBottom: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: cfg.accent, flexShrink: 0 }} />
            <h3
              className="font-sans font-semibold"
              style={{ color: "#f2ead8", fontSize: "0.875rem", letterSpacing: "0.05em" }}
            >
              {column.title}
            </h3>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span
              className="font-sans font-medium"
              style={{
                fontSize: "0.7rem",
                padding: "0.2rem 0.55rem",
                background: cfg.accent + "25",
                color: cfg.accent,
              }}
            >
              {column.cards.length}
            </span>
            <button
              onClick={() => setAdding(true)}
              style={{ color: cfg.accent + "99", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = cfg.accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = cfg.accent + "99")}
            >
              <Plus size={15} />
            </button>
          </div>
        </div>
        {/* Accent line */}
        <div
          style={{
            marginTop: "0.75rem",
            height: "1px",
            background: `linear-gradient(90deg, ${cfg.accent}, transparent)`,
          }}
        />
      </div>

      {/* ── Cards ── */}
      <SortableContext items={column.cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          style={{
            flex: 1,
            minHeight: "5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
            padding: "0.25rem",
            transition: "background 0.2s",
            background: isOver ? cfg.bg : "transparent",
            outline: isOver ? `1px solid ${cfg.accent}44` : "none",
          }}
        >
          {column.cards.map((card) => (
            <KanbanCard
              key={card.id}
              card={card}
              onDelete={(id) => onDeleteCard(column.id, id)}
            />
          ))}

          {column.cards.length === 0 && !adding && (
            <div
              className="font-sans text-xs"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "4rem",
                border: "1px dashed rgba(255,255,255,0.08)",
                color: "#4a5568",
                letterSpacing: "0.1em",
              }}
            >
              Drop cards here
            </div>
          )}
        </div>
      </SortableContext>

      {/* ── Add card form ── */}
      {adding ? (
        <div
          style={{
            marginTop: "0.75rem",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "#111827",
            padding: "1.1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); if (e.key === "Escape") setAdding(false); }}
            placeholder="Card title..."
            className="font-sans"
            style={{
              width: "100%",
              background: "#0c1219",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#f2ead8",
              fontSize: "0.875rem",
              padding: "0.6rem 0.75rem",
              outline: "none",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(200,168,75,0.4)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            className="font-sans"
            style={{
              width: "100%",
              background: "#0c1219",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#f2ead8",
              fontSize: "0.75rem",
              padding: "0.6rem 0.75rem",
              outline: "none",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(200,168,75,0.4)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
          />
          {/* Tag picker */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span className="font-sans" style={{ color: "#4a5568", fontSize: "0.7rem", letterSpacing: "0.1em" }}>TAG</span>
            {(Object.keys(TAG_COLORS) as CardTag[]).map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                title={t}
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: TAG_COLORS[t],
                  opacity: tag === t ? 1 : 0.45,
                  outline: tag === t ? `2px solid rgba(255,255,255,0.5)` : "none",
                  outlineOffset: "2px",
                  transform: tag === t ? "scale(1.2)" : "scale(1)",
                  transition: "all 0.15s",
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={handleAdd}
              className="font-sans font-semibold"
              style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                padding: "0.5rem 1rem",
                background: "#c8a84b", color: "#0c1219",
                fontSize: "0.75rem", letterSpacing: "0.05em",
                border: "none", cursor: "pointer", transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#d4b76a")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#c8a84b")}
            >
              <Check size={12} /> Add Card
            </button>
            <button
              onClick={() => setAdding(false)}
              className="font-sans"
              style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                padding: "0.5rem 1rem",
                border: "1px solid rgba(255,255,255,0.12)", color: "#a89f8c",
                background: "transparent", fontSize: "0.75rem", cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#f2ead8"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#a89f8c"; }}
            >
              <X size={12} /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="font-sans"
          style={{
            marginTop: "0.6rem",
            display: "flex", alignItems: "center", gap: "0.6rem",
            padding: "0.75rem 0.5rem",
            color: "#4a5568", fontSize: "0.75rem", letterSpacing: "0.08em",
            background: "transparent", border: "none", cursor: "pointer",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#a89f8c")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#4a5568")}
        >
          <Plus size={13} /> Add a card
        </button>
      )}
    </div>
  );
}
