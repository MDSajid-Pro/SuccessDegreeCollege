import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { Quote, Loader2 } from "lucide-react";

const Principal = () => {
  const { axios } = useAppContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/principal');
        if (response.data.success) {
          setData(response.data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch principal data");
        setLoading(false);
      }
    };
    fetchData();
  }, [axios]);

  if (loading) {
    return <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-blue-600 w-10 h-10"/></div>;
  }

  // Fallback if no data exists yet
  if (!data) return (
    <div className="text-center py-20 text-gray-500">
        Principal profile not setup yet.
    </div>
  );

  return (
    <section id="principal" className="relative bg-white py-20 overflow-hidden font-sans">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Leadership</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-2">
            Principal's <span className="text-blue-600">Desk</span>
          </h2>
          <div className="h-1.5 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Left: Image */}
            <div className="w-full lg:w-1/3 flex flex-col items-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden shadow-lg">
                  <img
                    src={data.image || "https://via.placeholder.com/300x400?text=No+Image"} 
                    alt={data.name}
                    className="w-full h-full object-cover transform transition duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="mt-8 text-center">
                <h3 className="text-2xl font-bold text-slate-900">{data.name}</h3>
                <p className="text-blue-600 font-medium">{data.role}</p>
                {data.qualification && (
                  <span className="inline-block mt-2 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
                    {data.qualification}
                  </span>
                )}
              </div>
            </div>

            {/* Right: Content */}
            <div className="w-full lg:w-2/3">
              <div className="relative">
                <Quote className="absolute -top-6 -left-4 text-blue-100 w-20 h-20 transform -scale-x-100" />
                
                <div className="relative z-10 space-y-6 text-slate-600 leading-relaxed text-lg">
                  {/* --- FIX IS HERE: Check for existence before split --- */}
                  {(data.message || "Message not available.").split('\n').map((paragraph, idx) => (
                    paragraph.trim() && <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">Signature</p>
                    <p className="font-handwriting text-3xl text-blue-700 mt-1" style={{fontFamily: 'cursive'}}>
                      {data.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Principal;