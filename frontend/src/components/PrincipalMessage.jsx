import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const PrincipalMessage = () => {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-10 border-b-4 border-red-600 inline-block pb-2">
          Principal Message
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left: Image + Name */}
          <div className="text-center">
            <img
              src={assets.principal}
              alt="Vice Chancellor"
              className="w-full max-w-md mx-auto rounded-lg shadow-md"
            />
            <h3 className="text-xl font-bold text-red-700 mt-4">Dr. Afroz Jahan</h3>
            <p className="text-gray-700">Principal</p>
          </div>

          {/* Right: Message */}
          <div className="text-gray-800 text-justify leading-relaxed">
            <p className="mb-4">
              The University logo is Stone Cart and Vidyeye Amruta is the moto, which means
              education is nectar and truly conveys the spirit of university education.
              Creating a complete man through Higher Education with an eco-friendly
              environment in a University is utmost important.
            </p>
            <p className="mb-4">
              All deep rooted core disciplinary components (Shasthras) of education are highly
              integrated and will never clash each other, in fact, complement each other for
              the welfare of humankind...
            </p>

            {/* Read More Button */}
            <Link
              to="/principal"
              className="inline-block mt-4 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrincipalMessage;
