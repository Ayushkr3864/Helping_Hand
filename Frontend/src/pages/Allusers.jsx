import React, { useEffect, useState } from "react";
import Adminsidebar from "../components/Adminsidebar";
import { Card, CardContent } from "../components/Card";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("adminToken"); // if you're using JWT auth

        const res = await fetch(
          "https://helping-hand-2pny.onrender.com/allusers",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // include token if route is protected
            },
          }
        );

        const data = await res.json();
        console.log(data);

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch users");
        }

        setUsers(data.user || []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Adminsidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-4 border-indigo-500 inline-block">
          👥 All Users
        </h1>

        {users.length === 0 ? (
          <p className="text-gray-600 text-center mt-20 text-lg">
            No users found yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {users.map((user) => (
              <Card
                key={user._id}
                className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 rounded-xl"
              >
                <CardContent className="flex flex-col items-center justify-center text-center p-5">
                  <div className="w-20 h-20 rounded-full mx-auto mb-3">
                    <img
                      src={user.profileImg}
                      alt=""
                      className="w-20 h-20 rounded-full mx-auto mb-3"
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {user.fullName}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">{user.Email}</p>
                  <span
                    className={`mt-3 px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user.role?.toUpperCase()}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
