import React, { useState } from 'react';
import { 
  Mail, 
  Linkedin, 
  Twitter, 
  Search, 
  MapPin, 
  BookOpen,
  ArrowRight
} from 'lucide-react';

const Faculty = () => {
  const [activeTab, setActiveTab] = useState("All");

  // --- Data ---
  const departments = ["All", "Computer Science", "Business", "Arts & Humanities", "Sciences"];

  const facultyMembers = [
    {
      id: 1,
      name: "Dr. Eleanor Sterling",
      role: "Dean of Sciences",
      dept: "Sciences",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
      bio: "Ph.D. in Astrophysics from MIT. Leading research in dark matter and stellar evolution.",
      email: "esterling@univ.edu",
      linkedin: "#"
    },
    {
      id: 2,
      name: "Prof. James Carter",
      role: "Head of Dept.",
      dept: "Computer Science",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop",
      bio: "Expert in Artificial Intelligence and Neural Networks with 15 years of industry experience.",
      email: "jcarter@univ.edu",
      linkedin: "#"
    },
    {
      id: 3,
      name: "Dr. Sarah Chen",
      role: "Associate Professor",
      dept: "Business",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
      bio: "Focuses on Macroeconomics and International Trade. Author of 'The Modern Economy'.",
      email: "schen@univ.edu",
      linkedin: "#"
    },
    {
      id: 4,
      name: "Prof. Marcus Thorne",
      role: "Senior Lecturer",
      dept: "Arts & Humanities",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
      bio: "Award-winning historian specializing in Renaissance architecture and cultural shifts.",
      email: "mthorne@univ.edu",
      linkedin: "#"
    },
    {
      id: 5,
      name: "Dr. Emily Zhao",
      role: "Assistant Professor",
      dept: "Computer Science",
      image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=1887&auto=format&fit=crop",
      bio: "Researching Cybersecurity and Cryptography. Advocate for women in STEM.",
      email: "ezhao@univ.edu",
      linkedin: "#"
    },
    {
      id: 6,
      name: "Prof. David Ross",
      role: "Professor",
      dept: "Sciences",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop",
      bio: "Specialist in Marine Biology and environmental conservation strategies.",
      email: "dross@univ.edu",
      linkedin: "#"
    },
  ];

  // Filter Logic
  const filteredFaculty = activeTab === "All" 
    ? facultyMembers 
    : facultyMembers.filter(member => member.dept === activeTab);

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
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search professors..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- Faculty Grid --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {filteredFaculty.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <p>No faculty members found in this department.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFaculty.map((member) => (
              <div 
                key={member.id} 
                className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
              >
                
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden bg-slate-200">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="flex gap-3 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <a href={member.linkedin} className="hover:text-blue-400"><Linkedin className="w-5 h-5" /></a>
                      <a href="#" className="hover:text-blue-400"><Twitter className="w-5 h-5" /></a>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                      <p className="text-blue-600 font-medium text-sm">{member.role}</p>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wide bg-slate-100 text-slate-500 px-2 py-1 rounded">
                      {member.dept}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                    {member.bio}
                  </p>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
                    <div className="flex items-center gap-2 hover:text-blue-600 transition-colors cursor-pointer">
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </div>
                    <div className="flex items-center gap-2 hover:text-blue-600 transition-colors cursor-pointer">
                      <BookOpen className="w-4 h-4" />
                      <span>Publications</span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Faculty;