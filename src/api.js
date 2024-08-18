// Handle clicks on the map to set the selected position and request the weather
export async function fetchWeather({ lat, lng }) {
  if (!lat || !lng) return;
  // Query the weather for the selected position
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_WEATHER_API_KEY_LOCATION}&units=metric`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Return data instead of calling setWeather
  } catch (error) {
    console.error("Error fetching weather data: ", error);
  }
}

export async function fetchForecast({ lat, lng }) {
  if (!lat || !lng) return;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_WEATHER_API_KEY_LOCATION}&units=metric`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Weather forecast data:", data); // Перевірте дані

    const forecastData = data.list.filter((item, index) => index % 8 === 0).slice(0, 7);
    console.log("Filtered forecast data:", forecastData); // Перевірте відфільтровані дані

    return forecastData; // Return data instead of calling setForecast
  } catch (error) {
    console.log("Error getching weatherforecast data: ", error);
  }
}
