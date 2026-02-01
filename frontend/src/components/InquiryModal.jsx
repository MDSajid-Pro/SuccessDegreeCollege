import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext'; // Adjust path as needed

const InquiryModal = ({ isOpen, onClose }) => {
  const { createInquiry } = useAppContext(); // <--- Use Context

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validateMobile = (number) => {
    const phoneRegex = /^\+?[0-9\s-]{10,15}$/;
    return phoneRegex.test(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // 1. Validation
    const newErrors = {};
    if (!validateMobile(data.phone)) {
      newErrors.phone = "Please enter a valid mobile number (10-15 digits).";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; 
    }
    setErrors({});

    // 2. Send to Backend via Context
    setLoading(true);
    const result = await createInquiry(data); // <--- Context Call
    setLoading(false);

    if (result.success) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full"
        >
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="p-8">
          {!submitted ? (
            <>
              <div className="mb-6 text-center">
                <h3 className="text-2xl font-bold text-gray-900">Take the First Step</h3>
                <p className="text-gray-500 mt-2 text-sm">Fill in your details for a callback.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input name="fullName" required type="text" placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-black"
                  />
                </div>

                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input name="phone" required type="tel" placeholder="+91 98765 43210"
                    className={`w-full px-4 py-3 rounded-lg border outline-none text-black ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
                    onChange={() => setErrors({ ...errors, phone: null })}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1 text-left">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-left text-sm font-medium text-gray-700 mb-1">Course *</label>
                  <select name="course" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-black">
                    <option value="">--Select Course--</option>
                    <option value="B.Sc">B.Sc</option>
                    <option value="B.A">B.A</option>
                    <option value="B.Com">B.Com</option>
                    <option value="B.C.A">B.C.A</option>
                    <option value="Undecided">Undecided</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className={`w-full text-white font-semibold py-3 rounded-lg transition-all shadow-lg 
                  ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {loading ? 'Sending...' : 'Request Call Back'}
                </button>
              </form>
            </>
          ) : (
            <div className="py-10 text-center animate-pulse">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Request Sent!</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;