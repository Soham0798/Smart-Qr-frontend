"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";

interface Bus {
  id: number;
  bus_number: string;
  route: string;
  latitude: number;
  longitude: number;
}

export default function NearbyBusesPage() {
  const router = useRouter();
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get user location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        setLocation(coords);
        fetchNearbyBuses(coords.lat, coords.lon);
      },
      (err) => {
        console.error("Location error:", err);
        setError("Unable to get your location. Please enable GPS permissions.");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  // Fetch nearby buses from backend
  const fetchNearbyBuses = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://smart-qr-frontend-i8cu-8e0rxo357-soham0798s-projects.vercel.app/buses/nearby?lat=${lat}&lon=${lon}&radius=5`
      );
      if (!res.ok) throw new Error("Failed to fetch nearby buses");
      const data = await res.json();
      setBuses(data);
    } catch (err) {
      console.error("Error fetching buses:", err);
      setError("Failed to fetch nearby buses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  return (
    <>
      <NavBar />
      <main className="min-h-[90vh] bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              Nearby Buses
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find buses near your current location. We'll show you all available buses within 5km radius.
            </p>
          </div>

          {/* Location Status */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Your Location</h3>
                {location ? (
                  <p className="text-gray-600 text-sm">
                    📍 {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
                  </p>
                ) : (
                  <p className="text-gray-500 text-sm">Getting your location...</p>
                )}
              </div>
              <button
                onClick={getUserLocation}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? "Refreshing..." : "Refresh Location"}
              </button>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center max-w-2xl mx-auto mb-8">
              <div className="text-red-600 mb-3">⚠️ {error}</div>
              <button
                onClick={getUserLocation}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Finding buses near you...</p>
              </div>
            </div>
          )}

          {/* Buses Grid */}
          {!loading && !error && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Available Buses {buses.length > 0 && `(${buses.length})`}
                </h2>
              </div>

              {buses.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center max-w-2xl mx-auto cursor-pointer">
                  <div className="text-6xl mb-4">🚌</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No Buses Found Nearby
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any buses within 5km of your location. 
                    Try refreshing your location or check back later.
                  </p>
                  <button 
                    onClick={getUserLocation}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer"
                  >
                    Refresh Location
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {buses.map((bus) => (
                    <div
                      key={bus.id}
                      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <span className="text-xl">🚌</span>
                          </div>
                          <div className="text-right">
                            <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                              {location && calculateDistance(location.lat, location.lon, bus.latitude, bus.longitude)} km away
                            </span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          Bus {bus.bus_number}
                        </h3>
                        
                        <div className="space-y-3">
                          <div className="text-gray-600 text-left">
                            <div className="font-medium text-sm mb-1">Route: </div>
                            <div className="text-sm leading-relaxed">{bus.route}</div>
                          </div>
                          
                          <div className="flex items-center text-gray-600">
                            <span className="w-5">🆔</span>
                            <span className="text-sm">ID: {bus.id}</span>
                          </div>

                          <div className="pt-3 border-t border-gray-100">
                            <p className="text-xs text-gray-500">
                              Coordinates: {bus.latitude.toFixed(4)}, {bus.longitude.toFixed(4)}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 px-6 py-4 border-t">
                        <button 
                          onClick={() => router.push(`/bus-details/${bus.id}`)}
                          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm cursor-pointer"
                        >
                          View Bus Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );

}
