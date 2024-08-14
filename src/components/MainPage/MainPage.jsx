import React from "react";
import WeatherForecast from "../WeatherForecast/WeatherForecast.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Map from "../Map/Map.jsx";
import HistoryPanel from "../HistoryPanel/HistoryPanel.jsx";

export default function MainPage({
  center,
  selectedPosition,
  setSelectedPosition,
  weather,
  forecast,
  isForecastVisible,
  isHistoryVisible,
  history,
  deleteHistory,
  handleHistoryLocationSelect,
  handleMapAndSearchbarLocationSelect,
  handleToggleForecast,
  handleToggleHistory,
}) {
  return (
    <>
      <div className="layoutForecast">
        <WeatherForecast forecast={forecast} isVisible={isForecastVisible} />
      </div>
      <SearchBar onSelectLocation={handleMapAndSearchbarLocationSelect} />
      <Map
        center={center}
        onSelect={handleMapAndSearchbarLocationSelect}
        selectedPosition={selectedPosition}
        setSelectedPosition={setSelectedPosition}
        weather={weather}
      />
      <div className="controlsBtnShow">
        <button className="controlsBtnShow__showAndHidForecast" onClick={handleToggleForecast}>
          {isForecastVisible ? "Hide Forecast" : "Show Forecast"}
        </button>
        <button className="controlsBtnShow__showAndHideHistory" onClick={handleToggleHistory}>
          {isHistoryVisible ? "Hide History" : "Show History"}
        </button>
      </div>
      <HistoryPanel
        history={history}
        onDelete={deleteHistory}
        onSelect={handleHistoryLocationSelect}
        isVisible={isHistoryVisible}
      />
    </>
  );
}
