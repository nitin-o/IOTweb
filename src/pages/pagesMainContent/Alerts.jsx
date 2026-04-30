import DashboardLayout from "../../components/layout/DashboardLayout";

function Alerts() {
  return (
    <DashboardLayout user={null} onLogout={() => {}}>
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="text-xl font-semibold">Alerts</h3>
        <p className="text-slate-500 mt-2">Alerts page coming next.</p>
      </div>
    </DashboardLayout>
  );
}

export default Alerts;