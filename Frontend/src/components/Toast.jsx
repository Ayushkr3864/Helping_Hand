// components/Toast.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ message, type = "success", show }) => {
  const bgColor =
    type === "success"
      ? "bg-blue-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-gray-700";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.2 }}
          className={`fixed bottom-6 right-6 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
