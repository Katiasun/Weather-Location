import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapStyles = {
  height: "100vh",
  width: "100%",
};

export default function Map({ center, onSelect }) {
  const [selectedPosition, setSelectedPosition] = useState(null);

  function handleClickPosition(event) {
    const position = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    setSelectedPosition(position);
    onSelect(position);
  }

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY_LOCATION}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={center}
        onClick={handleClickPosition}
      />
      {selectedPosition && <Marker position={selectedPosition} />}
      <GoogleMap />
    </LoadScript>
  );
}
