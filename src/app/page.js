"use client";
import { FaCloudSun } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { FaCloud, FaSearch, FaWind, FaCloudRain, FaListUl, FaMap, FaSlidersH, FaSnowflake, FaBolt } from 'react-icons/fa';
import { IoSunny } from "react-icons/io5";
import { BsFillCloudFogFill } from "react-icons/bs";

// Map Open-Meteo weather codes to icons
function getWeatherIcon(code, size = "text-[3rem]") {
  if ([0].includes(code)) return <IoSunny className={`text-amber-500 ${size}`} />; // Clear sky
  if ([1, 2].includes(code)) return < FaCloudSun className={`text-gray-400 ${size}`} />; // Partly cloudy
  if ([3].includes(code)) return <FaCloud className={`text-gray-500 ${size}`} />; // Overcast
  if ([45, 48].includes(code)) return <BsFillCloudFogFill className={`text-gray-300 ${size}`} />; // Fog
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return <FaCloudRain className={`text-blue-200 ${size}`} />; // Rain
  if ([71, 73, 75, 85, 86].includes(code)) return <FaSnowflake className={`text-blue-200 ${size}`} />; // Snow
  if ([95, 96, 99].includes(code)) return <FaBolt className={`text-yellow-400 ${size}`} />; // Thunderstorm
  return <FaCloud className={`text-gray-400 ${size}`} />; // Default cloudy
}

export default function Homepage() {
  const [weather, setWeather] = useState(null);
  const [daily, setDaily] = useState([]);
  const [city, setCity] = useState("Tokyo");
  const debounceTimer = useRef(null);

  // Function to calculate length of the day
  function getDayLength(sunrise, sunset) {
    if (!sunrise || !sunset) return "-";
    const sunriseTime = new Date(sunrise);
    const sunsetTime = new Date(sunset);
    const diffMs = sunsetTime - sunriseTime;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  }

  // Auto search after typing
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      if (city.trim()) fetchWeather(city);
    }, 3000);
    return () => clearTimeout(debounceTimer.current);
  }, [city]);

  // Fetch weather from Open-Meteo
  async function fetchWeather(cityName) {
    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`);
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) return;

      const { latitude, longitude, name } = geoData.results[0];
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,weathercode,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,weathercode,uv_index_max&timezone=auto`
      );
      const weatherData = await weatherRes.json();

      setWeather({
        name,
        current: weatherData.current_weather,
        hourly: weatherData.hourly
      });

      setDaily(weatherData.daily?.time?.map((date, i) => ({
        date,
        max: weatherData.daily.temperature_2m_max[i],
        min: weatherData.daily.temperature_2m_min[i],
        sunrise: weatherData.daily.sunrise[i],
        sunset: weatherData.daily.sunset[i],
        rainChance: weatherData.daily.precipitation_probability_max[i],
        weathercode: weatherData.daily.weathercode[i],
        uvIndex: weatherData.daily.uv_index_max[i]
      })) || []);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  }

  const current = weather?.current;

  return (
    <div className="flex flex-row h-screen">
      {/* LEFT PANEL */}
      <div className=" w-1/7 ">
        <div className="mb-5 flex flex-col mx-5 px-6 py-6 space-y-20 justify-center items-center bg-gray-800/60 rounded-[20px] my-5 h-[95%]">
          <div className="text-gray-500 flex flex-col items-center justify-center gap-3"><FaCloudRain className="text-3xl" />Weather</div>
          <div className="text-gray-500 flex flex-col items-center justify-center gap-3"><FaListUl className="text-3xl" />Cities</div>
          <div className="text-gray-500 flex flex-col items-center justify-center gap-3"><FaMap className="text-3xl" />Map</div>
          <div className="text-gray-500 flex flex-col items-center justify-center gap-3"><FaSlidersH className="text-3xl" />Setting</div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className=" md:w-4/6 sm:w-10/12">
        {/* Search Bar */}
        <div className="relative flex items-center m-5">
          <FaSearch className="absolute left-5 text-gray-500" />
          <input
            className="h-[40px] bg-gray-800/60 w-full pl-12 pr-5 rounded-xl border border-gray-300 focus:outline-none"
            type="text"
            placeholder="Enter the city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        {/* WEATHER PANEL */}
        {weather && current && (
          <>
            <div className="mx-9 justify-between items-center flex flex-row my-5">
              <div className="flex flex-col space-y-5">
                <div>
                  <div className="font-bold text-4xl">{weather.name}</div>
                  <div className="text-gray-500 text-[18px]">{new Date().toLocaleString()}</div>
                </div>
                <div className="flex items-center flex-row space-x-10 p-0">
                  <div className="flex flex-col justify-center items-center ">
                    <div className="text-8xl font-bold ">{Math.round(current.temperature)}°</div>
                    <div className="text-md text-gray-200 mt-3 gap-2 flex flex-row text-[18px]">
                      <span>High : {daily[0]?.max}</span>
                      <span>Low : {daily[0]?.min}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Weather Icon */}
              <div className="flex items-center space-y-10 flex-col ">
                {getWeatherIcon(current.weathercode, "text-[10rem]")}
                <span className="text-gray-200 text-[18px]">Feels like: {Math.round(weather.hourly?.apparent_temperature?.[0] ?? current.temperature)}°</span>
              </div>
            </div>

            {/* Today's Forecast */}
            <div className="mb-5 bg-gray-800/60 rounded-[20px] flex flex-col mx-5 px-6 py-4 space-y-5">
              <p className="text-gray-500 font-bold uppercase">Today's Forecast</p>
              <div className="flex items-center justify-between overflow-x-scroll scrollbar-hide">
                {weather.hourly?.temperature_2m?.slice(0, 6).map((temp, index) => (
                  <div key={index} className="flex flex-col space-y-2 justify-center items-center border-r border-gray-500/50 px-5">
                    <span className="font-bold text-sm text-gray-500 whitespace-nowrap">
                      {new Date(weather.hourly.time[index]).getHours()}:00
                    </span>
                    {getWeatherIcon(weather.hourly.weathercode[index], "text-3xl")}
                    <span className="text-gray-100 font-bold">{Math.round(temp)}°</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-row mx-5 gap-5  rounded-[20px] bg-gray-800/60">
              {/* Today' Highlight */}
              <div className="mb-5 w-[65%] space-y-5  flex flex-col px-6 py-4">
                <p className="text-gray-500 font-bold uppercase">Today Highlight</p>
                <div className="flex flex-row">
                  <div className="flex-row flex gap-2 w-1/2">
                    <span><FaWind /></span>
                    <span className="flex flex-col">
                      <div>Humidity: {weather.hourly?.relative_humidity_2m?.[0] ?? "-"}%</div>
                    </span>
                  </div>
                  <div className="flex-row flex gap-2 w-1/2">
                    <span><FaWind /></span>
                    <span className="flex flex-col">
                      <div>Wind Speed</div>
                      <div>{Math.round(current.windspeed)} km/h</div>
                    </span>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="flex-row flex gap-2 w-1/2">
                    <span><FaWind /></span>
                    <span className="flex flex-col">
                      <span>UV Index: {daily[0]?.uvIndex ?? "-"}</span>
                    </span>
                  </div>
                  <div className="flex-row flex gap-2 w-1/2">
                    <span><FaWind /></span>
                    <span className="flex flex-col">
                      <span>Chance of Rain</span>
                      <span>{daily[0]?.rainChance ?? "-"}%</span>
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Sunrise/Sunset/Length of Day */}
              <div className="mb-5 bg-blue-600/20 space-y-5 rounded-[20px] flex flex-col my-4 px-12 py-4">
                <div className="text-gray-500 font-bold uppercase">Sunrise</div>
                <div className="text-xl">{daily[0]?.sunrise ? new Date(daily[0].sunrise).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase() : "-"}</div>

                <div className="text-gray-500 font-bold uppercase">Sunset</div>
                <div className="text-xl">{daily[0]?.sunset ? new Date(daily[0].sunset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase(): "-"}</div>

                <div className="text-gray-500 font-bold uppercase">Length of day</div>
                <div className="text-xl">{getDayLength(daily[0]?.sunrise, daily[0]?.sunset)}</div>
              </div>
    
            </div>
          </>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div className="  w-2/6 md:block hidden">
        <div className="mb-5 bg-gray-800/60 mt-10 rounded-[20px] flex flex-col mx-5 px-6 py-5 space-y-5">
          <div className="text-gray-500 font-bold uppercase">7 Day Forecast</div>
          {daily.length > 0 ? (
            <div className="space-y-10">
              {daily.map((day, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-400 py-2">
                  <span>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                  <span className="flex items-center gap-2">{getWeatherIcon(day.weathercode, "text-5xl")}</span>
                  <span>{Math.round(day.max)}° / {Math.round(day.min)}°</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400">No forecast data</div>
          )}
        </div>
      </div>
    </div>
  );
}
