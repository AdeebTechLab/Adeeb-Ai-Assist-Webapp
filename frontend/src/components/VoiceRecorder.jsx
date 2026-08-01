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

    // Better settings
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("🎤 Speech Recognition Started");
      setListening(true);
    };

    recognition.onend = () => {
      console.log("🛑 Speech Recognition Ended");
      setListening(false);
    };

    recognition.onspeechstart = () => {
      console.log("🗣 User started speaking...");
    };

    recognition.onspeechend = () => {
      console.log("🤫 User stopped speaking...");
    };

    recognition.onaudiostart = () => {
      console.log("🎧 Audio Capturing Started");
    };

    recognition.onaudioend = () => {
      console.log("🎧 Audio Capturing Ended");
    };

    recognition.onresult = (event) => {
      console.log("✅ Speech Result Received");

      let transcript = "";

      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      console.log("Transcript:", transcript);

      if (event.results[event.results.length - 1].isFinal) {
        if (onTranscript) {
          onTranscript(transcript);
        }
      }
    };

    recognition.onerror = (event) => {
      console.error("❌ Speech Recognition Error");
      console.log(event);

      alert(
        "Speech Recognition Error\n\n" +
          "Error: " +
          event.error
      );

      setListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [onTranscript]);

  function startListening() {
    if (!recognitionRef.current) return;

    console.log("Starting Recognition...");

    try {
      recognitionRef.current.start();
    } catch (err) {
      console.log(err);
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
        {listening ? "🎤 Listening..." : "🎤 Speak"}
      </button>
    </div>
  );
}

export default VoiceRecorder;