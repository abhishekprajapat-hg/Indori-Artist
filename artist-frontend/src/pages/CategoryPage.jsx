import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

export default function CategoryPage() {
  const { id } = useParams(); // category slug
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      setLoading(true);
      setError(null);

      try {
        const url =
          id === "all"
            ? `${import.meta.env.VITE_API_URL}/artists`
            : `${import.meta.env.VITE_API_URL}/artists?category=${id}`;

        const res = await fetch(url);

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text}`);
        }

        const data = await res.json();
        // ✅ Ensure UI follows saved order
        data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        setArtists(data);
      } catch (err) {
        console.error("Error fetching artists:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [id]);

  return (
    <>
      <Helmet>
        <title>{id === "all" ? "All" : id} Artists - Indori Artist</title>
        <meta
          name="description"
          content={`Browse ${
            id === "all" ? "all" : id
          } artists in Indore.`}
        />
      </Helmet>
      <div className="container mx-auto px-4 py-8 ">
        <h1 className="text-2xl font-bold mb-6 capitalize">
          {id === "all" ? "All" : id} Artists
        </h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error loading artists: {error}</p>}
        {!loading && !error && artists.length === 0 && (
          <p className="text-gray-500">No artists found in this category.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {artists.map((artist) => (
            <Link
              key={artist._id}
              to={`/artist/${artist._id}`}
              className="bg-light-gradient text-black dark:bg-dark-gradient dark:text-white duration-300 shadow rounded-lg p-4 hover:shadow-lg transition"
            >
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-semibold">{artist.name}</h2>
              <p className="text-gray-600 capitalize">{artist.category}</p>
              <p className="text-indigo-600 font-bold mt-2">
                ₹{artist.price || "N/A"}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
