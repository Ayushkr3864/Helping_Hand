import React, { useEffect, useState } from "react";
import Adminsidebar from "../components/Adminsidebar";
import { Card, CardContent } from "../components/Card";

// Dummy donation data
const dummyDonations = [
  {
    id: 1,
    donor: "Ayush Kumar",
    type: "Money",
    amount: 2000,
    date: "2025-10-01",
  },
  { id: 2, donor: "Riya Sharma", type: "Food", amount: 5, date: "2025-10-03" },
  {
    id: 3,
    donor: "Rahul Singh",
    type: "Clothes",
    amount: 10,
    date: "2025-10-05",
  },
  {
    id: 4,
    donor: "Anjali Mehta",
    type: "Money",
    amount: 1500,
    date: "2025-10-06",
  },
];

function AllDonations() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    // Replace with API call later
    setDonations(dummyDonations);
  }, []);

  return (
    <div className="flex min-h-screen">
      <Adminsidebar />

      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">All Donations</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {donations.map((donation) => (
            <Card
              key={donation.id}
              className="p-4 h-40 flex flex-col justify-between"
            >
              <CardContent>
                <h2 className="font-semibold">{donation.donor}</h2>
                <p className="text-sm text-gray-600">{donation.type}</p>
                <p className="text-lg font-bold">
                  {donation.type === "Money"
                    ? `₹ ${donation.amount}`
                    : donation.amount}
                </p>
                <p className="text-xs text-gray-500">{donation.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllDonations;
