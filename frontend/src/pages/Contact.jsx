import React, { useState, useRef } from 'react'; // Import useRef
import emailjs from '@emailjs/browser'; // Import EmailJS
import { 
  MapPin, 
  Phone, 
  Mail,  
  Send, 
  MessageSquare,
  Globe
} from 'lucide-react';

const ContactPage = () => {
  const form = useRef(); // Create a reference to the form
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    const serviceKey = import.meta.env.VITE_APP_SERVICE_KEY;
    const templateKey = import.meta.env.VITE_APP_TEMPLATE_KEY;
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    // Replace these with your actual IDs from EmailJS dashboard
    // Service ID, Template ID, Public Key
    emailjs.sendForm(
      serviceKey, 
      templateKey, 
      form.current, 
      apiKey
    )
    .then((result) => {
        console.log(result.text);
        setFormStatus('success');
        e.target.reset(); // Clear the form
    }, (error) => {
        console.log(error.text);
        setFormStatus('error'); // Handle error state if needed
        alert("Failed to send message. Please try again.");
    });
  };

  const contactDepartments = [
    { name: "Admissions Office", email: "admissions@univ.edu", phone: "+1 (555) 123-4567" },
    { name: "Student Affairs", email: "student.help@univ.edu", phone: "+1 (555) 123-4568" },
    { name: "Registrar", email: "registrar@univ.edu", phone: "+1 (555) 123-4569" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* --- Header Section --- */}
      <div className="bg-yellow-400 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-black text-lg max-w-2xl mx-auto">
            Have questions about admissions, campus life, or academics? 
            Our team is here to help you navigate your journey.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- Left Column: Contact Info & Map --- */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Quick Info Cards */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" /> Campus Info
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Main Campus</h4>
                    <p className="text-slate-500 text-sm mt-1">
                      Gandhi Chowk, Behind Police Station, Basavakalyan, Karnataka – 585327
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">General Line</h4>
                    <p className="text-slate-500 text-sm mt-1">8549808439 / 8095808439</p>
                    <p className="text-xs text-slate-400 mt-1">Mon-sat, 10 am - 5 pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Email Us</h4>
                    <p className="text-slate-500 text-sm mt-1">successugpgcollege@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Directory */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
              <h3 className="text-lg font-bold mb-4">Direct Lines</h3>
              <div className="space-y-4">
                {contactDepartments.map((dept, idx) => (
                  <div key={idx} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                    <p className="font-medium text-slate-900">{dept.name}</p>
                    <div className="flex flex-col gap-1 mt-1 text-sm text-slate-500">
                      <span className="hover:text-blue-600 cursor-pointer transition-colors">{dept.email}</span>
                      <span>{dept.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* --- Right Column: Inquiry Form --- */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Send us a Message</h2>
                    <p className="text-slate-500 text-sm">We typically reply within 24 hours.</p>
                  </div>
                </div>

                {formStatus === 'success' ? (
                  <div className="bg-green-50 border border-green-100 rounded-xl p-8 text-center py-20">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h3>
                    <p className="text-green-700">Thank you for contacting us. We will get back to you shortly.</p>
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="mt-6 text-green-700 font-semibold hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  // ADDED ref={form} here
                  <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">First Name</label>
                        <input 
                          type="text" 
                          name="first_name" // ADDED Name attribute
                          required
                          className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Last Name</label>
                        <input 
                          type="text" 
                          name="last_name" // ADDED Name attribute
                          required
                          className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Email Address</label>
                        <input 
                          type="email" 
                          name="user_email" // ADDED Name attribute
                          required
                          className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Inquiry Type</label>
                        <select 
                          name="inquiry_type" // ADDED Name attribute
                          className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-600"
                        >
                          <option>General Inquiry</option>
                          <option>Admissions</option>
                          <option>Technical Support</option>
                          <option>Campus Visit</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Message</label>
                      <textarea 
                        rows="5"
                        name="message" // ADDED Name attribute
                        required
                        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none resize-none"
                        placeholder="How can we help you today?"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {formStatus === 'submitting' ? (
                        <>Processing...</>
                      ) : (
                        <>Send Message <Send className="w-5 h-5" /></>
                      )}
                    </button>
                  </form>
                )}
              </div>
              
              <div className="h-64 bg-slate-200 w-full relative">
                {/* Note: Ensure the src below is a valid Embed link from Google Maps */}
                <iframe
                    className="w-full h-full object-cover"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.963287661066!2d76.9535063!3d17.8732669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bce8b0000000001%3A0x12345abcde!2sBasavakalyan!5e0!3m2!1sen!2sin!4v1234567890" 
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen="" 
                    loading="lazy"
                    title="Campus Map"
                ></iframe>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;