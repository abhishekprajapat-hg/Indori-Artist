import { useNavigate } from "react-router-dom";

export default function ArtistCard({ artist }) {
  const nav = useNavigate();
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <img
        src={artist.image}
        alt={artist.name}
        className="w-full h-44 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{artist.name}</h3>
        <p className="text-sm text-gray-600">{artist.category} • {artist.location}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="font-bold">₹{artist.price}</div>
          <button
            onClick={() => nav(`/artist/${artist.id}`)}
            className="px-3 py-1 rounded bg-indigo-600 text-white text-sm"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}
