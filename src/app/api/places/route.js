import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const placeName = searchParams.get("place");

  if (!placeName) {
    return NextResponse.json({ error: "Missing place name" }, { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Get coordinates for the place
  const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(placeName)}&key=${apiKey}`;
  const geoResponse = await fetch(geoUrl);
  const geoData = await geoResponse.json();

  if (geoData.status !== "OK" || !geoData.results.length) {
    return NextResponse.json({ error: "Location not found" }, { status: 404 });
  }

  const { lat, lng } = geoData.results[0].geometry.location;

  // Fetch nearby places
  const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=tourist_attraction&key=${apiKey}`;
  const placesResponse = await fetch(placesUrl);
  const placesData = await placesResponse.json();

  if (placesData.status !== "OK") {
    return NextResponse.json({ error: "Failed to fetch places" }, { status: 500 });
  }

  return NextResponse.json(placesData.results);
}
