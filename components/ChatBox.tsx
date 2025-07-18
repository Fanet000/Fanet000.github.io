// components/ChatBox.tsx
import React, { useState } from "react";
export default function ChatBox() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  return (
    <div>
      <div className="h-32 overflow-y-auto border mb-2">
        {messages.map((msg, i) => <div key={i}>{msg}</div>)}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={() => { setMessages([...messages, input]); setInput(""); }}>Send</button>
    </div>
  );
}