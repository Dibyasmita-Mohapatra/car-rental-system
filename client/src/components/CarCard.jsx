import {
  FaGasPump,
  FaStar,
  FaHeart,
} from "react-icons/fa";

import { GiGearStickPattern } from "react-icons/gi";
import { IoPeople } from "react-icons/io5";

import { useNavigate } from "react-router-dom";

import { useWishlist } from "../context/WishlistContext";
import { useCompare } from "../context/CompareContext";

import toast from "react-hot-toast";

function CarCard({ car }) {
  const navigate = useNavigate();

  const {
    addToWishlist,
    removeFromWishlist,
    isWishlisted,
  } = useWishlist();

  const {
    addToCompare,
    removeFromCompare,
    isCompared,
  } = useCompare();

  const wishlisted = isWishlisted(car._id);
  const compared = isCompared(car._id);

  const handleWishlist = () => {
    if (wishlisted) {
      removeFromWishlist(car._id);
      toast.success(
        `${car.name} removed from wishlist`
      );
    } else {
      addToWishlist(car);
      toast.success(
        `${car.name} added to wishlist`
      );
    }
  };

  const handleCompare = () => {
    if (compared) {
      removeFromCompare(car._id);
      toast.success(
        `${car.name} removed from compare`
      );
    } else {
      addToCompare(car);
      toast.success(
        `${car.name} added to compare`
      );
    }
  };

  return (
    <div
      className="
      bg-slate-800
      rounded-3xl
      overflow-hidden
      shadow-lg
      hover:-translate-y-2
      hover:shadow-2xl
      transition-all
      duration-300
    "
    >
      {/* IMAGE */}

      <div className="relative">
        <img
          src={
            car.images?.[0] ||
            "https://via.placeholder.com/600x400?text=No+Image"
          }
          alt={car.name}
          className="h-56 w-full object-cover"
        />

        {/* Rating */}

        <div
          className="
          absolute
          top-4
          left-4
          bg-black/70
          px-3
          py-1
          rounded-full
          flex
          items-center
          gap-2
        "
        >
          <FaStar className="text-yellow-400" />
          <span>{car.rating}</span>
        </div>

        {/* Wishlist */}

        <button
          onClick={handleWishlist}
          className="
          absolute
          top-4
          right-4
          bg-black/70
          p-3
          rounded-full
        "
        >
          <FaHeart
            className={`text-xl ${
              wishlisted
                ? "text-red-500"
                : "text-gray-400"
            }`}
          />
        </button>
      </div>

      {/* CONTENT */}

      <div className="p-5">
        <h2 className="text-xl font-bold">
          {car.name}
        </h2>

        <p className="text-gray-400">
          {car.brand}
        </p>

        <div className="flex justify-between mt-5 text-sm">
          <span className="flex items-center gap-2">
            <FaGasPump />
            {car.fuel}
          </span>

          <span className="flex items-center gap-2">
            <GiGearStickPattern />
            {car.transmission}
          </span>

          <span className="flex items-center gap-2">
            <IoPeople />
            {car.seats}
          </span>
        </div>

        <p className="mt-4 text-gray-400">
          📍 {car.location}
        </p>

        <div className="flex justify-between items-center mt-6">
          <h3 className="text-2xl font-bold text-amber-400">
            ₹{car.price}
            <span className="text-sm text-gray-400">
              /day
            </span>
          </h3>

          <button
            onClick={() =>
              navigate(`/car/${car._id}`)
            }
            className="
            bg-amber-400
            text-black
            px-4
            py-2
            rounded-xl
            font-semibold
          "
          >
            View Details
          </button>
        </div>

        <button
          onClick={handleCompare}
          className={`
            w-full
            mt-4
            py-3
            rounded-xl
            font-semibold

            ${
              compared
                ? "bg-red-500"
                : "bg-blue-500"
            }
          `}
        >
          {compared
            ? "Remove From Compare"
            : "Compare Car"}
        </button>
      </div>
    </div>
  );
}

export default CarCard;