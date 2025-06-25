import React from "react";
import {assets} from "../assets/assets"; // Replace with actual path to your image

const Principal = () => {
  return (
    <section id="vice-chancellor" className="bg-white py-12 px-4 md:px-8 lg:px-16">
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2 border-b-4 border-red-500 inline-block pb-2">
        Principal
      </h2>

      {/* Image + Details */}
      <div className="mt-8 flex flex-col items-center text-center">
        <img
          src={assets.principal}
          alt="Principal"
          className="w-full max-w-md rounded-md shadow-lg"
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
          <p className="text-gray-600">
            Principal, Success Degree Collage, Basavakalayan
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="mt-8 text-justify max-w-5xl mx-auto text-gray-700 leading-relaxed text-base sm:text-lg">
        The University logo is Stone Cart and Videye Amruta is the moto, which means education is nectar and truly conveys the spirit of university education. Creating a complete man through Higher Education with an eco-friendly environment in an University is utmost important. All deep rooted core disciplinary components (Shasthras) of education are highly integrated and will never clash each other, in fact, complement each other for the welfare of the human kind. Integration of core disciplinary knowledge with vital skills, values and professional ethics is a paradigm shift visualized under new National Education Policy-2020 in Higher Education aiming at the youth leading towards a rewarding life. Learning-outcomes with human values and moral ethics enhance the quality of higher education.
        <br /><br />
        The nature centric higher education with holistic and judicious blend of Knowledge and Technology would lead the welfare of the humanity. Significant glimpses the past glory is very vital for the sustainable development of the future generation. Commitment, Credibility and Character of every individual directs the path of the future development. Internationalization enables higher education for a better visibility, leveraging strategic partnerships, establishing standard global benchmarks, mobilizing intellectual resources and ultimately working together for the welfare the mankind. The Gulbarga University is to establish collaborations for the global level in the field of higher education with a sense of concern and commitment for the welfare of the state, country and the world at large.
      </p>
    </section>
  );
};

export default Principal;
