import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const [isDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-light-gradient text-black shadow dark:bg-dark-gradient dark:text-white transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo + Name */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-16 w-16" />
          <span className="font-bold text-xl">Indori Singers</span>
        </Link>

        {/* Right Section: Theme Toggle Only */}
        <div className="flex items-center space-x-6">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition relative group"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-800" />
            )}

            {/* Tooltip */}
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
      </div>
    </nav>
  );
}
