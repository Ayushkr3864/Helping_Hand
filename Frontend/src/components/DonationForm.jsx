import React, { useState } from "react";
import AsideBar from "./AsideBar";
import { useAuth } from "../store/Auth";
import Toast from "./Toast"; // import the new component
import {motion} from "framer-motion"

function Donation() {
  const { getTokenFromLS } = useAuth();
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [toastMessage, setToastMessage] = useState("");

  const [donateData, setDonateData] = useState({
    Phone: "",
    DonationType: "money",
    Amount: "",
    itemName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonateData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getTokenFromLS();
    if (!token) {
      setToastType("error");
      setToastMessage("You must be logged in to donate.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
      return;
    }

    try {
      const res = await fetch("https://helping-hand-2pny.onrender.com/Donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(donateData),
      });

      const res_data = await res.json();

      if (res.ok) {
        setToastType("success");
        setToastMessage(res_data.message || "Donation successful!");
        setDonateData({
          Phone: "",
          DonationType: "money",
          Amount: "",
          itemName: "",
        });
      } else {
        setToastType("error");
        setToastMessage(res_data.message || "Donation failed ❌");
      }

      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    } catch (err) {
      console.error("Error submitting donation:", err);
      setToastType("error");
      setToastMessage("Server error ❌");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    }
  };

  return (
    <div className="min-h-screen flex bg-blue-50">
      <AsideBar />
      <main className="flex-1 p-6 space-y-8">
        <motion.div className="bg-white shadow-lg rounded-2xl p-6 border border-blue-200 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{delay:0.2,duration:0.4}}
        >
          <h2 className="text-xl font-semibold text-blue-800 mb-4">
            Make a Donation
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Contact Number */}
            <div>
              <label className="block text-blue-700 font-medium mb-1">
                Contact Number
              </label>
              <input
                name="Phone"
                value={donateData.Phone}
                onChange={handleChange}
                type="tel"
                placeholder="Enter your contact number"
                className="w-full p-3 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Donation Type */}
            <div>
              <label className="block text-blue-700 font-medium mb-1">
                Donation Type
              </label>
              <select
                className="w-full p-3 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
                name="DonationType"
                value={donateData.DonationType}
                onChange={handleChange}
              >
                <option value="money">Money</option>
                <option value="item">Item</option>
              </select>
            </div>

            {/* Conditional Fields */}
            {donateData.DonationType === "money" && (
              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  name="Amount"
                  value={donateData.Amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  className="w-full p-3 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            )}

            {donateData.DonationType === "item" && (
              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  name="itemName"
                  value={donateData.itemName}
                  onChange={handleChange}
                  placeholder="Enter item name"
                  className="w-full p-3 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-400 hover:to-blue-500 transition-transform transform hover:scale-105 shadow-md"
            >
              Donate
            </button>
          </form>
        </motion.div>

        {/* Toast Notification */}
        <Toast message={toastMessage} type={toastType} show={showToast} />
      </main>
    </div>
  );
}

export default Donation;
