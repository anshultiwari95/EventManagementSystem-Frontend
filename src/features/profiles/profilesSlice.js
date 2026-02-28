import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProfileAPI,
  getProfilesAPI,
} from "../../api/profileApi";

export const createProfile = createAsyncThunk(
  "profiles/createProfile",
  async (profileData) => {
    return await createProfileAPI(profileData);
  }
);

export const fetchProfiles = createAsyncThunk(
  "profiles/fetchProfiles",
  async () => {
    return await getProfilesAPI();
  }
);

const profilesSlice = createSlice({
  name: "profiles",
  initialState: {
    profilesList: [],
    selectedProfile: null,
    loading: false,
  },
  reducers: {
    setSelectedProfile: (state, action) => {
      state.selectedProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProfile.fulfilled, (state, action) => {
        state.profilesList.push(action.payload);
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.profilesList = action.payload;
      });
  },
});

export const { setSelectedProfile } = profilesSlice.actions;
export default profilesSlice.reducer;