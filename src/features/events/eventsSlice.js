import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createEventAPI,
  getEventsAPI,
  updateEventAPI,
} from "../../api/eventApi";

/* =========================
   CREATE EVENT
========================= */
export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData) => {
    return await createEventAPI(eventData);
  }
);

/* =========================
   FETCH EVENTS
========================= */
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async () => {
    return await getEventsAPI();
  }
);

/* =========================
   UPDATE EVENT
========================= */
export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ id, startTimeUTC, endTimeUTC, profiles }) => {
    const response = await updateEventAPI(id, {
      startTimeUTC,
      endTimeUTC,
      profiles,
    });

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
    /* ===== FETCH EVENTS ===== */
    builder.addCase(fetchEvents.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.eventsList = action.payload;
    });

    builder.addCase(fetchEvents.rejected, (state) => {
      state.loading = false;
    });

    /* ===== CREATE EVENT ===== */
    builder.addCase(createEvent.fulfilled, (state, action) => {
      state.eventsList.push(action.payload);
    });

    /* ===== UPDATE EVENT ===== */
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