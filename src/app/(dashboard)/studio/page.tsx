"use client"
import { useArtist } from "@/contexts/ArtistContext";
import { Search, Menu, Calendar, Bell, Music, User } from 'lucide-react';
import DashboardMetrics from "./DashboardMetric";

const ArtistStudio = () => {
  const [selectedArtist, setSelectedArtist] = useArtist();
  return (
    <>
      <div className="relative h-[300px] overflow-hidden mb-2 rounded-lg">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://assets.mwonya.com/RawFiles/DTR.jpg"
            alt="Artist Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="w-1/2 p-8">
            <h1 className="text-6xl font-bold text-gray-800 z-10 relative mb-2">Drillz The Rapper</h1>
            <p className="text-2xl text-gray-500 z-10 relative">I am here to spread positivity</p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>

      <DashboardMetrics  />

    </>
  );
};

export default ArtistStudio;