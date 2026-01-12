import React from "react";

const AboutUs = () => {
  return (
    <section id="about" className="bg-white py-12 px-4 md:px-8 lg:px-16">
      {/* About Us */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 border-b-4 border-red-500 inline-block">
        About Us
      </h2>
      <p className="text-gray-700 text-lg text-justify leading-relaxed max-w-6xl mx-auto mt-4">
        Success Degree College was established with a commitment to providing quality higher education in the Kalyan Karnataka region. Affiliated to Bidar University and recognized by the Government of Karnataka, the college stands as a beacon of learning and empowerment. Situated in the heart of Kalaburagi, the college campus offers a vibrant academic atmosphere conducive to learning and holistic development.
        <br /><br />
        Success Degree College caters to the aspirations of students in the region by offering Undergraduate programmes aligned with the National Education Policy (NEP) 2020. We are dedicated to serving the socio-economically developing area of Kalaburagi, protected under the special provision for development under Article 371(J) of the Indian Constitution. Our institution focuses on academic excellence, skill development, and the overall transformation of our students.
      </p>

      {/* Vision */}
      <h3 className="text-2xl font-bold text-red-700 mt-12 mb-2">Vision</h3>
      <p className="text-gray-800 text-lg">
        To be a premier institution of higher learning that fosters academic excellence, empowers students through knowledge, ensures inclusive growth for socio-economic transformation, and contributes to sustainable development.
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
