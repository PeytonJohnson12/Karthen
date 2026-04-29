import KanbanBoard from "@/components/kanban/KanbanBoard";

export const metadata = { title: "Kanban — KARTHEN Admin" };

export default function KanbanPage() {
  return (
    <div style={{ minHeight: "100%" }}>
      {/* Page header */}
      <div style={{ marginBottom: "3.5rem" }}>
        <p
          className="font-sans font-medium text-xs uppercase"
          style={{ color: "#c8a84b", letterSpacing: "0.45em", marginBottom: "1rem" }}
        >
          Project Management
        </p>
        <h1
          className="font-serif font-light"
          style={{ color: "#f2ead8", fontSize: "3rem", marginBottom: "1rem", lineHeight: 1.1 }}
        >
          Kanban Board
        </h1>
        <div style={{ width: "3rem", height: "1px", background: "#c8a84b", marginBottom: "1.5rem" }} />
        <p
          className="font-sans"
          style={{ color: "#4a5568", fontSize: "0.875rem", lineHeight: 1.75, maxWidth: "480px" }}
        >
          Drag cards between columns to update status. Click{" "}
          <span style={{ color: "#c8a84b" }}>+</span> on any column header to add a new card.
        </p>
      </div>

      {/* Board */}
      <KanbanBoard />
    </div>
  );
}
