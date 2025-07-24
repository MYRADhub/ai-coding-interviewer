const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/run", (req, res) => {
  const { language, code, input } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code and language are required" });
  }

  let runCommand;
  let args;
  let fileExt;

  if (language === "python") {
    fileExt = "py";
    runCommand = "python3";
    args = ["-c", code];
  } else if (language === "javascript") {
    fileExt = "js";
    runCommand = "node";
    args = ["-e", code];
  } else {
    return res.status(400).json({ error: "Unsupported language" });
  }

  const process = spawn(runCommand, args);

  let output = "";
  let errorOutput = "";

  if (input) {
    process.stdin.write(input);
    process.stdin.end();
  }

  process.stdout.on("data", (data) => {
    output += data.toString();
  });

  process.stderr.on("data", (data) => {
    errorOutput += data.toString();
  });

  process.on("close", () => {
    if (errorOutput) {
      return res.json({ success: false, output: errorOutput });
    }
    return res.json({ success: true, output });
  });
});

const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/chat", async (req, res) => {
  const { messages, problem, code } = req.body;

  if (!messages || !problem || !code) {
    return res.status(400).json({ error: "Missing messages, problem, or code" });
  }

  const systemPrompt = `
You are a technical interviewer for a software engineering position.

The candidate is working on this problem:
---
${problem.title}
${problem.description}
---

Their current code is:
---
${code || "[no code submitted yet]"}
---

Here is the chat history:
${messages.map(m => `[${m.sender}]: ${m.text}`).join('\n')}

The latest message from the candidate is the last user entry above. Respond as a human interviewer would.
`;

  const chatMessages = [
    { role: "system", content: systemPrompt },
    ...messages.map((m) => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.text,
    })),
  ];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: chatMessages,
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Failed to connect to OpenAI" });
  }
});



app.listen(3001, () => {
  console.log("🚀 Code Runner listening on http://localhost:3001");
});
