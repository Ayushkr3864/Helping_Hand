import React, { useEffect, useState } from "react";
import { useAuth } from "../store/Auth";
import { useNavigate } from "react-router-dom";
import AsideBar from "../components/AsideBar";
export default function VendorDashboard() {
  const { removeTokenFromLS, userInfo, getTokenFromLS, DonationInfo } =
    useAuth();
  const [userData, setuserData] = useState(null);
  const [donationData, setdonationData] = useState(null);
  const [donations, setdonations] = useState([]);
  const [lastdonated, setlastdonated] = useState(null);
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
    <div className="min-h-screen flex bg-blue-50">
      {/* Sidebar */}
      <AsideBar />
      {/* Main Content */}
      <main className="flex-1 p-6 space-y-8">
        {/* Dashboard Title */}
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          User Dashboard
        </h1>

        {/* Donation Summary */}
        <div
          id="dashboard"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-2xl shadow-lg p-6 text-center">
            <h3 className="text-lg font-semibold">Items Donated</h3>
            <p className="text-3xl font-bold mt-2">
              {donationData
                ? donationData.donations.length
                : "no item donated yet"}
            </p>
          </div>
          <div className="bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-2xl shadow-lg p-6 text-center">
            <h3 className="text-lg font-semibold">Last Donation</h3>
            <p className="text-xl font-bold mt-2">
              {lastdonated
                ? new Date(lastdonated.donatedAt).toLocaleDateString()
                : "nothing donated yet"}
            </p>
          </div>
        </div>

        {/* Donation Form */}

        {/* Donation History Table */}
        <div className="bg-white shadow-lg rounded-2xl md:p-6 border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">
            Donation History
          </h2>
          <table className="w-full border border-blue-200 rounded-lg text-center">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className=" text-center">Date</th>
                <th className=" text-center">Type</th>
                <th className=" text-center">Details</th>
                <th className=" text-center">Value</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr
                  key={donation._id || index}
                  className="border-t border-blue-200"
                >
                  <td className="">
                    {new Date(donation.createdAt).toLocaleDateString()}
                  </td>
                  <td className="">{donation.DonationType}</td>
                  <td className="p-3">N/A</td>
                  <td className="">
                    {donation.DonationType == "money"
                      ? `₹${donation.Amount}`
                      : donation.Amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notices & Events */}
      </main>
    </div>
  );
}
