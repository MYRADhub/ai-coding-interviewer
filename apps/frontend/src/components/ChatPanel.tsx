import { useEffect, useRef, useState } from "react";
import type { Problem } from "../utils/types";

type Message = {
  sender: "user" | "agent";
  text: string;
};

export default function ChatPanel({ problem, code }: { problem: Problem; code: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "agent",
      text: "👋 Hi, I'm your AI interviewer. Let's start! Can you solve this problem for me?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    // Add user message
    const newMessages: Message[] = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Prepare request: convert "agent" to "ai" or "assistant" for backend
      const apiMessages = newMessages.map((msg) => ({
        sender: msg.sender === "agent" ? "ai" : "user",
        text: msg.text,
      }));

      const res = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages, problem, code }),
      });
      const data = await res.json();
      const reply = data.reply || "Sorry, I couldn't generate a response.";

      setMessages((prev) => [
        ...prev,
        { sender: "agent", text: reply },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { sender: "agent", text: "⚠️ Sorry, there was a problem contacting the AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-app bg-app-dark rounded p-2 flex flex-col h-full">
      {/* Chat bubbles */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-2 pr-1"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-3 py-2 rounded text-sm ${
              msg.sender === "user"
                ? "bg-[var(--primary)] text-black self-end"
                : "bg-app-light text-app self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="text-app-muted italic self-start px-3 py-2 text-sm">AI is typing...</div>
        )}
      </div>

      {/* Input box */}
      <div className="mt-2 flex">
        <input
          type="text"
          className="flex-1 px-3 py-2 text-sm bg-app-light border border-app rounded mr-2 text-app"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          disabled={loading}
        />
        <button
          className="px-4 py-2 text-sm rounded bg-[var(--primary)] text-black"
          onClick={sendMessage}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
