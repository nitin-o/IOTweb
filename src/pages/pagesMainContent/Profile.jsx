// src/pages/Profile.jsx
import { useState } from "react";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "JD",
    role: "Home Owner",
    memberSince: "January 2024",
    location: "San Francisco, CA",
    phone: "+1 (555) 123-4567",
  });

  const [editForm, setEditForm] = useState(profile);

  const stats = [
    { label: "Devices Connected", value: "14", icon: "📱" },
    { label: "Automations Active", value: "8", icon: "⚙️" },
    { label: "Energy Saved", value: "342 kWh", icon: "⚡" },
    { label: "Days Active", value: "127", icon: "📅" },
  ];

  const recentActivity = [
    { action: "Added new smart plug", time: "2 hours ago", device: "Kitchen" },
    { action: "Created automation 'Good Night'", time: "Yesterday", device: null },
    { action: "Adjusted thermostat to 22°C", time: "Yesterday", device: "Living Room" },
    { action: "Locked front door", time: "2 days ago", device: "Entrance" },
    { action: "Updated security settings", time: "3 days ago", device: null },
  ];

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setProfile(editForm);
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6 px-18">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Profile
        </h1>
        <p className="text-gray-400 mt-1">View and manage your account information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card (Left column) */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-3xl font-bold shadow-lg mb-4">
              {profile.avatar}
            </div>
            {!isEditing ? (
              <>
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <p className="text-cyan-400 text-sm">{profile.role}</p>
                <p className="text-gray-400 text-sm mt-1">{profile.location}</p>
                <p className="text-gray-500 text-xs mt-2">Member since {profile.memberSince}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-xl text-sm font-semibold transition w-full"
                >
                  Edit Profile
                </button>
              </>
            ) : (
              <div className="space-y-3 text-left mt-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={editForm.name}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                />
                <input
                  type="text"
                  name="avatar"
                  placeholder="Initials (max 2)"
                  maxLength="2"
                  value={editForm.avatar}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={editForm.location}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleEditToggle}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-500 px-3 py-2 rounded-lg text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 border border-white/20 hover:bg-white/10 px-3 py-2 rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats and Details (Right columns) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <span className="text-xl">{stat.icon}</span>
                  <span>{stat.label}</span>
                </div>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-cyan-500 rounded-full"></span>
              Contact Information
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-gray-400">Email</span>
                <span className="font-mono">{profile.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-gray-400">Phone</span>
                <span>{profile.phone}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-400">Member ID</span>
                <span className="text-cyan-300 text-xs">#IOT-{Math.floor(Math.random() * 10000)}</span>
              </div>
            </div>
            {!isEditing && (
              <button className="mt-3 text-cyan-400 text-sm hover:text-cyan-300 transition">
                Update contact info →
              </button>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Activity
            </h3>
            <div className="space-y-3">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm border-b border-white/5 pb-2 last:border-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5"></div>
                  <div className="flex-1">
                    <span>{activity.action}</span>
                    {activity.device && (
                      <span className="text-cyan-400 ml-1">on {activity.device}</span>
                    )}
                    <div className="text-xs text-gray-500 mt-0.5">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;