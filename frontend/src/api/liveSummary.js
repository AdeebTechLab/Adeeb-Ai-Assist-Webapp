import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const generateLiveSummary = async (transcript) => {
  const response = await API.post("/live-summary/", {
    transcript,
  });

  return response.data;
};