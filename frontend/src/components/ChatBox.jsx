import { useState } from "react";
import { sendMessage } from "../api/chat";
import VoiceRecorder from "./VoiceRecorder";

function ChatBox() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">

      <h2 className="text-xl font-semibold mb-4">
        Talk to Adeeb AI
      </h2>

      <VoiceRecorder
        onTranscript={(text) => {
          setMessage(text);
        }}
      />

      <div className="border rounded-lg h-72 overflow-y-auto p-4 my-4">

        {messages.length === 0 && (
          <p className="text-gray-500">
            Ask anything about your meetings...
          </p>
        )}

        {messages.map((msg, index) => (
          <div key={index} className="mb-3">

            <strong>{msg.sender}</strong>

            <p>{msg.text}</p>

          </div>
        ))}

        {loading && (
          <p className="text-blue-600">
            Adeeb is thinking...
          </p>
        )}

      </div>

      <div className="flex gap-3">

        <input
          className="border rounded-lg flex-1 p-3"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default ChatBox;