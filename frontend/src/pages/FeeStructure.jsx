import React, { useState } from "react";
import { BookOpen, UserPlus, Home, FileText, IndianRupee } from "lucide-react";

const feeData = {
  BSc: [
    { title: "University Fee", amount: 3200, icon: <BookOpen />, desc: "Annual academic fee." },
    { title: "Admission Fee", amount: 15000, icon: <UserPlus />, desc: "One-time joining fee." },
    { title: "Examination Fee", amount: 1950, icon: <FileText />, desc: "Exam-related charges." },
  ],
  BCom: [
    { title: "University Fee", amount: 3200, icon: <BookOpen />, desc: "Annual academic fee." },
    { title: "Admission Fee", amount: 10000, icon: <UserPlus />, desc: "One-time joining fee." },
    { title: "Examination Fee", amount: 2500, icon: <FileText />, desc: "Exam-related charges." },
  ],
  BA: [
    { title: "University Fee", amount: 3200, icon: <BookOpen />, desc: "Annual academic fee." },
    { title: "Admission Fee", amount: 8000, icon: <UserPlus />, desc: "One-time joining fee." },
    { title: "Examination Fee", amount: 1900, icon: <FileText />, desc: "Exam-related charges." },
    ],
    BCA: [
    { title: "University Fee", amount: 3200, icon: <BookOpen />, desc: "Annual academic fee." },
    { title: "Admission Fee", amount: 18000, icon: <UserPlus />, desc: "One-time joining fee." },
    { title: "Examination Fee", amount: 2000, icon: <FileText />, desc: "Exam-related charges." },
  ]
};

const FeeStructure = () => {
  const courseNames = Object.keys(feeData);
  const [selectedCourse, setSelectedCourse] = useState(courseNames[0]);

  const total = feeData[selectedCourse].reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <section className="py-16 px-4 md:px-20 bg-gray-50 min-h-screen">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Fee Structure</h2>
        <p className="text-gray-600">Select a course to view its fee breakdown</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8 gap-4 flex-wrap">
        {courseNames.map(course => (
          <button
            key={course}
            onClick={() => setSelectedCourse(course)}
            className={`px-5 py-2 rounded-full border transition text-sm font-medium ${
              selectedCourse === course
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {course}
          </button>
        ))}
      </div>

      {/* Fee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {feeData[selectedCourse].map((fee, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex gap-4 items-start hover:scale-[1.01] transition"
          >
            <div className="p-3 rounded-full bg-gray-100 text-blue-600">{fee.icon}</div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">{fee.title}</h4>
              <p className="text-gray-500 text-sm">{fee.desc}</p>
              <div className="text-xl font-bold text-green-600 mt-2">₹{fee.amount.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-10 text-center text-xl font-semibold text-gray-800 border-t pt-6 flex justify-center items-center gap-2">
        <IndianRupee className="w-5 h-5 text-green-600" />
        Total Fee for {selectedCourse}:{" "}
        <span className="text-green-600 font-bold">₹{total.toLocaleString()}</span>
      </div>
    </section>
  );
};

export default FeeStructure;
