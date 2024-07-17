import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Map from "./components/Map/Map.jsx";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import HistoryPanel from "./components/HistoryPanel/HistoryPanel.jsx";
import { LoadScript } from "@react-google-maps/api";

const libraries = ["places"];

function App() {
  const [center, setCenter] = useState({ lat: 50.4501, lng: 30.5234 });
  const [history, setHistory] = useState([]);

  // A function to update the center of the map when selecting a new location
  function handleSelectLocation(position, label = null) {
    setCenter(position); // Update the center of the map
    if (label) {
      updateHistory(position, label); // Add to history only if there is a label
    }
  }

  function updateHistory(position, label) {
    const newHistoryItem = { ...position, label }; // Create a new story element
    const newHistory = [newHistoryItem, ...history]; // Add a new element to the beginning of the story
    setHistory(newHistory); // Update the history state
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
