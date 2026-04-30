// src/pages/Analytics.jsx
import { useState } from "react";

const generateMockData = (days) => {
  return Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    energy: Math.floor(Math.random() * 30) + 20,
    devices: Math.floor(Math.random() * 15) + 5,
  }));
};

function Analytics() {
  const [dateRange, setDateRange] = useState("7d");
  const [activeMetric, setActiveMetric] = useState("energy");

  const getData = () => {
    if (dateRange === "7d") return generateMockData(7);
    if (dateRange === "30d") return generateMockData(30);
    return generateMockData(90);
  };

  const data = getData();
  const labels = data.map((_, idx) =>
    dateRange === "7d"
      ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][idx]
      : `Day ${idx + 1}`
  );
  const values = data.map((d) => (activeMetric === "energy" ? d.energy : d.devices));
  const maxValue = Math.max(...values, 1);

  // Stats cards data
  const stats = [
    {
      title: "Total Energy",
      value: "342 kWh",
      change: "+8.2%",
      trend: "up",
      icon: "⚡",
    },
    {
      title: "Avg. Device Usage",
      value: "4.2 hrs/day",
      change: "+12%",
      trend: "up",
      icon: "📱",
    },
    {
      title: "Peak Load",
      value: "3.8 kW",
      change: "-3%",
      trend: "down",
      icon: "📈",
    },
    {
      title: "Cost Saved",
      value: "$24.50",
      change: "+18%",
      trend: "up",
      icon: "💰",
    },
  ];

  const alerts = [
    { type: "warning", message: "High energy usage detected in Kitchen", time: "2h ago" },
    { type: "info", message: "Firmware update available for Thermostat", time: "5h ago" },
    { type: "success", message: "All devices online", time: "1d ago" },
  ];

  return (
    <div className="space-y-6 px-18">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Analytics
        </h1>
        <p className="text-gray-400 mt-1">Real‑time insights and historical trends</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-cyan-500/40 transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div
              className={`mt-2 text-xs ${
                stat.trend === "up" ? "text-green-400" : "text-red-400"
              }`}
            >
              {stat.change} from last week
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart Card */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="w-1 h-5 bg-cyan-500 rounded-full"></span>
            {activeMetric === "energy" ? "Energy Consumption" : "Device Activity"}
          </h2>
          <div className="flex gap-3">
            <div className="flex bg-gray-800/50 rounded-full p-1">
              <button
                onClick={() => setActiveMetric("energy")}
                className={`px-3 py-1 text-xs rounded-full transition ${
                  activeMetric === "energy"
                    ? "bg-cyan-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Energy (kWh)
              </button>
              <button
                onClick={() => setActiveMetric("devices")}
                className={`px-3 py-1 text-xs rounded-full transition ${
                  activeMetric === "devices"
                    ? "bg-cyan-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Device Hours
              </button>
            </div>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-gray-800/50 border border-white/10 rounded-xl px-3 py-1 text-sm text-white"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>

        {/* Simple bar chart */}
        <div className="h-64 flex items-end gap-2 mt-4">
          {values.map((value, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t-md transition-all duration-300 hover:from-cyan-400 hover:to-blue-400"
                style={{ height: `${(value / maxValue) * 180}px` }}
              ></div>
              <span className="text-xs text-gray-400 mt-2">{labels[i]}</span>
              <span className="text-[10px] text-cyan-300">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Two column: Alerts + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts & Notifications */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-orange-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            Recent Alerts
          </h3>
          <div className="space-y-3">
            {alerts.map((alert, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition"
              >
                <div
                  className={`w-2 h-2 mt-2 rounded-full ${
                    alert.type === "warning"
                      ? "bg-orange-500"
                      : alert.type === "info"
                      ? "bg-blue-500"
                      : "bg-green-500"
                  }`}
                ></div>
                <div className="flex-1">
                  <p className="text-sm">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-cyan-400 text-sm hover:text-cyan-300">
            View all alerts →
          </button>
        </div>

        {/* Predictive Insights */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            Predictive Insights
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Forecasted energy (next 7d)</span>
                <span className="text-cyan-300">412 kWh</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-cyan-500 h-2 rounded-full" style={{ width: "68%" }}></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">+8% from current usage</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Estimated cost next month</span>
                <span className="text-purple-300">$38.50</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "55%" }}></div>
              </div>
              <p className="text-xs text-green-400 mt-1">Potential savings of $4.20</p>
            </div>
            <div className="pt-2 border-t border-white/10">
              <div className="flex justify-between">
                <span className="text-sm">⚡ Peak usage today</span>
                <span className="text-sm font-semibold">3:00 PM – 4:00 PM</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-sm">🌙 Off‑peak recommendation</span>
                <span className="text-sm font-semibold">Run appliances after 9 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional stats table (device breakdown) */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 overflow-x-auto">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-cyan-500 rounded-full"></span>
          Device‑level Breakdown
        </h3>
        <table className="w-full text-sm">
          <thead className="text-gray-400 border-b border-white/10">
            <tr>
              <th className="text-left py-2">Device</th>
              <th className="text-left py-2">Type</th>
              <th className="text-left py-2">Usage (hrs)</th>
              <th className="text-left py-2">Energy (kWh)</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/5">
              <td className="py-2">Thermostat</td>
              <td>HVAC</td>
              <td>18.2</td>
              <td>42.5</td>
              <td><span className="text-green-400">Active</span></td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-2">Smart Light (×4)</td>
              <td>Lighting</td>
              <td>45.0</td>
              <td>12.3</td>
              <td><span className="text-green-400">Active</span></td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="py-2">Refrigerator</td>
              <td>Appliance</td>
              <td>168</td>
              <td>89.1</td>
              <td><span className="text-green-400">Active</span></td>
            </tr>
            <tr>
              <td className="py-2">Coffee Maker</td>
              <td>Smart Plug</td>
              <td>1.5</td>
              <td>0.8</td>
              <td><span className="text-red-400">Offline</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Analytics;