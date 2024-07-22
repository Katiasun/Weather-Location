import React, { useEffect } from "react";
import { InfoWindow } from "@react-google-maps/api";
import styles from "./WeatherTooltip.module.css";

export default function WeatherTooltip({ position, weather, onClose }) {
  useEffect(() => {
    const intervalId = setInterval(() => {
      const closeButton = document.querySelector(".gm-ui-hover-effect");

      if (closeButton) {
        closeButton.style.fontSize = "16px";
        closeButton.style.color = "#5f6368";
        closeButton.style.width = "40px";
        closeButton.style.height = "24px";
        closeButton.style.border = "none";
        closeButton.style.cursor = "pointer";

        clearInterval(intervalId);
      }
    }, 100);
  }, []);

  return (
    <InfoWindow
      position={position}
      onCloseClick={onClose}
      options={{ pixelOffset: new window.google.maps.Size(0, -30) }}
      className={styles.customInfowindow}
    >
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
