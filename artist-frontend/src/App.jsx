import { BrowserRouter as Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <AuthProvider>
      
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<CategoryGrid />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/add-artist" element={<ArtistForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/artist/:id" element={<ArtistDetail />} />
        </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
