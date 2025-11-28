/*
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
// ✅ Fetch all buses from backend
async function getBuses() {
  try {
    const res = await fetch(`https://smart-qr-backend-production.up.railway.app/buses/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch buses:", await res.text());
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching buses:", error);
    return [];
  }
}
useEffect(() => {
  getBuses().then((data) => {
    const q = new URLSearchParams(window.location.search).get("search")?.toLowerCase();

    if (q) {
      data = data.filter(bus =>
        bus.route?.toLowerCase().includes(q) ||
        bus.bus_number?.toLowerCase().includes(q)
      );
    }

    getBuses(data);
    setLoading(false);
  });
}, []);



// ✅ Enhanced BusCard component with book button at bottom
function BusCard({ bus }: { bus: any }) {
  const router = useRouter();
  const percent = Math.min(
    (bus.booked_seats / bus.capacity) * 100,
    100
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group hover:-translate-y-1 flex flex-col min-h-screen py-6 px-4">
      <div className="p-6 flex-1">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
            {bus.bus_number.split(' ').pop()}
          </div>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Available
          </span>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {bus.bus_number}
        </h2>
        
        <div className="flex items-center text-gray-600 mb-1">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">Route: {bus.route}</span>
        </div>

        <div className="flex items-center text-gray-600 mb-1">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm">Departure: 08:00 AM</span>
        </div>

        <div className="flex items-center text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="text-sm">Capacity: 40 seats</span>
        </div>
      </div>

      <div className="p-6 pt-4 border-t border-gray-100">
        <button
          onClick={() => router.push(`/book?bus_id=${bus.id}`)}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg hover:cursor-pointer"
        >
          Book Ticket
        </button>
      </div>
    </div>
  );
}

// ✅ Enhanced loading component
function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse flex flex-col h-full">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
              <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 rounded mb-1"></div>
            <div className="h-4 bg-gray-200 rounded mb-1"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="h-12 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ✅ Main buses page
export default function BusesPage() {
  const [buses, setBuses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBuses().then((data) => {
      setBuses(data);
      setLoading(false);
    });
  }, []);

 return (
  <>
    <NavBar /> 
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
 
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Available Buses
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose from our fleet of comfortable and reliable buses for your journey
          </p>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : buses.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Buses Available
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              There are currently no buses available. Please check back later or try refreshing the page.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buses.map((bus) => (
              <BusCard key={bus.id} bus={bus} />
            ))}
          </div>
        )}
      </div>
    </main>
  </>
);

}
*/
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";

// ======================
// FETCH ALL BUSES
// ======================
async function getBuses() {
  try {
    const res = await fetch(
      `https://smart-qr-backend-production.up.railway.app/buses/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${typeof window !== "undefined" ? localStorage.getItem("token") : ""
            }`,
        },
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch buses:", await res.text());
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching buses:", error);
    return [];
  }
}

// ======================
// BUS CARD
// ======================
function BusCard({ bus }: { bus: any }) {
  const router = useRouter();
  const percent = Math.min((bus.booked_seats / bus.capacity) * 100, 100);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group hover:-translate-y-1 flex flex-col min-h-screen py-6 px-4">
      <div className="p-6 flex-1">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
            {bus.bus_number.split(" ").pop()}
          </div>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Available
          </span>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {bus.bus_number}
        </h2>

        <div className="flex items-center text-gray-600 mb-1">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-sm">Route: {bus.route}</span>
        </div>

        <div className="flex items-center text-gray-600 mb-1">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm">Departure: 08:00 AM</span>
        </div>

        <div className="flex items-center text-gray-600">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="text-sm">Capacity: 40 seats</span>
        </div>
      </div>

      <div className="p-6 pt-4 border-t border-gray-100">
        <button
          onClick={() => router.push(`/book?bus_id=${bus.id}`)}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-800"
        >
          Book Ticket
        </button>
      </div>
    </div>
  );
}

// ============================
// LOADING SKELETON
// ============================
function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-lg p-6 animate-pulse flex flex-col h-full"
        >
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
              <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 rounded mb-1"></div>
            <div className="h-4 bg-gray-200 rounded mb-1"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="h-12 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// =============================
// CONTENT WRAPPED IN SUSPENSE
// =============================
function BusesPageContent() {
  const [buses, setBuses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    async function load() {
      setLoading(true);
      let all = await getBuses();

      if (searchQuery) {
        all = all.filter(
          (bus) =>
            bus.route?.toLowerCase().includes(searchQuery) ||
            bus.bus_number?.toLowerCase().includes(searchQuery)
        );
      }

      setBuses(all);
      setLoading(false);
    }

    load();
  }, [searchQuery]);

  return (
    <>
      <NavBar />

      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Available Buses
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Choose from our fleet of comfortable and reliable buses for your journey
            </p>
          </div>

          {loading ? (
            <LoadingSkeleton />
          ) : buses.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Buses Found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Try another stop or route.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {buses.map((bus) => (
                <BusCard key={bus.id} bus={bus} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

// =============================
// FIXED PAGE WRAPPED IN SUSPENSE
// =============================
export default function BusesPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <BusesPageContent />
    </Suspense>
  );
}










