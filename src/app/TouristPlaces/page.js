"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { ImCross } from "react-icons/im";
import dynamic from "next/dynamic";

const Maps = dynamic(() => import("@/components/maps"), {
  ssr: false,
  loading: () => <div className="text-white">Loading Map...</div>,
});

function TouristPlacesContent() {
  const searchParams = useSearchParams();
  const placeName = searchParams.get("place");
  const [places, setPlaces] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);

  useEffect(() => {
    if (!placeName) return;

    const fetchPlaces = async () => {
      try {
        const res = await fetch(`/api/places?place=${encodeURIComponent(placeName)}`);
        const data = await res.json();

        if (!Array.isArray(data)) throw new Error("Invalid API response format");

        setPlaces(data);
      } catch (error) {
        console.error("Error fetching places:", error.message);
      }
    };

    fetchPlaces();
  }, [placeName]);

  return (
    <div className="relative min-h-screen flex flex-col items-center text-white p-8">
      {/* Background Image */}
      <div className="fixed top-0 left-0 w-full h-screen">
        <Image
          src="/images/tokyo.jpg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <h1 className="relative text-5xl font-extrabold mb-8 text-center drop-shadow-lg z-10">
        Explore {placeName}
      </h1>

      {places.length === 0 ? (
        <div className="relative flex justify-center items-center h-64 z-10">
          <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl z-10">
          {places.map((place) => {
            const latitude = place.geometry?.location?.lat;
            const longitude = place.geometry?.location?.lng;

            return (
              <div
                key={place.place_id}
                className="backdrop-blur text-white border-black border-[1px] shadow-lg shadow-black p-6 rounded-2xl transform transition-all hover:scale-105 hover:shadow-2xl cursor-pointer relative z-10"
                onClick={() => {
                  if (latitude && longitude) {
                    setSelectedComponent(
                      <Maps latitude={latitude} longitude={longitude} />
                    );
                  } else {
                    console.error("Latitude or Longitude is missing.");
                  }
                }}
              >
                <h2 className="text-2xl font-semibold mb-2">{place.name}</h2>
                <p className="text-white-600 mb-4">{place.vicinity}</p>
                {place.photos?.length > 0 && (
                  <Image
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
                    alt={place.name}
                    width={400}
                    height={300}
                    className="rounded-lg shadow-lg object-cover w-full h-60"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {selectedComponent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mb-[10%]">
          <div className="bg-white rounded-lg shadow-lg h-[50%] w-[50%] relative">
            <button
              onClick={() => setSelectedComponent(null)}
              className="absolute top-2 right-2 text-black"
            >
              <ImCross />
            </button>
            {selectedComponent}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TouristPlaces() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <TouristPlacesContent />
    </Suspense>
  );
}
