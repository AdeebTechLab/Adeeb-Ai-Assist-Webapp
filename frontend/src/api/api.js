import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// Get all meetings
export const getMeetings = async () => {
  const response = await api.get("/meetings/");
  return response.data;
};

// Get single meeting
export const getMeeting = async (id) => {
  const response = await api.get(`/meetings/${id}`);
  return response.data;
};

// Delete meeting
export const deleteMeeting = async (id) => {
  const response = await api.delete(`/meetings/${id}`);
  return response.data;
};

export default api;