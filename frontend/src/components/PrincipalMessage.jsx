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
              alt="Principal"
              className="w-full rounded-lg shadow-md"
            />
            <h3 className="text-xl font-bold text-red-700 mt-4">Dr. Afroz Jahan</h3>
            <p className="text-gray-700">Principal</p>
          </div>

          {/* Right: Message */}
          <div className="text-gray-800 text-justify leading-relaxed">
            <p className="mb-4">
              At Success Degree College, we believe that true education goes beyond textbooks—it shapes character, instills discipline, and nurtures values. Our college emblem reflects progress and purpose, with the motto "Education is the key to success," guiding every stride we take toward academic excellence and social responsibility.
            </p>
            <p className="mb-4">
              In today's rapidly evolving world, it's crucial to equip students not only with knowledge, but with life skills, values, and a deep-rooted sense of ethics. Inspired by the vision of the National Education Policy 2020, our curriculum ...
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
