import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950/40 to-purple-950/30">
      {/* Logo pulse */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-xl animate-ping"></div>
        <div className="relative w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
          <span className="text-2xl font-bold text-white">TOI</span>
        </div>
      </div>
      
      {/* Spinner rings */}
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-2 border-indigo-400/30 rounded-full animate-ping"></div>
        <div className="absolute inset-0 border-2 border-t-indigo-500 border-r-purple-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
      
      <p className="mt-6 text-gray-400 text-sm">Connecting to your smart home...</p>
    </div>
  );
};

export default LoadingSpinner;