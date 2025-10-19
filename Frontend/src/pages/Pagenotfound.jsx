import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-100 to-pink-100 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/30 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-md text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="text-6xl mb-4"
        >
          😔
        </motion.div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          We couldn’t find what you were looking for.
          <br />
          Let’s get you back on track.
        </p>
        <Link
          to="/"
          className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-5 rounded-lg transition duration-300"
        >
          Return Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
