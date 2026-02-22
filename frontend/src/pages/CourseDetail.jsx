import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ArrowRight, Clock, GraduationCap, BookOpen, CheckCircle2, 
  Briefcase, Laptop, Calculator, Microscope, Palette, Globe 
} from "lucide-react";

// --- 1. THE DATA (Usually this goes in a separate file) ---
const courseData = {
  bsc: {
    title: "Bachelor of Science",
    shortTitle: "B.Sc",
    tagline: "Explore the mysteries of the universe through science.",
    description: "A 3-year undergraduate program that builds a strong foundation in Physics, Chemistry, Mathematics, Botany, Zoology and Computer Science. Designed for students with a passion for research and innovation.",
    duration: "3 Years",
    eligibility: "10+2 (Science Stream)",
    mode: "Full Time",
    themeColor: "blue", // Used for dynamic styling
    icon: <Microscope size={60} className="text-blue-400" />,
    syllabus: [
      { title: "Physics", desc: "Mechanics, Optics, Quantum Physics" },
      { title: "Chemistry", desc: "Organic, Inorganic, Physical Chemistry" },
      { title: "Mathematics", desc: "Calculus, Algebra, Statistics" },
      { title: "Botany", desc: "Plant Biology, Ecology, Taxonomy" },
      { title: "Zoology", desc: "Genetics, Animal Physiology, Evolution" },
      { title: "Computer Science", desc: "C, C++, Java, Python" },
    ],
    careers: ["Research Scientist", "Software Developer", "Lecturer", "Lab Technician", "Biotechnologist", "Civil Services"],
  },
  bca: {
    title: "Bachelor of Computer Applications",
    shortTitle: "BCA",
    tagline: "Code your way to a future in technology.",
    description: "The gateway to the IT world. This course focuses on software development, web technologies, database management, and programming languages like Java, C++, and Python.",
    duration: "3 Years",
    eligibility: "10+2 (Any Stream with Maths/CS)",
    mode: "Full Time",
    themeColor: "purple",
    icon: <Laptop size={60} className="text-purple-400" />,
    syllabus: [
      { title: "Programming", desc: "C, C++, Java, Python" },
      { title: "Web Dev", desc: "HTML, CSS, JavaScript, React" },
      { title: "Database", desc: "SQL, MongoDB, DBMS" },
      { title: "Networking", desc: "Cyber Security, Cloud Computing" },
      { title: "Maths", desc: "Discrete Mathematics, Statistics" },
      { title: "Projects", desc: "Full Stack Development Projects" },
    ],
    careers: ["Software Developer", "Web Designer", "System Analyst", "Data Scientist", "Network Engineer"],
  },
  bcom: {
    title: "Bachelor of Commerce",
    shortTitle: "B.Com",
    tagline: "Master the language of business and finance.",
    description: "Designed for students aspiring to build a career in finance, banking, or corporate management. Covers accounting, taxation, economics, and business laws.",
    duration: "3 Years",
    eligibility: "10+2 (Commerce Stream)",
    mode: "Full Time",
    themeColor: "orange",
    icon: <Calculator size={60} className="text-orange-400" />,
    syllabus: [
      { title: "Accounting", desc: "Financial, Corporate, Cost Accounting" },
      { title: "Taxation", desc: "GST, Income Tax Laws" },
      { title: "Economics", desc: "Micro & Macro Economics" },
      { title: "Management", desc: "Principles of Business Management" },
      { title: "Banking", desc: "Banking Theory & Insurance" },
      { title: "Law", desc: "Company Law & Business Ethics" },
    ],
    careers: ["Chartered Accountant (CA)", "Bank Manager", "Financial Analyst", "Stock Broker", "Tax Consultant"],
  },
  ba: {
    title: "Bachelor of Arts",
    shortTitle: "B.A",
    tagline: "Understand society, culture, and humanity.",
    description: "A holistic course that fosters critical thinking and creativity. Ideal for students aiming for competitive exams (UPSC), journalism, or social work.",
    duration: "3 Years",
    eligibility: "10+2 (Any Stream)",
    mode: "Full Time",
    themeColor: "pink",
    icon: <Palette size={60} className="text-pink-400" />,
    syllabus: [
      { title: "History", desc: "Ancient, Medieval, Modern History" },
      { title: "Pol. Science", desc: "Constitution, International Relations" },
      { title: "Sociology", desc: "Social Structures, Anthropology" },
      { title: "Economics", desc: "Indian Economy, Public Finance" },
      { title: "Languages", desc: "English, Kannada, Hindi Literature" },
      { title: "Psychology", desc: "Human Behavior, Cognitive Science" },
    ],
    careers: ["Civil Services (IAS/IPS)", "Journalist", "Teacher", "Social Worker", "Content Writer"],
  },
};

// --- 2. HELPER FOR DYNAMIC TAILWIND CLASSES ---
// Note: In Tailwind, it's safer to map full class names than construct strings dynamically
const themeStyles = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", btn: "bg-blue-600 hover:bg-blue-700", gradient: "from-blue-900 to-slate-900" },
  purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", btn: "bg-purple-600 hover:bg-purple-700", gradient: "from-purple-900 to-slate-900" },
  orange: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200", btn: "bg-orange-600 hover:bg-orange-700", gradient: "from-orange-900 to-slate-900" },
  pink: { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-200", btn: "bg-pink-600 hover:bg-pink-700", gradient: "from-pink-900 to-slate-900" },
};

const CourseDetail = () => {
  const { courseId } = useParams(); // Get 'bsc', 'bca', etc. from URL
  const navigate = useNavigate();
  
  // Scroll to top when course changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [courseId]);

  const course = courseData[courseId];
  const theme = themeStyles[course?.themeColor || "blue"];

  // Handle Invalid Course ID (404)
  if (!course) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Course Not Found</h2>
        <p className="text-gray-600 mb-6">The course you are looking for does not exist.</p>
        <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-full">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      
      {/* --- HERO SECTION --- */}
      <div className={`relative py-24 px-6 overflow-hidden bg-gradient-to-br ${theme.gradient} text-white`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-2/3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Admissions Open 2025
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">{course.title}</h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl">{course.tagline}</p>
            
            <div className="flex gap-4">
               <button onClick={() => document.getElementById('syllabus').scrollIntoView({ behavior: 'smooth'})} className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-all">
                 View Syllabus
               </button>
               <Link to="/contact" className={`px-6 py-3 ${theme.btn} text-white rounded-xl font-semibold shadow-lg shadow-black/20 transition-all`}>
                 Apply Now
               </Link>
            </div>
          </div>
          
          {/* Hero Icon/Image */}
          <div className="md:w-1/3 flex justify-center md:justify-end">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/10 shadow-2xl">
              {course.icon}
            </div>
          </div>
        </div>
      </div>

      {/* --- STATS BAR --- */}
      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6 border border-gray-100">
          <StatItem icon={<Clock />} label="Duration" value={course.duration} theme={theme} />
          <StatItem icon={<GraduationCap />} label="Eligibility" value={course.eligibility} theme={theme} />
          <StatItem icon={<BookOpen />} label="Study Mode" value={course.mode} theme={theme} />
        </div>
      </div>

      {/* --- DESCRIPTION --- */}
      <section className="py-20 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">About the Course</h2>
        <p className="text-lg text-gray-600 leading-relaxed">{course.description}</p>
      </section>

      {/* --- SYLLABUS GRID --- */}
      <section id="syllabus" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className={`${theme.text} font-bold uppercase tracking-wider text-sm`}>Curriculum</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">What You Will Learn</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {course.syllabus.map((item, index) => (
              <div key={index} className={`p-6 rounded-xl border ${theme.border} ${theme.bg} hover:shadow-md transition-all group`}>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                  <CheckCircle2 size={20} className={`${theme.text} opacity-50 group-hover:opacity-100 transition-opacity`} />
                </div>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CAREER PROSPECTS --- */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden text-white">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-8">Career Opportunities</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {course.careers.map((job, index) => (
                <span 
                  key={index} 
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full text-lg hover:bg-white hover:text-slate-900 transition-colors cursor-default"
                >
                  {job}
                </span>
              ))}
            </div>
          </div>
          
          {/* Background Gradient Blob */}
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b ${theme.gradient} opacity-20 blur-3xl rounded-full z-0`}></div>
        </div>
      </section>

    </div>
  );
};

// Helper Sub-component for Stats
const StatItem = ({ icon, label, value, theme }) => (
  <div className="flex items-center gap-4">
    <div className={`p-3 rounded-xl ${theme.bg} ${theme.text}`}>
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div>
      <p className="text-xs text-gray-400 uppercase font-semibold">{label}</p>
      <p className="text-lg font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export default CourseDetail;