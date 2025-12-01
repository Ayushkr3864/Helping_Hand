import React, { useState } from 'react'
import { NavLink, Link,useLocation } from 'react-router';
import Hamburger from 'hamburger-react';
import { Capacitor } from "@capacitor/core";

function Navbar() {
  const [Isopen, setIsopen] = useState(false)
 const isApp = Capacitor.isNativePlatform();
   if (isApp) return null;
  const location = useLocation();
  return (
    <>
      <div className=" justify-around align-middle p-5 hidden md:flex items-center shadow-[0_4px_12px_#1e2939] bg-[#1e2939] flex-row ">
        <div>
          <h1
            className="text-4xl font-bold text-green-700"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Helping Hand Foundation
          </h1>
        </div>
        <div>
          <ul
            className="flex gap-10 font-semibold text-[#d0d0d1]"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/programs">Programs</NavLink>
            </li>
            {/* <li>
              <NavLink>Get Involved</NavLink>
            </li>
            <li>
              <NavLink>Contact</NavLink>
            </li> */}
            <li>
              <NavLink>Gallery</NavLink>
            </li>
          </ul>
        </div>
        <div>
          {location.pathname !== "/register" && (
            <Link to="/register">
              <button className="bg-gradient-to-r from-blue-200 to-indigo-300 hover:from-blue-600 hover:to-indigo-700 text-black hover:text-white px-6 py-3 rounded-lg shadow-lg">
                Make a smile 😊
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="bg-[#1e2939]">
        <div
          className="md:hidden  text-[#d0d0d1]"
          onClick={() => setIsopen(!Isopen)}
        >
          <Hamburger />
        </div>
        {Isopen && (
          <div className="bg-[#1e2939]">
            <ul className="flex flex-col items-center gap-y-3 md:hidden text-2xl font-semibold text-[#d0d0d1]">
              <li onClick={() => setIsopen(false)}>
                <Link>Home</Link>
              </li>
              <li onClick={() => setIsopen(false)}>
                <Link to="/about">About</Link>
              </li>
              <li onClick={() => setIsopen(false)}>
                <Link to="/programs">Programs</Link>
              </li>
              {/* <li onClick={() => setIsopen(false)}>
                <Link>Get Involved</Link>
              </li> */}
              <li onClick={() => setIsopen(false)}>
                <Link></Link>
              </li>
            </ul>
            <div className="flex justify-center md:hidden">
              <Link to="/Register" onClick={()=>setIsopen(false)}>
                <button className="bg-gradient-to-r from-blue-200 to-indigo-300 hover:from-blue-600 hover:to-indigo-700 text-black hover:text-white px-6 py-3 mb-3 rounded-lg shadow-lg">
                  Register
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar