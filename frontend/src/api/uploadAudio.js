import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const uploadAudio = async (audioBlob) => {
  const formData = new FormData();

  formData.append(
    "file",
    audioBlob,
    `meeting_${Date.now()}.webm`
  );

  const response = await API.post(
    "/audio/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};