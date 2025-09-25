import { useEffect, useState } from "react";
import { CheckCircle, Trash2 } from "lucide-react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("adminToken");

  const fetchBookings = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setBookings(data);
    setLoading(false);
  };

  const approveBooking = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/admin/bookings/${id}/approve`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBookings();
  };

  const deleteBooking = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/admin/bookings/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBookings();
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>
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
            {bookings.map((b) => (
              <tr key={b._id} className="border-t dark:border-gray-700">
                <td className="px-6 py-3">{b.name}</td>
                <td className="px-6 py-3">{b.email}</td>
                <td className="px-6 py-3">{new Date(b.date).toLocaleDateString()}</td>
                <td className="px-6 py-3">{b.artist?.name}</td>
                <td className="px-6 py-3">{b.status}</td>
                <td className="px-6 py-3 flex gap-2">
                  {b.status !== "approved" && (
                    <button onClick={() => approveBooking(b._id)} className="text-green-600 hover:text-green-800">
                      <CheckCircle size={20} />
                    </button>
                  )}
                  <button onClick={() => deleteBooking(b._id)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
