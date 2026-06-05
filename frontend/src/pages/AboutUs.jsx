import React from "react";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <>
    <section id="about" className="bg-white py-16 px-6 md:px-12 lg:px-24 pt-28 font-sans select-none relative">
      <div className="max-w-5xl mx-auto">
        
        {/* --- MAIN ABOUT SECTION --- */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-8 bg-fuchsia-900 rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight uppercase">
              About Us
            </h2>
          </div>
          
          <p className="text-gray-700 text-base md:text-lg text-justify leading-relaxed font-medium">
            Success Degree College was established with a commitment to providing quality higher education in the Kalyan Karnataka region. Recognized by the Government of Karnataka, affiliated to Bidar University, Bidar, and approved by AICTE, New Delhi, the college stands as a beacon of learning and empowerment. Situated in the heart of Basavakalyan, the college campus offers a vibrant academic atmosphere conducive to learning and holistic development.
          </p>
          
          <p className="text-gray-700 text-base md:text-lg text-justify leading-relaxed font-medium mt-4">
            Success Degree College caters to the aspirations of students in the region by offering Undergraduate programmes aligned with the National Education Policy (NEP) 2020. We are dedicated to serving the socio-economically developing area of Kalyan Karnataka Region, protected under the special provision for development under Article 371(J) of the Indian Constitution. Our institution focuses on academic excellence, skill development, and the overall transformation of our students.
          </p>
        </div>

        {/* --- STRATEGIC VISION & MISSION LINES --- */}
        <div className="border-t border-gray-100 pt-10 space-y-12">
          
          {/* VISION SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
            <div className="md:col-span-1">
              <h3 className="text-lg font-black tracking-widest text-red-700 uppercase md:pt-1">
                Vision
              </h3>
            </div>
            <div className="md:col-span-3 border-l-2 border-red-100 pl-4 md:pl-6">
              <p className="text-gray-800 text-base md:text-lg font-semibold leading-relaxed">
                To be a premier institution of higher learning that fosters academic excellence, empowers students through knowledge, ensures inclusive growth for socio-economic transformation, and contributes to sustainable development.
              </p>
            </div>
          </div>

          {/* MISSION SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 border-t border-gray-100 pt-10">
            <div className="md:col-span-1">
              <h3 className="text-lg font-black tracking-widest text-red-700 uppercase md:pt-1">
                Mission
              </h3>
            </div>
            
            <div className="md:col-span-3 border-l-2 border-red-100 pl-4 md:pl-6">
              <ul className="space-y-4">
                {[
                  "To equip students with relevant knowledge, competence, and creativity to face global challenges.",
                  "To achieve innovations in teaching-learning, research and extension activities to realize national goals.",
                  "To facilitate optimum use of human and natural resources for sustainable development.",
                  "To promote participation of all the stakeholders in the development of the University and the region.",
                  "To empower students through inclusive growth.",
                  "To adopt and promote the knowledge output for human development.",
                  "To create awareness of human rights, value system, culture, heritage and environment."
                ].map((missionText, idx) => (
                  <li key={idx} className="flex items-start gap-3 group">
                    <span className="text-fuchsia-800 font-bold mt-0.5 group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                    <p className="text-gray-700 text-sm md:text-base font-medium leading-relaxed">
                      {missionText}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>
      </section>
      <Footer/>
      </>
  );
};

export default AboutUs;