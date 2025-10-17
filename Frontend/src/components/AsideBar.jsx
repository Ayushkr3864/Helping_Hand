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
      <aside className="w-64 bg-white shadow-lg border-r border-blue-200 p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Helping Hand</h2>
        <div className="mb-8">
          <img
            src={
              userData
                ? userData.profileImg
                : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto mb-3"
          />
          <p className="text-center text-blue-900 font-semibold">
            {userData ? userData.user.fullName : "user"}
          </p>
          <p className="text-center text-sm text-blue-600">
            {userData ? userData.user.Email : "user@gmailcom"}
          </p>
        </div>
        <nav className="space-y-3">
          <Link
            to="/dashboard"
            className="block px-3 py-2 rounded-lg text-blue-700 hover:bg-blue-100"
          >
            Dashboard
          </Link>
          <Link
            to="/dashboard/donate"
            className="block px-3 py-2 rounded-lg text-blue-700 hover:bg-blue-100"
          >
            Donate
          </Link>
          <Link
            to="/dashboard/events"
            className="block px-3 py-2 rounded-lg text-blue-700 hover:bg-blue-100"
          >
            Events
          </Link>
          <button onClick={handleLogout}>
            <a className="block px-3 py-2 rounded-lg text-blue-700 hover:bg-blue-100">
              Logout
            </a>
          </button>
        </nav>
      </aside>
      <div className="bg-blue-50">
        <span
          className="text-[#1e2939] md:hidden flex"
          onClick={() => setisOpen(!isOpen)}
        >
          <Hamburger />
        </span>
        {isOpen && (
          <aside className="w-40 md:w-64 bg-white shadow-lg border-r border-blue-200 md:hidden">
            <div className="mb-8">
              <img
                src={
                  userData
                    ? userData.profileImg
                    :token.image
                }
                alt="Profile"
                className="w-20 h-20 rounded-full mx-auto mb-3"
              />
              <p className="text-center text-blue-900 font-semibold">
                {userData ? userData.user.fullName : "user"}
              </p>
              <p className="text-center text-sm text-blue-600">
                {userData ? userData.user.Email : "user@gmailcom"}
              </p>
            </div>
            <nav className="space-y-3">
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-lg text-blue-700 hover:bg-blue-100"
              >
                Dashboard
              </Link>
              <Link
                to="/dashboard/donate"
                className="block px-3 py-2 rounded-lg text-blue-700 hover:bg-blue-100"
              >
                Donate
              </Link>
              <Link
                to="/dashboard/events"
                className="block px-3 py-2 rounded-lg text-blue-700 hover:bg-blue-100"
              >
                Events
              </Link>
              <button onClick={handleLogout}>
                <a className="block px-3 py-2 rounded-lg text-blue-700 hover:bg-blue-100">
                  Logout
                </a>
              </button>
            </nav>
          </aside>
        )}
      </div>
    </>
  );
}

export default AsideBar