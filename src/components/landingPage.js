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
    <main className=" inset-0 w-full h-full overflow-hidden ">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full rounded-lg">
        <Image 
          src="/budget.png" 
          alt="sea" 
          fill
          className="object-cover "
          priority
        />
      </div>
      
      {/* Content */}
      <div className="relative  h-full w-full flex flex-col top-[10%] items-start ml-20 mt-[5%]">
        <h1 className={`text-8xl font-bold text-white mb-8 ${daaru.className}`}>
          Tripling
        </h1>
        
        {/* Search Bar */}
        <div className="bg-slate-800/50 p-4 w-full rounded-full flex items-center space-x-4 max-w-4xl backdrop-blur">
          <input
            type="text"
            placeholder="Enter a location..."
            className="p-3 rounded-md bg-transparent text-white border-none focus:outline-none flex-1 placeholder-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} 
          />
          <button 
            className={`px-8 py-3 rounded-full text-white transition-all 
              ${searchTerm.trim() ? "bg-sky-400 hover:bg-sky-500" : "bg-gray-500 cursor-not-allowed"}
            `}
            onClick={handleSearch}
            disabled={!searchTerm.trim()} 
          >
            Search
          </button>
        </div>
        
        {/* Buttons */}
        
      </div>
    </main>
  );
};

export default TravelSearch;
