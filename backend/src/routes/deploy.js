// Route for /deploy
import express from "express";
import deployContract from "../core/deployer/deployContract.js";

const router = express.Router();

// POST /deploy: deploy contract
router.post("/", async (req, res) => {
  try {
    const { abi, bytecode, rpcUrl, privateKey, constructorArgs } = req.body;
    if (!abi || !bytecode || !rpcUrl || !privateKey || !constructorArgs)
      return res.status(400).json({ error: "Missing deployment parameters" });
    const result = await deployContract({ abi, bytecode, rpcUrl, privateKey, constructorArgs });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
