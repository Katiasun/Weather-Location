import React from "react";
import styles from "./WeatherForecast.module.css";
import WeatherForecastItem from "./WeatherForecastItem/WeatherForecastItem";

export default function WeatherForecast({ forecast, isVisible }) {
  return (
    <div className={`${styles.showForecastHide} ${isVisible ? styles.visible : styles.hidden}`}>
      <div className={styles.weatherForcastHeader}>
        <h3>Weather Forecast</h3>
      </div>
      <div className={styles.weatherForecastContent}>
        {forecast.map((data, index) => (
          <WeatherForecastItem key={index} data={data} />
        ))}
      </div>
    </div>
  );
}
