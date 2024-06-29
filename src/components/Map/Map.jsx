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
      zoom={12}
      center={center}
      onClick={handleClickPosition}
    >
      {selectedPosition && <Marker position={selectedPosition} />}
    </GoogleMap>
  );
}
