"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Spectral } from "next/font/google";

const daaru = Spectral({
  weight: "400",
  subsets: ["latin"],
});
const TravelSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!searchTerm.trim()) return; // Prevent empty searches
    router.push(`/TouristPlaces?place=${encodeURIComponent(searchTerm)}`);
  };


  return (
    <main className="fixed inset-0 w-full h-full overflow-hidden">
      <div className="absolute inset-0 w-full h-full rounded-lg">
        <Image 
          src="/one.jpg" 
          alt="sea" 
          layout="fill" 
          objectFit="cover"
          priority
          className="z-0"
        />
      </div>
      
      <div className="relative z-10 h-full w-full flex flex-col justify-center items-start ml-20">
        <h1 className={`text-8xl font-bold text-white mb-8 ${daaru.className}`}>Trippling</h1>
        
        <div className="bg-slate-800/50 p-4 w-full rounded-full flex items-center space-x-4 max-w-4xl backdrop-blur">
          <input
            type="text"
            placeholder="Enter a location..."
            className="p-3 rounded-md bg-transparent text-white border-none focus:outline-none flex-1 placeholder-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            className="bg-sky-400 text-white px-8 py-3 rounded-full hover:bg-sky-500"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        
        <div className="flex space-x-4 mt-8">
          <button className="text-white border border-white/30 px-6 py-2 rounded-full hover:bg-white/10">
            Tour Guide
          </button>
          <button className="text-white border border-white/30 px-6 py-2 rounded-full hover:bg-white/10">
            Travel Packages
          </button>
          <button className="text-white border border-white/30 px-6 py-2 rounded-full hover:bg-white/10"
          onClick={() => router.push("/BudgetCalculator")}>
            Budget Calculator
          </button>
        </div>
      </div>
    </main>
  );
};

export default TravelSearch;
