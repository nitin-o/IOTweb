import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function MainContent({setisLoggedIn}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white">
      <Header 
              setisLoggedIn={setisLoggedIn}/>
        <Outlet />   {/* Dashboard, Xyz, or any nested route content */}
  
      <Footer />
    </div>
  );
}
export default MainContent;