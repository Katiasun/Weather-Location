import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Map from "./components/Map/Map.jsx";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import HistoryPanel from "./components/HistoryPanel/HistoryPanel.jsx";
import WeatherForecast from "./components/WeatherForecast/WeatherForecast.jsx";
import { LoadScript } from "@react-google-maps/api";

const libraries = ["places"];

// Function to determine browser language and set default to 'en' if undefined
function getBrowserLanguage() {
  const language = navigator.language || navigator.language[0] || "en";
  return language.split("-")[0]; //Extract language code (e.g., "en" from "en-use")
}

function App() {
  const [center, setCenter] = useState({ lat: 50.4501, lng: 30.5234 });
  const [history, setHistory] = useState([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]); //add State for WeatherForecast
  const [isForecastVisible, setIsForecastVisible] = useState(false); // Add state for visibility of WeatherForecast

  // A function to update the center of the map when selecting a new location
  function handleSelectLocation(position, label = null) {
    setCenter(position); // Update the center of the map
    setSelectedPosition(position); // Update the selected position state
    if (position) {
      fetchWeather(position); // Request the current weather for the selected position
      fetchForecast(position); // Request the weather forecast for the selected position
    }

    if (label) {
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

  // Handle clicks on the map to set the selected position and request the weather
  async function fetchWeather({ lat, lng }) {
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
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
  }

  async function fetchForecast({ lat, lng }) {
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

      const forecastData = data.list.filter((_, index) => index % 8 === 0);
      console.log("Filtered forecast data:", forecastData); // Перевірте відфільтровані дані

      setForecast(forecastData);
    } catch (error) {
      console.log("Error getching weatherforecast data: ", error);
    }
  }

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_API_KEY_LOCATION}
      libraries={libraries}
      language={getBrowserLanguage()} //call the function here
    >
      <div className="App">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="layoutForecast">
                    <WeatherForecast forecast={forecast} isVisible={isForecastVisible} />
                  </div>
                  <SearchBar onSelectLocation={handleSelectLocation} />
                  <Map
                    center={center}
                    onSelect={handleSelectLocation}
                    selectedPosition={selectedPosition}
                    setSelectedPosition={setSelectedPosition}
                    weather={weather}
                  />
                  <div className="controlsBtnShow">
                    <button
                      className="showAndHideHistory"
                      onClick={() => setIsHistoryVisible(!isHistoryVisible)}
                    >
                      {isHistoryVisible ? "Hide History" : "Show History"}
                    </button>
                    <button
                      className="showAndHidForecast"
                      onClick={() => setIsForecastVisible(!isForecastVisible)}
                    >
                      {isForecastVisible ? "Hide Forecast" : "Show Forecast"}
                    </button>
                  </div>
                  <HistoryPanel
                    history={history}
                    onDelete={deleteHistory}
                    onSelect={handleSelectLocation}
                    isVisible={isHistoryVisible}
                  />
                </>
              }
            />
          </Routes>
        </Router>
      </div>
    </LoadScript>
  );
}

export default App;
