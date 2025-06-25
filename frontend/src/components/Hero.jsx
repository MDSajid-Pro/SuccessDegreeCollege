import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { HashLink } from "react-router-hash-link";
import { ArrowRight } from "lucide-react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      >
        <source src={assets.bg_video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Animated Blob Shape */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400 opacity-30 rounded-full mix-blend-multiply filter blur-3xl animate-ping z-10"></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-20" />

      {/* Hero Content */}
      <div className="relative z-30 flex flex-col justify-center items-center text-center h-full px-6 text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
          <span className="text-blue-400">Welcome to</span>{" "}
          <br />
          <span className="text-white">
            <Typewriter
              words={["Success Degree College", "Your Future Begins Here", "Learn. Grow. Succeed."]}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
          A place where knowledge meets opportunity. Empower your dreams with us.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <HashLink
            smooth
            to="/mission"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition"
          >
            Learn More <ArrowRight size={18} />
          </HashLink>
          <HashLink
            smooth
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition"
          >
            Contact Us
          </HashLink>
        </div>
      </div>
    </section>
  );
};

export default Hero;
