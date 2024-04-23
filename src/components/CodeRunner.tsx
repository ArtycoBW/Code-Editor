"use client";
import React, { useState } from "react";

export const CodeRunner: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const runCode = async () => {
    const response = await fetch("/api/compile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });
    const data = await response.json();
    if (data.error) {
      setResult(`Error: ${data.error}`);
    } else {
      setResult(`Result: ${data.result}`);
    }
  };

  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your JavaScript code here..."
        rows={10}
        style={{ width: "100%" }}
      />
      <button onClick={runCode}>Run Code</button>
      <pre>{result}</pre>
    </div>
  );
};
