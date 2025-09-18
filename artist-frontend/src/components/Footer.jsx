import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center space-x-3 mb-4">
            <img src={logo} alt="Logo" className="h-12 w-12" />
            <span className="text-xl font-bold text-white">Indori Singers</span>
          </Link>
          <p className="text-gray-400 text-sm">
            Discover and book the best talent for your events – Singers, DJs,
            Dancers, Bands, Anchors, and more. 🎶
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/categories" className="hover:text-white transition">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/add-artist" className="hover:text-white transition">
                Add Artist
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-blue-500 transition">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-pink-500 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-sky-400 transition">
              <FaTwitter />     
            </a>
            <a href="#" className="hover:text-red-500 transition ">
              <FaYoutube /> 
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Indori Singers. All rights reserved.
      </div>
    </footer>
  );
}
