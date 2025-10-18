import React, { useState } from "react";
import AsideBar from "./AsideBar";
import { useAuth } from "../store/Auth";
import Toast from "./Toast";
import { motion } from "framer-motion";
import Hamburger from "hamburger-react";

function Donation() {
  const { getTokenFromLS } = useAuth();
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [toastMessage, setToastMessage] = useState("");
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      showToastMsg("error", "You must be logged in to donate.");
      return;
    }

    if (donateData.DonationType === "item") {
      // Handle item donation normally
      return handleItemDonation(token);
    } else {
      // Handle money donation with Razorpay
      return handlePayment(token);
    }
  };

  // ✅ Helper: show toast message
  const showToastMsg = (type, message) => {
    setToastType(type);
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  // ✅ Handle item donation (existing API)
  const handleItemDonation = async (token) => {
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
        showToastMsg("success", res_data.message || "Donation successful!");
        setDonateData({
          Phone: "",
          DonationType: "money",
          Amount: "",
          itemName: "",
        });
      } else {
        showToastMsg("error", res_data.message || "Donation failed ❌");
      }
    } catch (err) {
      console.error("Error submitting donation:", err);
      showToastMsg("error", "Server error ❌");
    }
  };

  // ✅ Handle money donation with Razorpay
  const handlePayment = async (token) => {
    if (!donateData.Amount || donateData.Amount <= 0) {
      return showToastMsg("error", "Please enter a valid amount.");
    }

    try {
      // Step 1: Create Razorpay order
      const orderRes = await fetch(
        "https://helping-hand-2pny.onrender.com/order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: donateData.Amount * 100, // convert to paise
            currency: "INR",
          }),
        }
      );
      const order = await orderRes.json();

      if (!order.id) {
        return showToastMsg("error", "Failed to create payment order.");
      }

      // Step 2: Open Razorpay Checkout
      const options = {
        key: "rzp_test_RV0uhX0BeN47LW", // your Razorpay test key
        amount: order.amount,
        currency: order.currency,
        name: "Helping Hand Foundation",
        description: "Donation Payment",
        order_id: order.id,
        handler: async function (response) {
          // Step 3: Verify payment
          try {
            const verifyRes = await fetch(
              `https://helping-hand-2pny.onrender.com/payment/${response.razorpay_payment_id}`
            );
            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.status === "captured") {
              showToastMsg("success", "Payment successful! ❤️");
              // Optionally call your donation save API
              await handleItemDonation(token);
              setDonateData({
                Phone: "",
                DonationType: "money",
                Amount: "",
                itemName: "",
              });
            } else {
              showToastMsg("error", "Payment verification failed ❌");
            }
          } catch (err) {
            console.error("Payment verify error:", err);
            showToastMsg("error", "Payment verification error ❌");
          }
        },
        prefill: {
          contact: donateData.Phone,
        },
        theme: { color: "#2563eb" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      showToastMsg("error", "Payment process failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex bg-blue-50">
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
      <main className="flex-1 p-6 space-y-8 mt-5">
        <motion.div
          className="bg-white shadow-lg rounded-2xl p-6 border border-blue-200 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-blue-800 mb-4">
            Make a Donation
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
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
              {donateData.DonationType === "money" ? "Donate & Pay" : "Donate"}
            </button>
          </form>
        </motion.div>

        <Toast message={toastMessage} type={toastType} show={showToast} />
      </main>
    </div>
  );
}

export default Donation;
