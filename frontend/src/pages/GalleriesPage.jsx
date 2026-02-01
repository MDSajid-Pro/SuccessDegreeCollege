import React, { useEffect, useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const GalleriesPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { axios } = useAppContext();

  const fetchImages = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/image/all");
      if (data.success) {
        setGalleryImages(data.images.reverse());
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching images:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
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
    <section className="bg-gray-50 min-h-screen py-16 px-4 md:px-8 lg:px-16">
      
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Complete <span className="text-blue-600">Gallery</span>
        </h1>
        <p className="text-gray-500 mt-4 text-lg">
          Browse through our entire collection of campus moments.
        </p>
        <div className="w-32 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Gallery Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[1400px] mx-auto">
        
        {/* Loading Skeletons */}
        {loading &&
          [...Array(8)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
          ))}

        {/* Image Cards */}
        {!loading &&
          galleryImages.map((img, index) => (
            <div
              key={index}
              className="group relative h-64 rounded-xl overflow-hidden shadow-sm hover:shadow-xl cursor-pointer bg-gray-900 transition-all duration-300"
              onClick={() => handleImageClick(img)}
            >
              <img
                src={img.image}
                alt={img.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-95 group-hover:opacity-100"
                loading="lazy"
              />

              {/* Top Name Overlay */}
              <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/70 to-transparent z-10 translate-y-[-100%] group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-sm font-medium truncate">
                  {img.name || "Untitled"}
                </p>
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/30 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white hover:text-blue-600 transition-colors">
                  <ZoomIn size={24} />
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Empty State */}
      {!loading && galleryImages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <p className="text-xl">No images found in the gallery.</p>
        </div>
      )}

      {/* Full Screen Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-6xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 md:fixed md:top-8 md:right-8 text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all z-50"
            >
              <X size={32} />
            </button>

            {/* Image */}
            <img
              src={selectedImage.image}
              alt="Zoomed"
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />

            {/* Caption in Modal */}
            {selectedImage.name && (
              <div className="mt-4 text-center">
                <p className="text-white/90 text-lg font-medium tracking-wide bg-black/50 px-6 py-2 rounded-full backdrop-blur-md border border-white/10 inline-block">
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

export default GalleriesPage;