import { useEffect, useRef, useState } from "react";

function VoiceRecorder({ onTranscript }) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);

  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    // Language can be changed later automatically
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      if (onTranscript) {
        onTranscript(transcript);
      }
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, [onTranscript]);

  function startListening() {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  }

  if (!supported) {
    return (
      <div className="p-4 rounded-lg bg-red-100 text-red-700">
        Speech Recognition is not supported in this browser.
      </div>
    );
  }

  return (
    <div className="mt-4">
      <button
        onClick={startListening}
        disabled={listening}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
      >
        {listening ? "Listening..." : " Speak"}
      </button>
    </div>
  );
}

export default VoiceRecorder;