import { combineReducers } from "redux";

const eventsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_EVENTS":
      return action.payload;
    default:
      return state;
  }
};

const weatherReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_WEATHER":
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  events: eventsReducer,
  weather: weatherReducer,
});

export default rootReducer;
