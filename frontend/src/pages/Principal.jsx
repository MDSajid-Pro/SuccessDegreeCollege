import React from "react";
import { assets } from "../assets/assets";

const Principal = () => {
  return (
    <section
      id="vice-chancellor"
      className="bg-white py-12 px-4 md:px-8 lg:px-16"
    >
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2 border-b-4 border-red-500 inline-block pb-2">
        Principal
      </h2>

      {/* Image + Details */}
      <div className="mt-8 flex flex-col items-center text-center">
        <img
          src={assets.principal}
          alt="Principal"
          className="w-2/3 rounded-lg shadow-md"
        />

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-blue-700">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Dr. Afroz Jahan
            </a>
          </h3>
          <p className="p-2"><span className="bg-red-50 text-red-700 text-sm font-semibold px-3 py-1 rounded-full border border-red-200 shadow-sm">
      M.Sc, M.Ed, M.Phil., Ph.D
    </span></p>
          <p className="text-gray-600">
            Principal, Success Degree College, Basavakalayan
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="mt-8 text-justify max-w-5xl mx-auto text-gray-700 leading-relaxed text-base sm:text-lg">
        At Success Degree College, we believe that true education goes beyond
        textbooks—it shapes character, instills discipline, and nurtures values.
        Our college emblem reflects progress and purpose, with the motto
        "Education is the key to success," guiding every stride we take toward
        academic excellence and social responsibility.
        <br />
        <br />
        In today's rapidly evolving world, it's crucial to equip students not
        only with knowledge, but with life skills, values, and a deep-rooted
        sense of ethics. Inspired by the vision of the National Education Policy
        2020, our curriculum is thoughtfully designed to blend core disciplinary
        learning with hands-on experience and moral grounding. We aim to mold
        our students into responsible citizens who can lead with integrity and
        compassion.
        <br />
        <br />
        At Success Degree College, we foster a holistic, student-centric
        environment where learning thrives amid nature and innovation. We are
        committed to developing young minds into future leaders—academically
        competent, ethically strong, and globally aware. Our journey is driven
        by the pillars of Commitment, Character, and Credibility. Through
        meaningful collaborations and a deep concern for the societal good, we
        are paving the way for inclusive, sustainable, and empowered futures—for
        our students, our region, and our nation.
      </p>
    </section>
  );
};

export default Principal;