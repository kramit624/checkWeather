import {
  CloudRainWind,
  Sunrise,
  Sunset,
  Thermometer,
  ThermometerSun,
  Waves,
  Wind,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useGeolocated } from "react-geolocated";
import React from "react";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const inputRef = useRef(null);
  const [day, setDay] = useState("");
  const [uv, setUv] = useState();
  const [uvText, setUVText] = useState("");


  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearch(event.target.value);
    }
  };

  useEffect(() => {
    if (coords) {
      axios
        .get(
          `http://api.weatherapi.com/v1/forecast.json?key=6f29a7370fda4809a98162456241909&q=${coords.latitude},${coords.longitude}&days=1&aqi=yes&alerts=no`
        )
        .then((response) => setWeather(response.data))
        .catch((error) => console.error("Error fetching weather:", error));
    } else {
      axios
        .get(
          `http://api.weatherapi.com/v1/forecast.json?key=6f29a7370fda4809a98162456241909&q=patna&days=1&aqi=yes&alerts=no`
        )
        .then((response) => setWeather(response.data))
        .catch((error) => console.error("Error fetching weather:", error));
    }
    const today = new Date();
    setDay(today.toLocaleDateString("en-US", { weekday: "long" }));
  }, [coords]);

  useEffect(() => {
    if (search) {
      axios
        .get(
          `http://api.weatherapi.com/v1/forecast.json?key=6f29a7370fda4809a98162456241909&q=${search}&days=1&aqi=yes&alerts=no`
        )
        .then((response) => setWeather(response.data))
        .catch((error) => console.error("Error fetching weather:", error));
    }
    const today = new Date();
    setDay(today.toLocaleDateString("en-US", { weekday: "long" }));
  }, [search]);

  useEffect(() => {
    if (weather?.forecast?.forecastday?.[0]?.day?.uv !== undefined) {
      setUv(weather.forecast.forecastday[0].day.uv);
    }
  }, [weather]);

  useEffect(() => {
    function getUVCategory(uvIndex) {
      if (uvIndex >= 0 && uvIndex <= 2) return "Low";
      if (uvIndex >= 3 && uvIndex <= 5) return "Moderate";
      if (uvIndex >= 6 && uvIndex <= 7) return "High";
      if (uvIndex >= 8 && uvIndex <= 10) return "Very High";
      if (uvIndex >= 11) return "Extreme";
      return "Invalid UV Index";
    }

    setUVText(getUVCategory(uv));
  }, [uv]);

  return (
    <>
      <div className="w-full h-full p-5 bg-gray-900">
        {weather ? (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Panel */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-6">
                <input
                  onKeyDown={handleKeyDown}
                  ref={inputRef}
                  className="w-full p-2 rounded-lg bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none"
                  placeholder="Search city..."
                  type="text"
                />
              </div>
              <div className="flex flex-col items-center">
                <img
                  alt="Weather icon showing sun behind a cloud with rain"
                  className="mb-4"
                  height="200"
                  src={weather.current.condition.icon}
                  width="200"
                />
                <h2 className="text-6xl font-bold mb-2 text-white">
                  {weather.current.temp_c}°C
                </h2>
                <div className="flex justify-between w-full text-lg mb-6 text-white">
                  <h2 className="font-semibold">{weather.location.name}</h2>
                  <h2 className="font-semibold">{day}</h2>
                </div>
                <hr className="w-full border-gray-600 mb-4" />

                <div className="text-sm text-gray-400 mb-4 w-full flex flex-col">
                  <div className="flex gap-2 items-center mb-2">
                    <img
                      className="w-[50px]"
                      src={weather.forecast.forecastday[0].day.condition.icon}
                      alt=""
                    />
                    <h2 className="text-lg font-medium">
                      {weather.forecast.forecastday[0].day.condition.text}
                    </h2>
                  </div>
                  <div className="flex gap-2 items-center mb-2">
                    <Thermometer />
                    <h2 className="text-lg font-medium">
                      Min Temperature -{" "}
                      {weather.forecast.forecastday[0].day.mintemp_c}°C
                    </h2>
                  </div>
                  <div className="flex gap-2 items-center mb-2">
                    <ThermometerSun />
                    <h2 className="text-lg font-medium">
                      Max Temperature -{" "}
                      {weather.forecast.forecastday[0].day.maxtemp_c}°C
                    </h2>
                  </div>
                </div>

                <div className="flex bg-gray-900 py-5 justify-evenly flex-wrap rounded-4xl w-full text-sm text-gray-400">
                  <div className="flex gap-2 items-center">
                    <Waves />
                    <h2 className="text-lg font-medium">
                      {weather.current.humidity}% Humidity
                    </h2>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Wind />
                    <h2 className="text-lg font-medium">
                      {weather.current.wind_kph} km/h Wind Speed
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-lg font-bold text-white mb-4">
                Today's Overview
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:grid-rows-3 md:grid-rows-2 gap-4 mb-6">
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <h2 className="text-sm mb-2 text-white font-medium">
                    Air Quality Index
                  </h2>
                  <h2 className="text-2xl font-bold mb-2 text-white">
                    {weather.current.air_quality["pm2_5"]?.toFixed(1)}
                  </h2>
                  <h2 className="text-green-500 font-medium">Good</h2>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <h2 className="text-sm mb-2 text-white font-medium">
                    UV Index
                  </h2>
                  <h2 className="text-2xl font-bold mb-2 text-white">
                    {weather.forecast.forecastday[0].day.uv}
                  </h2>
                  <h2
                    className={`font-medium ${
                      uvText == "Low" ? "text-red-600" : "text-yellow-500"
                    }`}
                  >
                    {uvText}
                  </h2>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg text-center">
                  <h2 className="text-sm mb-2 text-white font-medium">
                    Pressure (hpa)
                  </h2>
                  <h2 className="text-2xl font-bold mb-2 text-white">
                    {weather.current.pressure_mb}
                  </h2>
                  <h2 className="text-gray-400 font-medium">Normal</h2>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg flex flex-col gap-4 justify-center items-center">
                  <h2 className="text-2xl text-white font-medium">
                    Feels Like
                  </h2>
                  <Thermometer className="text-2xl text-white font-medium" />
                  <h2 className="text-2xl text-white font-medium">
                    {weather.current.feelslike_c}°C
                  </h2>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg flex flex-col gap-4 justify-center items-center">
                  <h2 className="text-xl md:text-[15px] text-white font-medium md:font-bold">
                    Chance Of Rain
                  </h2>
                  <CloudRainWind className="text-2xl text-white font-medium" />
                  <h2 className="text-2xl text-white font-medium">
                    {weather.forecast.forecastday[0].day.daily_chance_of_rain}%
                  </h2>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="bg-gray-700 p-4 rounded-lg flex-1">
                  <h2 className="text-lg mb-2 text-white font-medium">
                    Sunrise &amp; Sunset
                  </h2>
                  <div className="flex justify-between flex-col mt-4 gap-5">
                    <div className="flex items-center gap-3 bg-gray-500 py-5 rounded-2xl px-2">
                      <Sunrise className="text-white" />
                      <div>
                        <h2 className="text-sm text-white font-medium">
                          Sunrise
                        </h2>
                        <h2 className="text-lg font-bold text-white">
                          {weather.forecast.forecastday[0].astro.sunrise}
                        </h2>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-500 py-5 rounded-2xl px-2">
                      <Sunset className="text-white" />
                      <div>
                        <h2 className="text-sm text-white font-medium">
                          Sunset
                        </h2>
                        <h2 className="text-lg font-bold text-white">
                          {weather.forecast.forecastday[0].astro.sunset}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <h2 className="text-white text-4xl font-bold">
              Loading weather data...
            </h2>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
