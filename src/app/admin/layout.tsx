import LoginGate from "@/components/admin/LoginGate";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <LoginGate>
      <div className="flex min-h-screen bg-k-dark">
        <AdminSidebar />
        <main className="flex-1 min-w-0 p-12 overflow-auto">
          {children}
        </main>
      </div>
    </LoginGate>
  );
}
