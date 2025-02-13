export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const radius = searchParams.get("radius") || "5000";
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; 
  
    if (!lat || !lng) {
      return Response.json({ error: "Missing lat/lng" }, { status: 400 });
    }
  
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=tourist_attraction&key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      return Response.json(data, {
        headers: { "Access-Control-Allow-Origin": "*" }, // Fixes CORS
      });
    } catch (error) {
      return Response.json({ error: "Failed to fetch data" }, { status: 500 });
    }
  }
  