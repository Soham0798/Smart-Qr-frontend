/*
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

      <Link href="/" className="text-2xl font-bold flex items-center gap-2">
        SmartQR
      </Link>


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
*/
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Home, MapPin, Ticket, User, HelpCircle, LogOut, Menu, X } from "lucide-react";

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/nearby", icon: MapPin, label: "Around Me" },
    { href: "/tickets", icon: Ticket, label: "Tickets" },
    { href: "/profile", icon: User, label: "Profile" },
    { href: "/help", icon: HelpCircle, label: "Help" },
  ];

  return (
    <>
      <nav className="flex items-center justify-between bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-700 px-4 py-3 text-white shadow-md w-full relative">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold flex items-center gap-2 z-50">
          SmartQR
        </Link>

        {/* Search bar - hidden on mobile, visible on tablet and up */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center bg-white/10 rounded-full px-4 py-1 w-96">
          <Search className="text-cyan-300 w-5 h-5" />
          <input
            type="text"
            placeholder="Where are you going?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="ml-2 bg-transparent text-white w-full outline-none placeholder-white/70"
          />
        </form>

        {/* Desktop nav links - hidden on mobile */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1 hover:text-cyan-300 transition-colors ${
                  isActive ? "text-cyan-300" : ""
                }`}
              >
                <Icon size={18} /> {link.label}
              </Link>
            );
          })}
          
          <button
            onClick={handleLogout}
            className="ml-2 bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg font-semibold transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center justify-center w-10 h-10 z-50"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile search bar - appears in mobile menu */}
        <form onSubmit={handleSearch} className="md:hidden absolute top-full left-0 right-0 bg-blue-800 px-4 py-3 border-t border-blue-700">
          <div className="flex items-center bg-white/10 rounded-full px-4 py-2">
            <Search className="text-cyan-300 w-5 h-5" />
            <input
              type="text"
              placeholder="Where are you going?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="ml-2 bg-transparent text-white w-full outline-none placeholder-white/70"
            />
          </div>
        </form>
      </nav>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={closeMenu} />
      )}

      {/* Mobile menu */}
      <div className={`
        fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-blue-900 to-cyan-800 text-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out md:hidden
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
      `}>
        <div className="flex flex-col h-full pt-20 pb-6">
          {/* Mobile navigation links */}
          <div className="flex flex-col space-y-2 px-4 flex-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? "bg-white/10 text-cyan-300" : "hover:bg-white/5"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Logout button at bottom */}
          <div className="px-4 mt-auto">
            <button
              onClick={() => {
                closeMenu();
                handleLogout();
              }}
              className="w-full flex items-center gap-3 bg-red-500 hover:bg-red-600 px-4 py-3 rounded-lg font-semibold transition-colors justify-center"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}


