import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  const date = searchParams.get("date");

  if (!city || !date) {
    return NextResponse.json({ error: "City and date are required" }, { status: 400 });
  }

  try {
    const geocodeResponse = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${process.env.OPENCAGE_KEY}`
    );

    if (geocodeResponse.data.results.length === 0) {
      return NextResponse.json({ error: "City not found" }, { status: 404 });
    }

    const { lat, lng } = geocodeResponse.data.results[0].geometry;

    const today = new Date();
    const requestedDate = new Date(date);
    const diffDays = Math.floor((requestedDate - today) / (1000 * 60 * 60 * 24));

    // OpenWeather only supports current weather (not historical or forecast beyond 7 days on free tier)
    if (diffDays < -1 || diffDays > 7) {
      return NextResponse.json({
        error: "Only current or near-future weather is available on the free OpenWeather API.",
      }, { status: 403 });
    }

    const openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.OPENWEATHER_KEY}&units=metric`;
    const openWeatherResponse = await axios.get(openWeatherURL);

    const temperatureData = openWeatherResponse.data.main?.temp;
    const weatherSymbolData = openWeatherResponse.data.weather?.[0]?.description || "Unknown Condition";

    if (temperatureData === undefined) {
      return NextResponse.json({ error: "Weather data unavailable for this city/date." }, { status: 500 });
    }

    return NextResponse.json({
      city,
      date,
      temperature: `${temperatureData}°C`,
      condition: weatherSymbolData,
    });
  } catch (error) {
    console.error("Weather API Error:", error.response?.data || error.message);
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 });
  }
}
