import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const GalleriesPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const { axios } = useAppContext(); // use your axios instance from context
  const inputRef = useRef();

  const fetchImages = async () => {
    try {
      const { data } = await axios.get("/api/image/all");
      if (data.success) {
        setGalleryImages(data.images);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching images:", error.message);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="bg-white min-h-screen py-12 px-4 md:px-8 lg:px-16">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10 border-b-4 border-blue-500 inline-block pb-2">
        All Gallery Images
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {galleryImages.map((img, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out bg-gray-100 cursor-pointer"
            onClick={() => handleImageClick(img.image)} // assuming your field is `image`
          >
            <img
              src={img.image}
              alt={img.name || `Gallery image ${index + 1}`}
              className="w-full h-60 object-cover"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="relative max-w-5xl w-full mx-4">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-2 hover:bg-red-600 transition"
            >
              <X size={24} />
            </button>
            <img
              src={selectedImage}
              alt="Zoomed"
              className="w-full max-h-[85vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default GalleriesPage;
