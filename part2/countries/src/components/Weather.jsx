import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ city }) => {
  const getWeather = (city) => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    return axios.get(url).then((response) => response.data);
  };

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getWeather(city).then((data) => {
      setWeather(data);
    });
  }, [city]);

  return (
    <div>
      <h2>Weather in {city}</h2>
      {weather ? (
        <div>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt="Weather icon"
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
