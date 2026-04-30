import React from "react";
import UserAvatar from "./UserAvatar"
import { Link , NavLink } from "react-router-dom";


const Header = ({setisLoggedIn}) => {




    const navLinkClass = ({ isActive }) =>

      
  `${isActive ? "text-cyan-400" : "text-gray-300"} hover:text-cyan-400 transition`;

    return (
    <nav className="border-b border-white/10 bg-black/30 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">IoT Nexus</span>
        </div>
        <div className="hidden md:flex space-x-6 text-gray-300">
          <NavLink to="/dashboard"  className={navLinkClass} >Dashboard</NavLink>
          <NavLink to="/devices"  className={navLinkClass} >Devices</NavLink>
          <NavLink to="/analytics"  className={navLinkClass} >Analytics</NavLink>
          <NavLink to="/automation"  className={navLinkClass} >Automation</NavLink>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-slate-900"></span>
              <div className="flex items-center space-x-3">
                <UserAvatar 
              setisLoggedIn={setisLoggedIn}/>
              </div>
          </div>
        </div>
      </div>
    </nav>
  );
 

}


export default Header


