import axios from "axios";

const API =
  "https://eventmanagementsystem-backend-v8xv.onrender.com/api/events";

export const createEventAPI = async (eventData) => {
  const response = await axios.post(API, eventData);
  return response.data;
};

export const getEventsAPI = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const updateEventAPI = async (id, updatedData) => {
  const response = await axios.put(`${API}/${id}`, updatedData);
  return response.data;
};