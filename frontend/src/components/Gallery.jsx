import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, ArrowRight, ZoomIn, Loader2 } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const Gallery = () => {
  const navigate = useNavigate();
  const { axios } = useAppContext();

  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/image/all");
      if (data.success) {
        setGalleryImages(data.images);
      } else {
        console.error("Failed to fetch images:", data.message);
      }
    } catch (err) {
      console.error("Error fetching images:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section id="gallery" className="bg-gray-50 py-16 px-4 md:px-8 lg:px-20">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Our <span className="text-blue-600">Gallery</span>
        </h2>
        <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
          Explore the vibrant moments and memories captured at our campus.
        </p>
        <div className="w-24 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Gallery Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 max-w-7xl mx-auto">
        
        {/* Loading Skeletons */}
        {loading &&
          [...Array(6)].map((_, i) => (
            <div key={i} className="h-72 bg-gray-200 rounded-2xl animate-pulse"></div>
          ))}

        {/* Image Cards */}
        {!loading &&
          galleryImages.slice(0, 6).map((img, index) => (
            <div
              key={index}
              className="group relative h-72 rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-gray-900"
              onClick={() => handleImageClick(img)}
            >
              {/* Image with Zoom Effect */}
              <img
                src={img.image}
                alt={img.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />

              {/* Top Name Bar (Gradient Overlay) */}
              <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10">
                <h3 className="text-white font-semibold text-lg tracking-wide truncate shadow-black drop-shadow-md">
                  {img.name || "Untitled Moment"}
                </h3>
              </div>

              {/* Hover Overlay Icon */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white">
                  <ZoomIn size={32} />
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Empty State */}
      {!loading && galleryImages.length === 0 && (
        <div className="text-center text-gray-400 py-10">
          <p>No images found in the gallery.</p>
        </div>
      )}

      {/* View More Button */}
      {!loading && galleryImages.length > 0 && (
        <div className="flex justify-center mt-16">
          <button
            onClick={() => navigate("/galleries")}
            className="group relative inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-3.5 rounded-full font-semibold shadow-md hover:shadow-xl hover:bg-blue-600 hover:text-white transition-all duration-300 border border-blue-100"
          >
            View Full Gallery
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {/* Modern Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={closeModal} // Click outside to close
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 md:-right-10 text-white/70 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all"
            >
              <X size={32} />
            </button>

            {/* Modal Image */}
            <img
              src={selectedImage.image}
              alt={selectedImage.name}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl ring-1 ring-white/10"
            />
            
            {/* Modal Caption */}
            {selectedImage.name && (
              <div className="mt-4 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
                <p className="text-white text-lg font-medium tracking-wide">
                  {selectedImage.name}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;