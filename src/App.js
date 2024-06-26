import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Map from "./components/Map/Map.jsx";
import SearchBar from "./components/SearchBar/SearchBar.jsx";

function App() {
  const [center, setCenter] = useState({ lat: 41.3851, lng: 2.1734 });

  function handleSelectLocation(position) {
    setCenter(position);
  }

  return (
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
  );
}

export default App;
