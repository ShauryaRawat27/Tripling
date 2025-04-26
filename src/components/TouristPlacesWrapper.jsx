"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TouristPlaces from "./TouristPlaces";

function Inner() {
  const searchParams = useSearchParams();
  const placeName = searchParams.get("place");

  return <TouristPlaces placeName={placeName} />;
}

export default function TouristPlacesWrapper() {
  return (
    <Suspense fallback={<div className="text-white p-8">Loading...</div>}>
      <Inner />
    </Suspense>
  );
}
