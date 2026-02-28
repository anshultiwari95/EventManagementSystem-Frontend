import axios from "axios";

const API = "https://eventmanagementsystem-backend-v8xv.onrender.com/api/profiles";

export const createProfileAPI = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};

export const getProfilesAPI = async () => {
  const res = await axios.get(API);
  return res.data;
};