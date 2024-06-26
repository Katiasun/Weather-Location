import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Map from "./components/Map/Map.jsx";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import { LoadScript } from "@react-google-maps/api";

function App() {
  const [center, setCenter] = useState({ lat: 41.3851, lng: 2.1734 });

  function handleSelectLocation(position) {
    setCenter(position);
  }

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY_LOCATION}>
      <div className="App">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchBar onSelectLocation={handleSelectLocation} />
                  <Map center={center} onSelect={handleSelectLocation} />
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
