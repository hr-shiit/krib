// Route for /compile
import express from "express";
import compileSolidity from "../core/compiler/compileSolidity.js";

const router = express.Router();

// POST /compile: solidityCode -> { abi, bytecode, errors }
router.post("/", async (req, res) => {
  try {
    const { solidityCode } = req.body;
    if (!solidityCode) return res.status(400).json({ error: "Missing solidityCode" });
    const result = await compileSolidity(solidityCode);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
