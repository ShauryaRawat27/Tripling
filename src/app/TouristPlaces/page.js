"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function TouristPlaces() {
  const searchParams = useSearchParams();
  const placeName = searchParams.get("place");  // Get place from URL

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!placeName) return;

    const fetchPlaces = async () => {
      try {
        const res = await fetch(`/api/places?place=${encodeURIComponent(placeName)}`);
        const data = await res.json();
        
        if (data.error) throw new Error(data.error);
        setPlaces(data);
      } catch (error) {
        console.error("Error fetching places:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [placeName]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Tourist Places in {placeName}</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <div key={place.place_id} className="bg-gray-800 p-4 rounded-md">
              <h2 className="text-xl font-bold">{place.name}</h2>
              <p className="text-gray-400">{place.vicinity}</p>

              {place.photos?.length > 0 && (
                <Image
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
                  alt={place.name}
                  width={400}
                  height={300}
                  className="mt-2 rounded-md"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
