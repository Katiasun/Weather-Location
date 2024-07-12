import React, { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const mapStyles = {
  height: "100vh",
  width: "100%",
};

export default function Map({ center, onSelect }) {
  const [selectedPosition, setSelectedPosition] = useState(null);

  // The function of processing clicks on the map to set the selected position
  function handleClickPosition(event) {
    const position = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setSelectedPosition(position);
    onSelect(position);
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
        maxZoom: 10,
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
      {selectedPosition && <Marker position={selectedPosition} />}
    </GoogleMap>
  );
}
