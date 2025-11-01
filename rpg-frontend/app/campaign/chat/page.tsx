"use client";
import { useState, useEffect, useRef } from "react";
import { sendChatMessage } from "@/lib/groqClient";
import { loadGameData } from "@/lib/storage";
import Sidebar from "@/components/Sidebar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


export default function ChatPage() {
  const [character, setCharacter] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const char = loadGameData("character");
    if (char) setCharacter(char);
  }, []);

  useEffect(() => {
  const char = loadGameData("character");
  if (char) {
    setCharacter(char);
    // Automatically send intro
    sendChatMessage(
      char,
      `Start the story for ${char.name}, a ${char.race} ${char.class}.`
    ).then((reply) => {
      setMessages([{ role: "assistant", content: reply }]);
    });
  }
}, []);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

const handleSend = async () => {
  if (!input.trim()) return;

  const diceRoll = Math.floor(Math.random() * 20) + 1;
  const playerMessage = `${input} (Dice Roll: ${diceRoll})`;

  const newHistory = [...messages, { role: "user", content: playerMessage }];
  setMessages(newHistory);

  const reply = await sendChatMessage(character, playerMessage, newHistory);
  setMessages([...newHistory, { role: "assistant", content: reply }]);
  setInput("");
};


  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm">
        <Sidebar />
      </aside>

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1 h-full">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
              <div
                className={`inline-block px-4 py-2 rounded-2xl max-w-lg break-words ${
                  m.role === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  //className="prose prose-sm max-w-none"
                >
                {m.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Box */}
        <div className="p-4 border-t bg-white flex gap-2">
          <input
            className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What will you do?"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
