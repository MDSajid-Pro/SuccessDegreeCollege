import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";
import { 
  Calendar, 
  Link as LinkIcon, 
  Type, 
  Tag, 
  Plus, 
  Save, 
  Trash2, 
  Edit2, 
  X, 
  Megaphone,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,  // Added
  ChevronRight  // Added
} from "lucide-react";

export default function ManageNotices() {
  // 1. Use AppContext for axios
  const { axios } = useAppContext();

  const [notices, setNotices] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "Exams",
    date: "",
    link: "",
    isNewBadge: true,
  });
  const [editId, setEditId] = useState(null);

  // 2. Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Fetch using Context Axios
  const fetchNotices = async () => {
    try {
      const res = await axios.get('/api/notices'); // Uses baseURL from context
      setNotices(res.data);
    } catch (error) {
      toast.error("Failed to load notices");
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // --- Pagination Logic ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotices = notices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(notices.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // --- Form Handlers ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setFormData({ title: "", category: "Exams", date: "", link: "", isNewBadge: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/api/notices/${editId}`, formData);
        toast.success("Notice updated successfully");
      } else {
        await axios.post('/api/notices', formData);
        toast.success("Notice added successfully");
      }
      handleCancelEdit();
      fetchNotices();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleEdit = (notice) => {
    setEditId(notice._id);
    setFormData(notice);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this notice?")) return;
    try {
      await axios.delete(`/api/notices/${id}`);
      toast.success("Notice deleted");
      
      // Adjust page if deleting last item on page
      if (currentNotices.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      fetchNotices();
    } catch (error) {
      toast.error("Failed to delete notice");
    }
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
        case "Exams": return "bg-red-50 text-red-700 border-red-200";
        case "Events": return "bg-purple-50 text-purple-700 border-purple-200";
        case "Admissions": return "bg-green-50 text-green-700 border-green-200";
        default: return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
              <Megaphone className="text-indigo-600" size={32} />
              Notice Board
            </h1>
            <p className="text-gray-500 mt-1">Manage announcements, exams, and event updates.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-500">Total Notices:</span>
            <span className="text-lg font-bold text-indigo-600">{notices.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: FORM */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg shadow-indigo-100/50 border border-gray-100 p-6 sticky top-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            {editId ? <Edit2 size={18} className="text-indigo-500"/> : <Plus size={18} className="text-indigo-500"/>}
                            {editId ? "Edit Notice" : "Create Notice"}
                        </h2>
                        {editId && (
                            <button onClick={handleCancelEdit} className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1">
                                <X size={14}/> Cancel
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Title Input */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Title</label>
                            <div className="relative">
                                <Type className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Enter notice title..."
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Category & Date Grid */}
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Category</label>
                                <div className="relative">
                                    <Tag className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none appearance-none transition-all"
                                    >
                                        <option>Exams</option>
                                        <option>Events</option>
                                        <option>News</option>
                                        <option>Admissions</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-gray-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Link Input */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Link (Optional)</label>
                            <div className="relative">
                                <LinkIcon className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    name="link"
                                    placeholder="https://..."
                                    value={formData.link}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Checkbox */}
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <input
                                type="checkbox"
                                name="isNewBadge"
                                id="isNewBadge"
                                checked={formData.isNewBadge}
                                onChange={handleChange}
                                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
                            />
                            <label htmlFor="isNewBadge" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                                Mark as "New" Badge
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold transition-all shadow-md ${
                                editId 
                                ? "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200" 
                                : "bg-black hover:bg-gray-800 shadow-gray-200"
                            }`}
                        >
                            {editId ? <Save size={18} /> : <Plus size={18} />}
                            {editId ? "Update Changes" : "Publish Notice"}
                        </button>
                    </form>
                </div>
            </div>

            {/* RIGHT COLUMN: LIST */}
            <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col h-full">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h2 className="text-lg font-bold text-gray-800">Recent Notices</h2>
                    </div>

                    <div className="overflow-x-auto flex-grow">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider font-semibold border-b border-gray-100">
                                <tr>
                                    <th className="p-4 pl-6">Title</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4 text-center">Status</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {currentNotices.length > 0 ? (
                                    currentNotices.map((notice) => (
                                        <tr key={notice._id} className="hover:bg-indigo-50/30 transition-colors group">
                                            <td className="p-4 pl-6">
                                                <p className="font-semibold text-gray-800">{notice.title}</p>
                                                {notice.link && (
                                                    <a href={notice.link} target="_blank" rel="noreferrer" className="text-xs text-indigo-500 hover:underline flex items-center gap-1 mt-1">
                                                        <LinkIcon size={10} /> View Link
                                                    </a>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getCategoryColor(notice.category)}`}>
                                                    {notice.category}
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-500 font-medium whitespace-nowrap">
                                                {notice.date}
                                            </td>
                                            <td className="p-4 text-center">
                                                {notice.isNewBadge ? (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                                                        <CheckCircle2 size={10} /> New
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">
                                                        Archived
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => handleEdit(notice)}
                                                        className="p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors tooltip"
                                                        title="Edit"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(notice._id)}
                                                        className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="p-10 text-center text-gray-500 flex flex-col items-center justify-center">
                                            <AlertCircle size={40} className="text-gray-300 mb-2"/>
                                            <p>No notices found. Create one to get started.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION FOOTER */}
                    {notices.length > 0 && (
                        <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, notices.length)} of {notices.length} notices
                            </span>
                            <div className="flex gap-2">
                                <button 
                                    onClick={prevPage} 
                                    disabled={currentPage === 1}
                                    className={`p-2 rounded-lg border flex items-center gap-1 text-sm font-medium transition-colors
                                        ${currentPage === 1 
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed border-transparent" 
                                            : "bg-white text-gray-700 border-gray-200 hover:bg-white hover:text-indigo-600 hover:border-indigo-200 shadow-sm"}`}
                                >
                                    <ChevronLeft size={16} /> Previous
                                </button>
                                
                                <button 
                                    onClick={nextPage} 
                                    disabled={currentPage === totalPages}
                                    className={`p-2 rounded-lg border flex items-center gap-1 text-sm font-medium transition-colors
                                        ${currentPage === totalPages 
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed border-transparent" 
                                            : "bg-white text-gray-700 border-gray-200 hover:bg-white hover:text-indigo-600 hover:border-indigo-200 shadow-sm"}`}
                                >
                                    Next <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}