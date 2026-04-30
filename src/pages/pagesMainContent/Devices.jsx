// src/pages/Devices.jsx
import { useState } from "react";

const initialDevices = [
  {
    id: 1,
    name: "Living Room Thermostat",
    type: "thermostat",
    status: "online",
    value: "22°C",
    room: "Living Room",
    icon: "🌡️",
  },
  {
    id: 2,
    name: "Smart Light Bulb",
    type: "light",
    status: "online",
    value: "75% brightness",
    room: "Bedroom",
    icon: "💡",
  },
  {
    id: 3,
    name: "Front Door Lock",
    type: "lock",
    status: "online",
    value: "Locked",
    room: "Entrance",
    icon: "🔒",
  },
  {
    id: 4,
    name: "Motion Sensor",
    type: "motion",
    status: "online",
    value: "Idle",
    room: "Hallway",
    icon: "🏃",
  },
  {
    id: 5,
    name: "Energy Monitor",
    type: "energy",
    status: "online",
    value: "3.2 kW",
    room: "Utility Room",
    icon: "⚡",
  },
  {
    id: 6,
    name: "Smart Plug – Coffee Maker",
    type: "plug",
    status: "offline",
    value: "Off",
    room: "Kitchen",
    icon: "🔌",
  },
];

function Devices() {
  const [devices, setDevices] = useState(initialDevices);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRoom, setFilterRoom] = useState("all");

  // Get unique rooms for filter dropdown
  const rooms = ["all", ...new Set(devices.map((d) => d.room))];

  const toggleDeviceStatus = (id) => {
    setDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.id === id
          ? {
              ...device,
              status: device.status === "online" ? "offline" : "online",
              value:
                device.type === "lock"
                  ? device.status === "online"
                    ? "Unlocked"
                    : "Locked"
                  : device.status === "online"
                  ? "Off"
                  : "On",
            }
          : device
      )
    );
  };

  const filteredDevices = devices.filter((device) => {
    const matchesSearch = device.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRoom = filterRoom === "all" || device.room === filterRoom;
    return matchesSearch && matchesRoom;
  });

  return (
    <div className="space-y-6 px-17">
      {/* Header / Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Devices
          </h1>
          <p className="text-gray-400 mt-1">
            Manage and monitor all your connected devices
          </p>
        </div>
        <button className="bg-cyan-600 hover:bg-cyan-500 px-5 py-2 rounded-full text-sm font-semibold transition shadow-lg shadow-cyan-600/20 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add Device
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
        <div className="flex-1 relative">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search devices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800/50 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
        </div>
        <div>
          <select
            value={filterRoom}
            onChange={(e) => setFilterRoom(e.target.value)}
            className="bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          >
            {rooms.map((room) => (
              <option key={room} value={room}>
                {room === "all" ? "All Rooms" : room}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDevices.map((device) => (
          <div
            key={device.id}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-cyan-500/40 transition-all group"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{device.icon}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    device.status === "online"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {device.status === "online" ? "Online" : "Offline"}
                </span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500 group-hover:text-cyan-400 transition cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">{device.name}</h3>
            <p className="text-gray-400 text-sm">{device.room}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-2xl font-semibold text-cyan-400">
                {device.value}
              </span>
              <button
                onClick={() => toggleDeviceStatus(device.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  device.status === "online"
                    ? "bg-red-600/20 text-red-300 hover:bg-red-600/40 border border-red-500/30"
                    : "bg-green-600/20 text-green-300 hover:bg-green-600/40 border border-green-500/30"
                }`}
              >
                {device.status === "online" ? "Turn Off" : "Turn On"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDevices.length === 0 && (
        <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
          <svg
            className="mx-auto h-12 w-12 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-400 mt-2">No devices found</p>
        </div>
      )}
    </div>
  );
}

export default Devices;