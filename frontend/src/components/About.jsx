import React from "react";
import { assets } from "../assets/assets";
import { CheckCircle } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="relative bg-white py-24 overflow-hidden">
      {/* Blurred Blobs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute bottom-0 -right-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6 relative inline-block">
            About <span className="text-blue-600">Us</span>
            <span className="block h-1 w-20 bg-blue-500 mt-2 rounded" />
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            At <strong>Success Degree College</strong>, we believe in creating leaders,
            thinkers, and innovators. Our focus lies not just on academic excellence,
            but on holistic development — preparing students for success in every walk of life.
          </p>
          <ul className="space-y-3 text-left text-gray-600 font-medium">
            {[
              "NAAC-accredited & University-recognized curriculum",
              "Experienced and passionate faculty",
              "State-of-the-art infrastructure & digital labs",
              "A culture of creativity, collaboration & community",
            ].map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle size={20} className="text-blue-500 mt-1" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Image */}
        <div className="md:w-1/2">
          <img
            src={assets.about_image}
            alt="Campus life"
            className="w-full h-full max-w-md mx-auto  shadow-xl border-2 border-blue-100 hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
