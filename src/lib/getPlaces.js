export async function getNearbyPlaces(lat, lng, radius = 5000) {
  try {
    const response = await fetch(`/api/places?lat=${lat}&lng=${lng}&radius=${radius}`);
    const data = await response.json();
    
    console.log("API Response:", data); // Debugging step

    return data.results || [];
  } catch (error) {
    console.error("Error fetching places:", error);
    return [];
  }
}
