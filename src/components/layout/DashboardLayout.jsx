import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout({ user, onLogout, children }) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <Topbar user={user} onLogout={onLogout} />
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;