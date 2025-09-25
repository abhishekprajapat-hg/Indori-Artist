import { Link, Outlet, useNavigate } from "react-router-dom";
import AdminLogoutButton from "../../components/AdminLogoutButton";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-3">
          <Link to="/admin/dashboard/bookings" className="px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            Bookings
          </Link>
          <Link to="/admin/dashboard/artists" className="px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            Artists
          </Link>
        </nav>
        <div className="mt-6">
          <AdminLogoutButton onLogout={handleLogout} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet /> {/* Renders child routes (Bookings / Artists) */}
      </main>
    </div>
  );
}
