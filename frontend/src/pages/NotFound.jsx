import React from "react";
import { Link } from "react-router-dom";
import { MoveLeft, FileQuestion } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Decorative Elements (Blobs) */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

      <div className="relative z-10 text-center max-w-lg mx-auto">
        
        {/* Layered Icon & 404 Text */}
        <div className="relative mb-8">
          {/* The massive background text */}
          <h1 className="text-[10rem] md:text-[12rem] font-black text-gray-100 leading-none select-none">
            404
          </h1>
          
          {/* The floating icon centered on top */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-4 rounded-full shadow-xl border border-gray-100 animate-bounce">
              <FileQuestion className="w-12 h-12 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          Page Not Found
        </h2>
        
        <p className="mt-4 text-gray-500 text-lg leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="group flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
          >
            <MoveLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-full border border-gray-200 shadow-sm transition-all duration-300"
          >
            Refresh Page
          </button>
        </div>
      </div>

    </div>
  );
};

export default NotFound;