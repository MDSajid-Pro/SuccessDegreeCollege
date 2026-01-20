import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext"; // Import AppContext
import {
  Trash2,
  Edit,
  Plus,
  X,
  LayoutDashboard,
  Save,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const AddResult = () => {
  // 1. Get axios from AppContext
  const { axios } = useAppContext();

  // Data State
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    course: "",
    year: "",
    percentage: "",
    grade: "",
    rank: "",
  });

  // --- CRUD OPERATIONS ---
  const fetchResults = async () => {
    try {
      // Use relative path, baseURL is handled by Context
      const { data } = await axios.get("/api/results");
      setStudents(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- 1. Client-Side Uniqueness Check ---
    // Check if any student matches the input RegNo
    // If Editing: Ignore the student we are currently editing (s._id !== currentId)
    const duplicateStudent = students.find(
      (s) =>
        s.regNo.toLowerCase() === formData.regNo.toLowerCase() &&
        s._id !== currentId,
    );

    if (duplicateStudent) {
      toast.error(`Reg No already exists!`);
      return; // Stop the function here, do not call API
    }

    // --- 2. Prepare Payload (Convert types) ---
    const payload = {
      ...formData,
      percentage: Number(formData.percentage),
      rank: formData.rank ? Number(formData.rank) : null,
    };

    try {
      if (isEditing) {
        const { data } = await axios.put(`/api/results/${currentId}`, payload);
        setStudents(students.map((s) => (s._id === currentId ? data : s)));
        toast.success("Updated successfully");
      } else {
        const { data } = await axios.post("/api/results", payload);
        setStudents([data, ...students]);
        toast.success("Added successfully");
      }
      resetForm();
    } catch (error) {
      console.error(error);
      // Display the specific message from backend (e.g., "Registration Number already exists...")
      const errorMessage = error.response?.data?.message || "Operation failed";
      toast.error(errorMessage);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student record?")) return;
    try {
      await axios.delete(`/api/results/${id}`);
      setStudents(students.filter((s) => s._id !== id));
      toast.success("Deleted");

      // Adjust pagination if deleting the last item on a page
      if (currentStudents.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }
  };

  // --- PAGINATION LOGIC ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = students.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(students.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // --- FORM HELPERS ---
  const handleEditClick = (s) => {
    setFormData({ ...s, rank: s.rank || "" });
    setCurrentId(s._id);
    setIsEditing(true);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      regNo: "",
      course: "",
      year: "",
      percentage: "",
      grade: "",
      rank: "",
    });
    setIsEditing(false);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-4 md:p-6 font-sans text-gray-800">
      {/* Top Bar */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
          <LayoutDashboard className="text-blue-600" /> Result Management
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto justify-center shadow-sm"
        >
          <Plus size={18} /> Add Result
        </button>
      </div>

      {/* Main Table Card */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        {/* Responsive Scroll Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold tracking-wider">
              <tr>
                <th className="p-4 border-b whitespace-nowrap">sl.no</th>
                <th className="p-4 border-b whitespace-nowrap">Name</th>
                <th className="p-4 border-b whitespace-nowrap">Course</th>
                <th className="p-4 border-b whitespace-nowrap">Reg No</th>
                <th className="p-4 border-b whitespace-nowrap">Percentage</th>
                <th className="p-4 border-b text-center whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentStudents.length > 0 ? (
                currentStudents.map((s,index) => (
                  <tr
                    key={s._id}
                    className="hover:bg-blue-50/50 transition-colors"
                  >
                    <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                      {s.name}
                    </td>
                    <td className="p-4 text-gray-600 whitespace-nowrap">
                      {s.course}
                    </td>
                    <td className="p-4 font-mono text-sm text-gray-600 whitespace-nowrap">
                      {s.regNo}
                    </td>
                    <td className="p-4 font-bold text-gray-800 whitespace-nowrap">
                      {s.percentage}%
                    </td>
                    <td className="p-4 flex justify-center gap-2 whitespace-nowrap">
                      <button
                        onClick={() => handleEditClick(s)}
                        className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(s._id)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {students.length > 0 && (
          <div className="border-t border-gray-100 p-4 bg-gray-50 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, students.length)} of {students.length}{" "}
              entries
            </span>
            <div className="flex gap-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg border flex items-center gap-1 text-sm font-medium transition-colors
                  ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed border-transparent"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-blue-600"
                  }`}
              >
                <ChevronLeft size={16} /> Previous
              </button>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg border flex items-center gap-1 text-sm font-medium transition-colors
                  ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed border-transparent"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-blue-600"
                  }`}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          {/* Modal Container */}
          <div className="bg-white rounded-2xl w-[95%] sm:w-full max-w-lg p-5 sm:p-6 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
              onClick={resetForm}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors bg-gray-100 hover:bg-red-50 p-1 rounded-full"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-5 text-gray-800 border-b pb-2">
              {isEditing ? "Edit Result" : "Add New Result"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">
                    Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="border border-gray-300 p-2.5 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">
                    Reg No
                  </label>
                  <input
                    name="regNo"
                    value={formData.regNo}
                    onChange={(e) =>
                      setFormData({ ...formData, regNo: e.target.value })
                    }
                    className="border border-gray-300 p-2.5 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">
                    Course
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={(e) =>
                      setFormData({ ...formData, course: e.target.value })
                    }
                    className="border border-gray-300 p-2.5 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option>---Select Course---</option>
                    <option>BCA</option>
                    <option>B.Sc</option>
                    <option>B.Com</option>
                    <option>B.A</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">
                    Year
                  </label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    className="border border-gray-300 p-2.5 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option>---Select Year---</option>
                    <option>2024-25</option>
                    <option>2023-24</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">
                    Percentage
                  </label>
                  <input
                    type="number"
                    name="percentage"
                    placeholder="85.5"
                    value={formData.percentage}
                    onChange={(e) =>
                      setFormData({ ...formData, percentage: e.target.value })
                    }
                    className="border border-gray-300 p-2.5 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">
                    Grade
                  </label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={(e) =>
                      setFormData({ ...formData, grade: e.target.value })
                    }
                    className="border border-gray-300 p-2.5 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option>---Select Grade---</option>
                    <option>Distinction</option>
                    <option>First Class</option>
                    <option>Second Class</option>
                    <option>Fail</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition shadow-lg shadow-blue-200 mt-2"
              >
                <Save size={18} /> {isEditing ? "Update Result" : "Save Result"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddResult;
