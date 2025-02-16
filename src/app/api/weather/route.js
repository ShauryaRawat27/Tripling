import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");
    const date = searchParams.get("date");

    if (!city || !date) {
        return NextResponse.json({ error: "City and date are required" }, { status: 400 });
    }

    const earliestAllowedDate = new Date().toISOString().split('T')[0];
    const requestedDate = new Date(date);

    if (requestedDate < earliestAllowedDate) {
        return NextResponse.json({ 
            error: `Your API subscription does not allow data before ${earliestAllowedDate.toISOString().split('T')[0]}. Please select a date after ${earliestAllowedDate.toISOString().split('T')[0]}.` 
        }, { status: 403 });
    }

    try {
   
        const geocodeResponse = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${process.env.OPENCAGE_KEY}`
        );

        if (geocodeResponse.data.results.length === 0) {
            return NextResponse.json({ error: "City not found" }, { status: 404 });
        }

        const { lat, lng } = geocodeResponse.data.results[0].geometry;
        const formattedDate = `${date}T12:00:00Z`;

      
        let url = `https://api.meteomatics.com/${formattedDate}/t_2m:C/${lat},${lng}/json`;
        console.log("Fetching Temperature:", url);

        let weatherResponse = await axios.get(url, {
            auth: {
                username: process.env.WEATHERAPI_USERNAME,
                password: process.env.WEATHERAPI_PASSWORD,
            },
        });

        const temperatureData = weatherResponse.data.data?.[0]?.coordinates?.[0]?.dates?.[0]?.value;

        if (!temperatureData) {
            return NextResponse.json({ error: "No weather data available" }, { status: 500 });
        }

     
        let weatherSymbolData;
        const today = new Date();
        const diffDays = Math.floor((requestedDate - today) / (1000 * 60 * 60 * 24));

        if (diffDays <= 14) {
            try {
                const openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.OPENWEATHER_KEY}&units=metric`;
                console.log("Fetching Weather Symbol:", openWeatherURL);

                const openWeatherResponse = await axios.get(openWeatherURL);
                weatherSymbolData = openWeatherResponse.data.weather?.[0]?.description || "Unknown Condition";
            } catch (error) {
                console.error("Failed to Fetch Weather Symbol from OpenWeatherMap:", error.response?.data || error.message);
                weatherSymbolData = "N/A (Weather symbol not available)";
            }
        } else {
            weatherSymbolData = "Forecast unavailable for this date";
        }

        return NextResponse.json({
            city,
            date,
            temperature: `${temperatureData}°C`,
            condition: weatherSymbolData,
        });
    } catch (error) {
        console.error("Error fetching weather data:", error.response?.data || error.message);
        return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 });
    }
}
