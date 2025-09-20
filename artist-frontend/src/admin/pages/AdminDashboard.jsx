import { useEffect, useState } from "react";
import { CheckCircle, Trash2, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import AdminLogoutButton from "../../components/AdminLogoutButton";


export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("adminToken");

  // ----------------- BOOKINGS -----------------
  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const approveBooking = async (id) => {
    await fetch(`http://localhost:5000/api/admin/bookings/${id}/approve`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBookings();
  };

  const deleteBooking = async (id) => {
    await fetch(`http://localhost:5000/api/admin/bookings/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBookings();
  };

  // ----------------- ARTISTS -----------------
  const fetchArtists = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/artists", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch artists");
      const data = await res.json();
      setArtists(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateArtist = async (id, artist) => {
    await fetch(`http://localhost:5000/api/admin/artists/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(artist),
    });
    fetchArtists();
  };

  const deleteArtist = async (id) => {
    await fetch(`http://localhost:5000/api/admin/artists/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchArtists();
  };

  // ----------------- LOGOUT -----------------
   const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };
  // ----------------- USE EFFECT -----------------
  useEffect(() => {
    if (activeTab === "bookings") fetchBookings();
    if (activeTab === "artists") fetchArtists();
  }, [activeTab]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <AdminLogoutButton onLogout={handleLogout} />
        {/* Floating Add Artist Button */}
        <Link
          to="/add-artist"
          className="flex items-center gap-2 px-4 py-2 rounded-lg 
                   bg-indigo-600 text-white shadow hover:bg-indigo-700 
                   transition duration-300"
        >
          + Add Artist
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("bookings")}
          className={`px-4 py-2 rounded ${
            activeTab === "bookings"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          Bookings
        </button>
        <button
          onClick={() => setActiveTab("artists")}
          className={`px-4 py-2 rounded ${
            activeTab === "artists"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          Artists
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "bookings" ? (
        <BookingsTable
          bookings={bookings}
          approveBooking={approveBooking}
          deleteBooking={deleteBooking}
        />
      ) : (
        <ArtistsTable
          artists={artists}
          updateArtist={updateArtist}
          deleteArtist={deleteArtist}
        />
      )}
    </div>
  );
}

// ----------------- BOOKINGS TABLE -----------------
function BookingsTable({ bookings, approveBooking, deleteBooking }) {
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-left">
            <th className="px-6 py-3">User</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Artist</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                No bookings yet
              </td>
            </tr>
          ) : (
            bookings.map((b) => (
              <tr key={b._id} className="border-t dark:border-gray-700">
                <td className="px-6 py-3">{b.name}</td>
                <td className="px-6 py-3">{b.email}</td>
                <td className="px-6 py-3">
                  {new Date(b.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">{b.artist?.name}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      b.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="px-6 py-3 flex space-x-3">
                  {b.status !== "approved" && (
                    <button
                      onClick={() => approveBooking(b._id)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <CheckCircle size={20} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteBooking(b._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// ----------------- ARTISTS TABLE -----------------
function ArtistsTable({ artists, updateArtist, deleteArtist }) {
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700 text-left">
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {artists.length === 0 ? (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                No artists found
              </td>
            </tr>
          ) : (
            artists.map((a) => (
              <tr key={a._id} className="border-t dark:border-gray-700">
                <td className="px-6 py-3">{a.name}</td>
                <td className="px-6 py-3">{a.category}</td>
                <td className="px-6 py-3">₹{a.price}</td>
                <td className="px-6 py-3 flex space-x-3">
                  <button
                    onClick={() =>
                      updateArtist(a._id, {
                        ...a,
                        name: prompt("New name", a.name) || a.name,
                      })
                    }
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => deleteArtist(a._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
