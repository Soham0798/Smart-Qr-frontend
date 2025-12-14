"use client";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";

interface Ticket {
  id: string | number;
  bus_id?: string;
  bus_number?: string;
  source: string;
  destination: string;
  fare: number;
  status?: "Active" | "Used" | "Expired" | string;
  qr_link?: string;
  booking_date?: string;
  travel_date?: string;
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function getTickets() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to view your tickets");
        return [];
      }

      const res = await fetch(`https://smart-qr-backend-zo5i.onrender.com/bookings/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch tickets");

      const data = await res.json();

      const ticketsWithBusNumbers = await Promise.all(
        data.map(async (ticket: any) => {
          if (!ticket.bus_id) return ticket;
          try {
            const busRes = await fetch(
              `https://smart-qr-backend-zo5i.onrender.com/buses/id/${ticket.bus_id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if (busRes.ok) {
              const busData = await busRes.json();
              return { ...ticket, bus_number: busData.bus_number };
            }
          } catch (err) {
            console.error("Error fetching bus:", err);
          }
          return { ...ticket, bus_number: "N/A" };
        })
      );

      return Array.isArray(ticketsWithBusNumbers)
        ? ticketsWithBusNumbers
        : [];
    } catch (err) {
      console.error("Error fetching tickets:", err);
      setError("Unable to load your tickets. Please try again.");
      return [];
    }
  }

  useEffect(() => {
    getTickets().then((data) => {
      setTickets(data);
      setLoading(false);
    });
  }, []);

  const getStatusColor = (status: string = "Active") => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 border-green-200";
      case "Used": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Expired": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-10 px-4">
          <div className="flex justify-center items-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your tickets...</p>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6">
        {/* Header Section - Full width */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">My Tickets</h1>
            <p className="text-gray-600 text-lg">Manage and view your bus tickets</p>
          </div>
        </div>

        {/* Tickets Grid - Full responsive container */}
        <div className="max-w-7xl mx-auto">
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center max-w-md mx-auto">
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : tickets.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center max-w-md mx-auto">
              <div className="text-6xl mb-4">🎫</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No tickets found</h3>
              <p className="text-gray-600 mb-6">You haven't booked any tickets yet.</p>
              <button 
                onClick={() => window.location.href = '/buses'}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Book Your First Ticket
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-semibold text-gray-800 truncate">
                          {ticket.source} → {ticket.destination}
                        </h2>
                        {ticket.bus_number && (
                          <p className="text-gray-600 text-sm mt-1 truncate">
                            Bus: {ticket.bus_number}
                          </p>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border flex-shrink-0 ml-2 ${getStatusColor(ticket.status)}`}>
                        {ticket.status || "Active"}
                      </span>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fare:</span>
                        <span className="font-semibold text-gray-800">₹{ticket.fare}</span>
                      </div>
                      {ticket.travel_date && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Travel Date:</span>
                          <span className="font-medium text-gray-800 text-sm">{formatDate(ticket.travel_date)}</span>
                        </div>
                      )}
                      {ticket.booking_date && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Booked On:</span>
                          <span className="font-medium text-gray-800 text-sm">{formatDate(ticket.booking_date)}</span>
                        </div>
                      )}
                    </div>

                    {ticket.qr_link && (
                      <div className="border-t pt-4">
                        <img
                          src={ticket.qr_link}
                          alt="Ticket QR Code"
                          className="w-24 h-24 sm:w-28 sm:h-28 object-contain mx-auto border rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

