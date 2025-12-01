import React from "react";
import { NavLink } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import { AiFillHome } from "react-icons/ai";
import { FaInfoCircle } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { FaImages } from "react-icons/fa";

export default function MobileNavbar() {
  const isApp = Capacitor.isNativePlatform();

  if (!isApp) return null; // hide on website

  const menu = [
    { name: "Home", path: "/", icon: <AiFillHome size={22} /> },
    { name: "About", path: "/about", icon: <FaInfoCircle size={22} /> },
    { name: "Programs", path: "/programs", icon: <MdCategory size={22} /> },
    { name: "Dasboard", path: "/dashboard", icon: <FaImages size={22} /> },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "65px",
        background: "#ffffff",
        borderTop: "1px solid #e6e6e6",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 9999,
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      {menu.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          style={({ isActive }) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textDecoration: "none",
            color: isActive ? "#5a5af7" : "#444",
            fontWeight: isActive ? "700" : "500",
            transition: "0.3s",
          })}
        >
          {item.icon}
          <span style={{ fontSize: "12px", marginTop: "2px" }}>
            {item.name}
          </span>
        </NavLink>
      ))}
    </div>
  );
}
