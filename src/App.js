import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Map from "./components/Map/Map.jsx";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo.jsx";
import HistoryPanel from "./components/HistoryPanel/HistoryPanel.jsx";
import { LoadScript } from "@react-google-maps/api";

const libraries = ["places"];

function App() {
  const [center, setCenter] = useState({ lat: 50.4501, lng: 30.5234 });
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);

  // A function to update the center of the map when selecting a new location
  function handleSelectLocation(position, label) {
    setCenter(position);
    fetchWeather(position);
    updateHistory(position, label);
  }

  function updateHistory(position, label) {
    const newHistoryItem = { ...position, label };
    const newHistory = [newHistoryItem, ...history];
    setHistory(newHistory);
  }

  async function fetchWeather({ lat, lng }) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_WEATHER_API_KEY_LOCATION}&units=metric`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
  }
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY_LOCATION} libraries={libraries}>
      <div className="App">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchBar onSelectLocation={handleSelectLocation} />
                  <Map center={center} onSelect={handleSelectLocation} />
                  {weather && <WeatherInfo weather={weather} />}
                  <HistoryPanel history={history} />
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
