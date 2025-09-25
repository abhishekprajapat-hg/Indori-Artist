import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/Logo.png";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const linkClasses =
    "hover:text-primary transition px-2 py-1 rounded-md";
  const activeLinkClasses =
    "text-primary font-semibold border-b-2 border-primary";

  return (
    <nav className="bg-light-gradient text-black shadow dark:bg-dark-gradient dark:text-white transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo + Name */}
        <NavLink to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-16 w-16" />
          <span className="font-bold text-xl">Indori Singers</span>
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
            }
          >
            Category
          </NavLink>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition relative group"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-800" />
            )}
            <span
              className="absolute top-full mt-2 left-1/2 -translate-x-1/2 
               text-xs font-medium bg-gray-800 text-white 
               px-2 py-1 rounded whitespace-nowrap
               opacity-0 group-hover:opacity-100 
               transition duration-200"
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-800" />
            )}
          </button>

          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded bg-gray-200 dark:bg-gray-700"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Sidebar for Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
          <div className="w-64 bg-white dark:bg-gray-900 p-6 flex flex-col space-y-6 shadow-lg">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="self-end p-2 rounded bg-gray-200 dark:bg-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              Contact
            </NavLink>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive ? `${linkClasses} ${activeLinkClasses}` : linkClasses
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              Category
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
