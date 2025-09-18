import { Link } from "react-router-dom";

const categories = [
  { id: "sufi-band", name: "Sufi Band", image: "./images/sufi.webp" },
  { id: "singers", name: "Singers", image: "./images/singer.png" },
  { id: "dancers", name: "Rappers", image: "./images/dancer.png " },
  { id: "djs", name: "DJs", image: "./images/dj.png" },
  { id: "bands", name: "Bands", image: "./images/live-band.png" },
  { id: "anchors", name: "Anchors", image: "./images/anchor.png" },
  {
    id: "kirtan-singers",
    name: "Kirtan Singers",
    image: "./images/kirtan.png",
  },
  {
    id: "instrumentalists",
    name: "Instrumentalists",
    image: "./images/instrumentalist.png",
  },
  { id: "all", name: "All Categories", image: "./images/dj.png" },
];

export default function CategoryGrid() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-10 text-center">
        🎭 Browse Artist Categories
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.id}`}
            className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <h2 className="text-white text-2xl font-bold">{cat.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
