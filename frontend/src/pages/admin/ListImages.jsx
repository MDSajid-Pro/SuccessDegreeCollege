import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
import { Trash2, Image as ImageIcon, ZoomIn, RefreshCw, AlertCircle } from "lucide-react";

const ListImages = () => {
  const { axios, token } = useAppContext();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // --- 1. FETCH IMAGES ---
  const fetchImages = async () => {
    setLoading(true);
    setError(false);
    try {
      const { data } = await axios.get("/api/image/all");
      if (data.success) {
        setImages(data.images);
      } else {
        toast.error(data.message);
        setError(true);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load images");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // --- 2. DELETE IMAGE ---
  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this image permanently?")) return;

    const previousImages = [...images];
    setImages(images.filter((img) => img._id !== id));

    try {
      const { data } = await axios.post(
        "/api/image/delete",
        { id },
        { headers: { Authorization: token } }
      );

      if (data.success) {
        toast.success("Image deleted successfully");
      } else {
        setImages(previousImages);
        toast.error(data.message);
      }
    } catch (error) {
      setImages(previousImages);
      toast.error("Error deleting image");
    }
  };

  useEffect(() => {
    if (token) fetchImages();
  }, [token]);

  // --- LOADING SKELETON ---
  if (loading) {
    return (
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-64 bg-slate-200 rounded-2xl animate-pulse"></div>
        ))}
      </div>
    );
  }

  // --- ERROR STATE ---
  if (error) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <div className="p-4 bg-red-50 text-red-500 rounded-full mb-4">
          <AlertCircle size={48} />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Failed to Load Gallery</h3>
        <button 
          onClick={fetchImages}
          className="mt-4 flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30"
        >
          <RefreshCw size={18} /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-end mb-10 border-b border-slate-200 pb-6 sticky top-0 bg-slate-50/80 backdrop-blur-md z-20">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Gallery Manager</h2>
          <p className="text-slate-500 mt-1 text-sm font-medium">Manage your images.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm text-sm font-semibold text-slate-600">
            Total: <span className="text-blue-600">{images.length}</span>
          </div>
          <button 
            onClick={fetchImages} 
            className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
            title="Refresh List"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      {/* --- EMPTY STATE --- */}
      {images.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <div className="p-6 bg-slate-50 text-slate-400 rounded-full mb-4">
            <ImageIcon size={64} />
          </div>
          <h3 className="text-xl font-bold text-slate-800">No Images Uploaded</h3>
          <p className="text-slate-500 mt-2">Upload new images to see them here.</p>
        </div>
      ) : (
        /* --- FIXED MASONRY LAYOUT --- */
        // FIXED: columns-1 for mobile (was columns-4), added gap-6 for horizontal space
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {images.map((item) => (
            <div
              key={item._id}
              // FIXED: Added 'mb-6' to create vertical space between items in columns
              className="mb-6 break-inside-avoid group relative bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative w-full overflow-hidden">
                <img
                  src={item.image}
                  alt="Gallery"
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Hover Actions (Overlay) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="flex items-center justify-between overflow-hidden">
                    <a 
                      href={item.image} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-2 bg-white/20 text-white rounded-lg backdrop-blur-md hover:bg-white hover:text-black transition-colors"
                      title="View Full Size"
                    >
                      <ZoomIn size={18} />
                    </a>
                    <button
                      onClick={(e) => handleDelete(item._id, e)}
                      className="flex items-center gap-2 px-3 py-2 bg-red-500/90 text-white text-xs font-bold rounded-lg hover:bg-red-600 transition-colors shadow-lg backdrop-blur-md"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>

              {/* Minimal Footer Info */}
              <div className="p-3 bg-white border-t border-slate-50">
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest truncate">
                  ID: {item._id.slice(-6)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListImages;