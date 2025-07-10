import { useState } from "react";

type Message = {
  sender: "user" | "agent";
  text: string;
};

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "agent",
      text: "👋 Hi, I'm your AI interviewer. Let's start! Can you solve this problem for me?",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages: Message[] = [...messages, { sender: "user" as const, text: input }];
    setMessages(newMessages);
    setInput("");

    // Mock Agent response with delay
    setTimeout(() => {
      const agentReply = {
        sender: "agent" as const,
        text: "Thanks for your response. Can you elaborate on your approach?",
      };
      setMessages((prev) => [...prev, agentReply]);
    }, 1000);
  };

  return (
    <div className="border border-app bg-app-dark rounded p-2 flex flex-col h-full">
      {/* Chat bubbles */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
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
        />
        <button
          className="px-4 py-2 text-sm rounded bg-[var(--primary)] text-black"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
