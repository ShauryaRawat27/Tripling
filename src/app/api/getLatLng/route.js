import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const placeName = searchParams.get("location");

  if (!placeName) {
    return NextResponse.json({ error: "Missing location parameter" }, { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    placeName
  )}&key=${apiKey}`;

  try {
    const response = await fetch(geoUrl);
    const data = await response.json();

    if (data.status !== "OK" || !data.results.length) {
      return NextResponse.json({ error: "Location not found", details: data }, { status: 404 });
    }

    const { lat, lng } = data.results[0].geometry.location;
    return NextResponse.json({ lat, lng });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
  }
}
