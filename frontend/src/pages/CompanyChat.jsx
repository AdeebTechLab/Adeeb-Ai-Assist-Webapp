import { useState } from "react";
import Layout from "../layout/Layout";
import { askCompany } from "../api/companyChat";
import { speak } from "../avatar/voices/speak";

function CompanyChat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!question.trim()) return;

    const userMessage = {
      role: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentQuestion = question;
    setQuestion("");
    setLoading(true);

    try {
      const result = await askCompany(currentQuestion);

      const aiMessage = {
        role: "assistant",
        text: result.answer,
      };

      setMessages((prev) => [...prev, aiMessage]);

      speak(result.answer);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Unable to contact AI.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <Layout>

      <h1 className="text-3xl font-bold mb-6">
         Company AI Assistant
      </h1>

      <div className="bg-white rounded-xl shadow p-5">

        <div className="h-[500px] overflow-y-auto border rounded-lg p-4 mb-5">

          {messages.length === 0 && (
            <p className="text-gray-500">
              Ask anything about Adeeb Technology Lab...
            </p>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-4 py-3 rounded-xl ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {loading && (
            <p className="text-blue-600">
              AI is thinking...
            </p>
          )}

        </div>

        <div className="flex gap-3">

          <input
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            placeholder="Ask about the company..."
            className="flex-1 border rounded-lg px-4 py-3"
          />

          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
          >
            Send
          </button>

        </div>

      </div>

    </Layout>
  );
}

export default CompanyChat;