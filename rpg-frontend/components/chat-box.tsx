"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatBox() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", text: input }]);
    // TODO: connect to LLM here
    setMessages((prev) => [...prev, { role: "bot", text: "The story continues..." }]);
    setInput("");
  };

  return (
    <div className="flex flex-col flex-1 p-4">
      <div className="flex-1 overflow-y-auto border p-2 mb-4 rounded">
        {messages.map((m, i) => (
          <p key={i} className={m.role === "user" ? "text-blue-600" : "text-green-600"}>
            <strong>{m.role}:</strong> {m.text}
          </p>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What will you do?"
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}
