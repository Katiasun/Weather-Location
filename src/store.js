import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index";

// is an object that stores all the state of our application
const store = configureStore({
  reducer: rootReducer,
});

export default store;
