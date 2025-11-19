// "use client";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { getBooking } from "@/lib/api";
// import NavBar from "@/components/NavBar";

// export default function TicketPage() {
//   const { id } = useParams();
//   const [ticket, setTicket] = useState<any>(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token && id) {
//       getBooking(token, Number(id)).then(setTicket);
//     }
//   }, [id]);

//   if (!ticket) return <p className="p-6 text-center">Loading ticket...</p>;

//   const getStatusColor = (status: string = "Active") => {
//     switch (status) {
//       case "Active": return "bg-green-100 text-green-800 border-green-200";
//       case "Used": return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "Expired": return "bg-red-100 text-red-800 border-red-200";
//       default: return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

//   return (
//     <>
//     <NavBar /> {/* Add NavBar here */}
//     <main className="flex justify-center items-center h-[90vh] bg-gray-50">
//       <div className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl border border-white/20 flex flex-col items-center shadow-lg w-full max-w-md mx-4">
//         <div className="w-full flex justify-between items-center mb-3">
//           <h1 className="text-xl font-semibold text-gray-700">
//             {ticket.source} ➜ {ticket.destination}
//           </h1>
//           <span className={`text-sm px-3 py-1 rounded-full ${getStatusColor(ticket.status)}`}>
//             {ticket.status || "Active"}
//           </span>
//         </div>
       
        
//         <p className="text-gray-700 mb-3">Ticket #{ticket.id}</p>
//         <p className="text-gray-700 mb-3">Bus ID: {ticket.bus_id}</p>
//         <p className="text-gray-700 mb-3">Fare: ₹{ticket.fare}</p>

//         <div className="mt-4">
//           {ticket.qr_link && (
//             <div className="bg-white p-2 rounded-lg">
//               <img
//                 src={ticket.qr_link}
//                 alt="QR Code"
//                 className="w-48 h-48 mx-auto"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//      </>
//   );
// }
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getBooking } from "@/lib/api";
import NavBar from "@/components/NavBar";

export default function TicketPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState<any>(null);
  const [busNumber, setBusNumber] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && id) {
      getBooking(token, Number(id)).then(async (data) => {
        setTicket(data);
        if (data?.bus_id) {
          // fetch bus details using bus_id to get bus_number
          try {
            const busRes = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/buses/id/${data.bus_id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if (busRes.ok) {
              const busData = await busRes.json();
              setBusNumber(busData.bus_number || "");
            }
          } catch (err) {
            console.error("Error fetching bus details:", err);
          }
        }
      });
    }
  }, [id]);

  if (!ticket)
    return <p className="p-6 text-center">Loading ticket...</p>;

  const getStatusColor = (status: string = "Active") => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Used":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Expired":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <>
      <NavBar />
      <main className="flex justify-center items-center h-[90vh] bg-gray-50">
        <div className="bg-white/10 backdrop-blur-lg p-5 rounded-2xl border border-white/20 flex flex-col items-center shadow-lg w-full max-w-md mx-4">
          <div className="w-full flex justify-between items-center mb-3">
            <h1 className="text-xl font-semibold text-gray-700">
              {ticket.source} ➜ {ticket.destination}
            </h1>
            <span
              className={`text-sm px-3 py-1 rounded-full ${getStatusColor(
                ticket.status
              )}`}
            >
              {ticket.status || "Active"}
            </span>
          </div>

          <p className="text-gray-700 mb-3">Ticket #{ticket.id}</p>
          <p className="text-gray-700 mb-3">
            Bus Number: {busNumber || "Loading..."}
          </p>
          <p className="text-gray-700 mb-3">Fare: ₹{ticket.fare}</p>

          <div className="mt-4">
            {ticket.qr_link && (
              <div className="bg-white p-2 rounded-lg">
                <img
                  src={ticket.qr_link}
                  alt="QR Code"
                  className="w-48 h-48 mx-auto"
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
