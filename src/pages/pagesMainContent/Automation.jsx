// src/pages/Automation.jsx
import { useState } from "react";

const initialAutomations = [
  {
    id: 1,
    name: "Good Morning",
    description: "Turn on lights, set thermostat to 22°C",
    trigger: "Time: 7:00 AM",
    action: "Lights on, Thermostat 22°C",
    enabled: true,
    icon: "🌅",
  },
  {
    id: 2,
    name: "Leaving Home",
    description: "Turn off all lights, lock doors",
    trigger: "When last person leaves (geofence)",
    action: "Lights off, Door lock",
    enabled: true,
    icon: "🚪",
  },
  {
    id: 3,
    name: "Movie Time",
    description: "Dim lights, close blinds",
    trigger: "Voice command or manual",
    action: "Lights 20%, Blinds closed",
    enabled: false,
    icon: "🎬",
  },
  {
    id: 4,
    name: "High Temperature Alert",
    description: "Notify if temp > 30°C",
    trigger: "Temperature sensor > 30°C",
    action: "Send push notification",
    enabled: true,
    icon: "🔥",
  },
  {
    id: 5,
    name: "Energy Saver",
    description: "Turn off idle devices",
    trigger: "No motion for 1 hour",
    action: "Turn off plugs & lights",
    enabled: false,
    icon: "💡",
  },
];

const scheduledTasks = [
  { id: 1, task: "Water garden", time: "06:30", days: "Mon, Wed, Fri", enabled: true },
  { id: 2, task: "Turn off porch light", time: "23:00", days: "Every day", enabled: true },
  { id: 3, task: "Vacuum living room", time: "10:00", days: "Tue, Thu", enabled: false },
];

function Automation() {
  const [automations, setAutomations] = useState(initialAutomations);
  const [tasks, setTasks] = useState(scheduledTasks);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAutomation, setNewAutomation] = useState({
    name: "",
    trigger: "",
    action: "",
    enabled: true,
  });

  const toggleAutomation = (id) => {
    setAutomations((prev) =>
      prev.map((auto) =>
        auto.id === id ? { ...auto, enabled: !auto.enabled } : auto
      )
    );
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, enabled: !task.enabled } : task))
    );
  };

  const handleAddAutomation = () => {
    if (!newAutomation.name || !newAutomation.trigger || !newAutomation.action) return;
    const newId = automations.length + 1;
    setAutomations([
      ...automations,
      {
        id: newId,
        name: newAutomation.name,
        description: `${newAutomation.trigger} → ${newAutomation.action}`,
        trigger: newAutomation.trigger,
        action: newAutomation.action,
        enabled: true,
        icon: "⚙️",
      },
    ]);
    setNewAutomation({ name: "", trigger: "", action: "", enabled: true });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 px-18">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Automation
          </h1>
          <p className="text-gray-400 mt-1">Create smart rules to control your home</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-cyan-600 hover:bg-cyan-500 px-5 py-2 rounded-full text-sm font-semibold transition shadow-lg shadow-cyan-600/20 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          New Automation
        </button>
      </div>

      {/* Automation Rules Grid */}
      <h2 className="text-xl font-bold flex items-center gap-2">
        <span className="w-1 h-5 bg-cyan-500 rounded-full"></span>
        Active Rules
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {automations.map((auto) => (
          <div
            key={auto.id}
            className={`bg-white/5 backdrop-blur-sm rounded-2xl p-5 border transition-all ${
              auto.enabled ? "border-white/10 hover:border-cyan-500/40" : "border-white/5 opacity-60"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-2xl">{auto.icon}</span>
              <button
                onClick={() => toggleAutomation(auto.id)}
                className={`relative inline-flex h-5 w-10 items-center rounded-full transition ${
                  auto.enabled ? "bg-cyan-600" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    auto.enabled ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <h3 className="text-lg font-bold text-white">{auto.name}</h3>
            <p className="text-gray-300 text-sm mt-1">{auto.description}</p>
            <div className="mt-3 pt-3 border-t border-white/10 text-xs text-gray-400">
              <div>🔔 Trigger: {auto.trigger}</div>
              <div className="mt-1">⚡ Action: {auto.action}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Scheduled Tasks Section */}
      <h2 className="text-xl font-bold flex items-center gap-2 mt-6">
        <span className="w-1 h-5 bg-cyan-500 rounded-full"></span>
        Scheduled Tasks
      </h2>
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-800/30 border-b border-white/10">
              <tr>
                <th className="text-left py-3 px-4">Task</th>
                <th className="text-left py-3 px-4">Time</th>
                <th className="text-left py-3 px-4">Days</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="py-2 px-4">{task.task}</td>
                  <td className="py-2 px-4 font-mono">{task.time}</td>
                  <td className="py-2 px-4 text-gray-300">{task.days}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        task.enabled ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    {task.enabled ? "Active" : "Paused"}
                  </td>
                  <td className="py-2 px-4 text-right">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`text-xs px-3 py-1 rounded-full ${
                        task.enabled
                          ? "bg-red-600/20 text-red-300 hover:bg-red-600/40"
                          : "bg-green-600/20 text-green-300 hover:bg-green-600/40"
                      }`}
                    >
                      {task.enabled ? "Disable" : "Enable"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Automation Log / Activity */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Recent Activity
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-1 border-b border-white/5">
            <span>🔹 "Good Morning" triggered at 07:00</span>
            <span className="text-gray-400">Today 7:00 AM</span>
          </div>
          <div className="flex justify-between py-1 border-b border-white/5">
            <span>🔹 Motion sensor → Living room lights ON</span>
            <span className="text-gray-400">Today 6:45 AM</span>
          </div>
          <div className="flex justify-between py-1 border-b border-white/5">
            <span>🔹 "Leaving Home" executed (all lights off, door locked)</span>
            <span className="text-gray-400">Yesterday 8:20 AM</span>
          </div>
          <div className="flex justify-between py-1">
            <span>🔹 Temperature alert: Living room reached 31°C</span>
            <span className="text-gray-400">Yesterday 2:15 PM</span>
          </div>
        </div>
      </div>

      {/* Add Automation Modal (simple inline conditional) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
          <div className="bg-gray-800 rounded-2xl p-6 w-96 border border-white/20 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Create Automation</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Rule name (e.g., 'Night Mode')"
                className="w-full bg-gray-700 border border-white/10 rounded-lg px-3 py-2 text-white"
                value={newAutomation.name}
                onChange={(e) => setNewAutomation({ ...newAutomation, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Trigger (e.g., 'Time: 10 PM')"
                className="w-full bg-gray-700 border border-white/10 rounded-lg px-3 py-2 text-white"
                value={newAutomation.trigger}
                onChange={(e) => setNewAutomation({ ...newAutomation, trigger: e.target.value })}
              />
              <input
                type="text"
                placeholder="Action (e.g., 'Turn off lights')"
                className="w-full bg-gray-700 border border-white/10 rounded-lg px-3 py-2 text-white"
                value={newAutomation.action}
                onChange={(e) => setNewAutomation({ ...newAutomation, action: e.target.value })}
              />
              <div className="flex gap-3 pt-2">
                <button onClick={handleAddAutomation} className="bg-cyan-600 px-4 py-2 rounded-lg flex-1 hover:bg-cyan-500">
                  Create
                </button>
                <button onClick={() => setShowAddModal(false)} className="bg-gray-600 px-4 py-2 rounded-lg flex-1 hover:bg-gray-500">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Automation;