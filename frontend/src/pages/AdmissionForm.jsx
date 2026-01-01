import React, { useState } from 'react';
import { 
  User, 
  BookOpen, 
  UploadCloud, 
  CheckCircle, 
  ChevronRight, 
  ChevronLeft,
  School,
  FileText
} from 'lucide-react';

const AdmissionForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', dob: '', gender: '',
    address: '', city: '', zip: '',
    highSchool: '', gpa: '', graduationYear: '',
    program: '', department: '',
    photo: null, transcript: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Mock File Handler
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [field]: file ? file.name : null });
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API submission
    setTimeout(() => setIsSubmitted(true), 1000);
  };

  // --- Step Components ---
  
  // Step 1: Personal Info
  const renderPersonal = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" name="firstName" value={formData.firstName} onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              placeholder="John"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
          <input 
            type="text" name="lastName" value={formData.lastName} onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
            placeholder="Doe"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
          <input 
            type="email" name="email" value={formData.email} onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
          <input 
            type="tel" name="phone" value={formData.phone} onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Date of Birth</label>
          <input 
            type="date" name="dob" value={formData.dob} onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Gender</label>
          <select 
            name="gender" value={formData.gender} onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-white text-slate-600"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Address</label>
        <textarea 
          name="address" value={formData.address} onChange={handleChange}
          rows="2"
          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none"
          placeholder="Street address, Apt, Suite"
        ></textarea>
      </div>
    </div>
  );

  // Step 2: Academic Info
  const renderAcademic = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex gap-3 items-start">
        <School className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
        <p className="text-sm text-blue-800">Please provide details from your most recent educational institution.</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">High School / College Name</label>
        <input 
          type="text" name="highSchool" value={formData.highSchool} onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
          placeholder="Enter school name"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">GPA / Percentage</label>
          <input 
            type="text" name="gpa" value={formData.gpa} onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
            placeholder="e.g. 3.8 or 85%"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Year of Graduation</label>
          <input 
            type="number" name="graduationYear" value={formData.graduationYear} onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
            placeholder="2025"
          />
        </div>
      </div>
    </div>
  );

  // Step 3: Course & Docs
  const renderCourseDocs = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Course Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Department</label>
          <select 
            name="department" value={formData.department} onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-white"
          >
            <option value="">Select Department</option>
            <option value="cs">Computer Science</option>
            <option value="business">Business Admin</option>
            <option value="arts">Arts & Humanities</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Program</label>
          <select 
            name="program" value={formData.program} onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-white"
          >
            <option value="">Select Program</option>
            <option value="bsc">B.Sc.</option>
            <option value="ba">B.A.</option>
            <option value="bba">B.B.A.</option>
          </select>
        </div>
      </div>

      <hr className="border-slate-200 my-6" />

      {/* File Uploads */}
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
          <UploadCloud className="w-5 h-5 text-blue-600" /> Upload Documents
        </h3>
        
        {/* Photo Upload */}
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer relative group">
          <input type="file" onChange={(e) => handleFileChange(e, 'photo')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-blue-200 transition-colors">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-slate-700">
              {formData.photo ? formData.photo : "Upload Passport Size Photo"}
            </p>
            <p className="text-xs text-slate-400 mt-1">JPG or PNG, max 2MB</p>
          </div>
        </div>

        {/* Transcript Upload */}
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer relative group">
          <input type="file" onChange={(e) => handleFileChange(e, 'transcript')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-purple-200 transition-colors">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm font-medium text-slate-700">
              {formData.transcript ? formData.transcript : "Upload Academic Transcript"}
            </p>
            <p className="text-xs text-slate-400 mt-1">PDF format only</p>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 mt-6">
        <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" required />
        <p className="text-sm text-slate-600">
          I declare that the information provided is true and correct to the best of my knowledge.
        </p>
      </div>
    </div>
  );

  // Success Screen
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Application Submitted!</h2>
          <p className="text-slate-500 mb-8">
            Your application ID is <span className="font-mono font-bold text-slate-800">#ADM-2026-884</span>. 
            We have sent a confirmation email to {formData.email}.
          </p>
          <div className="space-y-3">
            <button onClick={() => window.location.href='/'} className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold transition-all">
              Return to Home
            </button>
            <button className="w-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 py-3 rounded-xl font-semibold transition-all">
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Online Admission Form</h1>
          <p className="text-slate-500 mt-2">Complete the steps below to apply for the 2026-2027 academic year.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {['Personal Details', 'Academic Info', 'Program & Docs'].map((label, index) => {
              const stepNum = index + 1;
              const isActive = stepNum <= currentStep;
              return (
                <div key={index} className={`flex flex-col items-center w-1/3 ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2 transition-all ${
                    isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-200'
                  }`}>
                    {stepNum}
                  </span>
                  <span className="text-xs font-semibold hidden sm:block">{label}</span>
                </div>
              );
            })}
          </div>
          <div className="h-2 bg-slate-200 rounded-full relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-500 ease-out" 
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-8 md:p-10">
            <form onSubmit={handleSubmit}>
              
              {/* Step Content */}
              <div className="min-h-[400px]">
                {currentStep === 1 && renderPersonal()}
                {currentStep === 2 && renderAcademic()}
                {currentStep === 3 && renderCourseDocs()}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-10 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    currentStep === 1 
                      ? 'opacity-0 cursor-default' 
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all"
                  >
                    Next Step <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-green-500/20 transition-all"
                  >
                    Submit Application <CheckCircle className="w-4 h-4" />
                  </button>
                )}
              </div>

            </form>
          </div>
        </div>
        
        <p className="text-center text-slate-400 text-sm mt-8">
          Need help? Contact support at <a href="#" className="text-blue-500 hover:underline">admissions@univ.edu</a>
        </p>

      </div>
    </div>
  );
};

export default AdmissionForm;