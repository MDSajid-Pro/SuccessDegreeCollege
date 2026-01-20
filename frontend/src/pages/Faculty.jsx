import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  Mail, 
  Search, 
  BookOpen,
  User,
  GraduationCap,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Award,
  Linkedin
} from 'lucide-react';
import toast from 'react-hot-toast';

const Faculty = () => {
  const { axios } = useAppContext();
  
  // --- State ---
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  
  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 6; 

  const departments = ["All", "Computer Science", "Commerce", "Arts", "Sciences"];

  // --- Fetch Data ---
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const { data } = await axios.get('/api/faculty'); 
        if (data.success) {
            // FIX: Sort the data based on the 'order' field before setting state
            const sortedFaculty = data.faculty.sort((a, b) => {
                return (a.order || 0) - (b.order || 0);
            });
            setFacultyMembers(sortedFaculty);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        toast.error("Could not load faculty data.");
      }
    };

    fetchFaculty();
  }, [axios]);

  // --- Filter Logic ---
  const filteredFaculty = facultyMembers.filter(member => {
    const matchesTab = activeTab === "All" || member.dept === activeTab;
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          member.role.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // --- Pagination Logic ---
  
  // Reset to page 1 if filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFaculty = filteredFaculty.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
        setCurrentPage(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
        setCurrentPage(prev => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* --- Header Section --- */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">World-Class Mentors</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-3 mb-6">
            Meet Our Faculty
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Our professors are distinguished academics and industry leaders dedicated to 
            shaping the next generation of innovators.
          </p>
        </div>
      </div>

      {/* --- Filter & Search Bar --- */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Category Tabs */}
            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto scrollbar-hide">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveTab(dept)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeTab === dept 
                      ? 'bg-slate-900 text-white shadow-md' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by name or role..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-transparent focus:border-blue-500 rounded-full text-sm focus:bg-white transition-all outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- Faculty Grid --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {loading ? (
            <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            </div>
        ) : filteredFaculty.length === 0 ? (
          <div className="text-center py-20 text-slate-500 bg-white rounded-2xl border border-dashed border-slate-300">
            <User className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <p className="text-lg">No faculty members found.</p>
            <p className="text-sm">Try adjusting your search or category.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentFaculty.map((member) => (
                <div 
                  key={member._id || member.id} 
                  className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col h-full relative overflow-hidden"
                >
                  {/* Decorative Top Accent */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

                  <div className="flex items-start justify-between mb-4">
                      <div className="bg-blue-50 p-3 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                          <GraduationCap size={24} />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wide bg-slate-100 text-slate-500 px-2 py-1 rounded border border-slate-200">
                        {member.dept}
                      </span>
                  </div>

                  <div className="mb-3">
                      <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{member.name}</h3>
                      <p className="text-blue-600 font-medium text-sm">{member.role}</p>
                  </div>

                  {/* Qualification */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1 bg-slate-50 p-2 rounded-lg w-fit">
                      <Award size={14} className="text-orange-500"/>
                      <span>{member.qualification || "Ph.D. Scholar"}</span>
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1 border-t border-slate-50 pt-4">
                    {member.bio || "Academic professional specializing in advanced studies and student mentorship."}
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                      {member.email && (
                          <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors">
                              <Mail size={16} /> <span className="hidden sm:inline">Email</span>
                          </a>
                      )}
                      {member.linkedin && (
                          <a href={member.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors">
                              <Linkedin size={16} />
                          </a>
                      )}
                      <button className="ml-auto text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 hover:text-blue-600 transition-colors">
                          Publications <BookOpen size={14} />
                      </button>
                  </div>
                </div>
              ))}
            </div>

            {/* --- PAGINATION FOOTER --- */}
            {filteredFaculty.length > itemsPerPage && (
              <div className="mt-12 flex justify-center items-center gap-6">
                
                {/* Previous Button */}
                <button 
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                    currentPage === 1 
                    ? "text-gray-300 border-gray-200 cursor-not-allowed bg-gray-50" 
                    : "text-slate-700 border-slate-300 bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 shadow-sm"
                  }`}
                >
                  <ChevronLeft size={20} />
                  <span className="font-medium text-sm">Previous</span>
                </button>

                <span className="text-sm font-semibold text-slate-500">
                  Page {currentPage} of {totalPages}
                </span>

                {/* Next Button */}
                <button 
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                    currentPage === totalPages 
                    ? "text-gray-300 border-gray-200 cursor-not-allowed bg-gray-50" 
                    : "text-slate-700 border-slate-300 bg-white hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 shadow-sm"
                  }`}
                >
                  <span className="font-medium text-sm">Next</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

    </div>
  );
};

export default Faculty;