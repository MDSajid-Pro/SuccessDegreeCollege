import React, { useState, useEffect, useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { 
  Trophy, 
  Search, 
  Download, 
  GraduationCap, 
  Medal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";

const ResultsPage = () => {
  const { axios } = useAppContext();

  // --- STATE ---
  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [selectedYear, setSelectedYear] = useState("2024-25");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/results');
        setAllStudents(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [axios]);

  // --- FILTER LOGIC (Must be defined BEFORE handleExportPDF) ---
  const filteredData = useMemo(() => {
    return allStudents.filter(student => {
      const matchYear = student.year === selectedYear;
      const matchCourse = selectedCourse === "All" || student.course === selectedCourse;
      const matchSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.regNo.toLowerCase().includes(searchTerm.toLowerCase());
      return matchYear && matchCourse && matchSearch;
    }).sort((a, b) => b.percentage - a.percentage);
  }, [allStudents, selectedYear, selectedCourse, searchTerm]);

  // --- EXPORT PDF FUNCTION (Updated) ---
  const handleExportPDF = () => {
    if (filteredData.length === 0) {
      toast.error("No data to export!");
      return;
    }

    const doc = new jsPDF();

    // 1. Add Professional Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(37, 99, 235); // Blue-600 color
    doc.text(`Academic Results Report: ${selectedYear}`, 14, 20);

    // 2. Add Sub-header (Course & Date)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100); // Gray
    doc.text(`Course: ${selectedCourse} `, 14, 28);

    // 3. Define Columns
    const tableColumn = ["Rank", "Reg No", "Student Name", "Course", "Percentage", "Grade"];

    // 4. Map Filtered Data
    const tableRows = filteredData.map((student, index) => [
      index + 1,
      student.regNo,
      student.name,
      student.course,
      `${student.percentage}%`,
      student.grade
    ]);

    // 5. Generate Table with Styling
    autoTable(doc, {
      startY: 35,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      styles: { 
        fontSize: 10, 
        font: "helvetica",
        cellPadding: 3,
      },
      headStyles: { 
        fillColor: [37, 99, 235], // Blue Header
        textColor: 255, // White text
        fontStyle: 'bold'
      },
      alternateRowStyles: { 
        fillColor: [240, 245, 255] // Very light blue for alternate rows
      },
      columnStyles: {
        0: { halign: 'center', fontStyle: 'bold' }, // Rank column
        4: { halign: 'right', fontStyle: 'bold' }, // Percentage column
      }
    });

    // 6. Save File
    doc.save(`Results_${selectedYear}_${selectedCourse}.pdf`);
    toast.success("PDF Downloaded successfully!");
  };

  // --- PAGINATION HELPERS ---
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedYear, selectedCourse, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const alert = () => {
    toast.error('Details not available yet.')
  }

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const topPerformers = filteredData.slice(0, 3);

  const getGradeColor = (grade) => {
    if (grade === "Distinction") return "bg-green-100 text-green-700 border-green-200";
    if (grade === "First Class") return "bg-blue-100 text-blue-700 border-blue-200";
    if (grade === "Second Class") return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Academic <span className="text-blue-600">Results</span> & Archives
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Celebrating the academic excellence of our students. Browse through the passout lists and university rank holders by year.
        </p>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="2024-25">Batch 2024-25</option>
                <option value="2023-24">Batch 2023-24</option>
            </select>
            <select 
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Courses</option>
                <option value="B.A">B.A</option>
                <option value="B.Sc">B.Sc</option>
                <option value="B.Com">B.Com</option>
                <option value="BCA">BCA</option>
            </select>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 p-2.5 w-full bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* EXPORT BUTTON */}
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition"
            >
              <Download size={18} /> <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Spotlight */}
      {!loading && topPerformers.length > 0 && !searchTerm && (
        <div className="max-w-7xl mx-auto mb-10">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Trophy className="text-yellow-500" size={24} />
            Top Performers - {selectedYear}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topPerformers.map((student, index) => (
              <div key={student._id || index} className="bg-white rounded-2xl p-6 shadow-md border flex items-center gap-4 relative overflow-hidden transform hover:-translate-y-1 transition duration-300">
                <div className={`absolute top-0 right-0 p-3 opacity-10 rounded-bl-2xl ${index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-600"}`}>
                  <Medal size={40} />
                </div>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg ${index === 0 ? "bg-gradient-to-br from-yellow-400 to-yellow-600" : index === 1 ? "bg-gradient-to-br from-gray-300 to-gray-500" : "bg-gradient-to-br from-orange-400 to-orange-600"}`}>
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 line-clamp-1">{student.name}</h4>
                  <p className="text-sm text-gray-500">{student.course} • {student.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Table & Pagination */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4">Sl No</th>
                <th className="px-6 py-4">Reg No.</th>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Percentage</th>
                <th className="px-6 py-4">Grade</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                 <tr><td colSpan="7" className="p-8 text-center text-gray-500">Loading results...</td></tr>
              ) : currentItems.length > 0 ? (
                currentItems.map((student, index) => (
                  <tr key={student._id || index} className="hover:bg-blue-50/40 transition-colors">
                    <td className="px-6 py-4 text-gray-400 font-bold">
                      #{indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-6 py-4 font-mono text-gray-600">{student.regNo}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{student.name}</td>
                    <td className="px-6 py-4 text-gray-600">{student.course}</td>
                    <td className="px-6 py-4 font-bold text-gray-800">{student.percentage}%</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getGradeColor(student.grade)}`}>
                        {student.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                        <button onClick={alert} className="text-blue-600 hover:text-blue-800 font-medium text-xs hover:underline">View</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <GraduationCap size={40} className="text-gray-300" />
                      <p>No records found for the selected criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* --- FUNCTIONAL PAGINATION FOOTER --- */}
        {!loading && filteredData.length > 0 && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            
            <span className="font-medium">
              Showing <span className="text-gray-900 font-bold">{indexOfFirstItem + 1}</span> to{" "}
              <span className="text-gray-900 font-bold">
                {Math.min(indexOfLastItem, filteredData.length)}
              </span>{" "}
              of <span className="text-gray-900 font-bold">{filteredData.length}</span> students
            </span>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={prevPage} 
                disabled={currentPage === 1}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg border transition-all ${
                    currentPage === 1 
                    ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed" 
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100 shadow-sm"
                }`}
              >
                <ChevronLeft size={16} /> Previous
              </button>

              <span className="text-gray-400 px-2">Page {currentPage} of {totalPages}</span>
              
              <button 
                onClick={nextPage} 
                disabled={currentPage === totalPages}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg border transition-all ${
                    currentPage === totalPages 
                    ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed" 
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100 shadow-sm"
                }`}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default ResultsPage;