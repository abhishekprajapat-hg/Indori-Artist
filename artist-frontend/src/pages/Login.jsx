import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Helmet } from "react-helmet-async";
  
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // Update context and Navbar will re-render
      login(data.user, data.token);

      navigate("/"); // redirect to home
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <><Helmet>
        <title>Login - Indori Artist</title>
        <meta name="description" content="Login to your Indori Artist account." />
      </Helmet>
    <div className="flex justify-center items-center min-h-screen bg-light-gradient text-black dark:bg-dark-gradient dark:text-white transition-colors duration-300">
      <form
        onSubmit={handleSubmit}
        className="bg-light-gradient text-black dark:bg-dark-gradient dark:text-white 
           border border-gray-300 dark:border-gray-700 
           transition-colors duration-300 shadow-md rounded px-8 py-6 w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#70d6ff]"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#70d6ff]"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#70d6ff] hover:bg-[#5cc3eb] text-white font-semibold py-2 rounded transition-colors"
        >
          Login
        </button>
        <Link
          to="/signup"
          className="block text-center text-sm text-gray-600 dark:text-gray-400 mt-4 hover:underline"
        >
          Don't have an account? Sign up
        </Link>
      </form>
    </div>
  </>
  );
}
