import { motion } from "framer-motion";
import { useState } from "react";

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [
    {
      url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
      alt: "Modern boarding house exterior"
    },
    {
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      alt: "Single room interior"
    },
    {
      url: "https://images.unsplash.com/photo-1522771930-78848d9293e8",
      alt: "Double room setup"
    },
    {
      url: "https://images.unsplash.com/photo-1522772555593-d53822f3d0c8",
      alt: "Common area"
    },
    {
      url: "https://images.unsplash.com/photo-1522771739847-5c69e4c41fd4",
      alt: "Study room"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {/* Main Image */}
      <motion.div
        className="relative aspect-[16/9] overflow-hidden rounded-2xl"
        layoutId="main-image"
      >
        <img
          src={images[selectedImage].url}
          alt={images[selectedImage].alt}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square rounded-lg overflow-hidden ${
              selectedImage === index
                ? "ring-2 ring-blue-500"
                : "ring-1 ring-gray-200"
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default ImageGallery;
