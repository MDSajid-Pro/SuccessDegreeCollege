import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { 
  Trash2, Eye, CheckCircle, XCircle, FileText, User, Save, X, Search, Users, GraduationCap, Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';

const ManageAdmissions = () => {
  const { axios } = useAppContext();
  
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // Track which ID is processing
  const [selectedApp, setSelectedApp] = useState(null); 
  const [searchTerm, setSearchTerm] = useState("");

  const BASE_URL = "http://localhost:4000";

  const getFileUrl = (filePath) => {
    if (!filePath) return "#";
    const cleanPath = filePath.replace(/\\/g, "/");
    return `${BASE_URL}/${cleanPath}`; 
  };

  const formatDateForInput = (isoDate) => {
    if(!isoDate) return "";
    return new Date(isoDate).toISOString().split('T')[0];
  };

  const fetchApplications = async () => {
    try {
      const { data } = await axios.get('/api/admission');
      if (data.success) {
        const formattedData = data.admissions.map(app => ({
            ...app,
            status: app.status || "Pending"
        }));
        setApplications(formattedData);
      }
    } catch (error) {
      toast.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // --- ACTIONS ---

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to permanently delete this application?")) return;
    try {
      await axios.delete(`/api/admission/${id}`);
      setApplications(prev => prev.filter(app => app._id !== id));
      toast.success("Application deleted");
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // UPDATED: Handles Status Update & SMS Notification UI
 // Replace your existing handleStatusUpdate with this:
  const handleStatusUpdate = async (id, newStatus) => {
    setActionLoading(id);
    const loadingToast = toast.loading(`Marking as ${newStatus} & Sending Email...`);

    try {
      const response = await axios.put(`/api/admission/${id}`, { status: newStatus });
      
      if(response.data.success) {
          setApplications(prev => prev.map(app => 
            app._id === id ? { ...app, status: newStatus } : app
          ));
          // Success Message
          toast.success(`Application ${newStatus}. Email Sent!`, { id: loadingToast });
      } else {
          // It worked, but maybe email failed
          toast.success(response.data.message, { id: loadingToast });
      }
    } catch (error) {
      console.error(error);
      toast.error("Status update failed", { id: loadingToast });
    } finally {
      setActionLoading(null);
    }
  };

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    try {
      const { _id, createdAt, updatedAt, applicationId, ...updateData } = selectedApp;
      await axios.put(`/api/admission/${_id}`, updateData);
      
      setApplications(prev => prev.map(app => 
        app._id === selectedApp._id ? selectedApp : app
      ));
      
      toast.success("Details updated successfully");
      setSelectedApp(null); 
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const filteredApps = applications.filter(app => 
    (app.firstName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (app.applicationId?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (app.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Admission Applications</h1>
           <p className="text-gray-500 text-sm">Manage student submissions</p>
        </div>
        <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
                type="text" 
                placeholder="Search ID or Name..." 
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs font-semibold">
              <tr>
                <th className="p-4">App ID</th>
                <th className="p-4">Student Name</th>
                <th className="p-4">Program</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                 <tr><td colSpan="6" className="p-8 text-center">Loading...</td></tr>
              ) : filteredApps.length > 0 ? (
                filteredApps.map((app) => (
                  <tr key={app._id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-4 font-mono text-xs font-bold text-blue-600">
                        {app.applicationId || "N/A"}
                    </td>
                    <td className="p-4">
                        <div className="font-bold text-gray-900">{app.firstName} {app.lastName}</div>
                        <div className="text-xs text-gray-500">{app.gender} • {new Date(app.dob).toLocaleDateString()}</div>
                    </td>
                    <td className="p-4">
                        <span className="block text-gray-900 font-medium">{app.program}</span>
                        <span className="text-xs text-gray-500">{app.department}</span>
                    </td>
                    <td className="p-4 text-gray-600">
                        <div>{app.email}</div>
                        <div className="text-xs">{app.phone}</div>
                    </td>
                    <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                            app.status === 'Approved' ? 'bg-green-100 text-green-700 border-green-200' :
                            app.status === 'Rejected' ? 'bg-red-100 text-red-700 border-red-200' :
                            'bg-yellow-100 text-yellow-700 border-yellow-200'
                        }`}>
                            {app.status}
                        </span>
                    </td>
                    <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                           {/* Quick Actions with Loading State */}
                           {actionLoading === app._id ? (
                                <Loader2 className="animate-spin text-blue-600" size={18} />
                           ) : (
                               <>
                                   <button 
                                      onClick={() => handleStatusUpdate(app._id, 'Approved')} 
                                      title="Approve & Send SMS" 
                                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                                   >
                                      <CheckCircle size={18} />
                                   </button>
                                   
                                   <button 
                                      onClick={() => handleStatusUpdate(app._id, 'Rejected')} 
                                      title="Reject & Send SMS" 
                                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                   >
                                      <XCircle size={18} />
                                   </button>
                               </>
                           )}

                           <button onClick={() => setSelectedApp(app)} title="View/Edit Details" className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                              <Eye size={18} />
                           </button>
                           <button onClick={() => handleDelete(app._id)} title="Delete" className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                              <Trash2 size={18} />
                           </button>
                        </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6" className="p-8 text-center text-gray-500">No applications found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- FULL DETAILS MODAL --- */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200 flex flex-col">
              
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Application Details</h2>
                    <p className="text-sm text-gray-500 font-mono">ID: {selectedApp.applicationId}</p>
                  </div>
                  <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                      <X size={24} />
                  </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleUpdateDetails} className="p-6 space-y-8">
                  
                  {/* 1. Status Section */}
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="flex items-center gap-2">
                          <div className="bg-white p-2 rounded-lg text-blue-600"><CheckCircle size={20}/></div>
                          <div>
                              <p className="text-sm font-bold text-blue-900">Application Status</p>
                              <p className="text-xs text-blue-700">Changing this will update the student.</p>
                          </div>
                      </div>
                      <select 
                        value={selectedApp.status}
                        onChange={(e) => setSelectedApp({...selectedApp, status: e.target.value})}
                        className="px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white font-semibold text-gray-700"
                      >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                      </select>
                  </div>

                  {/* 2. Personal & Parent Info */}
                  <div>
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <User size={16}/> Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="space-y-1">
                              <label className="text-xs font-semibold text-gray-500">First Name</label>
                              <input value={selectedApp.firstName} onChange={e=>setSelectedApp({...selectedApp, firstName: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
                          </div>
                          <div className="space-y-1">
                              <label className="text-xs font-semibold text-gray-500">Last Name</label>
                              <input value={selectedApp.lastName} onChange={e=>setSelectedApp({...selectedApp, lastName: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
                          </div>
                          <div className="space-y-1">
                              <label className="text-xs font-semibold text-gray-500">Date of Birth</label>
                              <input type="date" value={formatDateForInput(selectedApp.dob)} onChange={e=>setSelectedApp({...selectedApp, dob: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
                          </div>
                          <div className="space-y-1">
                              <label className="text-xs font-semibold text-gray-500">Father's Name</label>
                              <input value={selectedApp.fatherName} onChange={e=>setSelectedApp({...selectedApp, fatherName: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
                          </div>
                          <div className="space-y-1">
                              <label className="text-xs font-semibold text-gray-500">Mother's Name</label>
                              <input value={selectedApp.motherName} onChange={e=>setSelectedApp({...selectedApp, motherName: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
                          </div>
                          <div className="space-y-1">
                              <label className="text-xs font-semibold text-gray-500">Gender</label>
                              <select value={selectedApp.gender} onChange={e=>setSelectedApp({...selectedApp, gender: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none">
                                  <option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
                              </select>
                          </div>
                          <div className="md:col-span-2 lg:col-span-3 space-y-1">
                              <label className="text-xs font-semibold text-gray-500">Address</label>
                              <input value={selectedApp.address} onChange={e=>setSelectedApp({...selectedApp, address: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" />
                          </div>
                      </div>
                  </div>

                  {/* 3. Academic Details (SSLC & PUC) */}
                  <div>
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <GraduationCap size={16}/> Academic History
                      </h3>
                      
                      {/* SSLC Row */}
                      <div className="bg-gray-50 p-4 rounded-xl mb-4 border border-gray-100">
                          <h4 className="text-xs font-bold text-gray-700 mb-3 uppercase">SSLC (10th) Details</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="md:col-span-2 space-y-1">
                                  <label className="text-xs text-gray-500">School Name</label>
                                  <input value={selectedApp.sslcSchool} onChange={e=>setSelectedApp({...selectedApp, sslcSchool: e.target.value})} className="w-full p-2 border rounded-lg text-sm" />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                  <div className="space-y-1">
                                      <label className="text-xs text-gray-500">Percentage</label>
                                      <input value={selectedApp.sslcPercentage} onChange={e=>setSelectedApp({...selectedApp, sslcPercentage: e.target.value})} className="w-full p-2 border rounded-lg text-sm" />
                                  </div>
                                  <div className="space-y-1">
                                      <label className="text-xs text-gray-500">Year</label>
                                      <input value={selectedApp.sslcYear} onChange={e=>setSelectedApp({...selectedApp, sslcYear: e.target.value})} className="w-full p-2 border rounded-lg text-sm" />
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* PUC Row */}
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                          <h4 className="text-xs font-bold text-gray-700 mb-3 uppercase">PUC (12th) Details</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="md:col-span-2 space-y-1">
                                  <label className="text-xs text-gray-500">College Name</label>
                                  <input value={selectedApp.pucCollege} onChange={e=>setSelectedApp({...selectedApp, pucCollege: e.target.value})} className="w-full p-2 border rounded-lg text-sm" />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                  <div className="space-y-1">
                                      <label className="text-xs text-gray-500">Percentage</label>
                                      <input value={selectedApp.pucPercentage} onChange={e=>setSelectedApp({...selectedApp, pucPercentage: e.target.value})} className="w-full p-2 border rounded-lg text-sm" />
                                  </div>
                                  <div className="space-y-1">
                                      <label className="text-xs text-gray-500">Year</label>
                                      <input value={selectedApp.pucYear} onChange={e=>setSelectedApp({...selectedApp, pucYear: e.target.value})} className="w-full p-2 border rounded-lg text-sm" />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* 4. Program Choice */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-500">Selected Program</label>
                          <input value={selectedApp.program} onChange={e=>setSelectedApp({...selectedApp, program: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg" />
                      </div>
                      <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-500">Department</label>
                          <input value={selectedApp.department} onChange={e=>setSelectedApp({...selectedApp, department: e.target.value})} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg" />
                      </div>
                  </div>

                  {/* 5. Documents */}
                  <div className="border-t border-gray-100 pt-6">
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <FileText size={16}/> Attached Documents
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <a 
                             href={getFileUrl(selectedApp.photo)} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition group"
                          >
                             <div className="p-3 bg-blue-50 text-blue-600 rounded-full group-hover:bg-blue-100"><User size={20}/></div>
                             <div>
                                 <p className="font-semibold text-gray-800 text-sm">Passport Photo</p>
                                 <p className="text-xs text-blue-500">Click to view</p>
                             </div>
                          </a>
                          <a 
                             href={getFileUrl(selectedApp.transcript)} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-sm transition group"
                          >
                             <div className="p-3 bg-purple-50 text-purple-600 rounded-full group-hover:bg-purple-100"><FileText size={20}/></div>
                             <div>
                                 <p className="font-semibold text-gray-800 text-sm">Academic Transcript</p>
                                 <p className="text-xs text-purple-500">Click to view</p>
                             </div>
                          </a>
                      </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex gap-3 pt-4 border-t border-gray-100 sticky bottom-0 bg-white pb-0">
                      <button type="submit" className="flex-1 bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition flex justify-center items-center gap-2 shadow-lg shadow-blue-200">
                          <Save size={18}/> Save Changes
                      </button>
                      <button type="button" onClick={() => setSelectedApp(null)} className="flex-1 bg-gray-100 text-gray-700 py-3.5 rounded-xl font-bold hover:bg-gray-200 transition">
                          Cancel
                      </button>
                  </div>

              </form>
           </div>
        </div>
      )}

    </div>
  );
};

export default ManageAdmissions;