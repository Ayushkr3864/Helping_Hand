import React, { useState } from "react";
import { useAuth } from "../store/Auth";
import { useNavigate } from "react-router";
import Toast from "../components/Toast";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [showToast, setShowToast] = useState(false);
     const [toastType, setToastType] = useState("success");
     const [toastMessage, setToastMessage] = useState(" ");
  const { storeTokenInLS } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Email: "",
    password: "",
  });
  // google login function 
  const handleGoogleLogin = async (credentialResponse) => {
    const token = credentialResponse.credential;
    try {
       const response = await fetch("http://localhost:3000/api/auth/google", {
         method: "post",
         headers: { "Content-Type": "application/json" },
         body:JSON.stringify({token})
       });
      
      let data = await response.json(); // parse JSON from response
      
      if (response.ok) {
        storeTokenInLS(data.token); // save JWT in localStorage
       localStorage.setItem("image",data.user.pro)
        console.log("Logged in user:", data.message);
        navigate("/dashboard")
      }
      
    } catch (e) {
     console.log(data.error);
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/Login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const res_data = await response.json();

      if (response.ok) {
         setShowToast(true);
         setToastMessage(res_data.message || "login successful");
         setToastType("success");
         setTimeout(() => {
           setShowToast(false);
         }, 1000);
         console.log("Toast triggered:", toastType, toastMessage);
        if (response.status == 200) {
          storeTokenInLS(res_data.token);
         setTimeout(() => {
           navigate("/dashboard", { replace: true });
         }, 1000);
        }
        setFormData({ Email: "", password: "" });
      } else {
        setToastMessage(res_data.message || "Login failed ❌");
        setToastType("error")
        setShowToast(true)
        setTimeout(() => {
          setShowToast(false)
        }, 1000);
      }
    } catch (e) {
      console.log("error from token", e.message);
    }
  };

  return (
    <>
      <div className="min-h-screen flex">
        {/* Left Frame */}
        <div className="w-1/2 hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 text-blue-900 p-12">
          <h1 className="text-4xl font-extrabold mb-6">
            Helping Hand Foundation
          </h1>
          <p className="text-lg text-blue-800 mb-8 text-center max-w-md">
            Welcome back! Log in to continue spreading kindness 💙
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
              Login
            </h2>
            <p className="text-center text-blue-600 text-sm mb-8">
              Let’s continue making a difference 🌍
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Email */}
              <input
                type="Email"
                placeholder="Email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              {/* Password */}
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-400 hover:to-blue-500 transition-transform transform hover:scale-105 shadow-md"
              >
                Login
              </button>
            </form>
            <div className="mt-2">
              {" "}
              <GoogleLogin onSuccess={handleGoogleLogin} onError={()=>console.log("login error")
              } />
            </div>
            {/* Footer */}
            <p className="text-center text-sm text-blue-700 mt-6">
              Don’t have an account?{" "}
              <a
                href="/register"
                className="text-blue-600 font-semibold hover:underline"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
