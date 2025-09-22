import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ArtistForm from "./pages/ArtistForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";
import ArtistDetail from "./pages/ArtistDetail";
import Footer from "./components/Footer";
import CategoryGrid from "./pages/CategoryGrid";
import BookingPage from "./pages/BookingPage";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
    <AuthProvider>
      <div className="min-h-screen bg-light-gradient text-black dark:bg-dark-gradient dark:text-white transition-colors">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<CategoryGrid />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/add-artist" element={<ArtistForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/artist/:id" element={<ArtistDetail />} />

          {/* Booking is protected */}
          <Route
            path="/booking/:artistId"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
