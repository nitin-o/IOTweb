import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WelcomeToiHomeAutomation = () => {
  const navigate = useNavigate();
  const [smartHomesCount, setSmartHomesCount] = useState(0);
  const [demoLightOn, setDemoLightOn] = useState(false);
  

  useEffect(() => {
    const target = 2000;
    let start = 0;
    const increment = target / 50;
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setSmartHomesCount(target);
        clearInterval(timer);
      } else {
        setSmartHomesCount(Math.floor(start));
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950/40 to-purple-950/30 text-white">
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/10"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-6 py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-indigo-900/40 backdrop-blur-sm px-4 py-1.5 rounded-full border border-indigo-500/30 text-indigo-200 text-sm mx-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            AI-Powered Living
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              TOI
            </span>
            <br />
            Intelligent Spaces
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Revolutionize your home with AI-driven automation. Control lighting,
            climate, security, and energy from a single, elegant dashboard.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <button
              onClick={() => setDemoLightOn(!demoLightOn)}
              className="bg-indigo-600 hover:bg-indigo-500 transform hover:scale-105 transition-all duration-300 px-8 py-3 rounded-full text-white font-semibold shadow-xl shadow-indigo-600/30"
            >
              {demoLightOn ? "Turn Light Off" : "Turn Light On"}
            </button>

            <button
              onClick={() => navigate("/login")}
              className="border border-indigo-500/60 hover:bg-indigo-500/20 transition-all duration-300 px-8 py-3 rounded-full text-gray-200 font-semibold backdrop-blur-sm"
            >
              Get Login
            </button>
          </div>

          <div className="pt-4 text-gray-400">
            <span className="text-white font-bold text-3xl">
              {smartHomesCount}+
            </span>{" "}
            <span className="text-white font-bold text-2xl">
              smart homes connected
            </span>
          </div>

          <div
            className={`mx-auto mt-8 h-24 w-24 rounded-full transition-all duration-300 ${
              demoLightOn
                ? "bg-yellow-300 shadow-[0_0_60px_rgba(253,224,71,0.8)]"
                : "bg-slate-700"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeToiHomeAutomation;