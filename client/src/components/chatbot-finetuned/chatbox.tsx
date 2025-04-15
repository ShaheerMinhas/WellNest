import React, { useState } from "react";

const TherapistChat: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "You", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput(""); // Clear input after sending
    setLoading(true); // Show loading dots

    const systemPrompt =
      "You are a mental health therapist. Provide supportive, thoughtful, and empathetic responses.";

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: `${systemPrompt} User: ${input}` }),
        }
      );

      const data = await response.json();
      setLoading(false); // Hide loading dots

      if (data && data[0]?.generated_text) {
        const botMessage = { sender: "Bot", text: data[0].generated_text };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "Bot", text: "Sorry, I didn't understand that." },
        ]);
      }
    } catch (error) {
      setLoading(false); // Hide loading dots on error
      setMessages((prev) => [
        ...prev,
        { sender: "Bot", text: "Error reaching AI. Please try again later." },
      ]);
    }
  };

  return (
    <div>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          💬
        </button>
      )}

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 w-96 bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Chat Header */}
          <div className="bg-blue-600 text-white p-3 flex justify-between">
            <span>AI Therapist</span>
            <button onClick={() => setIsOpen(false)} className="text-xl">
              ❌
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-3 h-80 overflow-y-auto space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "You" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "Bot" && (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4712/4712037.png"
                    alt="Bot"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                )}

                <div
                  className={`p-2 rounded-lg max-w-xs ${
                    msg.sender === "You"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </div>

                {msg.sender === "You" && (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4712/4712029.png"
                    alt="User"
                    className="w-8 h-8 rounded-full ml-2"
                  />
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex justify-start items-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4712/4712037.png"
                  alt="Bot"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="dot-flashing"></div>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="p-3 border-t flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-blue-600 text-white px-4 py-2 rounded flex items-center"
            >
              🚀
            </button>
          </div>
        </div>
      )}

      {/* Loading Animation */}
      <style>
        {`
          .dot-flashing {
            position: relative;
            width: 12px;
            height: 12px;
            background-color: #3498db;
            border-radius: 50%;
            animation: dotFlashing 1.5s infinite linear alternate;
          }

          @keyframes dotFlashing {
            0% { opacity: 1; }
            50% { opacity: 0.3; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default TherapistChat;
