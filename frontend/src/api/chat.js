import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const sendMessage = async (question) => {

  const response = await API.post(
    "/company/ask",
    {
      question,
    }
  );

  return {
    assistant_response: response.data.answer,
  };

};