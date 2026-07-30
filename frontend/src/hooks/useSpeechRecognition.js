import { useEffect, useRef, useState } from "react";

export default function useSpeechRecognition() {
  const recognitionRef = useRef(null);

  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;

    // Later we'll detect language automatically
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onresult = (event) => {
      let text = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        text += event.results[i][0].transcript + " ";
      }

      setTranscript(text);
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  function startListening() {
    if (recognitionRef.current) {
      setTranscript("");
      recognitionRef.current.start();
    }
  }

  function stopListening() {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }

  return {
    supported,
    listening,
    transcript,
    startListening,
    stopListening,
  };
}