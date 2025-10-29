import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation, Link, useNavigate } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Donation from "./components/DonationForm";
import Events from "./components/Events";
import Adminprotect from "./components/Adminprotect";
import Allusers from "./pages/Allusers";
import AllDonations from "./pages/Alldonations";
import AddEvent from "./pages/Addevent";
import AdminLogin from "./pages/Adminlogin";
import Programs from "./pages/Programs";
import Footer from "./components/Footer";
import Pagenotfound from "./pages/Pagenotfound";
import Hamburger from "hamburger-react";
import { useAuth } from "./store/Auth";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { removeTokenFromLS, userInfo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  const isDashboard = location.pathname.startsWith("/dashboard");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await userInfo();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };
    fetchUser();
  }, [userInfo]);

  const handleLogout = () => {
    removeTokenFromLS();
    navigate("/");
  };

  return (
    <>
      {/* ✅ Navbar visible on desktop or when not on dashboard */}
      {!isDashboard && <Navbar />}
      {isDashboard && (
        <>
          {/* 🖥️ Desktop Navbar */}
          <div className="hidden md:block">
            <Navbar />
          </div>

          {/* 📱 Mobile Header with Hamburger */}
          <div className="flex md:hidden justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 shadow-md sticky top-0 z-40">
            <h2 className="text-2xl font-extrabold text-blue-900 tracking-wide">
              Helping Hand
            </h2>
            <Hamburger toggled={isOpen} toggle={setIsOpen} color="#1E3A8A" />
          </div>

          {/* 📱 Animated Mobile Sidebar */}
          <div
            className={`fixed top-0 left-0 h-full w-2/3 bg-amber-50 shadow-2xl border-r border-blue-100 transform transition-transform duration-300 ease-in-out z-50 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <aside className="p-6">
              {/* Profile Section */}
              <div className="mb-8 text-center">
                <img
                  src={
                    userData?.profileImg ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto border-4 border-blue-200 shadow-sm mb-3"
                />
                <p className="text-blue-900 font-bold text-lg">
                  {userData?.user?.fullName || "User"}
                </p>
                <p className="text-sm text-blue-600 truncate">
                  {userData?.user?.Email || "user@gmail.com"}
                </p>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-2">
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 rounded-lg text-blue-800 font-medium hover:bg-blue-100 transition"
                  onClick={() => setIsOpen(false)}
                >
                  🏠 Dashboard
                </Link>
                <Link
                  to="/dashboard/donate"
                  className="block px-4 py-2 rounded-lg text-blue-800 font-medium hover:bg-blue-100 transition"
                  onClick={() => setIsOpen(false)}
                >
                  💰 Donate
                </Link>
                <Link
                  to="/dashboard/events"
                  className="block px-4 py-2 rounded-lg text-blue-800 font-medium hover:bg-blue-100 transition"
                  onClick={() => setIsOpen(false)}
                >
                  📅 Events
                </Link>
                <Link
                  to="/"
                  className="block px-4 py-2 rounded-lg text-blue-800 font-medium hover:bg-blue-100 transition"
                  onClick={() => setIsOpen(false)}
                >
                  🏡 home
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left block px-4 py-2 mt-4 rounded-lg bg-red-600 text-white hover:bg-blue-700 font-semibold transition"
                >
                  🚪 Logout
                </button>
              </nav>
            </aside>
          </div>
        </>
      )}

      {/* 🛤️ Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/programs" element={<Programs />} />
        <Route
          path="/admin/users"
          element={
            <Adminprotect>
              <Allusers />
            </Adminprotect>
          }
        />
        <Route
          path="/admin/events"
          element={
            <Adminprotect>
              <AddEvent />
            </Adminprotect>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/donate"
          element={
            <ProtectedRoute>
              <Donation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/Alldonations"
          element={
            <Adminprotect>
              <AllDonations />
            </Adminprotect>
          }
        />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
