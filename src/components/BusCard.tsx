"use client";
import { useRouter } from "next/navigation";

export default function BusCard({ bus }: { bus: any }) {
  const router = useRouter();

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-md transition bg-white">
      <h2 className="text-xl font-semibold mb-2">{bus.bus_number}</h2>
      <p className="text-gray-600 mb-2">Route: {bus.route}</p>
      <button
        onClick={() => router.push(`/book?bus_id=${bus.id}`)}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        Book Ticket
      </button>
    </div>
  );
}
