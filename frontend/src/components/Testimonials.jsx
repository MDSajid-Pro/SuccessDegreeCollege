import React from "react";
import { Quote } from "lucide-react";

const reviews = [
  {
    name: "Sanya Mir",
    username: "@Google",
    body: "The coding labs at Success College are top-tier. I cracked the Google interview in my first attempt.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
    course: "BCA 2021"
  },
  {
    name: "Rahul V",
    username: "@Infosys",
    body: "Faculty support was incredible. They guided me from basics to advanced accounting.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
    course: "B.Com 2020"
  },
  {
    name: "Priya D",
    username: "@GoldMedalist",
    body: "Securing the 1st Rank in University was possible due to the library and mentorship here.",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
    course: "B.Sc 2023"
  },
  {
    name: "Amit K",
    username: "@Entrepreneur",
    body: "I started my own business in 3rd year. The college E-Cell provided the initial funding.",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces",
    course: "BBA 2019"
  },
  {
    name: "Neha S",
    username: "@TCS",
    body: "Placement training started in the 1st year itself. By final year, I had 3 offer letters.",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=faces",
    course: "BCA 2022"
  },
  {
    name: "Vikram R",
    username: "@Wipro",
    body: "Best 3 years of my life. Great campus, great friends, and a solid career foundation.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
    course: "B.Sc 2021"
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body, course }) => {
  return (
    <div className="relative w-80 cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow mx-4">
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-900">{name}</span>
          <span className="text-xs font-medium text-blue-600">{username}</span>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600 leading-relaxed">"{body}"</div>
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
         <span className="text-xs text-gray-400 font-medium">{course}</span>
         <Quote size={16} className="text-blue-200" fill="currentColor" />
      </div>
    </div>
  );
};

const SuccessMarquee = () => {
  return (
    <section className="relative py-20 bg-slate-50 overflow-hidden flex flex-col items-center justify-center">
      
      {/* --- INJECT CUSTOM ANIMATION STYLES --- */}
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll-reverse {
          animation: scroll 40s linear infinite reverse;
        }
        /* Pause on hover */
        .group:hover .animate-scroll,
        .group:hover .animate-scroll-reverse {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header */}
      <div className="mb-12 text-center px-4">
        <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Alumni Network</span>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2">
          Don't just take <span className="text-blue-600">our word</span> for it
        </h2>
        <p className="mt-4 text-gray-500 max-w-lg mx-auto">
          Join a community of 5000+ alumni working in top MNCs and leading organizations across the globe.
        </p>
      </div>

      {/* --- MARQUEE CONTAINER --- */}
      <div className="relative flex w-full flex-col items-center justify-center gap-8 overflow-hidden">
        
        {/* ROW 1: Moves Left */}
        <div className="group flex w-full overflow-hidden">
          <div className="flex w-max animate-scroll">
            {[...firstRow, ...firstRow, ...firstRow].map((review, idx) => (
              <ReviewCard key={idx} {...review} />
            ))}
          </div>
        </div>

        {/* ROW 2: Moves Right (Reverse) */}
        <div className="group flex w-full overflow-hidden">
          <div className="flex w-max animate-scroll-reverse">
            {[...secondRow, ...secondRow, ...secondRow].map((review, idx) => (
              <ReviewCard key={idx} {...review} />
            ))}
          </div>
        </div>

        {/* --- GRADIENT FADE MASKS (Left & Right) --- */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-slate-50"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-slate-50"></div>
      
      </div>
    </section>
  );
};

export default SuccessMarquee;