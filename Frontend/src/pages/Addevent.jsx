import React, { useState } from "react";
import Adminsidebar from "../components/Adminsidebar";
import { Card, CardContent } from "../components/Card";
import Toast from "../components/Toast";

function AddEvent() {
   const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState("success");
    const [toastMessage, setToastMessage] = useState("");
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken")
    const response = await fetch(
      `https://helping-hand-2pny.onrender.com/add/events`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      }
    );
    const res = await response.json();
    console.log(res);
    console.log(response);
    
    
    if (response.ok) {
      setShowToast(true);
      setToastType("success");
      setToastMessage(res.message || "event add successfully");
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
      setEventData({ name: "", date: "", description: "" });
    } else {
      setShowToast(true);
      setToastMessage(res.message || "error in adding event ❌");

      setToastType("error");
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  }

  return (
    <div className="flex min-h-screen">
      <Adminsidebar />

      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Add New Event</h1>

        <Card className="max-w-2xl mx-auto p-6">
          <CardContent>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={eventData.name}
                onChange={handleChange}
                placeholder="Event Name"
                className="border p-2 rounded"
                required
              />

              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />

              <textarea
                name="description"
                value={eventData.description}
                onChange={handleChange}
                placeholder="Event Venue"
                className="border p-2 rounded h-24"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Event
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Toast message={toastMessage} type={toastType} show={showToast} />
    </div>
  );
}

export default AddEvent;
