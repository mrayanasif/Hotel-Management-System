import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

function NavbarComp() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Logout
  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      {/* ================= NAVBAR TOP ================= */}

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-5 md:py-7">
          {/* ================= LOGO ================= */}

          <h1
            className={`font-bold font-serif transition-all duration-300 whitespace-nowrap ${
              scrolled ? "text-amber-600" : "text-white"
            } text-2xl sm:text-3xl`}
          >
            <NavLink to="/" onClick={closeMobileMenu}>
              LUXURY STAY
            </NavLink>
          </h1>

          {/* =========top bar ka  ================= */}

          <div
            className={`hidden lg:flex items-center font-serif gap-5 xl:gap-7 font-medium transition-all duration-300 ${
              scrolled ? "text-gray-800" : "text-white"
            }`}
          >
            {/* Rooms */}

            <NavLink
              to="/rooms"
              className="whitespace-nowrap hover:text-amber-400 transition duration-300"
            >
              Rooms & Suites
            </NavLink>

            {/* About */}

            <NavLink
              to="/about"
              className="whitespace-nowrap hover:text-amber-400 transition duration-300"
            >
              About Us
            </NavLink>

            {/* Services */}

            <NavLink
              to="/services"
              className="whitespace-nowrap hover:text-amber-400 transition duration-300"
            >
              Services
            </NavLink>

            {/* Bookings */}

            <NavLink
              to="/bookings"
              className="whitespace-nowrap hover:text-amber-400 transition duration-300"
            >
              Bookings
            </NavLink>

            {/* ================= LOGIN / LOGOUT ================= */}

            {user ? (
              <div className="flex items-center gap-4 whitespace-nowrap">
                <span
                  className={`uppercase font-semibold ${
                    scrolled ? "text-gray-800" : "text-white"
                  }`}
                >
                  Hello, {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700 font-semibold transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className={`font-semibold whitespace-nowrap transition duration-300 hover:text-amber-500 ${
                  scrolled ? "text-gray-800" : "text-white"
                }`}
              >
                Login
              </NavLink>
            )}
          </div>

          {/* ================= MOBILE BUTTON ================= */}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className={`lg:hidden flex-shrink-0 p-3 rounded-xl transition-all duration-300 ${
              scrolled
                ? "text-gray-900 bg-gray-100 hover:bg-gray-200"
                : "text-white bg-black/40 hover:bg-black/60"
            }`}
          >
            {mobileMenuOpen ? (
              <X size={28} strokeWidth={2.5} />
            ) : (
              <Menu size={28} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}

      {mobileMenuOpen && (
        <div
          className={`lg:hidden w-full shadow-lg ${
            scrolled ? "bg-white" : "bg-black/95 backdrop-blur-md"
          }`}
        >
          <div
            className={`w-full max-w-7xl mx-auto px-5 sm:px-6 py-6 flex flex-col gap-5 font-serif ${
              scrolled ? "text-gray-800" : "text-white"
            }`}
          >
            {/* Rooms */}

            <NavLink
              to="/rooms"
              onClick={closeMobileMenu}
              className="w-full py-2 hover:text-amber-400 transition"
            >
              Rooms & Suites
            </NavLink>

            {/* About */}

            <NavLink
              to="/about"
              onClick={closeMobileMenu}
              className="w-full py-2 hover:text-amber-400 transition"
            >
              About Us
            </NavLink>

            {/* Services */}

            <NavLink
              to="/services"
              onClick={closeMobileMenu}
              className="w-full py-2 hover:text-amber-400 transition"
            >
              Services
            </NavLink>

            {/* Bookings */}

            <NavLink
              to="/bookings"
              onClick={closeMobileMenu}
              className="w-full py-2 hover:text-amber-400 transition"
            >
              Bookings
            </NavLink>

            {/* ================= MOBILE LOGIN / LOGOUT ================= */}

            <div className="border-t border-gray-300/30 pt-5">
              {user ? (
                <div className="flex flex-col gap-4">
                  <span className="uppercase font-semibold">
                    Hello, {user.name}
                  </span>

                  <button
                    onClick={handleLogout}
                    className="text-red-500 text-left font-semibold hover:text-red-700 transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  onClick={closeMobileMenu}
                  className="block py-2 font-semibold hover:text-amber-500 transition"
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavbarComp;
