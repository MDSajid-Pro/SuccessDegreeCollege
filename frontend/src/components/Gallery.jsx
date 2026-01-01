import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";
import { useAppContext } from "../context/AppContext"; 

const Gallery = () => {
  const navigate = useNavigate();
  const { axios } = useAppContext();

  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchGalleryImages = async () => {
    try {
      const { data } = await axios.get("/api/image/all"); 
      if (data.success) {
        setGalleryImages(data.images);
      } else {
        console.error("Failed to fetch images:", data.message);
      }
    } catch (err) {
      console.error("Error fetching images:", err.message);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section id="gallery" className="bg-gray-100 py-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10 border-b-4 border-blue-500 inline-block pb-2">
        Gallery
      </h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {galleryImages.slice(0, 6).map((img, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out bg-white cursor-pointer"
            onClick={() => handleImageClick(img.image)}
          >
            <img
              src={img.image}
              alt={img.name || `Gallery image ${index + 1}`}
              className="w-full h-60 object-cover"
            />
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/galleries")}
          className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
        >
          View More <ArrowRight size={18} />
        </button>
      </div>

      {/* Modal for Zoomed Image */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="relative max-w-4xl w-full mx-4">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-2 hover:bg-red-600 transition"
            >
              <X size={24} />
            </button>
            <img
              src={selectedImage}
              alt="Zoomed"
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
