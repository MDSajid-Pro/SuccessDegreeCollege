import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { 
  User, Briefcase, Mail, Linkedin, Trash2, Edit2, Plus, Save, 
  BookOpen, Users, GraduationCap, ChevronLeft, ChevronRight,
  GripVertical, ArrowUpDown, X
} from 'lucide-react';

const AddFaculty = () => {
  const { axios } = useAppContext();
  
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // --- MODES ---
  const [isEditing, setIsEditing] = useState(false);
  const [isReordering, setIsReordering] = useState(false); // New Mode
  const [editId, setEditId] = useState(null);

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Form State
  const [formData, setFormData] = useState({
    name: '', role: '', dept: '', qualification: '', email: '', linkedin: '', bio: ''
  });

  const departments = ["Computer Science", "Commerce", "Arts", "Sciences"];

  // --- 1. Fetch Data ---
  const fetchFaculty = async () => {
    try {
      const { data } = await axios.get('/api/faculty');
      if (data.success) {
        // Ensure list is sorted by 'order' index if it exists, otherwise by creation
        const sortedList = data.faculty.sort((a, b) => (a.order || 0) - (b.order || 0));
        setFacultyList(sortedList);
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

  // --- 2. Pagination Logic (Only active when NOT reordering) ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // If Reordering, show ALL items. If normal view, show page slice.
  const displayFaculty = isReordering ? facultyList : facultyList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(facultyList.length / itemsPerPage);

  const nextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
  const prevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

  // --- 3. Form Handling ---
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetForm = () => {
    setFormData({ name: '', role: '', dept: '', qualification: '', email: '', linkedin: '', bio: '' });
    setIsEditing(false);
    setEditId(null);
  };

  // --- 4. CRUD Operations ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const { data } = await axios.put(`/api/faculty/${editId}`, formData);
        if (data.success) {
          toast.success("Faculty updated");
          setFacultyList(prev => prev.map(f => f._id === editId ? data.faculty : f));
        }
      } else {
        // When adding new, put it at the end (highest order index)
        const newOrderIndex = facultyList.length; 
        const { data } = await axios.post('/api/faculty', { ...formData, order: newOrderIndex });
        if (data.success) {
          toast.success("Faculty added");
          setFacultyList([...facultyList, data.faculty]);
          setCurrentPage(1); 
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
    if (isReordering) return; // Prevent edit during reorder
    setFormData({
      name: faculty.name, role: faculty.role, dept: faculty.dept,
      qualification: faculty.qualification || '', email: faculty.email,
      linkedin: faculty.linkedin || '', bio: faculty.bio
    });
    setEditId(faculty._id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- 5. REORDER LOGIC ---

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(facultyList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFacultyList(items);
  };

  const saveReorder = async () => {
    try {
        setLoading(true);
        // Create an array of { id, order }
        const updates = facultyList.map((item, index) => ({
            id: item._id,
            order: index // The new index in the array becomes the order
        }));

        // Send to backend
        const { data } = await axios.put('/api/faculty/reorder', { updates });
        
        if(data.success) {
            toast.success("New order saved!");
            setIsReordering(false);
        }
    } catch (error) {
        console.error(error);
        toast.error("Failed to save order");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 w-full font-sans text-gray-800">
      <div className="max-w-7xl mx-auto pt-14">
        
        {/* HEADER */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Users className="text-blue-600" /> Manage Faculty
            </h1>
            <p className="text-gray-500 mt-1">Add, edit, or rearrange professors.</p>
          </div>
          
          {/* Reorder Toggle Button */}
          {!isReordering ? (
             <button 
               onClick={() => setIsReordering(true)}
               className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition shadow-sm font-medium"
             >
               <ArrowUpDown size={18} /> Rearrange List
             </button>
          ) : (
             <div className="flex gap-2">
                <button 
                  onClick={() => setIsReordering(false)}
                  className="flex items-center gap-2 bg-white text-gray-600 px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 transition font-medium"
                >
                  <X size={18} /> Cancel
                </button>
                <button 
                  onClick={saveReorder}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition shadow-md font-medium"
                >
                  <Save size={18} /> Save Order
                </button>
             </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT: FORM (Hidden during Reordering to give space) --- */}
          {!isReordering && (
            <div className="lg:col-span-1 animate-in slide-in-from-left duration-300">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-gray-800">
                    {isEditing ? "Edit Faculty" : "Add New Faculty"}
                  </h2>
                  {isEditing && (
                    <button onClick={resetForm} className="text-xs text-red-500 hover:bg-red-50 p-1 rounded">Cancel</button>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                {/* ... Form Inputs (Same as before) ... */}
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
                    <label className="text-xs font-semibold text-gray-500 uppercase">LinkedIn</label>
                    <div className="relative">
                        <Linkedin className="absolute left-3 top-2.5 text-gray-400" size={16} />
                        <input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="https://linkedin.com/..." className="w-full pl-9 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
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
          )}

          {/* --- RIGHT: LIST (Expands when reordering) --- */}
          <div className={`${isReordering ? 'col-span-1 lg:col-span-3' : 'lg:col-span-2'} flex flex-col h-full transition-all duration-300`}>
            <div className={`bg-white rounded-2xl shadow-sm border ${isReordering ? 'border-indigo-200 ring-4 ring-indigo-50' : 'border-gray-200'} overflow-hidden flex flex-col`}>
              
              <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-700">
                    {isReordering ? "Drag items to rearrange" : `Existing Faculty (${facultyList.length})`}
                </h3>
                {!isReordering && <span className="text-xs text-gray-400">Page {currentPage} of {totalPages || 1}</span>}
              </div>
              
              {/* TABLE AREA */}
              <div className="overflow-x-auto flex-1">
                  <DragDropContext onDragEnd={handleOnDragEnd}>
                    <table className="w-full text-left text-sm">
                      <thead className="bg-white border-b border-gray-100 text-gray-500 uppercase text-xs">
                        <tr>
                          {isReordering && <th className="p-4 w-10"></th>}
                          <th className="p-4">Name & Role</th>
                          <th className="p-4">Qualification</th>
                          <th className="p-4">Department</th>
                          {!isReordering && <th className="p-4 text-center">Actions</th>}
                        </tr>
                      </thead>
                      
                      <Droppable droppableId="faculty-list" isDropDisabled={!isReordering}>
                        {(provided) => (
                          <tbody 
                            className="divide-y divide-gray-100"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {loading ? (
                              <tr><td colSpan="5" className="p-8 text-center text-gray-400">Loading...</td></tr>
                            ) : displayFaculty.length > 0 ? (
                              displayFaculty.map((faculty, index) => (
                                <Draggable 
                                    key={faculty._id} 
                                    draggableId={faculty._id} 
                                    index={index}
                                    isDragDisabled={!isReordering} // Only draggable in reorder mode
                                >
                                  {(provided, snapshot) => (
                                    <tr 
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      className={`transition ${snapshot.isDragging ? 'bg-indigo-50 shadow-lg' : 'hover:bg-blue-50/30'}`}
                                    >
                                      {/* Drag Handle Column */}
                                      {isReordering && (
                                          <td className="p-4 text-gray-400 cursor-grab" {...provided.dragHandleProps}>
                                              <GripVertical size={20} />
                                          </td>
                                      )}

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
                                      
                                      {/* Actions (Hidden during reorder) */}
                                      {!isReordering && (
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
                                      )}
                                    </tr>
                                  )}
                                </Draggable>
                              ))
                            ) : (
                              <tr><td colSpan="5" className="p-8 text-center text-gray-400">No faculty added yet.</td></tr>
                            )}
                            {provided.placeholder}
                          </tbody>
                        )}
                      </Droppable>
                    </table>
                  </DragDropContext>
              </div>

              {/* PAGINATION CONTROLS (Hidden during Reordering) */}
              {!isReordering && facultyList.length > itemsPerPage && (
                <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
                    <button onClick={prevPage} disabled={currentPage === 1} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200 bg-white border border-gray-200'}`}>
                        <ChevronLeft size={16} /> Previous
                    </button>
                    <div className="text-xs font-semibold text-gray-500">Page {currentPage} of {totalPages}</div>
                    <button onClick={nextPage} disabled={currentPage === totalPages} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-200 bg-white border border-gray-200'}`}>
                        Next <ChevronRight size={16} />
                    </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFaculty;