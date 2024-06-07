import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventList from "./components/eventList/EventList.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/">
            {/* element={<>
              <EventForm />
            <Weather/>
            </>} */}
          </Route>

          <Route path="/eventList" element={<EventList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
