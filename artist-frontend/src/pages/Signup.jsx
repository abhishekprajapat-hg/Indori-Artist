import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      // Auto-login after signup
      login(data.user, data.token);

      navigate("/"); // go home
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-light-gradient text-black dark:bg-dark-gradient dark:text-white transition-colors duration-300">
      <form
        onSubmit={handleSubmit}
        className="bg-light-gradient text-black dark:bg-dark-gradient dark:text-white 
           border border-gray-300 dark:border-gray-700 
           transition-colors duration-300 shadow-md rounded px-8 py-6 w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#70d6ff]"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#70d6ff]"
          required
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#70d6ff]"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#70d6ff]"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#70d6ff]"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#70d6ff] hover:bg-[#5cc3eb] text-white font-semibold py-2 rounded transition-colors"
        >
          Sign Up
        </button>

        <Link
          to="/login"
          className="block text-center text-sm text-gray-600 dark:text-gray-400 mt-4 hover:underline"
        >
          Already have an account? Login
        </Link>
      </form>
    </div>
  );
}
