import React from 'react';
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";



export default function Maps({latitude, longitude}) {

    const center = {
        lat: latitude || 19.026952,
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
    <div className="min-h-screen w-full z-10 ">
      <GoogleMap center={center} 
        zoom={15} 
        mapContainerStyle={{ width: "100%", height: "70vh" , zIndex:0}} >
            <Marker position={center} />
        </GoogleMap>
        
      
    </div>
  );
}
