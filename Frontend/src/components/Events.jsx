import React, { useEffect, useState } from "react";
import AsideBar from "./AsideBar";
import { motion } from "framer-motion";
import Hamburger from "hamburger-react";
function Events() {
  const [events, setEvents] = useState([]);
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notices, setNotices] = useState([
    "Tax exemption receipts available for FY 2024–25.",
    "Urgent requirement: Medicines for flood-affected areas.",
    "Volunteers needed for disaster relief team.",
  ]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "https://helping-hand-2pny.onrender.com/events",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 401 || res.status === 403) {
          alert("Unauthorized. Please login.");
          return;
        }

        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen flex bg-teal-50">
      <div className="absolute top-10 left-4 z-50 md:hidden">
        <Hamburger
          toggled={isSidebarOpen}
          toggle={setIsSidebarOpen}
          size={22}
          color="#1e3a8a"
        />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full z-40 transition-transform duration-300
          ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
      >
        <AsideBar />
      </div>
      <main className="flex-1 p-6 mt-5 space-y-8">
        <motion.div
          id="events"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {/* Events */}
          <motion.div
            className="bg-white shadow-xl rounded-2xl p-6 border border-teal-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <motion.h2
              className="text-xl font-semibold text-teal-800 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              Upcoming Events
            </motion.h2>
            <ul className="space-y-3 text-teal-900">
              {events.length > 0 ? (
                events.map((event, index) => (
                  <motion.li
                    key={event._id || index}
                    className="p-3 bg-teal-100 rounded-lg border border-teal-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <p className="font-semibold text-teal-800">
                      {new Date(event.date).toLocaleDateString()}: {event.name}
                    </p>
                    <p className="text-teal-700 mt-1">{event.description}</p>
                  </motion.li>
                ))
              ) : (
                <li>No events available.</li>
              )}
            </ul>
          </motion.div>

          {/* Notices */}
          <motion.div
            id="notices"
            className="bg-white shadow-xl rounded-2xl p-6 border border-amber-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <motion.h2
              className="text-xl font-semibold text-amber-800 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              Notices
            </motion.h2>
            <ul className="space-y-3 text-amber-900">
              {notices.map((notice, index) => (
                <motion.li
                  key={index}
                  className="p-3 bg-amber-100 rounded-lg border border-amber-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {notice}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

export default Events;
