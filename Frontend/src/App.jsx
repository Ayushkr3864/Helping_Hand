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
      {/* Navbar visible only on desktop or when not on dashboard */}
      {!isDashboard && <Navbar />}
      {isDashboard && (
        <>
          {/* Desktop Navbar */}
          <div className="hidden md:block">
            <Navbar />
          </div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden justify-between items-center p-4 bg-blue-50 shadow">
            <h2 className="text-xl font-bold text-blue-800">Helping Hand</h2>
            <Hamburger toggled={isOpen} toggle={setIsOpen} />
          </div>

          {/* Mobile Sidebar */}
          {isOpen && (
            <div className="fixed top-0 left-0 w-2/3 h-full bg-white shadow-lg z-50">
              <aside className="p-6 border-r border-blue-200">
                <div className="mb-6 text-center">
                  <img
                    src={
                      userData?.profileImg ||
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt="Profile"
                    className="w-20 h-20 rounded-full mx-auto mb-3"
                  />
                  <p className="text-blue-900 font-semibold">
                    {userData?.user?.fullName || "User"}
                  </p>
                  <p className="text-sm text-blue-600">
                    {userData?.user?.Email || "user@gmail.com"}
                  </p>
                </div>
                <nav className="space-y-3">
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 rounded-lg text-blue-700 hover:bg-blue-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/dashboard/donate"
                    className="block px-3 py-2 rounded-lg text-blue-700 hover:bg-blue-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Donate
                  </Link>
                  <Link
                    to="/dashboard/events"
                    className="block px-3 py-2 rounded-lg text-blue-700 hover:bg-blue-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Events
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left block px-3 py-2 rounded-lg text-blue-700 hover:bg-blue-100"
                  >
                    Logout
                  </button>
                </nav>
              </aside>
            </div>
          )}
        </>
      )}

      {/* Routes */}
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
