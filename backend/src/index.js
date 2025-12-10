// Entry point for Krib backend
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import generateRoute from "./routes/generate.js";
import compileRoute from "./routes/compile.js";
import deployRoute from "./routes/deploy.js";

const app = express();
const PORT = 4000;

// Allow CORS for frontend at http://localhost:3000
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

// API routes
app.use("/generate", generateRoute);
app.use("/compile", compileRoute);
app.use("/deploy", deployRoute);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Krib backend running" });
});

app.listen(PORT, () => {
  console.log(`Krib backend listening on http://localhost:${PORT}`);
});
