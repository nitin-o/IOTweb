import React, { useEffect, useState } from "react";
import Xyz from "../pages/pagesTest/Xyz.jsx";

import WelcomeToiHomeAutomation from "../pages/WelcomeToiHomeAutomation.jsx";
import LoginSignup from "../pages/pagesAuth/LoginSignup.jsx"


import Dashboard from "../pages/pagesMainContent/Dashboard.jsx"
import Devices from "../pages/pagesMainContent/Devices.jsx"
import Analytics from "../pages/pagesMainContent/Analytics.jsx"
import Automation from "../pages/pagesMainContent/Automation.jsx"

import Profile from "../pages/pagesMainContent/Profile.jsx"
import Settings from "../pages/pagesMainContent/Settings.jsx"





import LoadingSpinner from "../layouts/LoadingSpinner.jsx";


import MainContent  from "../layouts/MainContent.jsx"



import { Routes, Route  , Navigate} from "react-router-dom";
import { getMeApi } from "../api/authApi.js";

function AppRoutes() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getMeApi();
        setisLoggedIn(!!res);
      } catch (error) {
        console.log("Not logged in", error);
        setisLoggedIn(false);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* Public */}
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <WelcomeToiHomeAutomation />
          )
        }
      />

      <Route
        path="/login"
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginSignup
              isLoggedIn={isLoggedIn}
              setisLoggedIn={setisLoggedIn}
            />
          )
        }
      />

      {/* Protected */}
      <Route
        path="/"
        element={
          isLoggedIn ? <MainContent 
          setisLoggedIn={setisLoggedIn}
          /> : 
          <Navigate to="/login" replace />
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="devices" element={<Devices />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="automation" element={<Automation />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={
          <Navigate to={isLoggedIn ? "/dashboard" : "/"} replace />
        }
      />
    </Routes>
  );
}
export default AppRoutes;



    // <Routes>
    //   <Route
    //     path="/"
    //     element={
    //       isLogin ? (
    //         <Xyz setaa={setIsLogin} aa={isLogin} />
    //       ) : (
    //         <Xyz setaa={setIsLogin} aa={isLogin} />
    //       )
    //     }
    //   />
    // </Routes>