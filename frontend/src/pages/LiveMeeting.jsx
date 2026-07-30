import { useState, useEffect, useRef } from "react";
import Layout from "../layout/Layout";
import useSpeechRecognition from "../hooks/useSpeechRecognition";

import { processLiveMeeting } from "../api/liveMeeting";
import { generateLiveSummary } from "../api/liveSummary";
import { generateLiveActionItems } from "../api/liveAction";
import { uploadAudio } from "../api/uploadAudio";
import AvatarCanvas from "../avatar/AvatarCanvas";

import { speak } from "../avatar/voices/speak";
import {
  startAudioAnalyzer,
  stopAudioAnalyzer,
} from "../avatar/voices/audioAnalyzer";


function LiveMeeting() {
  const {
    supported,
    listening,
    transcript,
    startListening,
    stopListening,
  } = useSpeechRecognition();

  const [recording, setRecording] = useState(false);
  const [summary, setSummary] = useState("");
  const [actionItems, setActionItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  // Audio Recording Refs
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

  // ===========================
  // Start Meeting
  // ===========================
  async function startMeeting() {
    setRecording(true);
    setSummary("");
    setActionItems([]);

    startListening();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;
      await startAudioAnalyzer(stream);

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start();
    } catch (error) {
      console.error(error);
      alert("Unable to access microphone.");
    }
  }

  // ===========================
  // Stop Meeting
  // ===========================
  async function stopMeeting() {
    setRecording(false);

    stopListening();

    // Stop Audio Recording
    if (mediaRecorderRef.current) {
      await new Promise((resolve) => {
        mediaRecorderRef.current.onstop = resolve;
        mediaRecorderRef.current.stop();
      });
    }

    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) => track.stop());
    }
    stopAudioAnalyzer();

    // Upload Recorded Audio
    try {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });

      await uploadAudio(audioBlob);

      console.log("Audio uploaded successfully.");
    } catch (error) {
      console.error("Audio Upload Error:", error);
    }

    if (!transcript.trim()) return;

    setLoading(true);

    try {
      const result = await processLiveMeeting(transcript);

      if (result.success) {
        setSummary(result.summary);
        speak(
  result.summary,
  () => setSpeaking(true),
  () => setSpeaking(false)
);
        setActionItems(result.action_items);

        alert("Meeting saved successfully!");

        console.log("Meeting ID:", result.meeting_id);
      }
    } catch (error) {
      console.error(error);

      setSummary("Unable to generate summary.");
      setActionItems([]);

      alert("Failed to process meeting.");
    }

    setLoading(false);
  }

  // ===========================
  // Live Summary + Action Items
  // ===========================
  useEffect(() => {
    if (!recording) return;

    const interval = setInterval(async () => {
      if (!transcript.trim()) return;

      try {
        const summaryResult =
          await generateLiveSummary(transcript);

        if (summaryResult.summary) {
  setSummary(summaryResult.summary);

  speak(
    summaryResult.summary,
    () => setSpeaking(true),
    () => setSpeaking(false)
  );
}

        const actionResult =
          await generateLiveActionItems(transcript);

        if (actionResult.action_items) {
          setActionItems(actionResult.action_items);
        }
      } catch (error) {
        console.error("Live AI Error:", error);
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [recording, transcript]);

  useEffect(() => {
    console.log(transcript);
  }, [transcript]);

  if (!supported) {
    return (
      <Layout>
        <div className="bg-red-100 text-red-700 p-5 rounded-lg">
          Your browser does not support Speech Recognition.
        </div>
      </Layout>
    );
  }

  return (
  <Layout>
    <h1 className="text-3xl font-bold mb-6">
      🎙 Live Meeting Assistant
    </h1>

    {/* AI Avatar */}
  <AvatarCanvas
  text={summary}
  speaking={speaking}
  listening={listening}
/>
    {/* Controls */}
    <div className="flex gap-4 mb-6">
      <button
        onClick={startMeeting}
        disabled={recording}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
      >
        ▶ Start Meeting
      </button>

      <button
        onClick={stopMeeting}
        disabled={!recording}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
      >
        ⏹ Stop Meeting
      </button>

      {listening && (
        <span className="text-red-600 font-bold animate-pulse">
          🔴 Recording...
        </span>
      )}
    </div>

    

      {/* Transcript */}
      <div className="bg-white shadow rounded-xl p-5 mb-6">
        <h2 className="text-xl font-semibold mb-3">
          Live Transcript
        </h2>

        <div className="border rounded-lg p-4 min-h-[220px] whitespace-pre-wrap">
          {transcript || "Start speaking..."}
        </div>
      </div>

      {/* Live Summary */}
      <div className="bg-white shadow rounded-xl p-5 mb-6">
        <h2 className="text-xl font-semibold mb-3">
          AI Live Summary
        </h2>

        {loading ? (
          <p className="text-blue-600">
            Generating summary...
          </p>
        ) : (
          <p>
            {summary ||
              "AI is waiting for enough conversation..."}
          </p>
        )}
      </div>

      {/* Live Action Items */}
      <div className="bg-white shadow rounded-xl p-5">
        <h2 className="text-xl font-semibold mb-3">
          Live Action Items
        </h2>

        {loading ? (
          <p className="text-blue-600">
            Extracting action items...
          </p>
        ) : actionItems.length === 0 ? (
          <p>No action items yet.</p>
        ) : (
          <ul className="list-disc ml-6 space-y-2">
            {actionItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}

export default LiveMeeting;