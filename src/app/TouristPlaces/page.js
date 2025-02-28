"use client";
import { useSearchParams } from "next/navigation";
import React,{ useState, useEffect } from "react";
import Image from "next/image";
import Maps from "@/components/maps";
import { ImCross } from "react-icons/im";

export default function TouristPlaces() {
  const searchParams = useSearchParams();
  const placeName = searchParams.get("place");

  const [places, setPlaces] = useState([]); // ✅ Initialize as an empty array
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
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Tourist Places in {placeName}</h1>

      {places.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => {
            const latitude = place.geometry?.location?.lat;
            const longitude = place.geometry?.location?.lng;

            return (
              <div key={place.place_id} className="bg-gray-800 p-4 rounded-md hover:scale-105 transition-transform "  onClick={() => {
                if (latitude && longitude) {
                  setSelectedComponent(() => <Maps latitude={latitude} longitude={longitude} />);
                } else {
                  console.error("Latitude or Longitude is missing.");
                }
              }}>
                <h2 className="text-xl font-bold">{place.name}</h2>
                <p className="text-gray-400">{place.vicinity}</p>

                {place.photos?.length > 0 && (
                  <Image
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
                    alt={place.name}
                    width={400}
                    height={300}
                    className="mt-2 rounded-md cursor-pointer"
                   
                    
                  />
                )}
              </div>
            );
          })}
        </div>
      )}


      {selectedComponent && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white  rounded-lg shadow-lg h-[50%] w-[50%]">
    <button
        onClick={() => setSelectedComponent(null)}
        className="px-4 py-1  text-black w-[5%]"
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
