import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  HandHeart,
  HeartHandshake,
  ImagePlus,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../store/Auth";
import Toast from "../components/Toast";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const floatingCardTransition = {
  duration: 7,
  repeat: Infinity,
  repeatType: "reverse",
  ease: "easeInOut",
};

export default function Register() {
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [toastMessage, setToastMessage] = useState(" ");
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();
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

  const handleGoogleLogin = async (credentialResponse) => {
    const token = credentialResponse.credential;
    try {
      const response = await fetch(
        "https://helping-hand-2pny.onrender.com/api/auth/google",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        storeTokenInLS(data.token);
        localStorage.setItem("image", data.user.profileImg);
        navigate("/dashboard");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    if (file) form.append("profileImg", file);

    const response = await fetch(
      `https://helping-hand-2pny.onrender.com/api/register`,
      {
        method: "POST",
        body: form,
      }
    );

    const res = await response.json();
    if (response.ok) {
      setShowToast(true);
      setToastType("success");
      setToastMessage(res.message || "User registered successfully");
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
      setTimeout(() => navigate("/login"), 3000);
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
      setFile(null);
    } else {
      setShowToast(true);
      setToastMessage(res.message || "Error in registration");
      setToastType("error");
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(13,148,136,0.15),_transparent_30%),linear-gradient(135deg,#07131d_0%,#0d1821_42%,#e9f3f5_42%,#f8fbfb_100%)]">
      <Toast message={toastMessage} type={toastType} show={showToast} />

      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <motion.section
          className="relative hidden overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/75 p-8 text-white shadow-[0_30px_80px_rgba(2,12,18,0.35)] backdrop-blur md:block"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(52,211,153,0.16),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(56,189,248,0.18),_transparent_30%)]" />
          <motion.div
            className="absolute right-10 top-12 h-28 w-28 rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-md"
            animate={{ y: [-8, 8], rotate: [-5, 5], rotateY: [6, -6] }}
            transition={floatingCardTransition}
          />
          <motion.div
            className="absolute bottom-16 left-8 h-24 w-24 rounded-[1.75rem] border border-emerald-200/15 bg-emerald-300/10 backdrop-blur-md"
            animate={{ y: [10, -10], rotate: [6, -4], rotateX: [3, -3] }}
            transition={{ ...floatingCardTransition, duration: 8.5 }}
          />

          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-white/6 px-4 py-2 text-sm text-emerald-200">
                <Sparkles className="h-4 w-4" />
                Volunteer registration
              </div>

              <h1 className="mt-6 max-w-md text-4xl font-black leading-tight">
                Join the people behind meaningful community work.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">
                Register to support Helping Hand Foundation through teaching,
                food distribution, healthcare drives, and neighborhood action.
              </p>
            </div>

            <div className="mt-10 grid gap-4">
              <motion.div
                className="rounded-[1.6rem] border border-white/10 bg-white/8 p-5 backdrop-blur-md"
                whileHover={{ rotateX: 2, rotateY: -4, y: -4 }}
                transition={{ duration: 0.25 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-emerald-300/12 p-3 text-emerald-300">
                    <HandHeart className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      Work that feels personal
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Choose the kind of contribution that fits your strengths
                      and availability.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="rounded-[1.6rem] border border-white/10 bg-white/8 p-5 backdrop-blur-md"
                whileHover={{ rotateX: -2, rotateY: 4, y: -4 }}
                transition={{ duration: 0.25 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-sky-300/12 p-3 text-sky-300">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      A simple onboarding flow
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Fill in your details, add a profile image if you want,
                      and get started without friction.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mt-8 rounded-[1.8rem] border border-white/10 bg-slate-900/70 p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-amber-300/10 p-3 text-amber-200">
                  <HeartHandshake className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-emerald-200/75">
                    Community first
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    The strongest volunteer experiences usually begin with
                    clarity, warmth, and a shared sense of purpose.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="relative"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
        >
          <motion.div
            className="absolute inset-x-8 top-6 -z-10 hidden h-full rounded-[2.2rem] bg-slate-950/10 blur-2xl sm:block"
            animate={{ y: [-4, 10] }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />

          <div className="rounded-[2rem] border border-slate-200/70 bg-white/88 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-teal-700/80">
                  Create account
                </p>
                <h2 className="mt-3 text-3xl font-black text-slate-900">
                  Start your journey with us
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-6 text-slate-600">
                  Register as a volunteer or supporter and become part of a
                  team working on practical community change.
                </p>
              </div>
              <div className="hidden rounded-2xl bg-slate-900 p-3 text-emerald-300 sm:block">
                <HandHeart className="h-6 w-6" />
              </div>
            </div>

            <form
              className="space-y-5"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Full name
                  </span>
                  <input
                    type="text"
                    placeholder="Your name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Age
                  </span>
                  <input
                    type="number"
                    placeholder="Your age"
                    name="Age"
                    value={formData.Age}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                    required
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Email
                  </span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Mobile number
                  </span>
                  <input
                    type="text"
                    placeholder="Phone number"
                    name="Phone"
                    value={formData.Phone}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                    required
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Interest
                  </span>
                  <select
                    name="Interest"
                    value={formData.Interest}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                    required
                  >
                    <option value="">Select interest</option>
                    <option value="Teaching">Teaching</option>
                    <option value="Food Distribution">Food Distribution</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Environment">Environment</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Availability
                  </span>
                  <select
                    name="Availability"
                    value={formData.Availability}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                    required
                  >
                    <option value="">Select availability</option>
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Profile image
                </span>
                <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-4 transition hover:border-teal-400 hover:bg-white">
                  <div className="mb-3 flex items-center gap-3 text-slate-700">
                    <div className="rounded-2xl bg-teal-100 p-3 text-teal-700">
                      <ImagePlus className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Upload a photo</p>
                      <p className="text-sm text-slate-500">
                        Optional, but helpful for your profile.
                      </p>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </span>
                <input
                  type="password"
                  placeholder="Create a password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Address
                </span>
                <textarea
                  placeholder="Location or address"
                  name="Address"
                  value={formData.Address}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                  required
                />
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 font-semibold text-white transition hover:bg-slate-800"
              >
                Create Account
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                Or continue with
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => console.log("login error")}
              />
            </div>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-teal-700 transition hover:text-teal-600"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
