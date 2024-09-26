import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/profile', {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>; // Display error message
  }

  if (!user) {
    return <p>No user data found.</p>;
  }

  const totalTodos = user.todos?.total || 0;
  const completedTodos = user.todos?.completed || 0;

  const completionPercentage =
    totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

  return (
    <div className="bg-gray-900 min-h-[650px] flex justify-center items-center">
      <div className="bg-gray-800 text-gray-200 w-full max-w-md lg:max-w-4xl mx-auto p-6 lg:p-12 rounded-lg">
        <div className="p-4 border-b border-gray-700 flex flex-col lg:flex-row items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={user.avatarUrl || "https://via.placeholder.com/150/0000FF/FFFFFF?text=User"} // More meaningful placeholder
              alt={user.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-center lg:text-left">
            <h2 className="text-xl font-semibold">{user.fullname}</h2>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <h3 className="text-sm font-medium">Todo Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-500 h-full rounded-full"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="flex justify-between text-sm text-center lg:text-left">
            <div>
              <p className="font-medium">{totalTodos}</p>
              <p className="text-gray-400">Total Todos</p>
            </div>
            <div>
              <p className="font-medium">{completedTodos}</p>
              <p className="text-gray-400">Completed</p>
            </div>
            <div>
              <p className="font-medium">{totalTodos - completedTodos}</p>
              <p className="text-gray-400">Remaining</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
