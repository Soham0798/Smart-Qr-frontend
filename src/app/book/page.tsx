"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { createBooking } from "@/lib/api";
import { MapPin, ArrowRight } from "lucide-react";
import NavBar from "@/components/NavBar";

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const busId = Number(searchParams.get("bus_id"));
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleBook = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first");
      router.push("/");
      return;
    }

    const booking = await createBooking(token, {
      bus_id: busId,
      source: from,
      destination: to,
    });

    if (booking && booking.id) {
      router.push(`/tickets/${booking.id}`);
    } else {
      alert("Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700">
      <NavBar />
      <main className="flex justify-center items-center h-[90vh]">
        <form
          onSubmit={handleBook}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl w-full max-w-md shadow-lg border border-white/20"
        >
          <h1 className="text-2xl font-bold text-center mb-6 text-white">Book a Ticket</h1>
          
          <div className="flex flex-col gap-4">
            {/* From Field */}
            <div>
              <label className="text-sm text-blue-200">From</label>
              <div className="flex items-center bg-white/10 rounded-lg p-2 mt-1">
                <MapPin className="text-cyan-400 mr-2" />
                <input
                  type="text"
                  placeholder="Source Stop"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  required
                  className="bg-transparent outline-none w-full text-white placeholder-blue-200"
                />
              </div>
            </div>

            {/* To Field */}
            <div>
              <label className="text-sm text-blue-200">To</label>
              <div className="flex items-center bg-white/10 rounded-lg p-2 mt-1">
                <ArrowRight className="text-cyan-400 mr-2" />
                <input
                  type="text"
                  placeholder="Destination Stop"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  required
                  className="bg-transparent outline-none w-full text-white placeholder-blue-200"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition mt-4"
            >
              Book Ticket
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}