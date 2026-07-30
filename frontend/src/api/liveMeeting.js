import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const processLiveMeeting = async (transcript) => {
  const response = await API.post("/live-meeting/process", {
    transcript,
  });

  return response.data;
};