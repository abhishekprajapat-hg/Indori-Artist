import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../assets/Logo.png";

export default function Footer() {
  return (
    <footer className="bg-light-gradient dark:bg-dark-gradient text-black dark:text-gray-200 mt-16 transition-colors duration-300">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center space-x-3 mb-4">
            <img src={logo} alt="Logo" className="h-12 w-12" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Indori Singers
            </span>
          </Link>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Discover and book the best talent for your events – Singers, DJs,
            Dancers, Bands, Anchors, and more. 🎶
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/categories"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="mailto:indorisingers@gmail.com"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Support
              </Link>
            </li>
            <li>
              <Link
                to="tel:+917804996135"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Phone
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="https://www.instagram.com/indori_singers?utm_source=qr&igsh=bjdsdDVwbzl0Z2xn" className="hover:text-blue-500 transition">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/indori_singers?utm_source=qr&igsh=bjdsdDVwbzl0Z2xn" className="hover:text-pink-500 transition">
              <FaInstagram />
            </a>
            <a href="https://youtu.be/u4w5Ismml10?si=fpZq9q7TondCD8oy" className="hover:text-red-500 transition">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 dark:border-gray-700 py-4 text-center text-gray-600 dark:text-gray-400 text-sm">
        © {new Date().getFullYear()} Indori Singers. All rights reserved.
      </div>
    </footer>
  );
}
