export type CardTag = "gold" | "blue" | "red" | "green" | "purple";

export interface KanbanCardType {
  id: string;
  title: string;
  description?: string;
  tag: CardTag;
}

export interface KanbanColumnType {
  id: string;
  title: string;
  cards: KanbanCardType[];
}

export const TAG_COLORS: Record<CardTag, string> = {
  gold: "#c8a84b",
  blue: "#3b82f6",
  red: "#ef4444",
  green: "#22c55e",
  purple: "#a855f7",
};
