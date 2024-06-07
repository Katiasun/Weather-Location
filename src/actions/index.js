import axios from "axios";

// Actions for events

export const setEvents = (events) => {
  return {
    type: "SET_EVENTS",
    payload: events,
  };
};

// Actions for weather

export const setWeather = (weatherData) => {
  return {
    type: "SET_WEATHER",
    payload: weatherData,
  };
};

// An example of an asynchronous action using Thunk

export const fetchEvents = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q={city}&appid=dbdffcbb48362b084c7774b1fa09353f`
      );
      dispatch(setEvents(response.data));
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
};

export const fetchWeather = (city) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dbdffcbb48362b084c7774b1fa09353f`
      );
      dispatch(setWeather(response.data));
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };
};
