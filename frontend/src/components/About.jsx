import React from "react";
import { assets } from "../assets/assets";
import { CheckCircle2, Award, Users, MonitorPlay, HeartHandshake } from "lucide-react";

const About = () => {
  // Define features with specific icons for a richer look
  const features = [
    { 
      text: "NAAC-accredited curriculum", 
      icon: <Award className="text-blue-600" size={24} />,
      desc: "Recognized excellence"
    },
    { 
      text: "Expert Faculty", 
      icon: <Users className="text-purple-600" size={24} />,
      desc: "Learn from the best"
    },
    { 
      text: "Digital Labs", 
      icon: <MonitorPlay className="text-orange-600" size={24} />,
      desc: "State-of-the-art tech"
    },
    { 
      text: "Vibrant Culture", 
      icon: <HeartHandshake className="text-pink-600" size={24} />,
      desc: "Creativity & community"
    },
  ];

  return (
    <section id="about" className="relative bg-slate-50 py-24 overflow-hidden">
      
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* --- LEFT COLUMN: IMAGE COMPOSITION --- */}
          <div className="relative order-2 lg:order-1">
            {/* Decorative Dot Pattern */}
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-pattern-dots opacity-20" />
            
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.02] transition-transform duration-500">
              <img
                src={assets.about_image}
                alt="Campus Life"
                className="w-full h-auto object-cover"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Floating Badge (Glassmorphism) */}
            <div className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-xl border border-white/50 animate-bounce-slow hidden sm:block">
              <div className="flex items-center gap-4">
                <div className="bg-blue-600 text-white p-3 rounded-full">
                  <Award size={28} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Commitment to</p>
                  <p className="text-xl font-bold text-gray-900">Excellence</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: TEXT CONTENT --- */}
          <div className="order-1 lg:order-2">
            
            {/* Section Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              Who We Are
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Success Degree College</span>
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We believe in creating leaders, thinkers, and innovators. Our focus lies not just on academic excellence, but on 
              <span className="font-semibold text-gray-800"> holistic development</span> — preparing students for success in every walk of life.
            </p>

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((item, index) => (
                <div 
                  key={index} 
                  className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.text}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote / Sign-off (Optional) */}
            <div className="mt-8 pt-8 border-t border-gray-200">
               <p className="italic text-gray-500 font-medium">"Empowering dreams through education."</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;