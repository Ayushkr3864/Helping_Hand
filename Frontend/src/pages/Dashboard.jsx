import React, { useEffect, useState } from "react";
import { useAuth } from "../store/Auth";
import { useNavigate } from "react-router-dom";
import AsideBar from "../components/AsideBar";
import { motion } from "framer-motion";
import Hamburger from "hamburger-react";

export default function VendorDashboard() {
  const { removeTokenFromLS, userInfo, getTokenFromLS, DonationInfo } =
    useAuth();
  const [userData, setuserData] = useState(null);
  const [donationData, setdonationData] = useState(null);
  const [donations, setdonations] = useState([]);
  const [lastdonated, setlastdonated] = useState(null);
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const FetchUser = async () => {
      let userData = await userInfo();
      setuserData(userData.user);
    };
    FetchUser();
  }, []);

  useEffect(() => {
    const fetchDonation = async () => {
      let donation = await DonationInfo();
      setdonationData(donation.summary);
      setdonations(donation.summary.donations || []);
      setlastdonated(donation.lastDonated);
    };
    fetchDonation();
  }, []);

  return (
    <>
      <div className=" min-h-screen flex   bg-blue-50">
        {/* Sidebar */}
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

       
        {/* Main Content */}
        <main className="flex-1 p-6 space-y-8">
          {/* Dashboard Title */}

          <motion.h1
            className="text-3xl font-bold text-blue-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            User Dashboard
          </motion.h1>

          {/* Donation Summary */}
          <motion.div
            id="dashboard"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            <motion.div
              className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-2xl shadow-lg p-6 text-center"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h3 className="text-lg font-semibold">Items Donated</h3>
              <p className="text-3xl font-bold mt-2">
                {donationData
                  ? donationData.donations.length
                  : "no item donated yet"}
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-2xl shadow-lg p-6 text-center"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h3 className="text-lg font-semibold">Last Donation</h3>
              <p className="text-xl font-bold mt-2">
                {lastdonated
                  ? new Date(lastdonated.donatedAt).toLocaleDateString()
                  : "nothing donated yet"}
              </p>
            </motion.div>
          </motion.div>

          {/* Donation History Table */}
          <motion.div
            className="bg-white shadow-lg rounded-2xl md:p-6 border border-blue-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              Donation History
            </h2>
            <table className="w-full border border-blue-200 rounded-lg text-center">
              <thead className="bg-blue-100 text-blue-800">
                <tr>
                  <th className="text-center">Date</th>
                  <th className="text-center">Type</th>
                  <th className="text-center">Details</th>
                  <th className="text-center">Value</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation, index) => (
                  <motion.tr
                    key={donation._id || index}
                    className="border-t border-blue-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
                    <td>{donation.DonationType}</td>
                    <td className="p-3">N/A</td>
                    <td>
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
    </>
  );
}