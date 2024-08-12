import React, { useState, useEffect } from "react";
import { InfoWindow } from "@react-google-maps/api";
import styles from "./WeatherTooltip.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// remove unused
import { faCircleChevronDown, faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function WeatherTooltip({ position, weather, onClose }) {
  const [showDetails, setShowDetails] = useState(false);

  // why do you need this?
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

  function toggleDetails() {
    setShowDetails(!showDetails);
  }

  function showSunTime(timestap) {
    const data = new Date(timestap * 1000);
    return data.toLocaleTimeString();
  }

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
        <button onClick={toggleDetails} className={styles.detailsButton}>
          <FontAwesomeIcon icon={showDetails ? faChevronUp : faChevronDown} />
          <span className={styles.detailsBtnTitle}>
            {showDetails ? "Hide Details" : "Show Details"}
          </span>
        </button>
        {showDetails && (
          <div className={styles.weatherDetails}>
            <p className={styles.weatherDetail}>
              <span className={styles.weatherLabel}>Sunrise: </span>
              {showSunTime(weather.sys.sunrise)}
            </p>
            <p className={styles.weatherDetail}>
              <span className={styles.weatherLabel}>Sunset: </span>
              {showSunTime(weather.sys.sunset)}
            </p>
            <p className={styles.weatherDetail}>
              <span className={styles.weatherLabel}>Humidity: </span>
              {weather.main.humidity}%
            </p>
            <p className={styles.weatherDetail}>
              <span className={styles.weatherLabel}>Wind Speed: </span>
              {weather.wind.speed} m/s
            </p>
            <p className={styles.weatherDetail}>
              <span className={styles.weatherLabel}>Feels Like: </span>
              {weather.main.feels_like}°C
            </p>
          </div>
        )}
      </div>
    </InfoWindow>
  );
}
