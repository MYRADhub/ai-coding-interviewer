const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(express.json());

const runUserCode = (language, code, input = "") =>
  new Promise((resolve, reject) => {
    if (!code || !language) {
      return reject(new Error("Code and language are required"));
    }

    let runCommand;
    let args;

    if (language === "python") {
      runCommand = "python3";
      args = ["-c", code];
    } else if (language === "javascript") {
      runCommand = "node";
      args = ["-e", code];
    } else {
      return reject(new Error("Unsupported language"));
    }

    const child = spawn(runCommand, args);
    let output = "";
    let errorOutput = "";

    if (input) {
      child.stdin.write(input);
    }
    child.stdin.end();

    child.stdout.on("data", (data) => {
      output += data.toString();
    });

    child.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    child.on("close", () => resolve({ output, errorOutput }));
    child.on("error", (err) => reject(err));
  });

app.post("/api/run", async (req, res) => {
  const { language, code, input } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code and language are required" });
  }

  try {
    const { output, errorOutput } = await runUserCode(language, code, input);
    if (errorOutput) {
      return res.json({ success: false, output: errorOutput });
    }
    return res.json({ success: true, output });
  } catch (err) {
    console.error("Run error:", err);
    return res.status(500).json({ error: err.message || "Failed to execute code" });
  }
});

app.post("/api/run-tests", async (req, res) => {
  const { language, code, tests = [], problemId } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code and language are required" });
  }

  if (!Array.isArray(tests) || tests.length === 0) {
    return res.status(400).json({ error: "At least one test instruction is required" });
  }

  const results = [];
  let passedCount = 0;

  for (const test of tests) {
    const testId = test.id ?? crypto.randomUUID?.() ?? Date.now();
    const input = test.input ?? "";
    const expected = (test.expected ?? "").replace(/\r/g, "").trim();

    try {
      const { output, errorOutput } = await runUserCode(language, code, input);
      const runtimeError = errorOutput?.trim() || null;
      const normalizedOutput = (output ?? "").replace(/\r/g, "").trim();
      const actual = runtimeError || normalizedOutput;
      const passed = !runtimeError && normalizedOutput === expected;
      if (passed) passedCount += 1;
      results.push({
        id: testId,
        input,
        expected,
        actual,
        passed,
        hidden: Boolean(test.hidden),
        error: runtimeError,
      });
    } catch (err) {
      results.push({
        id: testId,
        input,
        expected,
        actual: err.message || "Failed to execute code",
        passed: false,
        hidden: Boolean(test.hidden),
        error: err.message || "Failed to execute code",
      });
    }
  }

  const summary = {
    problemId,
    totalCount: tests.length,
    passedCount,
    status: passedCount === tests.length ? "passed" : "failed",
    lastRunAt: Date.now(),
  };

  return res.json({ results, summary });
});

const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/chat", async (req, res) => {
  const { messages, problem, code, validationResult } = req.body;

  if (!messages || !problem || !code) {
    return res.status(400).json({ error: "Missing messages, problem, or code" });
  }

  const validationSummary = validationResult
    ? `Test status: ${validationResult.status} (${validationResult.passedCount ?? 0}/${
        validationResult.totalCount ?? "?"
      } passed)${
        validationResult.lastRunAt
          ? ` at ${new Date(validationResult.lastRunAt).toLocaleTimeString()}`
          : ""
      }.`
    : "Tests have not been run yet.";

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

${validationSummary}

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
