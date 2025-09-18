import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/Logo.png";

const categories = [
  { name: "Singer", slug: "singer" },
  { name: "DJ", slug: "dj" },
  { name: "Dancer", slug: "dancer" },
  { name: "Live Band", slug: "band" },
  { name: "Anchor/Emcee", slug: "anchor" },
  { name: "Sufi Band", slug: "sufi-band" },
  { name: "Kirtan Singer", slug: "kirtan-singer" },
  { name: "Instrumentalist", slug: "instrumentalist" },
];

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-[#70d6ff] text-white shadow">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo + Name */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-20 w-20" />
          <span className="font-bold text-xl">Indori Singers</span>
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-6">
          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="hover:underline"
            >
              Categories
            </button>

            {isDropdownOpen && (
              <div className="absolute bg-white text-black rounded shadow mt-2 w-48">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/category/${cat.slug}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Auth Links */}
          {!user ? (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/signup" className="hover:underline">
                Signup
              </Link>
            </>
          ) : (
            <>
              {/* Add Artist Button (only visible when logged in) */}
              <Link
                to="/add-artist"
                className="bg-white text-[#70d6ff] px-3 py-1 rounded font-semibold hover:bg-gray-100"
              >
                + Add Artist
              </Link>

              <button onClick={logout} className="hover:underline">
                Logout ({user.email})
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
