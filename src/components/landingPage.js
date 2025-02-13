"use client";
import React from 'react';
import navbar from './navbar';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { Spectral } from "next/font/google";
const daaru = Spectral({
  weight : "400",
  subsets: ["latin"]
})

const TravelSearch = () => {
  const router = useRouter();
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
      
      {/* Content Container */}
      <div className="relative z-10 h-full w-full ">
        {/* Hero Section - with constraint on height */}
        <div className="h-full w-full px-8 py-16 flex flex-col mt-[8%]">
          <div className="max-w-4xl">
            <h1 className={`text-8xl font-bold text-white mb-8 ${daaru.className}`}>
              Trippling
            </h1>

            {/* Search Bar */}
            <div className="bg-slate-800/50 p-4 rounded-full flex items-center space-x-4 max-w-4xl backdrop-blur">
              <div className="flex-1">
                <label className="block text-sm text-gray-400 mb-1">Location</label>
                <select className="w-full bg-transparent text-white border-none focus:ring-0">
                  <option>Hamburg, Germany</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-sm text-gray-400 mb-1">Activities Type</label>
                <select className="w-full bg-transparent text-white border-none focus:ring-0">
                  <option>Adventure</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-sm text-gray-400 mb-1">Activate Day</label>
                <select className="w-full bg-transparent text-white border-none focus:ring-0">
                  <option>Feb 14-16</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-sm text-gray-400 mb-1">Traveler</label>
                <select className="w-full bg-transparent text-white border-none focus:ring-0">
                  <option>02</option>
                </select>
              </div>

              <button className="bg-sky-400 text-white px-8 py-3 rounded-full hover:bg-sky-500"
              onClick={() => router.push("/TouristPlaces")}>
                Search
              </button>
            </div>

            {/* Quick Links */}
            <div className="flex space-x-4 mt-8">
              <button className="text-white border border-white/30 px-6 py-2 rounded-full hover:bg-white/10">
                Tour Guide
              </button>
              <button className="text-white border border-white/30 px-6 py-2 rounded-full hover:bg-white/10">
                Travel Packages
              </button>
              <button className="text-white border border-white/30 px-6 py-2 rounded-full hover:bg-white/10">
                Transportation
              </button>
            </div>
          </div>

          {/* Tour Card - positioned relative to the flexbox container */}
          {}
        </div>
      </div>
    </main>
  );
};

export default TravelSearch;