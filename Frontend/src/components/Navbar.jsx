import React, { useState } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router";
import Hamburger from "hamburger-react";
import { Capacitor } from "@capacitor/core";
import { motion, AnimatePresence } from "framer-motion";
import { HandHeart, LayoutDashboard, LogIn, LogOut, UserPlus } from "lucide-react";
import { useAuth } from "../store/Auth";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Programs", to: "/programs" },
  { label: "NGOs", to: "/ngos" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isApp = Capacitor.isNativePlatform();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, removeTokenFromLS } = useAuth();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  if (isApp) return null;

  const handleLogout = () => {
    removeTokenFromLS();
    setIsOpen(false);
    navigate("/");
  };

  const linkClassName = ({ isActive }) =>
    `transition-colors ${
      isActive ? "text-emerald-300" : "text-slate-200 hover:text-emerald-200"
    }`;

  return (
    <>
      <div className="sticky top-0 z-50 hidden border-b border-emerald-200/15 bg-slate-950/90 backdrop-blur md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-300/20">
              <HandHeart className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/80">
                Helping Hand
              </p>
              <h1 className="text-xl font-bold text-white">
                Foundation
              </h1>
            </div>
          </Link>

          <ul className="flex items-center gap-8 text-sm font-semibold">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={linkClassName}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                {!isDashboardRoute && (
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-emerald-200/50 hover:bg-white/10"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                {location.pathname !== "/login" && (
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-emerald-200/50 hover:bg-white/10"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Link>
                )}
                {location.pathname !== "/register" && (
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
                  >
                    <UserPlus className="h-4 w-4" />
                    Join Us
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-50 border-b border-emerald-200/15 bg-slate-950/95 backdrop-blur md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-300/20">
              <HandHeart className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-300/80">
                Helping Hand
              </p>
              <p className="text-sm font-bold text-white">Foundation</p>
            </div>
          </Link>
          <Hamburger toggled={isOpen} toggle={setIsOpen} color="#a7f3d0" size={20} />
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="border-t border-white/10 bg-slate-950 px-4 pb-5"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ul className="flex flex-col gap-3 py-4 text-base font-semibold">
                {navItems.map((item) => (
                  <li key={item.to} onClick={() => setIsOpen(false)}>
                    <NavLink to={item.to} className={linkClassName}>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3">
                {isLoggedIn ? (
                  <>
                    {!isDashboardRoute && (
                      <Link
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-300/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    {location.pathname !== "/login" && (
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-300/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white"
                      >
                        <LogIn className="h-4 w-4" />
                        Login
                      </Link>
                    )}
                    {location.pathname !== "/register" && (
                      <Link
                        to="/register"
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950"
                      >
                        <UserPlus className="h-4 w-4" />
                        Join Us
                      </Link>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Navbar;
