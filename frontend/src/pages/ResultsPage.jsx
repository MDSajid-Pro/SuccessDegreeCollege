import React, { useState, useMemo } from "react";
import { 
  Trophy, 
  Search, 
  Download, 
  Filter, 
  GraduationCap, 
  Medal 
} from "lucide-react";

// --- 1. MOCK DATA (In a real app, fetch this from an API) ---
const allStudents = [
  // 2024-25 Batch
  { id: 101, name: "Aditi Rao", regNo: "U012024001", course: "BCA", year: "2024-25", percentage: 98.5, grade: "Distinction", rank: 1 },
  { id: 102, name: "Rahul Sharma", regNo: "U012024045", course: "B.Sc", year: "2024-25", percentage: 97.2, grade: "Distinction", rank: 2 },
  { id: 103, name: "Sneha Patil", regNo: "U012024012", course: "B.Com", year: "2024-25", percentage: 96.8, grade: "Distinction", rank: 3 },
  { id: 104, name: "Vikram Singh", regNo: "U012024033", course: "BCA", year: "2024-25", percentage: 88.0, grade: "First Class", rank: null },
  { id: 105, name: "Priya D", regNo: "U012024022", course: "B.Sc", year: "2024-25", percentage: 85.5, grade: "First Class", rank: null },
  { id: 106, name: "Amit Kumar", regNo: "U012024055", course: "B.A", year: "2024-25", percentage: 78.0, grade: "Second Class", rank: null },

  // 2023-24 Batch
  { id: 201, name: "Rohan Das", regNo: "U012023005", course: "B.Sc", year: "2023-24", percentage: 96.0, grade: "Distinction", rank: 1 },
  { id: 202, name: "Kavya M", regNo: "U012023011", course: "BCA", year: "2023-24", percentage: 94.5, grade: "Distinction", rank: 2 },
  { id: 203, name: "Arjun K", regNo: "U012023088", course: "B.Com", year: "2023-24", percentage: 92.0, grade: "Distinction", rank: 3 },
  { id: 204, name: "Meera S", regNo: "U012023044", course: "B.A", year: "2023-24", percentage: 81.0, grade: "First Class", rank: null },
];

const ResultsPage = () => {
  const [selectedYear, setSelectedYear] = useState("2024-25");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // --- FILTER LOGIC ---
  const filteredData = useMemo(() => {
    return allStudents.filter(student => {
      const matchYear = student.year === selectedYear;
      const matchCourse = selectedCourse === "All" || student.course === selectedCourse;
      const matchSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.regNo.toLowerCase().includes(searchTerm.toLowerCase());
      return matchYear && matchCourse && matchSearch;
    }).sort((a, b) => b.percentage - a.percentage); // Sort by percentage descending
  }, [selectedYear, selectedCourse, searchTerm]);

  // Extract Top 3 for the "Spotlight" section (from the filtered list)
  const topPerformers = filteredData.slice(0, 3);

  // Helper to determine Grade Badge Color
  const getGradeColor = (grade) => {
    if (grade === "Distinction") return "bg-green-100 text-green-700 border-green-200";
    if (grade === "First Class") return "bg-blue-100 text-blue-700 border-blue-200";
    if (grade === "Second Class") return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* --- HEADER --- */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Academic <span className="text-blue-600">Results</span> & Archives
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Celebrating the academic excellence of our students. Browse through the passout lists and university rank holders by year.
        </p>
      </div>

      {/* --- CONTROLS SECTION (Filters) --- */}
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Left: Dropdowns */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            
            {/* Year Selector */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon size={18} className="text-gray-400" />
              </div>
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full appearance-none cursor-pointer hover:bg-white transition-colors font-medium shadow-sm"
              >
                <option value="2024-25">Batch 2024-25</option>
                <option value="2023-24">Batch 2023-24</option>
                <option value="2022-23">Batch 2022-23</option>
              </select>
            </div>

            {/* Course Selector */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-gray-400" />
              </div>
              <select 
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full appearance-none cursor-pointer hover:bg-white transition-colors font-medium shadow-sm"
              >
                <option value="All">All Courses</option>
                <option value="B.Sc">B.Sc</option>
                <option value="BCA">BCA</option>
                <option value="B.Com">B.Com</option>
                <option value="B.A">B.A</option>
              </select>
            </div>
          </div>

          {/* Right: Search & Export */}
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search name or Reg No..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 p-2.5 w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl shadow-lg shadow-blue-600/20 transition-all">
              <Download size={18} /> <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- TOP PERFORMERS (Spotlight) --- */}
      {topPerformers.length > 0 && !searchTerm && (
        <div className="max-w-7xl mx-auto mb-10">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Trophy className="text-yellow-500" size={24} />
            Top Performers - {selectedYear}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topPerformers.map((student, index) => (
              <div key={student.id} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex items-center gap-4 relative overflow-hidden">
                {/* Decoration */}
                <div className={`absolute top-0 right-0 p-3 opacity-10 rounded-bl-2xl ${
                  index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-600"
                }`}>
                  <Medal size={40} />
                </div>
                
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg ${
                  index === 0 ? "bg-gradient-to-br from-yellow-400 to-yellow-600" : 
                  index === 1 ? "bg-gradient-to-br from-gray-300 to-gray-500" : 
                  "bg-gradient-to-br from-orange-400 to-orange-600"
                }`}>
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{student.name}</h4>
                  <p className="text-sm text-gray-500">{student.course} • {student.percentage}%</p>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded mt-1 inline-block">
                    University Rank Holder
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- RESULTS TABLE --- */}
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold">#</th>
                <th className="px-6 py-4 font-semibold">Reg No.</th>
                <th className="px-6 py-4 font-semibold">Student Name</th>
                <th className="px-6 py-4 font-semibold">Course</th>
                <th className="px-6 py-4 font-semibold">Percentage</th>
                <th className="px-6 py-4 font-semibold">Grade</th>
                <th className="px-6 py-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.length > 0 ? (
                filteredData.map((student, index) => (
                  <tr key={student.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="px-6 py-4 text-gray-400">{index + 1}</td>
                    <td className="px-6 py-4 font-mono text-gray-600">{student.regNo}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs">
                          {student.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-gray-900">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{student.course}</td>
                    <td className="px-6 py-4 font-bold text-gray-800">{student.percentage}%</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getGradeColor(student.grade)}`}>
                        {student.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                       <button className="text-blue-600 hover:text-blue-800 font-medium text-xs hover:underline">
                         View Marksheet
                       </button>
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
        
        {/* Footer / Pagination Mockup */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
          <span>Showing {filteredData.length} students</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-50">Previous</button>
            <button className="px-3 py-1 rounded border border-gray-200 bg-white hover:bg-gray-100">Next</button>
          </div>
        </div>
      </div>

    </div>
  );
};

// Helper Icon
const CalendarIcon = ({size, className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
)

export default ResultsPage;