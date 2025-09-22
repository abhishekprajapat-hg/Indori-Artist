import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const categories = [
  { name: "Sufi Band", slug: "sufi-band", image: "/images/sufi.webp" },
  { name: "Singer", slug: "singer", image: "/images/singer.png" },
  { name: "DJ", slug: "dj", image: "/images/dj.png" },
  { name: "Rapper", slug: "rapper", image: "/images/dancer.png" },
  { name: "Live Band", slug: "band", image: "/images/live-band.png" },
  { name: "Anchor/Emcee", slug: "anchor", image: "/images/anchor.png" },
  { name: "Kirtan Singer", slug: "kirtan-singer", image: "/images/kirtan.png" },
  { name: "Instrumentalist", slug: "instrumentalist", image: "/images/instrumentalist.png" },
  { name: "All Categories", slug: "all", image: "/images/dj.png" },
];

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home - Indori Artist</title>
        <meta name="description" content="Find and book your favorite artists in Indore." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-6 text-center rounded-2xl shadow-lg">
          <h1 className="text-4xl font-extrabold mb-4">
            Find & Book Your Favorite Artists 🎶
        </h1>
        <p className="text-lg opacity-90 mb-6">
          Singers, DJs, Rappers, Bands, Anchors & more – all in one place.
        </p>
        <Link
          to="/categories"
          className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
        >
          Explore Artists
        </Link>
      </section>

      {/* Category Section */}
      <h1 className="text-3xl font-bold text-center mb-8 mt-8">Category</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <Link
            to={`/category/${cat.slug}`}
            key={cat.slug}
            className="rounded-2xl shadow-lg hover:shadow-xl transition bg-white dark:bg-gray-900"
          >
            {/* Image */}
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            
            {/* Name always visible */}
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {cat.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </>
  );
}
