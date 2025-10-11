import { stringify } from "postcss";
import React, { useState } from "react";
import { useAuth } from "../store/Auth";
import Toast from "../components/Toast";
import { Navigate } from "react-router";

export default function Register() {
   const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState("success");
    const [toastMessage, setToastMessage] = useState("");
  const [formData, setformData] = useState({
    fullName: "",
    Phone: "",
    Email: "",
    Age: "",
    Address: "",
    Availability: "",
    Interest: "",
    password: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form data", formData);

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    // Append file if selected
    if (file) form.append("profileImg", file);

    const response = await fetch(`http://localhost:3000/api/register`, {
      method: "POST",
      // headers: {
      //   "content-type":"application/json",
      // },
      body: form,
    });
    console.log("response data", response);

    const res = await response.json();
    
    

    console.log(res);
    if (response.ok) {
      setShowToast(true)
      setToastType("success")
      setToastMessage(res.message || "user register successfully")
      console.log("Toast triggered:", toastType, toastMessage);

      setTimeout(() => {
        setShowToast(false)
      }, 4000);
      setformData({
        fullName: "",
        Phone: "",
        Email: "",
        Age: "",
        Address: "",
        Availability: "",
        Interest: "",
        password: "",
      });
      <Navigate to="/login" />
      console.log(res);
    }
    else {
      setShowToast(true);
      setToastMessage(res.message || "error in registration ❌")
      console.log("Toast triggered:", toastType, toastMessage);

      setToastType("error")
         setTimeout(() => {
           setShowToast(false);
         }, 4000);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Frame */}
      <div className="w-1/2 hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 text-blue-900 p-12">
        <h1 className="text-4xl font-extrabold mb-6">
          Helping Hand Foundation
        </h1>
        <p className="text-lg text-blue-800 mb-8 text-center max-w-md">
          Join us in spreading kindness, supporting communities, and making the
          world a better place 💙
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4228/4228706.png"
          alt="Helping Hand"
          className="w-64 h-64 drop-shadow-xl"
        />
      </div>

      {/* Right Frame - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-blue-50">
        <Toast message={toastMessage} type={toastType} show={showToast} />
        <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md border border-blue-200">
          <h2 className="text-center text-3xl font-bold text-blue-900 mb-6">
            Create Account
          </h2>
          <p className="text-center text-blue-600 text-sm mb-8">
            Together, we can make a difference 🌍
          </p>

          <form
            className="space-y-5"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Age */}
            <input
              type="number"
              placeholder="Age"
              name="Age"
              value={formData.Age}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Phone */}
            <input
              type="text"
              placeholder="Mobile Number"
              name="Phone"
              value={formData.Phone}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Address */}
            <textarea
              placeholder="Location/Address"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Interest */}
            <select
              name="Interest"
              value={formData.Interest}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Interest</option>
              <option value="Teaching">Teaching</option>
              <option value="Food Distribution">Food Distribution</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Environment">Environment</option>
            </select>

            {/* Availability */}
            <select
              name="Availability"
              value={formData.Availability}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Availability</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-400 hover:to-blue-500 transition-transform transform hover:scale-105 shadow-md"
            >
              Register
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-blue-700 mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
