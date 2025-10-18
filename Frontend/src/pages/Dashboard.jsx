import React, { useEffect, useState } from "react";
import { useAuth } from "../store/Auth";
import { useNavigate } from "react-router-dom";
import AsideBar from "../components/AsideBar";
import { motion } from "framer-motion";
import Hamburger from "hamburger-react";

export default function VendorDashboard() {
  const { userInfo, DonationInfo } = useAuth();
  const [userData, setUserData] = useState(null);
  const [donationData, setDonationData] = useState(null);
  const [donations, setDonations] = useState([]);
  const [lastDonated, setLastDonated] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await userInfo();
      setUserData(user.user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchDonation = async () => {
      const donation = await DonationInfo();
      setDonationData(donation.summary);
      setDonations(donation.summary.donations || []);
      setLastDonated(donation.lastDonated);
    };
    fetchDonation();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100 relative">
      {/* Mobile Hamburger */}
      <div className="absolute top-4 left-4 z-50 md:hidden">
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

      {/* Main content */}
      <main className="flex-1 p-6 space-y-8">
        {/* Dashboard Title */}
        <motion.h1
          className="text-3xl font-bold text-indigo-900 mb-6 mt-10 md:mt-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          User Dashboard
        </motion.h1>

        {/* Donation Summary */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.div
            className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="text-lg font-semibold">Items Donated</h3>
            <p className="text-3xl font-bold mt-2">
              {donationData ? donationData.donations.length : "0"}
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="text-lg font-semibold">Last Donation</h3>
            <p className="text-xl font-bold mt-2">
              {lastDonated
                ? new Date(lastDonated.donatedAt).toLocaleDateString()
                : "None"}
            </p>
          </motion.div>
        </motion.div>

        {/* Donation History Table */}
        <motion.div
          className="bg-white shadow-lg rounded-2xl md:p-6 border border-gray-200 overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold text-indigo-800 mb-4">
            Donation History
          </h2>
          <table className="w-full min-w-[600px] border border-gray-200 rounded-lg text-center">
            <thead className="bg-indigo-100 text-indigo-800">
              <tr>
                <th className="py-2">Date</th>
                <th className="py-2">Type</th>
                <th className="py-2">Details</th>
                <th className="py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <motion.tr
                  key={donation._id || index}
                  className="border-t border-gray-200 hover:bg-indigo-50 transition-colors duration-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="py-2">
                    {new Date(donation.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2">{donation.DonationType}</td>
                  <td className="py-2">N/A</td>
                  <td className="py-2">
                    {donation.DonationType === "money"
                      ? `₹${donation.Amount}`
                      : donation.Amount}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </main>
    </div>
  );
}
