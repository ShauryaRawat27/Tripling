'use client';

import React, { useState } from 'react';
import axios from 'axios';
import {
  Search,
  Calendar,
  Cloud,
  CloudRain,
  Sun,
  Loader,
  MapPin,
  Thermometer,
  Wind,
  Droplets,
  Home,
} from 'lucide-react';
import { useRouter } from 'next/navigation'; 
import Image from 'next/image';


export default function WeatherPage() {
  const router = useRouter(); 

  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city || !date) {
      setError('Please provide both city and date');
      return;
    }

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const res = await axios.get(`/api/weather?city=${encodeURIComponent(city)}&date=${date}`);
      setWeather(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const goHome = () => router.push('/'); // ✅ Step 3

  const renderWeatherIcon = (condition) => {
    if (!condition) return <Cloud className="w-16 h-16 text-gray-400" />;

    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('rain') || conditionLower.includes('shower')) {
      return <CloudRain className="w-16 h-16 text-blue-500" />;
    } else if (conditionLower.includes('sun') || conditionLower.includes('clear')) {
      return <Sun className="w-16 h-16 text-yellow-500" />;
    } else {
      return <Cloud className="w-16 h-16 text-gray-400" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-4 sm:p-6">
      <Image
                            src="/weather.png"
                            alt="Background Image"
                            layout="fill"
                            objectFit="cover"
                            className="z-[-40] bg-black opacity-40"
                          />
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
          <h1 className="text-2xl font-bold text-center flex justify-center items-center gap-2">
            <Cloud className="w-6 h-6" />
            Weather Forecast
          </h1>
        </div>

        {/* Search Form */}
        <div className="p-6 space-y-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-black w-5 h-5" />
            <input
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border border-gray-300 text-black rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-black w-5 h-5" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 text-black rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <button
            onClick={fetchWeather}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Fetching...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Check Weather
              </>
            )}
          </button>

          {error && (
            <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Weather Results */}
        {weather && (
          <div className="bg-gradient-to-b from-blue-50 to-white p-6 border-t border-gray-100">
            <div className="flex flex-col items-center text-center">
              {/* Location and Date */}
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-1">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  {weather.city}
                </h2>
                <p className="text-gray-500 mt-1">{formatDate(weather.date)}</p>
              </div>

              {/* Weather Icon and Temperature */}
              <div className="mb-6">
                {renderWeatherIcon(weather.condition)}
                <p className="text-4xl font-bold text-blue-600 mt-2">{weather.temperature}</p>
                <p className="text-gray-700 font-medium mt-1">{weather.condition}</p>
              </div>

              {/* Extra Details */}
              <div className="grid grid-cols-2 gap-4 w-full mt-4">
                <div className="bg-blue-50 p-3 rounded-lg flex items-center">
                  <Wind className="w-5 h-5 text-blue-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Wind</p>
                    <p className="font-medium text-gray-700">12 km/h</p>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg flex items-center">
                  <Droplets className="w-5 h-5 text-blue-500 mr-2" />
                  <div>
                    <p className="text-xs text-gray-500">Humidity</p>
                    <p className="font-medium text-gray-700">65%</p>
                  </div>
                </div>
              </div>

              {/* ✅ Home Button */}
              <button
                onClick={goHome}
                className="mt-6 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
