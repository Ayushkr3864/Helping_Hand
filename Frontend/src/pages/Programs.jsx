import React, { useEffect, useState } from "react";
function Programs() {
  const [events, setEvents] = useState([]);
  const [notices, setNotices] = useState([
    "Tax exemption receipts available for FY 2024–25.",
    "Urgent requirement: Medicines for flood-affected areas.",
    "Volunteers needed for disaster relief team.",
  ]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
    <div className="min-h-screen flex bg-blue-50">
      <main className="flex-1 p-6 space-y-8">
        <div id="events" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Events */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-blue-200">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              Upcoming Events
            </h2>
            <ul className="space-y-3 text-blue-900">
              {events.length > 0 ? (
                events.map((event) => (
                  <li
                    key={event._id}
                    className="p-3 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <p className="font-semibold text-blue-800">
                      {new Date(event.date).toLocaleDateString()}: {event.name}
                    </p>
                    <h1 className="text-blue-700 text-2xl mt-1">{event.description}</h1>
                  </li>
                ))
              ) : (
                <li>No events available.</li>
              )}
            </ul>
          </div>

          {/* Notices */}
          <div
            id="notices"
            className="bg-white shadow-lg rounded-2xl p-6 border border-blue-200"
          >
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              Notices
            </h2>
            <ul className="space-y-3 text-blue-900">
              {notices.map((notice, index) => (
                <li
                  key={index}
                  className="p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                >
                  {notice}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Programs;
