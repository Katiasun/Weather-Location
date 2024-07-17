import React from "react";
import { InfoWindow } from "@react-google-maps/api";
import styles from "./WeatherToolyipple.css";

export default function WeatherToolyipple({ position, weather, onClose }) {
  return (
    <InfoWindow position={position} onCloseClick={onClose}>
      <div className={styles.weatherTooltip}>
        <h3 className={styles.weatherTitle}>Weather Information</h3>
        <p className={styles.weatherDetail}>
          <span className={styles.weatherLabel}>Location: </span>
          {weather.name}
        </p>
        <p className={styles.weatherDetail}>
          <span className={styles.weatherLabel}>Temperature: </span>
          {weather.main.temp}°C
        </p>
        <p className={styles.weatherDetail}>
          <span className={styles.weatherLabel}>Condition: </span>
          {weather.weather[0].description}
        </p>
      </div>
    </InfoWindow>
  );
}
