import axios from "axios";

// Actions for events

export const setEvents = (events) => {
  return {
    type: "SET_EVENTS",
    payload: events,
  };
};

// Actions for weather

export const setWeather = (weather) => {
  return {
    type: "SET_WEATHER",
    payload: weather,
  };
};

// An example of an asynchronous action using Thunk

export const fetchEvents = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("https://api.eventbrite.com/v3/events");
      dispatch(setEvents(response.data));
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
};

export const fetchWeather = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://api.weatherstack.com/current");
      dispatch(setWeather(response.data));
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };
};
