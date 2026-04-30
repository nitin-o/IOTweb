function Topbar({ user, onLogout }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-slate-500 mt-1">
          Welcome, {user?.name || user?.email || "User"}
        </p>
      </div>

      <button
        onClick={onLogout}
        className="rounded-xl bg-red-500 px-4 py-2 text-white font-medium"
      >
        Logout
      </button>
    </div>
  );
}

export default Topbar;