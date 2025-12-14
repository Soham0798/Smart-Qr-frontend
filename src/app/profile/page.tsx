"use client";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`https://smart-qr-backend-zo5i.onrender.com/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch user info");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <NavBar />
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
          <p className="text-red-600 font-semibold">Could not load user data.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-10 px-4 flex justify-center">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full border border-gray-100">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
            My Profile
          </h1>

          <div className="space-y-4">
            <div>
              <p className="text-gray-500 text-sm">Username</p>
              <p className="text-gray-900 text-lg font-medium">{user.username}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="text-gray-900 text-lg font-medium">{user.username || "N/A"}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">User ID</p>
              <p className="text-gray-900 text-lg font-medium">{user.id}</p>
            </div>

            <div className="pt-4 border-t">
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition-all duration-200"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}


