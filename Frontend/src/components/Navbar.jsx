import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router";
import Hamburger from "hamburger-react";
import { Capacitor } from "@capacitor/core";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [Isopen, setIsopen] = useState(false);
  const isApp = Capacitor.isNativePlatform();
  if (isApp) return null;

  const location = useLocation();

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <div className="justify-around align-middle p-5 hidden md:flex items-center shadow-[0_4px_12px_#1e2939] bg-[#1e2939] flex-row">
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

      {/* MOBILE NAVBAR */}
      <div className="bg-[#1e2939] md:hidden">
        <div className="text-[#d0d0d1]" >
          <Hamburger toggled={Isopen} toggle={setIsopen} />
        </div>

        <AnimatePresence>
          {Isopen && (
            <motion.div
              className="bg-[#1e2939] overflow-hidden"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 18,
              }}
            >
              <ul className="flex flex-col items-center gap-y-4 text-2xl font-semibold text-[#d0d0d1]">
                <li onClick={() => setIsopen(false)}>
                  <Link to="/">Home</Link>
                </li>
                <li onClick={() => setIsopen(false)}>
                  <Link to="/about">About</Link>
                </li>
                <li onClick={() => setIsopen(false)}>
                  <Link to="/programs">Programs</Link>
                </li>
                <li onClick={() => setIsopen(false)}>
                  <Link>Gallery</Link>
                </li>
              </ul>

              <div className="flex justify-center py-6">
                <Link to="/register" onClick={() => setIsopen(false)}>
                  <button className="bg-gradient-to-r from-blue-200 to-indigo-300 hover:from-blue-600 hover:to-indigo-700 text-black hover:text-white px-6 py-3 rounded-lg shadow-lg">
                    Register
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Navbar;
