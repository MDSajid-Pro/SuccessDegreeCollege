import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { X, ArrowRight, ZoomIn, ChevronLeft, ChevronRight, Images } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const Gallery = () => {
  const navigate = useNavigate();
  const { axios } = useAppContext();

  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [touchStart, setTouchStart] = useState(null);

  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/image/all");
      if (data.success) {
        setGalleryImages(data.images.reverse());
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

  // Show all or slice based on toggle
  const visibleImages = showAll ? galleryImages : galleryImages.slice(0, 6);

  // Navigate through ALL images in the database
  const handleNext = useCallback(() => {
    if (galleryImages.length === 0) return;
    setSelectedIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const handlePrev = useCallback(() => {
    if (galleryImages.length === 0) return;
    setSelectedIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

  const closeModal = () => {
    setSelectedIndex(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  // Mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStart(null);
  };

  const currentImage = selectedIndex !== null ? galleryImages[selectedIndex] : null;

  return (
    <section id="gallery" className="bg-gray-50 py-16 px-4 md:px-8 lg:px-20 min-h-screen">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-3">
          <Images size={14} /> Campus Memories
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Our <span className="text-blue-600">Gallery</span>
        </h2>
        <p className="text-gray-500 mt-4 text-base md:text-lg max-w-2xl mx-auto">
          Explore all moments and campus life events captured across all departments.
        </p>
        <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-5 rounded-full"></div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 max-w-7xl mx-auto">
        {loading &&
          [...Array(6)].map((_, i) => (
            <div key={i} className="h-72 bg-gray-200 rounded-2xl animate-pulse"></div>
          ))}

        {!loading &&
          visibleImages.map((img, index) => {
            // Find global index so modal points to the exact item in galleryImages
            const globalIndex = galleryImages.findIndex((item) => item._id === img._id || item === img);
            return (
              <div
                key={img._id || index}
                className="group relative h-72 rounded-2xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer bg-gray-900 transition-all duration-300"
                onClick={() => setSelectedIndex(globalIndex !== -1 ? globalIndex : index)}
              >
                <img
                  src={img.image}
                  alt={img.name || "Gallery image"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />

                <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10">
                  <h3 className="text-white font-semibold text-base md:text-lg tracking-wide truncate drop-shadow">
                    {img.name || "Untitled Moment"}
                  </h3>
                </div>

                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-md p-3.5 rounded-full text-white shadow-lg">
                    <ZoomIn size={28} />
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Empty State */}
      {!loading && galleryImages.length === 0 && (
        <div className="text-center text-gray-400 py-16">
          <p className="text-lg">No images found in the gallery.</p>
        </div>
      )}

      {/* View Controls */}
      {!loading && galleryImages.length > 6 && (
        <div className="flex flex-wrap items-center justify-center gap-4 mt-14">
          <button
            onClick={() => navigate("/galleries")}
            className="inline-flex items-center gap-2 bg-white text-gray-700 hover:text-blue-600 border border-gray-200 px-7 py-3 rounded-full font-semibold shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer text-sm"
          >
            Full Gallery Page
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Lightbox Modal browsing across all images */}
      {currentImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200 select-none"
          onClick={closeModal}
        >
          {/* Top Bar */}
          <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-50">
            <div className="bg-white/10 backdrop-blur-md text-white/90 px-4 py-1.5 rounded-full text-xs md:text-sm font-medium border border-white/15 font-mono">
              {selectedIndex + 1} / {galleryImages.length}
            </div>

            <button
              onClick={closeModal}
              className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-all cursor-pointer"
              title="Close (Esc)"
            >
              <X size={24} />
            </button>
          </div>

          {/* Left Arrow Button */}
          {galleryImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white bg-white/10 hover:bg-white/25 backdrop-blur-md p-3.5 rounded-full transition-all cursor-pointer border border-white/10 shadow-xl active:scale-95"
              title="Previous (Left Arrow)"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Image & Title Card */}
          <div
            className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={currentImage.image}
              alt={currentImage.name}
              className="w-full h-auto max-h-[75vh] object-contain rounded-2xl shadow-2xl ring-1 ring-white/10"
            />

            {currentImage.name && (
              <div className="mt-4 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 max-w-lg text-center">
                <p className="text-white text-sm md:text-base font-medium tracking-wide truncate">
                  {currentImage.name}
                </p>
              </div>
            )}
          </div>

          {/* Right Arrow Button */}
          {galleryImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white bg-white/10 hover:bg-white/25 backdrop-blur-md p-3.5 rounded-full transition-all cursor-pointer border border-white/10 shadow-xl active:scale-95"
              title="Next (Right Arrow)"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default Gallery;