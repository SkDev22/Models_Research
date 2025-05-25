import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IconMenu2, IconX } from "@tabler/icons-react";
// import AuthContext from "../../context/AuthContext";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate("/login"); // Redirect to the login page
  };

  return (
    <nav className="bg-[#22223b] backdrop-blur-md py-4 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-white">
          LodgeLink
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive
                    ? "text-[#9a8c98]"
                    : "text-white hover:text-[#4a4e69]"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive
                    ? "text-[#4a4e69]"
                    : "text-white hover:text-[#4a4e69]"
                }`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive
                    ? "text-[#4a4e69]"
                    : "text-white hover:text-[#4a4e69]"
                }`
              }
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user-listing"
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive
                    ? "text-[#4a4e69]"
                    : "text-white hover:text-[#4a4e69]"
                }`
              }
            >
              Listings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive
                    ? "text-[#4a4e69]"
                    : "text-white hover:text-[#4a4e69]"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/dashboard"
                className="px-4 py-2 font-medium text-gray-600 hover:text-amber-500 transition-colors"
              >
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="px-4 py-2 font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-4 py-2 font-medium text-gray-600 hover:text-amber-500 transition-colors"
              >
                Log In
              </NavLink>
              <NavLink
                to="/signup"
                className="px-4 py-2 font-medium text-white bg-[#4a4e69] rounded-lg hover:bg-[#9a8c98] transition-colors"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block font-medium transition-colors ${
                    isActive
                      ? "text-amber-500"
                      : "text-gray-600 hover:text-amber-500"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block font-medium transition-colors ${
                    isActive
                      ? "text-amber-500"
                      : "text-gray-600 hover:text-amber-500"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block font-medium transition-colors ${
                    isActive
                      ? "text-amber-500"
                      : "text-gray-600 hover:text-amber-500"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Contact
              </NavLink>
            </li>
          </ul>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/dashboard"
                  className="px-4 py-2 font-medium text-center text-gray-600 hover:text-amber-500 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 font-medium text-center text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="px-4 py-2 font-medium text-center text-gray-600 hover:text-amber-500 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Log In
                </NavLink>
                <NavLink
                  to="/signup"
                  className="px-4 py-2 font-medium text-center text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
