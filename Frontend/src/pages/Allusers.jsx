import React, { useEffect, useState } from "react";
import Adminsidebar from "../components/Adminsidebar";
import { Card, CardContent } from "../components/Card";

// Dummy data for now
const dummyUsers = [
  { id: 1, name: "Ayush Kumar", email: "ayush@example.com", role: "Donor" },
  { id: 2, name: "Riya Sharma", email: "riya@example.com", role: "Volunteer" },
  { id: 3, name: "Rahul Singh", email: "rahul@example.com", role: "Donor" },
  {
    id: 4,
    name: "Anjali Mehta",
    email: "anjali@example.com",
    role: "Recipient",
  },
  {
    id: 5,
    name: "Vikram Joshi",
    email: "vikram@example.com",
    role: "Volunteer",
  },
  // Add more dummy users
];

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // For now, using dummy data. Later fetch from backend API
    setUsers(dummyUsers);
  }, []);

  return (
    <div className="flex min-h-screen">
      <Adminsidebar />

      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">All Users</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <Card
              key={user.id}
              className="flex flex-col items-center justify-center text-center p-4 h-40"
            >
              <CardContent>
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
                <span className="mt-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {user.role}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Users;
