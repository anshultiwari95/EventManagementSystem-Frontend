import { configureStore } from "@reduxjs/toolkit";
import profilesReducer from "../features/profiles/profilesSlice.js";
import eventsReducer from "../features/events/eventsSlice.js";

export const store = configureStore({
  reducer: {
    profiles: profilesReducer,
    events: eventsReducer,
  },
});