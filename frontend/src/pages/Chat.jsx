import { useState } from "react";
import Layout from "../layout/Layout";
import VoiceRecorder from "../components/VoiceRecorder";
import { sendMessage } from "../api/chat";
import { speak } from "../utils/speech";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // ==========================
  // Text Message
  // ==========================
  async function handleSend() {
    if (!message.trim()) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        sender: "You",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await sendMessage(userMessage);

      setMessages((prev) => [
        ...prev,
        {
          sender: "Adeeb",
          text: response.assistant_response,
        },
      ]);

      // Speak AI response
      speak(response.assistant_response);

    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "Adeeb",
          text: "Unable to contact AI.",
        },
      ]);
    }

    setLoading(false);
  }

  // ==========================
  // Voice Message
  // ==========================
  async function handleVoiceMessage(text) {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "You",
        text,
      },
    ]);

    setLoading(true);

    try {
      const response = await sendMessage(text);

      setMessages((prev) => [
        ...prev,
        {
          sender: "Adeeb",
          text: response.assistant_response,
        },
      ]);

      // Speak AI response
      speak(response.assistant_response);

    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "Adeeb",
          text: "Unable to contact AI.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">
        AI Assistant
      </h1>

      {/* Voice Recorder */}
      <VoiceRecorder
        onTranscript={(text) => {
          setMessage(text);

          // Automatically send voice message
          setTimeout(() => {
            handleVoiceMessage(text);
          }, 200);
        }}
      />

      {/* Chat Window */}
      <div className="bg-white rounded-xl shadow p-5 h-[500px] overflow-y-auto mt-5 mb-5">

        {messages.length === 0 && (
          <p className="text-gray-500">
            Start chatting with Adeeb...
          </p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className="mb-4"
          >
            <strong>{msg.sender}:</strong>
            <p>{msg.text}</p>
          </div>
        ))}

        {loading && (
          <p className="text-blue-500">
            Adeeb is typing...
          </p>
        )}

      </div>

      {/* Input */}
      <div className="flex gap-3">

        <input
          className="border rounded-lg p-3 flex-1"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
        >
          Send
        </button>

      </div>
    </Layout>
  );
}

export default Chat;