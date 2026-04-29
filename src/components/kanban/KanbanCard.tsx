"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";
import type { KanbanCardType } from "@/lib/types";
import { TAG_COLORS } from "@/lib/types";

interface Props {
  card: KanbanCardType;
  onDelete: (id: string) => void;
}

export default function KanbanCard({ card, onDelete }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: card.id });

  const tagColor = TAG_COLORS[card.tag];

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
        position: "relative",
        background: "#111827",
        borderLeft: `3px solid ${tagColor}`,
        border: `1px solid rgba(255,255,255,0.07)`,
        borderLeftWidth: "3px",
        borderLeftColor: tagColor,
        overflow: "hidden",
        cursor: "default",
      }}
      className="group"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.14)";
        (e.currentTarget as HTMLElement).style.borderLeftColor = tagColor;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
        (e.currentTarget as HTMLElement).style.borderLeftColor = tagColor;
      }}
    >
      {/* Delete button */}
      <button
        onClick={() => onDelete(card.id)}
        className="absolute opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ top: "0.6rem", right: "0.6rem", color: "#4a5568", zIndex: 10 }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#4a5568")}
      >
        <X size={13} />
      </button>

      {/* Content */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "1rem 1.1rem" }}>
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          style={{ color: "#4a5568", flexShrink: 0, marginTop: "2px", cursor: "grab" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#a89f8c")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#4a5568")}
        >
          <GripVertical size={14} />
        </button>

        {/* Text */}
        <div style={{ minWidth: 0, flex: 1, paddingRight: "1.2rem" }}>
          <p
            className="font-sans font-medium"
            style={{ color: "#f2ead8", fontSize: "0.875rem", lineHeight: 1.6 }}
          >
            {card.title}
          </p>
          {card.description && (
            <p
              className="font-sans"
              style={{ color: "#4a5568", fontSize: "0.75rem", marginTop: "0.5rem", lineHeight: 1.65 }}
            >
              {card.description}
            </p>
          )}
          {/* Tag */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.75rem" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: tagColor, flexShrink: 0 }} />
            <span
              className="font-sans capitalize"
              style={{ color: tagColor + "bb", fontSize: "0.7rem", letterSpacing: "0.05em" }}
            >
              {card.tag}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
