import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {  FaWhatsapp } from "react-icons/fa";

export default function ArtistDetailPage() {
  const { id } = useParams(); // artist ID
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/artists/${id}`
        );

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status}: ${text}`);
        }

        const data = await res.json();
        setArtist(data);
      } catch (err) {
        console.error("Error fetching artist:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;
  if (!artist) return <p className="p-6 text-gray-500">Artist not found</p>;

  return (
    <>
      <Helmet>
        <title>{artist.name} - Indori Artist</title>
        <meta name="description" content={`View details for ${artist.name}.`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Main Profile */}
        <div className="bg-light-gradient dark:bg-dark-gradient shadow rounded-lg p-6 mb-8 transition-colors duration-300">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-64 h-64 object-cover rounded-lg"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {artist.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 capitalize">
                {artist.category}
              </p>
              {artist.price && (
                <p className="text-indigo-600 dark:text-indigo-400 font-bold mt-2">
                  ₹{artist.price}
                </p>
              )}
              {artist.bio && (
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  {artist.bio}
                </p>
              )}

              {/* Booking button (visible to everyone) */}
              <Link
                to={`/booking/${artist._id}`}
                className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
              >
                Book Now
              </Link>
              <Link
                to="https://wa.me/+917804996135"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition ml-2"
              >
                 WhatsApp 
              </Link>
            </div>
          </div>
        </div>

        {/* Photos */}
        {artist.photos && artist.photos.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Photos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {artist.photos.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo}
                  alt={`Photo ${idx + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow"
                />
              ))}
            </div>
          </div>
        )}

        {/* Videos */}
        {artist.videos && artist.videos.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {artist.videos.map((video, idx) => (
                <video
                  key={idx}
                  src={video}
                  controls
                  className="w-full rounded-lg shadow"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
