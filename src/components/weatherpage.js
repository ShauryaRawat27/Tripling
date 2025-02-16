import { useState } from "react";
import axios from "axios";

export default function WeatherPage() {
    const [city, setCity] = useState("");
    const [date, setDate] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    const fetchWeather = async () => {
        if (!city || !date) {
            setError("Please enter both city and date");
            return;
        }

        setError(null);
        setWeather(null);

        try {
            const response = await axios.get(`/api/weather?city=${city}&date=${date}`);
            setWeather(response.data);
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-5 bg-gray-100">
            <h1 className="text-2xl font-bold mb-5">Weather Forecast</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <input
                    type="text"
                    placeholder="Enter city"
                    className="w-full p-2 border rounded mb-3"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                
                <input
                    type="date"
                    className="w-full p-2 border rounded mb-3"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <button
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    onClick={fetchWeather}
                >
                    Get Weather
                </button>

                {error && <p className="text-red-500 mt-3">{error}</p>}

                {weather && (
                    <div className="mt-5 p-4 bg-gray-200 rounded">
                        <h2 className="text-lg font-semibold">{weather.city} ({weather.date})</h2>
                        <p className="text-xl">🌡️ {weather.temperature}</p>
                        <p className="text-xl">☀️ {weather.condition}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
