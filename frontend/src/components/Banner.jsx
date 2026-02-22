import React from "react";
import { assets } from "../assets/assets"; // Assuming you have student images here

const Banner = () => {
  // Sample data for the grid - easier to manage than hardcoding HTML
  const achievers = [
    {
      name: "Zeba Tarannum",
      Do: "U04FK21S0021",
      per: "86.5%",
      img: assets.student1,
    },
    {
      name: "Asma Anjum",
      Do: "U04FK21S0014",
      per: "86%",
      img: assets.student2,
    },
    {
      name: "Javeriya Siddiqua",
      Do: "U04FK21S0018",
      per: "84.9%",
      img: assets.student3,
    },
    {
      name: "Shifa Faraaz",
      Do: "U04FK21S0015",
      per: "84%",
      img: assets.student4,
    },
    {
      name: "Syeda Arbiya",
      Do: "U04FK21S0019",
      per: "82.8%",
      img: assets.student5,
    },
    {
      name: "Adeeba Fatima",
      Do: "U04FK21S0044",
      per: "82.5%",
      img: assets.student6,
    },
    {
      name: "Syed Adnan Musa",
      Do: "U04FK21S0035",
      per: "82.2%",
      img: assets.student7,
    },
    {
      name: "Merajunnisa",
      Do: "U04FK21S0013",
      per: "82%",
      img: assets.student8,
    },
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto bg-pink-50 shadow-xl overflow-hidden font-sans my-8 border border-gray-200 rounded-xl">
      {/* --- HEADER --- */}
      <header className="bg-fuchsia-900 text-white p-4 text-center relative">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {/* Logo Placeholder */}
          <div className="bg-white p-2 rounded-lg w-16 h-16 md:absolute md:left-6 md:top-2 shadow-md">
            <img
              src={assets.logo2}
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-wide uppercase">
              Success Degree College
            </h1>
            <div className="bg-yellow-400 text-fuchsia-900 font-bold text-xs md:text-sm px-6 py-1 mt-2 rounded-full inline-block shadow-sm">
              Recognised by Govt. of Karnataka, Affiliated to Bidar University,
              Bidar & Approved by AICTE New Delhi
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN BODY --- */}
      <div className="p-4 md:p-6 lg:p-8">
        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="inline-block bg-fuchsia-900 text-white px-6 py-2 rounded-tl-2xl rounded-br-2xl text-xl md:text-2xl font-bold shadow-lg transform -skew-x-6">
            <span className="not-italic block transform skew-x-6">
              We Continues Breaking Records. Another Year, Another Milestone!
            </span>
          </div>
          <p className="text-fuchsia-800 font-dancing-script text-xl mt-2">
            With Highest Selection Rate
          </p>
        </div>

        {/* Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT COLUMN: HERO STUDENT (Bushra) */}
          <div className="lg:w-1/4 flex flex-col items-center bg-white p-4 rounded-xl shadow-md border-t-4 border-fuchsia-600">
            <div className="relative">
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-red-700 font-bold rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-lg border-2 border-white z-10 animate-pulse">
                <span className="text-xs">9th</span>
                <span className="text-2xl">Rank</span>
              </div>
              <img
                src={assets.img}
                alt="Topper"
                className="w-48 h-56 object-cover rounded-lg shadow-inner mx-auto"
              />
            </div>
            <h2 className="text-2xl font-bold text-red-600 mt-4">
              Aliya Anjum
            </h2>
            <p className="font-semibold text-gray-800">D/o Abdul Rasheed</p>
            <p className="font-semibold text-gray-800">U04FK21S0021</p>
            <p className="font-semibold text-fuchsia-800">Percentage : 88%</p>
          </div>

          {/* CENTER COLUMN: STUDENT GRID */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {achievers.map((student, index) => (
                <div
                  key={index}
                  className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-md transition-shadow"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-fuchsia-100 mb-2">
                    <img
                      src={assets.Face}
                      alt={student.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-sm font-bold text-center mt-3 text-red-600">
                    {student.name}
                  </h3>
                  <h3 className="text-xs font-bold text-center text-black pt-3">
                    {" "}
                    Reg no. {student.Do}
                  </h3>
                  <div className="bg-fuchsia-700 text-white text-[15px] px-2 py-0.5 rounded mt-1 w-full text-center truncate">
                    {student.per}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: STATS & ADMISSION */}
          <div className="lg:w-1/4 flex flex-col gap-4">
            {/* Stats Panel */}
            <div className="bg-gray-100 rounded-xl p-4 border border-gray-200 shadow-inner">
              <h3 className="bg-fuchsia-800 text-white text-center py-1 rounded font-bold text-sm mb-4">
                COLLEGE RESULTS - 2025
              </h3>
              <div className="grid grid-cols-2 gap-3 text-center">
                <StatBox label="B.Sc" count="27" color="bg-yellow-400" />
                <StatBox label="B.Com" count="08" color="bg-orange-400" />
                <StatBox label="B.A" count="11" color="bg-yellow-400" />
                <StatBox label="BCA" count="06" color="bg-orange-400" />
              </div>
            </div>

            {/* Admission Badge */}
            <div className="bg-gray-800 text-white p-4 rounded-xl shadow-lg text-center flex flex-col items-center justify-center h-full relative overflow-hidden group">
              <div className="absolute w-20 h-60 bg-white opacity-10 rotate-45 -top-10 -left-10 group-hover:left-[120%] transition-all duration-700"></div>
              <h3 className="text-2xl font-bold uppercase">Admissions</h3>
              <div className="bg-yellow-400 text-black px-4 py-1 text-xl font-bold rounded my-2 animate-bounce">
                OPEN
              </div>
              <p className="text-lg text-gray-300">2026-27</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-fuchsia-900 text-white py-3 px-4 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm md:text-base">
        <div className="font-semibold mb-2 md:mb-0">
          Gandhi Chowk, Behind Police Station, Basavakalyan
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-6 font-bold text-yellow-300">
          <span>📞 85498 08439</span>
          <span>📞 80958 08439</span>
        </div>
      </footer>
    </div>
  );
};

// Helper component for the Stat boxes
const StatBox = ({ label, count, color }) => (
  <div
    className={`${color} rounded-lg p-2 shadow-sm flex flex-col items-center justify-center h-20`}
  >
    <span className="text-xs font-bold text-black opacity-80">{label}</span>
    <span className="text-3xl font-extrabold text-red-700">{count}</span>
  </div>
);

export default Banner;
