"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Home, MapPin, Ticket, User, HelpCircle, LogOut, Menu, X, Bus } from "lucide-react";

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/buses?search=${encodeURIComponent(query.trim())}`);
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

  // Desktop nav links (now includes "Buses")
  const desktopNavLinks = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/nearby", icon: MapPin, label: "Around Me" },
    { href: "/buses", icon: Bus, label: "Buses" },
    { href: "/tickets", icon: Ticket, label: "Tickets" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  // Mobile nav links (also includes "Buses")
  const mobileNavLinks = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/nearby", icon: MapPin, label: "Around Me" },
    { href: "/buses", icon: Bus, label: "Buses" },
    { href: "/tickets", icon: Ticket, label: "Tickets" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <>
      <nav className="flex items-center justify-between bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-700 px-4 py-3 text-white shadow-md w-full relative">
        {/* Logo */}
        <Link href="/" className="text-xl sm:text-2xl font-bold flex items-center gap-2 z-50">
          SmartQR
        </Link>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center bg-white/10 rounded-full px-4 py-2 w-80 lg:w-96">
          <Search className="text-cyan-300 w-5 h-5" />
          <input
            type="text"
            placeholder="Where are you going?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="ml-2 bg-transparent text-white w-full outline-none placeholder-white/70 text-sm lg:text-base"
          />
        </form>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium">
          {desktopNavLinks.map((link) => {
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
                <Icon size={18} />
                <span className="hidden lg:inline">{link.label}</span>
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="ml-2 bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg font-semibold transition-colors text-sm"
          >
            <span className="hidden lg:inline">Logout</span>
            <LogOut size={18} className="lg:hidden" />
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

        {isMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={closeMenu} />
        )}

        {/* Mobile menu */}
        <div
          className={`
          fixed top-0 right-0 h-full w-80 max-w-full bg-gradient-to-b from-blue-900 to-cyan-800 text-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
        >
          <div className="flex items-center justify-between p-4 border-b border-blue-700">
            <span className="text-lg font-bold">Menu</span>
            <button onClick={closeMenu} className="flex items-center justify-center w-10 h-10">
              <X size={24} />
            </button>
          </div>

          {/* Mobile search bar */}
          <div className="p-4 border-b border-blue-700">
            <form onSubmit={handleSearch} className="flex items-center bg-white/10 rounded-full px-4 py-2">
              <Search className="text-cyan-300 w-5 h-5" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="ml-2 bg-transparent text-white w-full outline-none placeholder-white/70 text-sm"
              />
            </form>
          </div>

          <div className="flex flex-col p-4 space-y-2 flex-1">
            {mobileNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? "bg-white/10 text-cyan-300" : "hover:bg-white/5"
                  }`}
                >
                  <Icon size={22} />
                  <span className="font-medium text-lg">{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="p-4 border-t border-blue-700">
            <button
              onClick={() => {
                closeMenu();
                handleLogout();
              }}
              className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 px-4 py-3 rounded-lg font-semibold transition-colors"
            >
              <LogOut size={20} />
              <span className="text-lg">Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}





