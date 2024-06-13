import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Map from "./components/Map/Map.jsx";

function App() {
  const [center, setCenter] = useState({ lat: 41.3851, lng: 2.1734 });
  const [selectedPosition, setSelectedPosition] = useState(null);

  function handleSelectLocation(position) {
    setCenter(position);
    setSelectedPosition(position);
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Map center={center} onSelect={handleSelectLocation} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
