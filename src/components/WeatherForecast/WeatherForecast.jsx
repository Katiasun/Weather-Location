import React from "react";
import styles from "./WeatherForecast.module.css";
import { WiDaySunny, WiDayCloudy, WiRain, WiSnow, WiThunderstorm, WiCloudy } from "react-icons/wi";

const iconMapping = {
  "01d": <WiDaySunny />,
  "02d": <WiDayCloudy />,
  "03d": <WiCloudy />,
  "04d": <WiCloudy />,
  "09d": <WiRain />,
  "10d": <WiRain />,
  "11d": <WiThunderstorm />,
  "13d": <WiSnow />,
  "50d": <WiCloudy />,
  "01n": <WiDaySunny />,
  "02n": <WiDayCloudy />,
  "03n": <WiCloudy />,
  "04n": <WiCloudy />,
  "09n": <WiRain />,
  "10n": <WiRain />,
  "11n": <WiThunderstorm />,
  "13n": <WiSnow />,
  "50n": <WiCloudy />,
};

export default function WeatherForecast({ forecast }) {
  return (
    <div className={styles.weatherForecast}>
      <div className={styles.weatherForcastHeader}>
        <h3>Weatherforecast</h3>
      </div>

      <div className={styles.weatherForecastContent}>
        {forecast.map((data, index) => (
          <div key={index} className={styles.weatherForecastItem}>
            <div className={styles.weatherForecastDay}>
              {new Date(data.dt * 1000).toLocaleDateString("en-GB", { weekday: "short" })}
            </div>
            <div className={styles.weatherForecastDate}>
              {new Date(data.dt * 1000).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })}
            </div>
            <div className={styles.weatherForecastIcon}>{iconMapping[data.weather[0].icon]}</div>
            <div className={styles.weatherForecastTemper}>
              <span className={styles.tempDay}>{Math.round(data.main.temp_max)}°C</span>
              <span className={styles.tempNight}>{Math.round(data.main.temp_min)}°C</span>
            </div>
            <div className={styles.weatherForecastWind}>Wind: {data.wind.speed} m/s</div>
            <div className={styles.weatherForecastRain}>
              Precipitation: {data.rain ? data.rain["3h"] : 0} mm
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
