// Route for /generate
import express from "express";
import buildIR from "../core/ir/buildIR.js";
import generateSolidity from "../core/codegen/solidityGenerator.js";

const router = express.Router();

// POST /generate: graph -> solidityCode
router.post("/", async (req, res) => {
  try {
    const { graph } = req.body;
    if (!graph) return res.status(400).json({ error: "Missing graph" });
    // Convert graph to IR
    const ir = buildIR(graph);
    // Generate Solidity code from IR
    const solidityCode = generateSolidity(ir);
    res.json({ solidityCode });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
