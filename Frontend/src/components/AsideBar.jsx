import React, { useEffect, useState } from 'react'
import { useAuth } from "../store/Auth";
import { Link,useNavigate } from 'react-router';
import Hamburger from 'hamburger-react';

function AsideBar() {
  const { removeTokenFromLS, userInfo, getTokenFromLS } = useAuth();
  const navigate = useNavigate();
  const [isOpen,setisOpen] = useState(false)
  const [userData, setuserData] = useState(null)
  const [profileImg, setprofileImg] = useState(null);
  const token = getTokenFromLS();
  
  useEffect(() => {
    const fetchUser = async () => {
      let userData = await userInfo();
      setuserData(userData);
    }
    fetchUser();
  },[])
    const handleLogout = () => {
      removeTokenFromLS();
      navigate("/")
  }
  
  return (
    <>
      <aside className="p-6 bg-amber-50 min-h-screen w-80">
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

          <button
            onClick={() => {
              handleLogout();
              
            }}
            className="w-full text-left block px-4 py-2 mt-4 rounded-lg bg-red-600 text-white hover:bg-blue-700 font-semibold transition"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>
    </>
  );
}

export default AsideBar