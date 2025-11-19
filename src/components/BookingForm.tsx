"use client";

import { useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BookingForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fare, setFare] = useState<number | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!from || !to) {
      alert("Please enter both start and destination points");
      return;
    }

    // Simulate distance and fare
    const distance = Math.floor(Math.random() * 20) + 5;
    const calculatedFare = distance * 5;
    setFare(calculatedFare);
  };

  const handlePayment = () => {
    // Save trip details temporarily (optional for QR page)
    localStorage.setItem("tripDetails", JSON.stringify({ from, to, fare }));
    router.push("/buses/payment");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl w-full max-w-md shadow-lg border border-white/20"
    >
      <div className="flex flex-col gap-4">
        {/* From Field */}
        <div>
          <label className="text-sm text-blue-200">From</label>
          <div className="flex items-center bg-white/10 rounded-lg p-2 mt-1">
            <MapPin className="text-cyan-400 mr-2" />
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Enter start location"
              className="bg-transparent outline-none w-full text-white"
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
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Enter destination"
              className="bg-transparent outline-none w-full text-white"
            />
          </div>
        </div>

        {/* Get Fare Button */}
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
        >
          Get Fare
        </button>

        {/* Fare Display & Payment */}
        {fare && (
          <div className="text-center mt-4">
            <p className="text-lg font-medium text-cyan-200">
              Estimated Fare: ₹{fare}
            </p>
            <button
              type="button"
              onClick={handlePayment}
              className="mt-3 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold"
            >
              Proceed to Payment 💳
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

