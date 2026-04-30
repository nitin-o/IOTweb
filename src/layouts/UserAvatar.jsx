import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutApi } from "../api/authApi";
// ✅ use context

function UserAvatar({ setisLoggedIn}) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
     // ✅ updates state + localStorage 
     await logoutApi()
     setisLoggedIn(false)
      navigate("/", { replace: true }); // optional but safe
    } catch (error) {
      console.error(error);
      setisLoggedIn(true)
    }
  };

  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="relative" ref={popupRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-sm font-bold cursor-pointer hover:bg-cyan-500 transition"
      >
        NO
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800/95 backdrop-blur-sm border border-white/20 rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="bg-cyan-600/20 px-4 py-2 border-b border-white/10">
            <p className="text-sm font-semibold text-cyan-300">
              Account Menu
            </p>
          </div>

          <div className="p-3 space-y-2">
            <Link
              to="/profile"
              onClick={closeDropdown}
              className="block px-3 py-2 text-sm text-gray-200 hover:bg-gray-700 rounded-lg transition"
            >
              👤 Profile
            </Link>

            <Link
              to="/settings"
              onClick={closeDropdown}
              className="block px-3 py-2 text-sm text-gray-200 hover:bg-gray-700 rounded-lg transition"
            >
              ⚙️ Settings
            </Link>

            <hr className="border-white/10" />

            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-gray-700 rounded-lg transition"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserAvatar;