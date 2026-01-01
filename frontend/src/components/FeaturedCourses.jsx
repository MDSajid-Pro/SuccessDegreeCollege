import React from "react";
import { ArrowRight, Code, BookOpen, Microscope, BarChart3 } from "lucide-react";
import { HashLink } from "react-router-hash-link";

const courses = [
  {
    title: "Bachelor of Science (B.Sc)",
    description: "Explore the world of science with specializations in Physics, Chemistry, Mathematics, Botany, and Zoology.",
    icon: <Microscope size={40} />,
    color: "bg-blue-50",
    textColor: "text-blue-600",
    borderColor: "hover:border-blue-500",
    link: "/courses/bsc"
  },
  {
    title: "Bachelor of Computer Applications (BCA)",
    description: "Master the digital world with coding, software development, web technologies, and AI fundamentals.",
    icon: <Code size={40} />,
    color: "bg-purple-50",
    textColor: "text-purple-600",
    borderColor: "hover:border-purple-500",
    link: "/courses/bca"
  },
  {
    title: "Bachelor of Commerce (B.Com)",
    description: "Build a strong foundation in accounting, finance, business management, and economics.",
    icon: <BarChart3 size={40} />,
    color: "bg-orange-50",
    textColor: "text-orange-600",
    borderColor: "hover:border-orange-500",
    link: "/courses/bcom"
  },
  {
    title: "Bachelor of Arts (B.A)",
    description: "Develop critical thinking with courses in History, Political Science, Sociology, and Languages.",
    icon: <BookOpen size={40} />,
    color: "bg-pink-50",
    textColor: "text-pink-600",
    borderColor: "hover:border-pink-500",
    link: "/courses/ba"
  },
];

const FeaturedCourses = () => {
  return (
    <section id="courses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">Academics</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">
            Explore Our <span className="text-blue-600">Top Programs</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            We offer a wide range of industry-oriented undergraduate programs designed to shape your future.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <div 
              key={index}
              className={`group relative bg-white border border-gray-100 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-t-4 ${course.borderColor}`}
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-xl ${course.color} ${course.textColor} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                {course.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {course.description}
              </p>

              {/* Link */}
              <HashLink 
                smooth 
                to={course.link} 
                className={`inline-flex items-center gap-2 font-semibold ${course.textColor} hover:underline transition-all`}
              >
                View Details <ArrowRight size={16} />
              </HashLink>

              {/* Background Hover Decoration */}
              <div className={`absolute top-0 right-0 w-24 h-24 ${course.color} rounded-bl-full -z-10 opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <HashLink 
            smooth 
            to="#" 
            className="inline-block px-8 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors"
          >
            View All Courses
          </HashLink>
        </div>

      </div>
    </section>
  );
};

export default FeaturedCourses;