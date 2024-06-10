import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Map from "./components/Map/Map.jsx";

function App() {
  function handleSelectLocation(position) {
    console.log("Selected position", position);
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Map onSelect={handleSelectLocation} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
