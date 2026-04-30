// src/pages/Settings.jsx
import { useState } from "react";

function Settings() {
  // User profile state
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "JD",
  });

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushAlerts: true,
    motionAlerts: false,
    energyReports: true,
  });

  // Security settings
  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: "30",
  });

  // App preferences
  const [preferences, setPreferences] = useState({
    temperatureUnit: "celsius", // celsius / fahrenheit
    theme: "dark",
    language: "en",
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const handleProfileUpdate = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleNotificationToggle = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences({ ...preferences, [key]: value });
  };

  const handlePasswordChange = () => {
    if (passwordData.new !== passwordData.confirm) {
      setPasswordError("New passwords do not match");
      return;
    }
    if (passwordData.new.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    // In real app: call API to change password
    alert("Password changed successfully!");
    setShowPasswordModal(false);
    setPasswordData({ current: "", new: "", confirm: "" });
    setPasswordError("");
  };

  const handleTwoFactorToggle = () => {
    setSecurity({ ...security, twoFactor: !security.twoFactor });
    // In real app: show QR code / setup flow
    if (!security.twoFactor) {
      alert("2FA setup would open here");
    }
  };

  return (
    <div className="space-y-6 px-18">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-gray-400 mt-1">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            <span className="w-1 h-5 bg-cyan-500 rounded-full"></span>
            Profile Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Display Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleProfileUpdate("name", e.target.value)}
                className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileUpdate("email", e.target.value)}
                className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Avatar Initials</label>
              <input
                type="text"
                value={profile.avatar}
                maxLength="2"
                onChange={(e) => handleProfileUpdate("avatar", e.target.value.toUpperCase())}
                className="w-20 bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2 text-white text-center focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>
            <button className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-xl text-sm font-semibold transition">
              Save Profile
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            <span className="w-1 h-5 bg-cyan-500 rounded-full"></span>
            Notifications
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Email Alerts</p>
                <p className="text-xs text-gray-400">Receive security & device alerts via email</p>
              </div>
              <button
                onClick={() => handleNotificationToggle("emailAlerts")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  notifications.emailAlerts ? "bg-cyan-600" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    notifications.emailAlerts ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-xs text-gray-400">Real‑time mobile alerts</p>
              </div>
              <button
                onClick={() => handleNotificationToggle("pushAlerts")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  notifications.pushAlerts ? "bg-cyan-600" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    notifications.pushAlerts ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Motion Detection Alerts</p>
                <p className="text-xs text-gray-400">Notify when motion sensors activate</p>
              </div>
              <button
                onClick={() => handleNotificationToggle("motionAlerts")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  notifications.motionAlerts ? "bg-cyan-600" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    notifications.motionAlerts ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Weekly Energy Reports</p>
                <p className="text-xs text-gray-400">Email summary of energy usage</p>
              </div>
              <button
                onClick={() => handleNotificationToggle("energyReports")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  notifications.energyReports ? "bg-cyan-600" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    notifications.energyReports ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            <span className="w-1 h-5 bg-cyan-500 rounded-full"></span>
            Security
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Two‑Factor Authentication</p>
                <p className="text-xs text-gray-400">Add an extra layer of security</p>
              </div>
              <button
                onClick={handleTwoFactorToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  security.twoFactor ? "bg-cyan-600" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    security.twoFactor ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Session Timeout (minutes)</label>
              <select
                value={security.sessionTimeout}
                onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                className="bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2 text-white w-full"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="border border-white/20 hover:bg-white/10 px-4 py-2 rounded-xl text-sm transition w-full"
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
            <span className="w-1 h-5 bg-cyan-500 rounded-full"></span>
            Preferences
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Temperature Unit</label>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePreferenceChange("temperatureUnit", "celsius")}
                  className={`flex-1 py-2 rounded-xl transition ${
                    preferences.temperatureUnit === "celsius"
                      ? "bg-cyan-600 text-white"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  °C Celsius
                </button>
                <button
                  onClick={() => handlePreferenceChange("temperatureUnit", "fahrenheit")}
                  className={`flex-1 py-2 rounded-xl transition ${
                    preferences.temperatureUnit === "fahrenheit"
                      ? "bg-cyan-600 text-white"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  °F Fahrenheit
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Theme</label>
              <select
                value={preferences.theme}
                onChange={(e) => handlePreferenceChange("theme", e.target.value)}
                className="bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2 text-white w-full"
              >
                <option value="dark">Dark (Default)</option>
                <option value="light">Light</option>
                <option value="system">System</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Language</label>
              <select
                value={preferences.language}
                onChange={(e) => handlePreferenceChange("language", e.target.value)}
                className="bg-gray-800/50 border border-white/10 rounded-xl px-4 py-2 text-white w-full"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-5">
        <h2 className="text-lg font-bold text-red-400 flex items-center gap-2">
          ⚠️ Danger Zone
        </h2>
        <p className="text-sm text-gray-300 mt-1">These actions are irreversible.</p>
        <div className="flex flex-wrap gap-3 mt-3">
          <button className="bg-red-600/20 hover:bg-red-600/40 text-red-300 border border-red-500/30 px-4 py-2 rounded-xl text-sm transition">
            Delete All Data
          </button>
          <button className="bg-red-600/20 hover:bg-red-600/40 text-red-300 border border-red-500/30 px-4 py-2 rounded-xl text-sm transition">
            Deactivate Account
          </button>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowPasswordModal(false)}>
          <div className="bg-gray-800 rounded-2xl p-6 w-96 border border-white/20 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <div className="space-y-3">
              <input
                type="password"
                placeholder="Current password"
                className="w-full bg-gray-700 border border-white/10 rounded-lg px-3 py-2 text-white"
                value={passwordData.current}
                onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
              />
              <input
                type="password"
                placeholder="New password"
                className="w-full bg-gray-700 border border-white/10 rounded-lg px-3 py-2 text-white"
                value={passwordData.new}
                onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
              />
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full bg-gray-700 border border-white/10 rounded-lg px-3 py-2 text-white"
                value={passwordData.confirm}
                onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
              />
              {passwordError && <p className="text-red-400 text-sm">{passwordError}</p>}
              <div className="flex gap-3 pt-2">
                <button onClick={handlePasswordChange} className="bg-cyan-600 px-4 py-2 rounded-lg flex-1 hover:bg-cyan-500">
                  Update
                </button>
                <button onClick={() => setShowPasswordModal(false)} className="bg-gray-600 px-4 py-2 rounded-lg flex-1 hover:bg-gray-500">
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

export default Settings;