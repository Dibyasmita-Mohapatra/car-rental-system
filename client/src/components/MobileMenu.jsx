import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";

function MobileMenu({ isOpen, setIsOpen }) {
  const { wishlist } = useWishlist();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Menu */}
      <div
        className={`
          fixed
          top-0
          right-0
          h-screen
          w-72
          bg-slate-950
          border-l
          border-slate-800
          z-50
          transform
          transition-transform
          duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        <div className="flex justify-between items-center p-6 border-b border-slate-800">
          <h2 className="text-2xl font-bold text-amber-400">
            Menu
          </h2>

          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col p-6 gap-6">

          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="hover:text-amber-400"
          >
            Home
          </Link>

          <Link
            to="/cars"
            onClick={() => setIsOpen(false)}
            className="hover:text-amber-400"
          >
            Cars
          </Link>

          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="hover:text-amber-400"
          >
            Dashboard
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            onClick={() => setIsOpen(false)}
            className="
              flex
              items-center
              gap-2
              hover:text-red-500
            "
          >
            <FaHeart className="text-red-500" />

            <span>
              Wishlist ({wishlist.length})
            </span>
          </Link>

          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="hover:text-amber-400"
          >
            Login
          </Link>

          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className="
              bg-amber-400
              text-black
              px-4
              py-3
              rounded-xl
              text-center
              font-semibold
            "
          >
            Register
          </Link>

        </div>
      </div>
    </>
  );
}

export default MobileMenu;