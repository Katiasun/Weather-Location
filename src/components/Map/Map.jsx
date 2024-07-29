import React, { useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import WeatherTooltip from "../WeatherTooltip/WeatherTooltip";
import { getGeocode } from "use-places-autocomplete";
import styles from "./Map.module.css";

const mapStyles = {
  height: "100vh",
  width: "100%",
};

export default function Map({ center, onSelect, selectedPosition, setSelectedPosition, weather }) {
  const mapRef = React.useRef(null);

  useEffect(() => {
    // Center the map at the new coordinates
    if (selectedPosition && mapRef.current) {
      mapRef.current.panTo(selectedPosition);
    }
  }, [selectedPosition]);

  async function handleClickPosition(event) {
    const position = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    try {
      const results = await getGeocode({ location: position });
      const cityResult = results.find((result) => result.types.includes("locality"));
      let city = null;
      if (cityResult) {
        city = cityResult.address_components.find((component) =>
          component.types.includes("locality")
        )?.long_name;
      }

      if (!city) {
        city = results
          .find((result) => result.types.includes("administrative_area_level_1"))
          ?.address_components.find((component) =>
            component.types.includes("administrative_area_level_1")
          )?.long_name;
      }

      onSelect(position, city || "Unknown city");
    } catch (error) {
      console.error("Error getting address", error);
      onSelect(position, "Unknown error");
    }
  }

  return (
    <div className={styles.mapContainer}>
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
        onLoad={(map) => (mapRef.current = map)}
      >
        {selectedPosition && <Marker position={selectedPosition} />}
        {selectedPosition && weather && (
          <WeatherTooltip
            position={selectedPosition}
            weather={weather}
            onClose={() => setSelectedPosition(null)} // Close tooltip
          />
        )}
      </GoogleMap>
    </div>
  );
}
