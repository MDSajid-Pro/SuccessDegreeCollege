import React, { useState, useEffect } from "react";
import Banner from "./Banner";
import { assets } from "../assets/assets";

const BannerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  
  const bannersCount = 2; 

  useEffect(() => {
    let interval;
    if (!isHovered) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === bannersCount - 1 ? 0 : prevIndex + 1
        );
      }, 6000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered, bannersCount]);

  const handleTouchStart = (e) => setTouchStartX(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEndX(e.targetTouches[0].clientX);
  
  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50; 

    if (distance > minSwipeDistance) {
      setCurrentIndex((prev) => (prev === bannersCount - 1 ? 0 : prev + 1));
    }
    if (distance < -minSwipeDistance) {
      setCurrentIndex((prev) => (prev === 0 ? bannersCount - 1 : prev - 1));
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const banner1Data = {
    title: "Excellence in Education. Transforming Futures!",
    subtitle: "With Highest Selection Rate",
    statsTitle: "COLLEGE RESULTS   2023 - 2024",
    admissionYear: "2026-27",
    heroStudent: {
      rank: "1st",
      name: "Aliya Anjum",
      fatherName: "D/o Abdul Rasheed",
      regNo: "U04FK21S0021",
      per: "88%",
      img: assets.Aliya
    },
    achievers: [
      { name: "Zeba Tarannum", Do: "U04FK21S0021", per: "86.5%", img: assets.Face },
      { name: "Asma Anjum", Do: "U04FK21S0014", per: "86%", img: assets.Face },
      { name: "Javeriya Siddiqua", Do: "U04FK21S0018", per: "84.9%", img: assets.Face },
      { name: "Shifa Faraaz", Do: "U04FK21S0015", per: "84%", img: assets.Face },
      { name: "Syeda Arbiya", Do: "U04FK21S0019", per: "82.8%", img: assets.Face },
      { name: "Adeeba Fatima", Do: "U04FK21S0044", per: "82.5%", img: assets.Face },
      { name: "Syed Adnan Musa", Do: "U04FK21S0035", per: "82.2%", img: assets.Face },
      { name: "Merajunnisa", Do: "U04FK21S0013", per: "82%", img: assets.Face },
    ],
    stats: [
      { label: "B.Sc", count: "27" },
      { label: "B.Com", count: "08" },
      { label: "B.A", count: "11" },
      { label: "BCA", count: "06" },
    ]
  };

  const banner2Data = {
    title: "We Continue Breaking Records. Another Year, Another Milestone!",
    subtitle: "With Highest Selection Rate",
    statsTitle: "COLLEGE RESULTS   2024 - 2025",
    admissionYear: "2026-27",
    heroStudent: {
      rank: "1st",
      name: "Shabeena Kashaf",
      fatherName: "D/o Shafiuddin",
      regNo: "U04FK22S0015",
      per: "92.8%",
      img: assets.img
    },
    achievers: [
      { name: "Saniya Tabassum", Do: "U04FK22S0005", per: "89.1%", img: assets.Face },
      { name: "Shireen Sana", Do: "U04FK22S0017", per: "88.9%", img: assets.Face },
      { name: "Humaira", Do: "U04FK22S0022", per: "88.9%", img: assets.Face },
      { name: "Shireen Sana", Do: "U04FK22S0017", per: "88.9%", img: assets.Face },
      { name: "Arshiya Begum", Do: "U04FK22S0004", per: "88.1%", img: assets.Face },
      { name: "Husna", Do: "U04FK22S0010", per: "88.1%", img: assets.Face },
      { name: "Arbiya Kashaf", Do: "U04FK22S0006", per: "87.2%", img: assets.Face },
      { name: "Tahniyat", Do: "U04FK22S0013", per: "86.5%", img: assets.Face },
    ],
    stats: [
      { label: "B.Sc", count: "19" },
      { label: "B.Com", count: "08" },
      { label: "B.A", count: "13" },
      { label: "BCA", count: "06" },
    ]
  };

  return (
    <div 
      className="relative w-full max-w-[1400px] mx-auto overflow-hidden md:my-6 rounded-none md:rounded-3xl shadow-xl md:border border-gray-200"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        <div className="min-w-full flex-shrink-0">
          <Banner {...banner1Data} /> 
        </div>

        <div className="min-w-full flex-shrink-0">
          <Banner {...banner2Data} /> 
        </div>
      </div>

      {/* Structured low-profile slide indicators */}
      <div className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 z-20 bg-fuchsia-950/10 border border-fuchsia-900/5 px-3 py-1.5 rounded-full backdrop-blur-xs">
        {[0, 1].map((idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentIndex === idx 
                ? "bg-fuchsia-900 w-6 shadow-sm" 
                : "bg-fuchsia-900/30 w-1.5"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;