import React from 'react';
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";



export default function Maps({latitiude, longitude}) {

    const center = {
        lat: latitiude || 19.026952,
        lng: longitude || 73.021891
      };

  const { isLoaded, loadError } = useJsApiLoader({
   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    || "", 
  });

  if (loadError) {
    return <div>Error loading maps: {loadError.message}</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <GoogleMap center={center} 
        zoom={10} 
        mapContainerStyle={{ width: "50%", height: "50vh" }} >
            <Marker position={center} />
        </GoogleMap>
        
      
    </div>
  );
}
