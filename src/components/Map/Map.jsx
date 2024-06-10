import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import styles from "./styles.module.css";

const mapStyles = {
  height: "100vh",
  width: "100%",
};

const defaultCenter = {
  lat: 41.3851,
  lng: 2.1734,
};

export default function Map() {
  const [selectedPosition, setSelectedPosition] = useState(null);
  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} />
    </LoadScript>
  );
}
