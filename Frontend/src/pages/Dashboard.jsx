import React, { useEffect, useState } from "react";
import { useAuth } from "../store/Auth";
import { useNavigate } from "react-router-dom";
import AsideBar from "../components/AsideBar";
import { motion } from "framer-motion";
import Hamburger from "hamburger-react";

export default function VendorDashboard() {
  const { userInfo, DonationInfo } = useAuth();
  const [userData, setuserData] = useState(null);
  const [donationData, setdonationData] = useState(null);
  const [donations, setdonations] = useState([]);
  const [lastdonated, setlastdonated] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await userInfo();
      setuserData(data.user);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const donation = await DonationInfo();
      setdonationData(donation.summary);
      setdonations(donation.summary.donations || []);
      setlastdonated(donation.lastDonated);
    })();
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
      {/* Mobile Hamburger */}
      <div className="fixed top-5 left-4 z-50 md:hidden">
        <Hamburger
          toggled={isSidebarOpen}
          toggle={setIsSidebarOpen}
          size={22}
          color="#312e81"
        />
      </div>

      {/* Sidebar */}
      <motion.div
        className={`fixed md:static top-0 left-0 h-full z-40 bg-white shadow-xl`}
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen || window.innerWidth >= 768 ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        <AsideBar />
      </motion.div>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-extrabold text-indigo-900">
            Welcome back, {userData?.name || "User"} 👋
          </h1>
          <p className="text-indigo-600 mt-1">
            Here’s a snapshot of your donations
          </p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="backdrop-blur-xl bg-white/70 rounded-3xl p-6 shadow-xl border border-white"
          >
            <h3 className="text-sm text-gray-500">Total Donations</h3>
            <p className="text-4xl font-bold text-green-600 mt-2">
              {donationData ? donationData.donations.length : 0}
            </p>
          </motion.div>

          {/* Card */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="backdrop-blur-xl bg-gradient-to-br from-pink-400 to-purple-500 text-white rounded-3xl p-6 shadow-xl"
          >
            <h3 className="text-sm opacity-90">Last Donation</h3>
            <p className="text-xl font-bold mt-2">
              {lastdonated
                ? new Date(lastdonated.donatedAt).toLocaleDateString()
                : "No donation yet"}
            </p>
          </motion.div>
        </div>

        {/* Donation History */}
        <motion.div
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold text-indigo-800 mb-6">
            Donation History
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-indigo-700 border-b">
                <tr>
                  <th className="py-3">Date</th>
                  <th>Type</th>
                  <th>Details</th>
                  <th>Value</th>
                </tr>
              </thead>

              <tbody>
                {donations.map((donation, index) => (
                  <motion.tr
                    key={donation._id || index}
                    className="border-b hover:bg-indigo-50 cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <td className="py-3">
                      {new Date(donation.createdAt).toLocaleDateString()}
                    </td>
                    <td className="capitalize">{donation.DonationType}</td>
                    <td>N/A</td>
                    <td className="font-semibold">
                      {donation.DonationType === "money"
                        ? `₹${donation.Amount}`
                        : donation.Amount}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
