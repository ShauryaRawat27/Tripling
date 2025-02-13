"use client";
import { useState, useEffect } from "react";
import { getNearbyPlaces } from "@/lib/getPlaces";

export default function TouristPlaces() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const lat = 28.6139;  // Example: Delhi, India
        const lng = 77.2090;
        const data = await getNearbyPlaces(lat, lng);
        setPlaces(data);
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div>
      <h1>Tourist Places Nearby</h1>
      {loading ? <p>Loading...</p> : (
        <ul>
          {places.map((place) => (
            <li key={place.place_id}>
              <h2>{place.name}</h2>
              <p>{place.vicinity}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
