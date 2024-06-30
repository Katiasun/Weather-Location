import React from "react";

export default function WeatherInfo({ weather }) {
  return (
    <div>
      <h3>Weather Information</h3>
      <p>Location: {}</p>
      <p>Temperature: {}</p>
      <p>Condition: {}</p>
    </div>
  );
}
