import React, { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import WeatherTooltip from "../WeatherTooltip/WeatherTooltip";

const mapStyles = {
  height: "100vh",
  width: "100%",
};

const markerStyles = {
  zIndex: 10, // Set a high z-index for the marker
};

export default function Map({ center, onSelect }) {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [weather, setWeather] = useState(null);

  // Handle clicks on the map to set the selected position and request the weather
  async function handleClickPosition(event) {
    const position = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setSelectedPosition(position);
    onSelect(position);

    // Query the weather for the selected position
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lng}&appid=${process.env.REACT_APP_WEATHER_API_KEY_LOCATION}&units=metric`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
  }

  return (
    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={6}
      center={center}
      onClick={handleClickPosition}
      options={{
        disableDefaultUI: true,
        dragggable: true,
        gestureHandling: "greedy",
        mapTypeControl: true,
        minZoom: 3,
        maxZoom: 12,
        restriction: {
          latLngBounds: {
            north: 85,
            south: -85,
            east: 180,
            west: -180,
          },
        },
        strictBounds: true,
      }}
    >
      {selectedPosition && (
        <Marker position={selectedPosition} options={{ styles: markerStyles }} />
      )}
      {selectedPosition && weather && (
        <WeatherTooltip
          position={selectedPosition}
          weather={weather}
          onClose={() => setSelectedPosition(null)} // Close tooltip
        />
      )}
    </GoogleMap>
  );
}
