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

app.listen(3001, () => {
  console.log("🚀 Code Runner listening on http://localhost:3001");
});
