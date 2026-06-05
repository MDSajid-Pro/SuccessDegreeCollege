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
  ChevronUp,
  Monitor,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdmissionDetails = () => {
  // State for FAQ Accordion
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // --- Data ---
  
  // Updated Steps based on UUCMS Procedure
  const uucmsSteps = [
    {
      id: 1,
      title: "Student Registration",
      desc: "Register on the UUCMS portal. Create a profile using an Aadhaar-linked mobile number for OTP verification.",
      icon: <Monitor className="w-6 h-6 text-blue-600" />
    },
    {
      id: 2,
      title: "Form Filling & Selection",
      desc: "Log in to fill the application form. Choose your desired University, College, and Course/Program (you can apply to multiple colleges).",
      icon: <FileText className="w-6 h-6 text-blue-600" />
    },
    {
      id: 3,
      title: "Document Upload",
      desc: "Upload scanned copies (PDF/JPG) of 10th/12th marks cards, caste/income certificates (if applicable), photo, and signature.",
      icon: <Download className="w-6 h-6 text-blue-600" />
    },
    {
      id: 4,
      title: "Verification & Approval",
      desc: "Colleges verify documents online. Seat allocation is based on merit, reservation policies, and availability. You will be notified via the portal.",
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />
    },
    {
      id: 5,
      title: "Fee Payment & Confirmation",
      desc: "Pay admission/exam fees exclusively through the UUCMS portal. Upon payment, your admission is confirmed and an Enrollment Number is generated.",
      icon: <CreditCard className="w-6 h-6 text-blue-600" />
    }
  ];

  const importantDates = [
    { event: "Applications Open", date: "Jan 15, 2026", status: "Completed" },
    { event: "Early Bird Deadline", date: "Mar 01, 2026", status: "Active" },
    { event: "Document Verification", date: "Apr 10, 2026", status: "Upcoming" },
    { event: "Final Merit List", date: "May 20, 2026", status: "Upcoming" }
  ];

  const faqs = [
    { q: "Is there an application fee?", a: "Yes, a non-refundable fee of 100rs is required upon submission." },
    { q: "Can I apply for multiple courses?", a: "Yes, through the UUCMS portal, you can apply to multiple colleges and indicate your preferences." },
    { q: "Do you offer scholarships?", a: "We offer merit-based and need-based scholarships. Visit the Financial Aid page for details." }
  ];

  const uucmsFeatures = [
    "Student Life Cycle Management",
    "Academic Monitoring (Attendance & Lesson Planning)",
    "End-to-end Examinations & Results",
    "Faculty & Staff Management",
    "Administrative & Finance Functions"
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pt-12">
      
      {/* --- Hero Section --- */}
      <div className="relative bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/90 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/30 border border-blue-400 text-blue-200 text-sm font-semibold mb-6">
            Admissions 2026-27 | Powered by UUCMS
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Shape Your Future <br /> At <span className="text-blue-400">Success Degree College</span>
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mb-10 leading-relaxed">
            Join a vibrant community of innovators and leaders. Our admissions are now fully integrated with the Government of Karnataka's UUCMS platform for a seamless, merit-based experience.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href='https://uucms.karnataka.gov.in/Login/OnlineStudentRegistrationForm' target='_blank' className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2">
              Apply via UUCMS <ArrowRight className="w-5 h-5" />
            </a>
            <a href='https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_2c70b9009a9c4fc4b24acb22d1a547d2.pdf' target='_blank' className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-2">
              <Download className="w-5 h-5" /> Student Manual
            </a>
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
            <h3 className="text-xl font-bold mb-2">100% Online Process</h3>
            <p className="text-slate-600">Admissions are fully online, merit-based, and first-come-first-serve via UUCMS.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
              <HelpCircle className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Need Help?</h3>
            <p className="text-slate-600">UUCMS Helpdesk: <span className="font-semibold text-purple-600">uucms.helpdesk@gmail.com</span></p>
          </div>
        </div>
      </div>

      {/* --- Main Content Layout --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column (Process & Requirements) */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* About UUCMS Section */}
            <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold mb-4 text-slate-800">About UUCMS</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                The <strong>Unified University & College Management System (UUCMS)</strong> is a flagship digital platform launched by the Government of Karnataka to streamline higher education across the state. It integrates administrative and academic functions for 33+ public universities and 3,500+ colleges under one centralized portal.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {uucmsFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Admission Steps */}
            <section>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                UUCMS Admission Procedure
              </h2>
              <div className="space-y-6">
                {uucmsSteps.map((step) => (
                  <div key={step.id} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-blue-100 flex items-center justify-center shrink-0 group-hover:border-blue-500 transition-colors shadow-sm">
                        {step.icon}
                      </div>
                      {step.id !== uucmsSteps.length && (
                        <div className="w-0.5 h-full bg-slate-200 my-2 group-hover:bg-blue-200 transition-colors" />
                      )}
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm w-full hover:shadow-md transition-shadow">
                      <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                      <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Documents Checklist */}
            <section className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
              <h3 className="text-2xl font-bold mb-4 text-blue-900">Required Documents</h3>
              <p className='mb-6 text-blue-800'>
                The candidate has to upload scanned copies (PDF/JPG) on the UUCMS portal and submit Xerox copies along with the original certificates at the time of physical admission.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "SSLC / 10th Marks Card", 
                  "PUC / 12th Marks Card", 
                  "Transfer Certificate (TC)", 
                  "Aadhaar Card", 
                  "Valid Caste/Income Certificate (for reservations)", 
                  "Passport Size Photographs & Signature"
                ].map((item, idx) => (
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
            
            {/* Student Manual Download Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-lg p-6 text-white text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-xl font-bold mb-2">UUCMS Student Manual</h3>
              <p className="text-blue-100 text-sm mb-6">Download the official guide for step-by-step instructions on navigating the UUCMS portal.</p>
              <a href="https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_2c70b9009a9c4fc4b24acb22d1a547d2.pdf" target='_blank' className="w-full bg-white text-blue-700 hover:bg-blue-50 py-3 rounded-xl font-bold transition-colors flex justify-center items-center gap-2">
                <Download className="w-5 h-5" /> Download PDF
              </a>
              <a href=""></a>
            </div>

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
      <div className="bg-slate-900 py-16 m-5 border rounded-2xl">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to begin your journey?</h2>
          <p className="text-slate-400 mb-8 text-lg">
            Our support team is available to guide you through the UUCMS application process.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to='#' className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-blue-600/25">
              Start Application
            </Link>
            <a href="mailto:uucms.helpdesk@gmail.com" className="bg-transparent border border-slate-600 text-white hover:bg-slate-800 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5" /> Contact UUCMS Support
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdmissionDetails;