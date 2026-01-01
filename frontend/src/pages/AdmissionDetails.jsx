import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle, 
  FileText, 
  GraduationCap, 
  ArrowRight, 
  Download, 
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const AdmissionDetails = () => {
  // State for FAQ Accordion
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // --- Data ---
  const admissionSteps = [
    {
      id: 1,
      title: "Online Registration",
      desc: "Create an account on our portal and fill out the basic personal details.",
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    {
      id: 2,
      title: "Document Upload",
      desc: "Scan and upload your academic transcripts, ID proof, and photographs.",
      icon: <Download className="w-6 h-6 text-blue-600" />
    },
    {
      id: 3,
      title: "Entrance Exam",
      desc: "Schedule and complete the online aptitude test or submit standardized scores.",
      icon: <CheckCircle className="w-6 h-6 text-blue-600" />
    },
    {
      id: 4,
      title: "Final Interview",
      desc: "Shortlisted candidates will be invited for a personal interview with faculty.",
      icon: <GraduationCap className="w-6 h-6 text-blue-600" />
    }
  ];

  const importantDates = [
    { event: "Applications Open", date: "Jan 15, 2026", status: "Completed" },
    { event: "Early Bird Deadline", date: "Mar 01, 2026", status: "Active" },
    { event: "Entrance Exam", date: "Apr 10, 2026", status: "Upcoming" },
    { event: "Final Merit List", date: "May 20, 2026", status: "Upcoming" }
  ];

  const faqs = [
    { q: "Is there an application fee?", a: "Yes, a non-refundable fee of 100rs is required upon submission." },
    { q: "Can I apply for multiple courses?", a: "Yes, you can apply for up to 3 programs with a single account." },
    { q: "Do you offer scholarships?", a: "We offer merit-based and need-based scholarships. Visit the Financial Aid page for details." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* --- Hero Section --- */}
      <div className="relative bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/90 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/30 border border-blue-400 text-blue-200 text-sm font-semibold mb-6">
            Admissions 2026-27
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Shape Your Future <br /> At <span className="text-blue-400">Success Degree College</span>
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mb-10 leading-relaxed">
            Join a vibrant community of innovators and leaders. Our simplified admission process 
            is designed to help us get to know the real you.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2">
              Apply Now <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-xl font-semibold transition-all">
              Download Brochure
            </button>
          </div>
        </div>
      </div>

      {/* --- Key Info Grid --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Deadline Approaching</h3>
            <p className="text-slate-600">Early bird applications close on <span className="font-semibold text-blue-600">March 1st</span>.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Eligibility Check</h3>
            <p className="text-slate-600">Minimum 3.0 GPA required for undergraduate programs.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
              <HelpCircle className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Need Help?</h3>
            <p className="text-slate-600">Contact our admission counselor at <span className="font-semibold text-purple-600">admissions@univ.edu</span>.</p>
          </div>
        </div>
      </div>

      {/* --- Main Content Layout --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column (Process & Requirements) */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Admission Steps */}
            <section>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                Admission Process
              </h2>
              <div className="space-y-6">
                {admissionSteps.map((step) => (
                  <div key={step.id} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-blue-100 flex items-center justify-center shrink-0 group-hover:border-blue-500 transition-colors shadow-sm">
                        {step.icon}
                      </div>
                      {step.id !== admissionSteps.length && (
                        <div className="w-0.5 h-full bg-slate-200 my-2 group-hover:bg-blue-200 transition-colors" />
                      )}
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm w-full hover:shadow-md transition-shadow">
                      <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                      <p className="text-slate-600">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Documents Checklist */}
            <section className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                          <h3 className="text-2xl font-bold mb-6 text-blue-900">Required Documents</h3>
                          <h3 className='mb-6'>The candidate has to submit the Xerox copies of the following certificates along with the admission form and the original certificate at the time of admission.</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["SSLC Marks Card", "PUC Marks Card", "Degree All Marks Card", "Aadhar Card", "Valid Income & Cast Certificate", "Passport Size Photographs (12)"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column (Sidebar: Dates & FAQ) */}
          <div className="space-y-8">
            
            {/* Important Dates Widget */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
              <div className="bg-slate-900 p-6 text-white">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Calendar className="w-5 h-5" /> Important Dates
                </h3>
              </div>
              <div className="p-6">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    {importantDates.map((item, idx) => (
                      <tr key={idx} className="border-b border-slate-100 last:border-0">
                        <td className="py-4">
                          <p className="font-semibold text-slate-800">{item.event}</p>
                          <p className="text-sm text-slate-500">{item.date}</p>
                        </td>
                        <td className="py-4 text-right">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            item.status === 'Completed' ? 'bg-slate-100 text-slate-500' :
                            item.status === 'Active' ? 'bg-green-100 text-green-700' :
                            'bg-blue-50 text-blue-600'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
              <h3 className="text-xl font-bold mb-6">Frequently Asked</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-slate-100 rounded-lg overflow-hidden">
                    <button 
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                    >
                      <span className="font-medium text-slate-800">{faq.q}</span>
                      {openFaq === index ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {openFaq === index && (
                      <div className="p-4 bg-white text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- Call to Action Footer --- */}
      <div className="bg-slate-900 py-16 m-5 border rounded">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to begin your journey?</h2>
          <p className="text-slate-400 mb-8 text-lg">
            Our support team is available 24/7 to guide you through the application process.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-blue-600/25">
              Start Application
            </button>
            <button className="bg-transparent border border-slate-600 text-white hover:bg-slate-800 px-8 py-4 rounded-xl font-bold text-lg transition-all">
              Contact Support
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdmissionDetails;