import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { 
  User, UploadCloud, CheckCircle, ChevronRight, ChevronLeft, School, FileText, Loader2, Users
} from 'lucide-react';

const AdmissionForm = () => {
  const { axios } = useAppContext();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [appId, setAppId] = useState(null);
  
  // 1. UPDATED STATE with new fields
  const [formData, setFormData] = useState({
    // Personal
    firstName: '', lastName: '', fatherName: '', motherName: '',
    email: '', phone: '', dob: '', gender: '', address: '',
    
    // SSLC (10th)
    sslcSchool: '', sslcPercentage: '', sslcYear: '',
    
    // PUC (12th)
    pucCollege: '', pucPercentage: '', pucYear: '',
    
    // Program & Docs
    program: '', department: '',
    photo: null, transcript: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error(`${field === 'photo' ? 'Photo' : 'Transcript'} must be smaller than 2MB`);
        e.target.value = "";
        return;
      }
      setFormData({ ...formData, [field]: file });
    }
  };

  // 2. UPDATED VALIDATION
  const validateStep = (step) => {
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.fatherName || !formData.motherName || 
          !formData.email || !formData.phone || !formData.dob || !formData.gender || !formData.address) {
        toast.error("Please fill in all personal details.");
        return false;
      }
    }
    if (step === 2) {
      if (!formData.sslcSchool || !formData.sslcPercentage || !formData.sslcYear ||
          !formData.pucCollege || !formData.pucPercentage || !formData.pucYear) {
        toast.error("Please fill in all SSLC and PUC details.");
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => setCurrentStep(prev => prev - 1);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.department || !formData.program) {
      toast.error("Please select a department and program.");
      return;
    }
    if (!formData.photo || !formData.transcript) {
      toast.error("Please upload both Photo and Transcript.");
      return;
    }

    setIsLoading(true);

    const dataPayload = new FormData();
    Object.keys(formData).forEach(key => {
        dataPayload.append(key, formData[key]);
    });

    try {
      const response = await axios.post('/api/admission', dataPayload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        toast.success("Application Submitted Successfully!");
        setAppId(response.data.applicationId); // Using the ID from backend
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Submission failed.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Step 1: Personal & Parent Info ---
  const renderPersonal = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Student Details */}
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider border-b pb-2">Student Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">First Name <span className="text-red-500">*</span></label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none" placeholder="John" required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name <span className="text-red-500">*</span></label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none" placeholder="Doe" required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Email <span className="text-red-500">*</span><br />(Please provide a valid email)</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none" placeholder="john@example.com" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Phone <span className="text-red-500">*</span><br />(Please provide a valid mobile number)</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none" placeholder="1234567890" required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Date of Birth <span className="text-red-500">*</span></label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-slate-500" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Gender <span className="text-red-500">*</span></label>
          <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none bg-white text-slate-600" required>
            <option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Parent Details */}
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider border-b pb-2 pt-4">Parent Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Father's Name <span className="text-red-500">*</span></label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none" placeholder="Father's Name" required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Mother's Name <span className="text-red-500">*</span></label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none" placeholder="Mother's Name" required />
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Address <span className="text-red-500">*</span></label>
        <textarea name="address" value={formData.address} onChange={handleChange} rows="2" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none resize-none" placeholder="Full Address" required></textarea>
      </div>
    </div>
  );

  // --- Step 2: Academic Info (SSLC & PUC) ---
  const renderAcademic = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex gap-3 items-start">
        <School className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
        <p className="text-sm text-blue-800">Please provide accurate details from your grade cards.</p>
      </div>

      {/* SSLC SECTION */}
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider border-b pb-2">SSLC (10th) Details</h3>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">School Name <span className="text-red-500">*</span></label>
        <input type="text" name="sslcSchool" value={formData.sslcSchool} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none" placeholder="High School Name" required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Percentage / CGPA <span className="text-red-500">*</span></label>
          <input type="text" name="sslcPercentage" value={formData.sslcPercentage} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none" placeholder="e.g. 85%" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Year of Passing <span className="text-red-500">*</span></label>
          <input type="number" name="sslcYear" value={formData.sslcYear} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none" placeholder="2023" required />
        </div>
      </div>

      {/* PUC SECTION */}
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider border-b pb-2 pt-4">PUC (12th) Details</h3>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">College Name <span className="text-red-500">*</span></label>
        <input type="text" name="pucCollege" value={formData.pucCollege} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none" placeholder="PU College Name" required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Percentage <span className="text-red-500">*</span></label>
          <input type="text" name="pucPercentage" value={formData.pucPercentage} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none" placeholder="e.g. 88%" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Year of Passing <span className="text-red-500">*</span></label>
          <input type="number" name="pucYear" value={formData.pucYear} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none" placeholder="2025" required />
        </div>
      </div>

    </div>
  );

  // --- Step 3: Course & Docs ---
  const renderCourseDocs = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Course Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Department <span className="text-red-500">*</span></label>
          <select name="department" value={formData.department} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none bg-white" required>
            <option value="">---Select Department---</option><option value="Science">Science</option><option value="Commerce">Commerce</option><option value="Arts">Arts</option><option value="ComputerScience">Computer Science</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Program <span className="text-red-500">*</span></label>
          <select name="program" value={formData.program} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none bg-white" required>
            <option value="">---Select Program---</option><option value="B.Sc">B.Sc.</option><option value="B.A">B.A.</option><option value="B.Com">B.Com</option><option value="BCA">BCA</option>
          </select>
        </div>
      </div>

      <hr className="border-slate-200 my-6" />

      {/* File Uploads */}
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
          <UploadCloud className="w-5 h-5 text-blue-600" /> Upload Documents <span className="text-red-500 text-sm">*</span>
        </h3>
        
        <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer relative group ${formData.photo ? 'border-green-400 bg-green-50' : 'border-slate-300 hover:bg-slate-50'}`}>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'photo')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${formData.photo ? 'bg-green-100' : 'bg-blue-100 group-hover:bg-blue-200'}`}>
              {formData.photo ? <CheckCircle className="w-5 h-5 text-green-600"/> : <User className="w-5 h-5 text-blue-600" />}
            </div>
            <p className="text-sm font-medium text-slate-700">{formData.photo ? formData.photo.name : "Upload Passport Size Photo"}</p>
            <p className="text-xs text-slate-400 mt-1">JPG or PNG, max 2MB</p>
          </div>
        </div>

        <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer relative group ${formData.transcript ? 'border-green-400 bg-green-50' : 'border-slate-300 hover:bg-slate-50'}`}>
          <input type="file" accept=".pdf" onChange={(e) => handleFileChange(e, 'transcript')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${formData.transcript ? 'bg-green-100' : 'bg-purple-100 group-hover:bg-purple-200'}`}>
              {formData.transcript ? <CheckCircle className="w-5 h-5 text-green-600"/> : <FileText className="w-5 h-5 text-purple-600" />}
            </div>
            <p className="text-sm font-medium text-slate-700">{formData.transcript ? formData.transcript.name : "Upload Academic Transcript"}</p>
            <p className="text-xs text-slate-400 mt-1">PDF format only</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-start gap-3 mt-6">
        <input type="checkbox" className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" required />
        <p className="text-sm text-slate-600">I declare that the information provided is true and correct.</p>
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
          <p className="text-slate-500 mb-6">
            Your Application ID is <br/>
            <span className="font-mono text-2xl font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100 mt-2 inline-block">{appId}</span>
          </p>
          <p className="text-slate-400 text-sm mb-8">Please save this ID for future reference.</p>
          <button onClick={() => window.location.reload()} className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold transition-all">Submit Another Application</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans pt-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Online Admission Form</h1>
          <p className="text-slate-500 mt-2">Apply for the 2026-2027 academic year.</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {['Personal & Parent', 'Academic Info', 'Program & Docs'].map((label, index) => {
              const stepNum = index + 1;
              const isActive = stepNum <= currentStep;
              return (
                <div key={index} className={`flex flex-col items-center w-1/3 ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2 transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-200'}`}>{stepNum}</span>
                  <span className="text-xs font-semibold hidden sm:block">{label}</span>
                </div>
              );
            })}
          </div>
          <div className="h-2 bg-slate-200 rounded-full relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-500 ease-out" style={{ width: `${((currentStep - 1) / 2) * 100}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-8 md:p-10">
            <form onSubmit={handleSubmit}>
              <div className="min-h-[400px]">
                {currentStep === 1 && renderPersonal()}
                {currentStep === 2 && renderAcademic()}
                {currentStep === 3 && renderCourseDocs()}
              </div>
              <div className="flex justify-between mt-10 pt-6 border-t border-slate-100">
                <button type="button" onClick={prevStep} disabled={currentStep === 1 || isLoading} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${currentStep === 1 ? 'opacity-0 cursor-default' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}><ChevronLeft className="w-4 h-4" /> Previous</button>
                {currentStep < 3 ? (
                  <button type="button" onClick={nextStep} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all">Next Step <ChevronRight className="w-4 h-4" /></button>
                ) : (
                  <button type="submit" disabled={isLoading} className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-lg transition-all ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500 text-white shadow-green-500/20'}`}>
                    {isLoading ? <><Loader2 className="w-4 h-4 animate-spin"/> Processing...</> : <><CheckCircle className="w-4 h-4" /> Submit Application</>}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;