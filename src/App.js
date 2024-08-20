import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage.jsx";
import { LoadScript } from "@react-google-maps/api";

import { fetchWeather, fetchForecast } from "./api.js";

const libraries = ["places"];

// Function to determine browser language and set default to 'en' if undefined
function getBrowserLanguage() {
  const browserLanguage = "en"; // Define the default language as a constant
  const language = navigator.language || navigator.language[0] || browserLanguage;
  return language.split("-")[0]; // Extract language code (e.g., "en" from "en-use")
}

function App() {
  const initialCenter = { lat: 50.4501, lng: 30.5234 };
  const [center, setCenter] = useState(initialCenter);
  const [history, setHistory] = useState([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]); //add State for WeatherForecast
  const [isForecastVisible, setIsForecastVisible] = useState(false); // Add state for visibility of WeatherForecast

  async function handleMapAndSearchbarLocationSelect(position) {
    setCenter(position);
    setSelectedPosition(position); // Update the selected position state

    if (position) {
      try {
        //Fetch the weather data
        const weatherData = await fetchWeather(position);
        if (weatherData) {
          setWeather(weatherData); // Set the state with the received data
        }

        //Fetch the weather forecast data
        const forecastData = await fetchForecast(position);
        if (forecastData) {
          setForecast(forecastData); // Set the state with the received
        }

        //Fetch the location label (city name)
        const label = await fetchLocationLabel(position);
        updateHistory(position, label); // Add to history only if there is a label
      } catch (error) {
        console.error("Error updating weather data: ", error);
      }
    }
  }

  async function fetchLocationLabel(position) {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&key=${process.env.REACT_APP_API_KEY_LOCATION}`
    );
    const data = await response.json();

    if (data.status === "OK") {
      const result = data.results[0]; // The first result returned by the API
      const cityComponent = result.address_components.find(
        (component) =>
          component.types.includes("locality") ||
          component.types.includes("administrative_area_level_1")
      );
      return cityComponent ? cityComponent.long_name : "Unknown Location";
    } else {
      throw new Error("Failed to fetch location label");
    }
  }

  // Function to handle selecting a location from history
  function handleHistoryLocationSelect(position, label) {
    setCenter(position);
    setSelectedPosition(position);

    if (position) {
      fetchWeather(position); // Query the weather for the selected position
      fetchForecast(position); // Request the weather forecast for the selected position
      updateHistory(position, label); // Add to history only if there is a label
    }
  }

  function updateHistory(position, label) {
    const newHistoryItem = { ...position, label }; // Create a new story element
    const newHistory = [newHistoryItem, ...history]; // Add a new element to the beginning of the story
    setHistory(newHistory); // Update the history state
  }

  function deleteHistory(element) {
    const newHistory = history.filter((_, el) => el !== element);
    setHistory(newHistory); // Update the history state
  }

  function handleToggleHistory() {
    setIsHistoryVisible(!isHistoryVisible);
    setIsForecastVisible(false); // Hide WeatherForecast when toggling HistoryPanel
  }

  function handleToggleForecast() {
    setIsForecastVisible(!isForecastVisible);
    setIsHistoryVisible(false); // Hide History when toggling WeatherForecast
  }

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_API_KEY_LOCATION}
      libraries={libraries}
      language={getBrowserLanguage()} //call the function here
    >
      <div className="App">
        <Router basename="/Weather-Location/">
          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  center={center}
                  selectedPosition={selectedPosition}
                  setSelectedPosition={setSelectedPosition}
                  weather={weather}
                  forecast={forecast}
                  history={history}
                  isForecastVisible={isForecastVisible}
                  isHistoryVisible={isHistoryVisible}
                  handleMapAndSearchbarLocationSelect={handleMapAndSearchbarLocationSelect}
                  handleToggleForecast={handleToggleForecast}
                  handleToggleHistory={handleToggleHistory}
                  handleHistoryLocationSelect={handleHistoryLocationSelect}
                  deleteHistory={deleteHistory}
                />
              }
            />
          </Routes>
        </Router>
      </div>
    </LoadScript>
  );
}

export default App;
