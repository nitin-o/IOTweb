

function Dashboard() {



  // Redirect to login if not authenticated




  // Sample data – replace with real API calls later
  const devices = [
    { id: 1, name: "Living Room Light", type: "light", status: "on", value: "80%" },
    { id: 2, name: "Thermostat", type: "climate", status: "cooling", value: "22°C" },
    { id: 3, name: "Front Door Camera", type: "security", status: "online", value: "Streaming" },
    { id: 4, name: "Kitchen Plug", type: "outlet", status: "off", value: "0W" },
  ];

  const stats = [
    { label: "Temperature", value: "22°C", icon: "🌡️", change: "-1°" },
    { label: "Humidity", value: "48%", icon: "💧", change: "+2%" },
    { label: "Energy Today", value: "4.2 kWh", icon: "⚡", change: "-8%" },
    { label: "Active Devices", value: "3", icon: "📱", change: "+1" },
  ];


  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950/40 to-purple-950/30 text-white">
      {/* Same animated background styles as LoginSignup */}
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes float1 {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-20px) translateX(10px); }
          }
          @keyframes float2 {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(20px) translateX(-10px); }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradientShift 15s ease infinite;
          }
          .animate-float {
            animation: float1 6s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float2 7s ease-in-out infinite;
          }
        `}
      </style>

      {/* Animated background blobs */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/10 animate-gradient"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl"></div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header with logout */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Smart Home Dashboard
            </h1>
            <p className="text-gray-400 mt-1">
              Welcome back, User
            </p>
          </div>
          <button
            
            className="px-5 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-medium transition flex items-center gap-2 backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 shadow-xl hover:shadow-indigo-500/10 transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <span className="text-3xl">{stat.icon}</span>
              </div>
              <p className="text-xs text-green-400 mt-2">{stat.change} from yesterday</p>
            </div>
          ))}
        </div>

        {/* Devices Section */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold">Connected Devices</h2>
            <button className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Device
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {devices.map((device) => (
              <div
                key={device.id}
                className="flex justify-between items-center p-4 rounded-xl bg-black/20 border border-white/10 hover:border-indigo-500/50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${device.status === "on" || device.status === "online" || device.status === "cooling" ? "bg-green-400 shadow-lg shadow-green-500/50" : "bg-gray-500"}`}></div>
                  <div>
                    <p className="font-medium">{device.name}</p>
                    <p className="text-xs text-gray-400 capitalize">{device.type} • {device.value}</p>
                  </div>
                </div>
                <button className="text-indigo-400 hover:text-indigo-300">
                  {device.status === "on" || device.status === "online" || device.status === "cooling" ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity / Timeline (optional) */}
        <div className="mt-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span className="text-gray-300">Front door unlocked at 08:32 AM</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span className="text-gray-300">Living room light turned on at 07:45 AM</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span className="text-gray-300">Thermostat set to 22°C at 07:00 AM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;