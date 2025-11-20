"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Home, MapPin, Ticket, User, HelpCircle, LogOut } from "lucide-react";

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      alert(`Searching buses for: ${query}`);
      setQuery("");
    }
  };

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <nav className="flex items-center justify-between bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-700 px-4 py-3 text-white shadow-md w-full">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold flex items-center gap-2">
        SmartQR
      </Link>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="hidden md:flex items-center bg-white/10 rounded-full px-4 py-1 w-96">
        <Search className="text-cyan-300 w-5 h-5" />
        <input
          type="text"
          placeholder="Where are you going?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="ml-2 bg-transparent text-white w-full outline-none"
        />
      </form>

      {/* Nav links */}
      <div className="flex items-center gap-6 text-sm font-medium">
        <Link href="/" className={`flex items-center gap-1 hover:text-cyan-300 ${pathname === "/" ? "text-cyan-300" : ""}`}>
          <Home size={18} /> Home
        </Link>

        <Link href="/nearby" className={`flex items-center gap-1 hover:text-cyan-300 ${pathname === "/aroundme" ? "text-cyan-300" : ""}`}>
          <MapPin size={18} /> Around Me
        </Link>

        <Link href="/tickets" className={`flex items-center gap-1 hover:text-cyan-300 ${pathname === "/tickets" ? "text-cyan-300" : ""}`}>
          <Ticket size={18} /> Tickets
        </Link>

        <Link href="/profile" className={`flex items-center gap-1 hover:text-cyan-300 ${pathname === "/profile" ? "text-cyan-300" : ""}`}>
          <User size={18} /> Profile
        </Link>

        <Link href="/help" className={`flex items-center gap-1 hover:text-cyan-300 ${pathname === "/help" ? "text-cyan-300" : ""}`}>
          <HelpCircle size={18} /> Help
        </Link>

        <button
          onClick={handleLogout}
          className="ml-2 bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg font-semibold"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}


