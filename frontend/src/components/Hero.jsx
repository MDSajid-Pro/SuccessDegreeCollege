import React, { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import { HashLink } from "react-router-hash-link";
import { ArrowRight, ChevronRight } from "lucide-react";
import InquiryModal from "./InquiryModal";
// import { assets } from "../assets/assets"; // Uncomment if using local assets

// Replace with your actual image paths
const heroImages = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920&auto=format&fit=crop", // College Building
  "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1920&auto=format&fit=crop", // Library
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1920&auto=format&fit=crop", // Students
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto-scroll images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden bg-gray-900"
    >
      {/* --- BACKGROUND IMAGE SLIDER --- */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Image with slight zoom effect (Ken Burns) */}
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className={`w-full h-full object-cover transform transition-transform duration-[10000ms] ${
              index === currentImageIndex ? "scale-110" : "scale-100"
            }`}
          />

          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
      ))}

      {/* --- HERO CONTENT --- */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4 sm:px-6 md:px-12 text-white">
        {/* Modern "Pill" Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-300 text-xs sm:text-sm font-medium mb-6 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Admissions Open for 2025-26
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight max-w-5xl">
          <span className="block text-white mb-2">Welcome to</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient">
            <Typewriter
              words={[
                "Success Degree College",
                "Excellence in Education",
                "Your Future Starts Here",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
          Unlock your potential in an environment designed for growth. We blend
          traditional values with modern teaching to shape the leaders of
          tomorrow.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] flex items-center justify-center gap-2 group cursor-pointer"
          >
            Get Started
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

          {/* 2. The Modal (Placed OUTSIDE the button, but inside the container or parent div) */}
          <InquiryModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />

          <HashLink
            smooth
            to="/contact"
            className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 hover:border-white/40"
          >
            Contact Us
            <ChevronRight size={20} />
          </HashLink>
        </div>
      </div>
    </section>
  );
};

export default Hero;
