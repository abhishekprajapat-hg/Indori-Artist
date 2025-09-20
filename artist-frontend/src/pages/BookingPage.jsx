import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function BookingPage() {
  const { artistId } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    message: "",
  });

  useEffect(() => {
    // Fetch artist details for confirmation
    const fetchArtist = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/artists/${artistId}`
        );
        const data = await res.json();
        setArtist(data);
      } catch (err) {
        console.error("Error fetching artist:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArtist();
  }, [artistId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${artist._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artistId,
          ...formData,
        }),
      });

      if (!res.ok) throw new Error("Failed to book artist");

      const data = await res.json();
      alert(`Booking confirmed for ${artist?.name} on ${formData.date}`);
      navigate(`/artist/${artistId}`);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-light-gradient dark:bg-dark-gradient p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">
          Book {artist?.name || "Artist"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 
               text-gray-900 dark:text-gray-100 
               border-gray-300 dark:border-gray-600 
               placeholder-gray-400 dark:placeholder-gray-500
               focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 
               text-gray-900 dark:text-gray-100 
               border-gray-300 dark:border-gray-600 
               placeholder-gray-400 dark:placeholder-gray-500
               focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 
               text-gray-900 dark:text-gray-100 
               border-gray-300 dark:border-gray-600 
               placeholder-gray-400 dark:placeholder-gray-500
               focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <textarea
            placeholder="Message (optional)"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 
               text-gray-900 dark:text-gray-100 
               border-gray-300 dark:border-gray-600 
               placeholder-gray-400 dark:placeholder-gray-500
               focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 
               text-white px-4 py-2 rounded-md font-semibold 
               shadow hover:opacity-90 transition"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
