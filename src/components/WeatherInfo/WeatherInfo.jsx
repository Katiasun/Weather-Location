import React from "react";
import styles from "./WeatherInfo.module.css";

export default function WeatherInfo({ weather }) {
  return (
    <div className={styles.weatherInfo}>
      <h3 className={styles.weatherTitle}>Weather Information</h3>
      <p className={styles.weatherDetail}>
        <span className={styles.weatherLabel}>Location:</span> {weather.name}
      </p>
      <p className={styles.weatherDetail}>
        <span className={styles.weatherLabel}>Temperature:</span> {weather.main.temp}°C
      </p>
      <p className={styles.weatherDetail}>
        <span className={styles.weatherLabel}>Condition: </span> {weather.weather[0].description}
      </p>
    </div>
  );
}