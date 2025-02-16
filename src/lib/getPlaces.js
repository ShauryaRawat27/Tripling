export async function getCoordinates(placeName) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(placeName)}&key=${apiKey}`;

  const response = await fetch(geoUrl);
  const data = await response.json();

  if (data.status !== "OK" || !data.results.length) {
    throw new Error("Location not found");
  }

  const { lat, lng } = data.results[0].geometry.location;
  return { lat, lng };
}

export async function getNearbyPlaces(placeName, radius = 5000) {
  const { lat, lng } = await getCoordinates(placeName);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=tourist_attraction&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "OK") {
    throw new Error("Failed to fetch places");
  }

  return data.results;
}
