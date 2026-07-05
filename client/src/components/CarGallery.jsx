import { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
} from "react-icons/fa";

function CarGallery({ images = [] }) {
  const [selectedImage, setSelectedImage] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  if (!images.length) {
    return (
      <div
        className="
          w-full
          h-[500px]
          flex
          items-center
          justify-center
          bg-slate-900
          rounded-3xl
          text-gray-400
        "
      >
        No images available
      </div>
    );
  }

  const currentIndex =
    images.indexOf(selectedImage);

  const nextImage = () => {
    const next =
      currentIndex === images.length - 1
        ? 0
        : currentIndex + 1;

    setSelectedImage(images[next]);
  };

  const prevImage = () => {
    const prev =
      currentIndex === 0
        ? images.length - 1
        : currentIndex - 1;

    setSelectedImage(images[prev]);
  };

  return (
    <>
      <div className="w-full">

        {/* MAIN IMAGE */}

        <div className="relative">

          {/* Premium Badge */}

          <div
            className="
              absolute
              top-4
              left-4
              z-20
              bg-amber-400
              text-black
              px-4
              py-2
              rounded-full
              font-bold
              shadow-lg
            "
          >
            Premium Choice
          </div>

          {/* Counter */}

          <div
            className="
              absolute
              top-4
              right-4
              z-20
              bg-black/70
              text-white
              px-4
              py-2
              rounded-xl
            "
          >
            {currentIndex + 1} / {images.length}
          </div>

          {/* Fullscreen */}

          <button
            onClick={() =>
              setShowModal(true)
            }
            className="
              absolute
              bottom-4
              right-4
              z-20
              bg-black/70
              p-3
              rounded-full
              hover:bg-black
              transition
            "
          >
            <FaExpand />
          </button>

          {/* Previous */}

          <button
            onClick={prevImage}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              z-20
              bg-black/60
              p-4
              rounded-full
              hover:bg-black
              transition
            "
          >
            <FaChevronLeft />
          </button>

          {/* Next */}

          <button
            onClick={nextImage}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              z-20
              bg-black/60
              p-4
              rounded-full
              hover:bg-black
              transition
            "
          >
            <FaChevronRight />
          </button>

          {/* Main Image */}

          <div className="overflow-hidden rounded-3xl">

            <img
              src={selectedImage}
              alt="Car"
              onClick={() =>
                setShowModal(true)
              }
              className="
                w-full
                h-[550px]
                object-cover
                cursor-pointer
                transition-all
                duration-500
                hover:scale-110
              "
            />

          </div>

        </div>

        {/* THUMBNAILS */}

        <div className="grid grid-cols-4 gap-4 mt-5">

          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Car ${index + 1}`}
              onClick={() =>
                setSelectedImage(image)
              }
              className={`
                h-24
                w-full
                object-cover
                rounded-xl
                cursor-pointer
                border-2
                transition-all
                duration-300

                ${
                  selectedImage === image
                    ? "border-amber-400 scale-105"
                    : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
                }
              `}
            />
          ))}

        </div>

      </div>

      {/* FULLSCREEN MODAL */}

      {showModal && (
        <div
          onClick={() =>
            setShowModal(false)
          }
          className="
            fixed
            inset-0
            bg-black/95
            z-50
            flex
            items-center
            justify-center
            p-6
          "
        >

          <button
            onClick={() =>
              setShowModal(false)
            }
            className="
              absolute
              top-8
              right-8
              text-4xl
            "
          >
            ✕
          </button>

          <img
            src={selectedImage}
            alt=""
            className="
              max-h-[90vh]
              max-w-[90vw]
              rounded-3xl
              shadow-2xl
            "
          />

        </div>
      )}
    </>
  );
}

export default CarGallery;