import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router";
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
import AsideBar from "./components/AsideBar";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      {/* Navbar visible only on desktop or when not on dashboard */}
      {!isDashboard && <Navbar />}
      {isDashboard && (
        <>
          {/* Desktop: show Navbar */}
          <div className="hidden md:block">
            <Navbar />
          </div>

          {/* Mobile: show hamburger */}
          <div className="flex md:hidden justify-between items-center p-4 bg-blue-50 shadow">
            <h2 className="text-xl font-bold text-blue-800">Helping Hand</h2>
            <Hamburger toggled={isOpen} toggle={setIsOpen} />
          </div>

          {/* Show sidebar when hamburger is open */}
          {isOpen && (
            <div className="fixed top-0 left-0 w-2/3 h-full bg-white shadow-lg z-50">
              <AsideBar closeSidebar={() => setIsOpen(false)} />
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
