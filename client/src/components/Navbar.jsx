import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaHeart,
  FaUserCircle,
} from "react-icons/fa";

import { useWishlist } from "../context/WishlistContext";
import { useCompare } from "../context/CompareContext";

import MobileMenu from "./MobileMenu";
import { logout } from "../utils/auth";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] =
    useState(false);

  const dropdownRef = useRef();

  const { wishlist } = useWishlist();
  const { compareCars } = useCompare();

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  const navLink =
    "text-slate-300 hover:text-amber-400 transition";

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-slate-950/70 backdrop-blur-lg border-b border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* LOGO */}

          <Link
            to="/"
            className="
              text-3xl
              font-extrabold
              bg-gradient-to-r
              from-amber-400
              to-orange-500
              bg-clip-text
              text-transparent
            "
          >
            CarRental
          </Link>

          {/* DESKTOP MENU */}

          <div className="hidden md:flex items-center gap-8">

            <Link
              to="/"
              className={navLink}
            >
              Home
            </Link>

            <Link
              to="/cars"
              className={navLink}
            >
              Cars
            </Link>

            {user && (
              <>
                <Link
                  to="/dashboard"
                  className={navLink}
                >
                  Dashboard
                </Link>

                <Link
                  to="/wishlist"
                  className="
                    flex
                    items-center
                    gap-2
                    text-slate-300
                    hover:text-red-400
                  "
                >
                  <FaHeart className="text-red-500" />

                  <span>
                    {wishlist.length}
                  </span>
                </Link>

                <Link
                  to="/compare"
                  className="
                    text-slate-300
                    hover:text-blue-400
                  "
                >
                  Compare ({compareCars.length})
                </Link>

                <Link
                  to="/quiz"
                  className={navLink}
                >
                  AI Quiz
                </Link>

                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="
                      text-red-400
                      hover:text-red-300
                      transition
                    "
                  >
                    Admin Panel
                  </Link>
                )}
              </>
            )}
          </div>

          {/* RIGHT SIDE */}

          <div className="hidden md:flex items-center gap-4">

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="
                    px-4
                    py-2
                    rounded-lg
                    border
                    border-slate-600
                    hover:bg-slate-800
                  "
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="
                    px-4
                    py-2
                    rounded-lg
                    bg-gradient-to-r
                    from-amber-400
                    to-orange-500
                    text-black
                    font-semibold
                  "
                >
                  Register
                </Link>
              </>
            ) : (
              <div
                className="relative"
                ref={dropdownRef}
              >

                <button
                  onClick={() =>
                    setDropdownOpen(
                      !dropdownOpen
                    )
                  }
                  className="
                    flex
                    items-center
                    gap-2
                    bg-slate-800
                    px-4
                    py-2
                    rounded-xl
                    hover:bg-slate-700
                  "
                >
                  <FaUserCircle className="text-amber-400 text-xl" />

                  <span>
                    {user.name}
                  </span>
                </button>

                {dropdownOpen && (
                  <div
                    className="
                      absolute
                      right-0
                      mt-3
                      w-56
                      bg-slate-900
                      border
                      border-slate-700
                      rounded-2xl
                      overflow-hidden
                      shadow-xl
                    "
                  >

                    <Link
                      to="/dashboard"
                      className="
                        block
                        px-4
                        py-3
                        hover:bg-slate-800
                      "
                    >
                      📊 Dashboard
                    </Link>

                    <Link
                      to="/wishlist"
                      className="
                        block
                        px-4
                        py-3
                        hover:bg-slate-800
                      "
                    >
                      ❤️ Wishlist
                    </Link>

                    <Link
                      to="/compare"
                      className="
                        block
                        px-4
                        py-3
                        hover:bg-slate-800
                      "
                    >
                      ⚖️ Compare
                    </Link>

                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        className="
                          block
                          px-4
                          py-3
                          text-red-400
                          hover:bg-slate-800
                        "
                      >
                        ⚙️ Admin Panel
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="
                        w-full
                        text-left
                        px-4
                        py-3
                        text-red-400
                        hover:bg-red-600
                        hover:text-white
                      "
                    >
                      🚪 Logout
                    </button>

                  </div>
                )}

              </div>
            )}

          </div>

          {/* MOBILE BUTTON */}

          <button
            className="
              md:hidden
              text-2xl
              text-white
            "
            onClick={() =>
              setIsOpen(true)
            }
          >
            <FaBars />
          </button>

        </div>

      </nav>

      <div className="h-20"></div>

      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}

export default Navbar;