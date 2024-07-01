import React from "react";

export default function WeatherInfo({ weather }) {
  return (
    <div>
      <h3>Weather Information</h3>
      <p>Location: {weather.name}</p>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Condition: {weather.weather[0].description}</p>
    </div>
  );
}
