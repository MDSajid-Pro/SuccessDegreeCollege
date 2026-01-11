import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { 
  User, Briefcase, Mail, Linkedin, Trash2, Edit2, Plus, Save, BookOpen, Users, GraduationCap
} from 'lucide-react';

const AddFaculty = () => {
  const { axios } = useAppContext();
  
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Form State - Added 'qualification'
  const [formData, setFormData] = useState({
    name: '', role: '', dept: '', qualification: '', email: '', linkedin: '', bio: ''
  });

  const departments = ["Computer Science", "Commerce", "Arts", "Sciences"];

  // --- 1. Fetch Data ---
  const fetchFaculty = async () => {
    try {
      const { data } = await axios.get('/api/faculty');
      if (data.success) {
        setFacultyList(data.faculty);
      }
    } catch (error) {
      toast.error("Failed to fetch faculty list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  // --- 2. Form Handling ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ name: '', role: '', dept: '', qualification: '', email: '', linkedin: '', bio: '' });
    setIsEditing(false);
    setEditId(null);
  };

  // --- 3. CRUD Operations ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update
        const { data } = await axios.put(`/api/faculty/${editId}`, formData);
        if (data.success) {
          toast.success("Faculty updated successfully");
          setFacultyList(prev => prev.map(f => f._id === editId ? data.faculty : f));
        }
      } else {
        // Create
        const { data } = await axios.post('/api/faculty', formData);
        if (data.success) {
          toast.success("Faculty added successfully");
          setFacultyList([data.faculty, ...facultyList]);
        }
      }
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this faculty member?")) return;
    try {
      await axios.delete(`/api/faculty/${id}`);
      setFacultyList(prev => prev.filter(f => f._id !== id));
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handleEdit = (faculty) => {
    setFormData({
      name: faculty.name,
      role: faculty.role,
      dept: faculty.dept,
      qualification: faculty.qualification || '', // Handle missing field for old data
      email: faculty.email,
      linkedin: faculty.linkedin || '',
      bio: faculty.bio
    });
    setEditId(faculty._id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 w-full font-sans text-gray-800">
      
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="text-blue-600" /> Manage Faculty
          </h1>
          <p className="text-gray-500 mt-1">Add or edit professors and department heads.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT: FORM --- */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-800">
                  {isEditing ? "Edit Faculty" : "Add New Faculty"}
                </h2>
                {isEditing && (
                  <button onClick={resetForm} className="text-xs text-red-500 hover:bg-red-50 p-1 rounded">
                    Cancel
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Dr. John Doe" className="w-full pl-9 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Role / Title</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    <input name="role" value={formData.role} onChange={handleChange} placeholder="Associate Professor" className="w-full pl-9 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                  </div>
                </div>

                {/* NEW FIELD: Qualification */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Qualification</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    <input name="qualification" value={formData.qualification} onChange={handleChange} placeholder="Ph.D. in Computer Science" className="w-full pl-9 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Department</label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    <select name="dept" value={formData.dept} onChange={handleChange} className="w-full pl-9 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white" required>
                      <option value="">--Select Department--</option>
                      {departments.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@univ.edu" className="w-full pl-9 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">LinkedIn (Optional)</label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    <input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/..." className="w-full pl-9 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Short Bio</label>
                  <textarea name="bio" value={formData.bio} onChange={handleChange} rows="3" placeholder="Brief academic background..." className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" required></textarea>
                </div>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2">
                  {isEditing ? <><Save size={18}/> Update Faculty</> : <><Plus size={18}/> Add Faculty</>}
                </button>

              </form>
            </div>
          </div>

          {/* --- RIGHT: LIST --- */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <h3 className="font-bold text-gray-700">Existing Faculty ({facultyList.length})</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white border-b border-gray-100 text-gray-500 uppercase text-xs">
                    <tr>
                      <th className="p-4">Name & Role</th>
                      <th className="p-4">Qualification</th>
                      <th className="p-4">Department</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {loading ? (
                      <tr><td colSpan="4" className="p-8 text-center text-gray-400">Loading faculty...</td></tr>
                    ) : facultyList.length > 0 ? (
                      facultyList.map((faculty) => (
                        <tr key={faculty._id} className="hover:bg-blue-50/30 transition">
                          <td className="p-4">
                            <p className="font-bold text-gray-900">{faculty.name}</p>
                            <p className="text-xs text-blue-600">{faculty.role}</p>
                          </td>
                          <td className="p-4">
                             <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded w-fit">
                                <GraduationCap size={14} className="text-gray-400"/>
                                {faculty.qualification || "N/A"}
                             </div>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-1 bg-white rounded text-xs font-semibold text-gray-600 border border-gray-200">
                              {faculty.dept}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex justify-center gap-2">
                              <button onClick={() => handleEdit(faculty)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                                <Edit2 size={16}/>
                              </button>
                              <button onClick={() => handleDelete(faculty._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                                <Trash2 size={16}/>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="4" className="p-8 text-center text-gray-400">No faculty added yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddFaculty;