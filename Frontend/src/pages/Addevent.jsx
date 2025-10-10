import React, { useState } from "react";
import Adminsidebar from "../components/Adminsidebar";
import { Card, CardContent } from "../components/Card";

function AddEvent() {
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleFileChange = (e) => {
    setEventData({ ...eventData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, just log the data
    console.log(eventData);

    // TODO: Send data to backend API with FormData if image included
    const formData = new FormData();
    formData.append("name", eventData.name);
    formData.append("date", eventData.date);
    formData.append("description", eventData.description);
    if (eventData.image) {
      formData.append("image", eventData.image);
    }

    // Reset form
    setEventData({ name: "", date: "", description: "", image: null });
  };

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

              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="border p-2 rounded"
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
    </div>
  );
}

export default AddEvent;
