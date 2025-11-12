import { useEffect, useRef, useState } from "react";
import { useInterviewSession } from "../context/InterviewSessionContext";

type Message = {
  sender: "user" | "agent";
  text: string;
};

export default function ChatPanel() {
  const {
    problem,
    code,
    testCases,
    chatMessages,
    setChatMessages,
  } = useInterviewSession();

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Always scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const newUserMsg: Message = { sender: "user", text: input };
    const updatedMessages = [...chatMessages, newUserMsg];
    setChatMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      // Compose full interview session context for the AI
      const payload = {
        problem,
        code,
        testCases,
        messages: updatedMessages.map(msg => ({
          sender: msg.sender === "agent" ? "ai" : "user",
          text: msg.text,
        })),
      };

      const res = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      const aiReply = data.reply || "Sorry, I couldn't generate a response.";
      setChatMessages(prev => [...prev, { sender: "agent", text: aiReply }]);
    } catch {
      setChatMessages(prev => [
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
        {chatMessages.map((msg, i) => (
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
