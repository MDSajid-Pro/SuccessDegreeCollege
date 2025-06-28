import { useState } from "react";
import { GraduationCap, FileDown, X } from "lucide-react";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import { facultyList } from "../assets/assets";

const departments = ["All", ...new Set(facultyList.map(f => f.course))];

const Faculty = () => {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filteredFaculty =
    filter === "All"
      ? facultyList
      : facultyList.filter(f => f.course === filter);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Faculty Directory", 15, 20);
    facultyList.forEach((f, i) => {
      doc.text(
        `${i + 1}. ${f.name} - ${f.title}, ${f.course}`,
        15,
        30 + i * 10
      );
    });
    doc.save("Faculty_Directory.pdf");
  };

  return (
    <section className="py-16 px-4 md:px-20 bg-gray-50 min-h-screen">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-gray-800">Our Faculty</h2>
        <p className="text-gray-600 mt-2">Meet the educators powering our college</p>
      </div>

      {/* Download PDF */}
      <div className="text-center mb-6">
        <button
          onClick={generatePDF}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-400 text-white hover:bg-green-700 transition"
        >
          <FileDown className="w-4 h-4" />
          Download Directory (PDF)
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {departments.map(dep => (
          <button
            key={dep}
            onClick={() => setFilter(dep)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition ${
              filter === dep
                ? "bg-blue-600 text-white border-blue-600 shadow"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {dep}
          </button>
        ))}
      </div>

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredFaculty.map((faculty, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img
              src={faculty.image}
              alt={faculty.name}
              className="w-24 h-24 rounded-full mx-auto object-cover mb-4 border-4 border-blue-100"
            />
            <h4 className="text-lg font-semibold text-gray-800">{faculty.name}</h4>
            <p className="text-sm text-gray-500">{faculty.title}</p>
            <div className="flex justify-center items-center gap-1 mt-1 text-blue-600 text-sm">
              <GraduationCap className="w-4 h-4" />
              {faculty.department}
            </div>

            <div className="flex justify-center items-center gap-1 mt-1 text-blue-600 text-sm">
              <p className="mt-4 text-gray-700 text-sm">{faculty.bio}</p>
            </div>
          
            <button
              onClick={() => setSelected(faculty)}
              className="mt-3  text-sm text-gray-700 hover:text-blue-600 underline"
            >
              View More
            </button>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              onClick={() => setSelected(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selected.image}
              alt={selected.name}
              className="w-24 h-24 mx-auto rounded-full border-4 border-blue-200"
            />
            <h3 className="text-xl font-semibold text-center mt-3">{selected.name}</h3>
            <p className="text-center text-sm text-gray-500">{selected.title} - {selected.department}</p>
            <p className="mt-4 text-gray-700 text-sm">{selected.bio}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Faculty;
