"use client";

interface TicketProps {
  ticket: {
    id: string | number;
    from: string;
    to: string;
    fare: number;
    status: "Active" | "Used" | "Expired" | string;
    bus_id?: string;
  };
}

export default function TicketCard({ ticket }: TicketProps) {
  const statusColor =
    ticket.status === "Active"
      ? "bg-green-500"
      : ticket.status === "Used"
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl border border-white/20 flex flex-col items-center shadow-lg">
      <div className="w-full flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">
          {ticket.from} ➜ {ticket.to}
        </h2>
        <span className={`text-sm px-3 py-1 rounded-full ${statusColor}`}>
          {ticket.status}
        </span>
      </div>

      {ticket.bus_id && (
        <p className="text-gray-700 mb-2">Bus: #{ticket.bus_id}</p>
      )}
      
      <p className="text-gray-700 mb-3">Fare: ₹{ticket.fare}</p>
    </div>
  );
}
