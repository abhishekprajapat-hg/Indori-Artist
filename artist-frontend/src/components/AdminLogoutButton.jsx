// components/AdminLogoutButton.jsx
import { useNavigate } from "react-router-dom";

export default function AdminLogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // remove token
    navigate("/admin/login"); // redirect to login page
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 rounded-lg 
                   bg-red-600 text-white shadow hover:bg-red-700 
                   transition duration-300"
    >
      Logout
    </button>
  );
}
