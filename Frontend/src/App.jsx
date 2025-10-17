import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
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
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route path="/programs" element={<Programs />}></Route>
        <Route
          path="/admin/users"
          element={
            <Adminprotect>
              <Allusers />
            </Adminprotect>
          }
        ></Route>
        <Route
          path="/admin/events"
          element={
            <Adminprotect>
              <AddEvent />
            </Adminprotect>
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/dashboard/donate"
          element={
            <ProtectedRoute>
              <Donation />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/dashboard/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
