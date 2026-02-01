
import { Quote, GraduationCap } from "lucide-react";

const facultyMembers = [
  {
    name: "Miss Nayer fatima",
    role: "HOD, Botany",
    body: "We don't just teach syntax; we teach algorithmic thinking. My goal is to turn students into problem solvers.",
    qualification: "M.Sc. in Botany, KCET, 5+ Yrs Exp"
  },
  {
    name: "Md Sajid",
    role: "Dept. of Zoology",
    body: "Accounting is the language of business. I ensure my students understand the logic behind every entry.",
    qualification: "B.Sc, B.Ed"
  },
  {
    name: "Miss Ranjeeta Mangal Parsad",
    role: "Dept. of Physics",
    body: "Physics is about curiosity. I encourage my students to question the 'why' and 'how' of the universe.",
    qualification: "M.Sc Physics, B.Ed"
  },
  {
    name: "Prof. Dr. Syed Asadullah",
    role: "Urdu & Communication",
    body: "In today's world, soft skills are as vital as technical skills. We focus on confidence and articulation.",
    qualification: "M.A. Urdu, B.Ed"
  },
  {
    name: "Miss Mehbooba Begum",
    role: "Dept. Mathematics",
    body: "Mathematics is the foundation of all sciences. I strive to make complex calculus accessible and fun.",
    qualification: "M.Sc Mathematics, 4+ Yrs Exp"
  },
];

const FacultyCard = ({ name, role, body, qualification }) => {
  return (
    // Added flex-shrink-0 to prevent cards from squishing
    <div className="flex-shrink-0 relative w-80 cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow mx-4 flex flex-col justify-between h-full">
      <div>
        <div className="flex flex-row items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            {name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900">{name}</span>
            <span className="text-xs font-medium text-blue-600">{role}</span>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600 leading-relaxed italic">"{body}"</div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
         <span className="text-xs text-gray-500 font-semibold flex items-center gap-1">
            <GraduationCap size={14} />
            {qualification}
         </span>
         <Quote size={16} className="text-blue-200" fill="currentColor" />
      </div>
    </div>
  );
};

const SuccessMarquee = () => {
  return (
    <section className="relative py-20 bg-slate-50 overflow-hidden flex flex-col items-center justify-center">
      
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); } /* CHANGED: -100% to -50% */
        }
        .animate-scroll {
          display: flex;
          width: max-content; /* Ensures content doesn't wrap */
          animation: scroll 40s linear infinite;
        }
        .group:hover .animate-scroll {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header */}
      <div className="mb-12 text-center px-4">
        <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">World-Class Mentors</span>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2">
          Learn from the <span className="text-blue-600">Experts</span>
        </h2>
        <p className="mt-4 text-gray-500 max-w-lg mx-auto">
          Our faculty comprises Ph.D. holders, researchers, and industry veterans dedicated to academic excellence.
        </p>
      </div>

      {/* --- MARQUEE CONTAINER --- */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        
        <div className="group flex w-full overflow-hidden">
          <div className="animate-scroll">
            {[...facultyMembers, ...facultyMembers].map((faculty, idx) => (
              <FacultyCard key={idx} {...faculty} />
            ))}
          </div>
        </div>

        {/* --- GRADIENT FADE MASKS --- */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 z-10"></div>
      
      </div>
    </section>
  );
};

export default SuccessMarquee;