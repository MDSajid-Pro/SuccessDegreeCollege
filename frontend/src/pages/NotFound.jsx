import React from "react";
import { Link } from "react-router-dom";
import { Ban } from "lucide-react"; // icon for modern look

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100 text-center px-1">
      {/* Icon */}
      <Ban className="w-20 h-20 text-blue-600 mb-6" />

      {/* 404 Heading */}
      <h1 className="text-7xl font-extrabold text-red-700">404</h1>

      {/* Subheading */}
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        Oops! Page not found
      </h2>

      {/* Explanation */}
      <p className="mt-2 text-gray-600 max-w-md">
        It looks like the page you’re trying to access doesn’t exist on our
        education portal. Don’t worry, let’s get you back on track!
      </p>

      {/* Button */}
      <Link
        to="/"
        className="mt-6 px-5 py-2 bg-blue-400 hover:bg-blue-700 text-white font-medium rounded-2xl shadow-lg transition-all duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
