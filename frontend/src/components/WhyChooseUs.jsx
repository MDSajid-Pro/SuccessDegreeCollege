import React, { useState, useEffect, useRef } from "react";
import { Users, GraduationCap, Briefcase, Award } from "lucide-react";

// --- 1. CONFIG DATA ---
const stats = [
  {
    id: 1,
    label: "Years of Excellence",
    endValue: 5,
    suffix: "+",
    icon: <Award size={32} />,
    desc: "Legacy of quality education",
  },
  {
    id: 2,
    label: "Alumni Network",
    endValue: 500,
    suffix: "+",
    icon: <Users size={32} />,
    desc: "Working in top MNCs",
  },
  {
    id: 3,
    label: "Placement Support",
    endValue: 100,
    suffix: "%",
    icon: <Briefcase size={32} />,
    desc: "Career guidance & training",
  },
  {
    id: 4,
    label: "Expert Faculty",
    endValue: 20,
    suffix: "+",
    icon: <GraduationCap size={32} />,
    desc: "PhD holders & experts",
  },
];

const WhyChooseUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // --- 2. SCROLL DETECTION HOOK ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-24 bg-slate-900 overflow-hidden text-white"
    >
      
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Our Impact in <span className="text-blue-400">Numbers</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            We take pride in our history of academic excellence and the success stories we create every year.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <CounterCard 
              key={stat.id} 
              stat={stat} 
              isVisible={isVisible} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 3. INDIVIDUAL CARD COMPONENT ---
const CounterCard = ({ stat, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const duration = 2000; // Animation duration in ms

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Ease-out function for smooth stop
      const easeOut = 1 - Math.pow(1 - percentage, 3);

      setCount(Math.floor(easeOut * stat.endValue));

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(stat.endValue); // Ensure it lands exactly on the number
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, stat.endValue]);

  return (
    <div className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-2">
      
      {/* Icon */}
      <div className="mb-6 inline-flex p-4 rounded-xl bg-blue-600/20 text-blue-400 group-hover:text-white group-hover:bg-blue-600 transition-colors">
        {stat.icon}
      </div>

      {/* Number */}
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
          {count}
        </span>
        <span className="text-2xl font-bold text-blue-500">
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <h3 className="text-lg font-semibold text-white mb-1">
        {stat.label}
      </h3>
      <p className="text-sm text-slate-400">
        {stat.desc}
      </p>
    </div>
  );
};

export default WhyChooseUs;