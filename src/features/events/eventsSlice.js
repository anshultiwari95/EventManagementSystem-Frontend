import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createEventAPI,
  getEventsAPI,
  updateEventAPI,
} from "../../api/eventApi";

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData) => {
    return await createEventAPI(eventData);
  }
);

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async () => {
    return await getEventsAPI();
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ id, startTimeUTC, endTimeUTC, profiles }) => {
    const updatedData = {
      startTimeUTC,
      endTimeUTC,
      profiles,
    };

    const response = await updateEventAPI(id, updatedData);

    return response;
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    eventsList: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateEvent.fulfilled, (state, action) => {
      const index = state.eventsList.findIndex(
        (event) => event._id === action.payload._id
      );
    
      if (index !== -1) {
        state.eventsList[index] = action.payload;
      }
    });
  },
});

export default eventsSlice.reducer;