"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import KanbanColumn from "./KanbanColumn";
import KanbanCard from "./KanbanCard";
import type { KanbanColumnType, KanbanCardType } from "@/lib/types";

const INITIAL_COLUMNS: KanbanColumnType[] = [
  {
    id: "backlog",
    title: "Backlog",
    cards: [
      { id: "c1", title: "Define brand identity for new product line", tag: "gold" },
      { id: "c2", title: "Research competitor positioning in luxury market", tag: "blue", description: "Focus on premium segment, identify white space opportunities." },
      { id: "c8", title: "Draft Q3 product roadmap", tag: "purple" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    cards: [
      { id: "c3", title: "Build KARTHEN landing page", tag: "gold", description: "Next.js with Framer Motion animations and gold/navy palette." },
      { id: "c4", title: "Develop product naming framework", tag: "purple" },
    ],
  },
  {
    id: "review",
    title: "Review",
    cards: [
      { id: "c5", title: "Logo refinements — version 3", tag: "blue", description: "Awaiting stakeholder sign-off on the updated K mark." },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      { id: "c6", title: "Set up admin dashboard structure", tag: "green" },
      { id: "c7", title: "Finalize brand color palette", tag: "gold" },
    ],
  },
];

function generateId() {
  return `card-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function KanbanBoard() {
  const [columns, setColumns] = useState<KanbanColumnType[]>(INITIAL_COLUMNS);
  const [activeCard, setActiveCard] = useState<KanbanCardType | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const findColumnOfCard = useCallback(
    (cardId: string) => columns.find((col) => col.cards.some((c) => c.id === cardId)),
    [columns]
  );

  const handleDragStart = (event: DragStartEvent) => {
    const col = findColumnOfCard(event.active.id as string);
    setActiveCard(col?.cards.find((c) => c.id === event.active.id) ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const sourceCol = findColumnOfCard(activeId);
    if (!sourceCol) return;

    const destCol = columns.find((c) => c.id === overId) ?? findColumnOfCard(overId);
    if (!destCol) return;

    if (sourceCol.id === destCol.id) {
      const oldIndex = sourceCol.cards.findIndex((c) => c.id === activeId);
      const newIndex = destCol.cards.findIndex((c) => c.id === overId);
      if (oldIndex === newIndex) return;
      setColumns((cols) =>
        cols.map((col) =>
          col.id === sourceCol.id
            ? { ...col, cards: arrayMove(col.cards, oldIndex, newIndex) }
            : col
        )
      );
    } else {
      const card = sourceCol.cards.find((c) => c.id === activeId)!;
      const destIndex = destCol.cards.findIndex((c) => c.id === overId);
      setColumns((cols) =>
        cols.map((col) => {
          if (col.id === sourceCol.id) return { ...col, cards: col.cards.filter((c) => c.id !== activeId) };
          if (col.id === destCol.id) {
            const newCards = [...col.cards];
            newCards.splice(destIndex >= 0 ? destIndex : newCards.length, 0, card);
            return { ...col, cards: newCards };
          }
          return col;
        })
      );
    }
  };

  const handleAddCard = (columnId: string, card: Omit<KanbanCardType, "id">) => {
    setColumns((cols) =>
      cols.map((col) =>
        col.id === columnId
          ? { ...col, cards: [...col.cards, { ...card, id: generateId() }] }
          : col
      )
    );
  };

  const handleDeleteCard = (columnId: string, cardId: string) => {
    setColumns((cols) =>
      cols.map((col) =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter((c) => c.id !== cardId) }
          : col
      )
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-8 overflow-x-auto pb-8 pt-1">
        {columns.map((col) => (
          <KanbanColumn
            key={col.id}
            column={col}
            onAddCard={handleAddCard}
            onDeleteCard={handleDeleteCard}
          />
        ))}
      </div>

      <DragOverlay>
        {activeCard && (
          <div className="rotate-1 opacity-90 shadow-2xl shadow-black/60 w-80">
            <KanbanCard card={activeCard} onDelete={() => {}} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
