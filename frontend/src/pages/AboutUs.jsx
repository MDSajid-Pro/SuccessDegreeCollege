import React from "react";

const AboutUs = () => {
  return (
    <section id="about" className="bg-white py-12 px-4 md:px-8 lg:px-16">
      {/* About Us */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 border-b-4 border-red-500 inline-block">
        About Us
      </h2>
      <p className="text-gray-700 text-justify leading-relaxed max-w-6xl mx-auto mt-4">
        Gulbarga University was established on 10th September 1980 as the State University by Act of State Government of Karnataka under section 3 of Karnataka State Universities Act 1976, substituted by KSU Act 2000. The University has been recognized by the University Grants Commission Act, 1956 under 2(f) and 12(b), as affiliating university. It was earlier, a Post Graduate Centre of Karnataka University, Dharwad from 1970–1980. Situated in the North-Eastern part of Karnataka, Jnana Ganga, main campus of the University with greenery is sprawling over 800 acres at Kalaburagi, a district head quarter with a post graduate centre at Aland, a taluka head quarter.
        <br /><br />
        Geographically University is well connected by Air, Rail and Road. The nearest International Airports are Hyderabad (about 230 km), Mumbai (about 530 km) and Bengaluru (about 600 km). It is about 600 km away from the state capital city of Bengaluru. The University caters to the needs of Higher Education in Kalyan Karnataka region offering Undergraduate programmes based on National Education Policy 2020, Post Graduate (Master’s) and Research (Doctoral) programmes through Teaching, Research and Extension activities.
        <br /><br />
        The jurisdiction of Gulbarga University, mainly covering Kalaburagi District is socio-economically developing area protected under the special provision for development under Article 371(J) of the Indian Constitution. The University accredited with NAAC ‘B’ Grade (CGPA 2.91) with KSURF – 4 Stars and QS RANK: 601–650.
      </p>

      {/* Vision */}
      <h3 className="text-2xl font-bold text-red-700 mt-12 mb-2">Vision</h3>
      <p className="text-gray-800 text-lg">
        Excellence in higher education, empowerment through knowledge, inclusive growth for socio-economic transformation and sustainable development.
      </p>

      {/* Mission */}
      <h3 className="text-2xl font-bold text-red-700 mt-8 mb-2">Mission</h3>
      <ul className="list-disc list-inside text-gray-800 space-y-2">
        <li>To equip students with relevant knowledge, competence, and creativity to face global challenges.</li>
        <li>To achieve innovations in teaching-learning, research and extension activities to realize national goals.</li>
        <li>To facilitate optimum use of human and natural resources for sustainable development.</li>
        <li>To promote participation of all the stakeholders in the development of the University and the region.</li>
        <li>To empower students through inclusive growth.</li>
        <li>To adopt and promote the knowledge output for human development.</li>
        <li>To create awareness of human rights, value system, culture, heritage and environment.</li>
      </ul>
    </section>
  );
};

export default AboutUs;
