# Krib Backend

Backend for Krib, a drag-and-drop smart contract builder. Provides REST APIs for generating, compiling, and deploying smart contracts.

## 🏁 Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   npm start
   ```
   The backend runs at http://localhost:4000

## 📡 API Endpoints

### 1️⃣ POST /generate
- **Input:**
  ```json
  { "graph": { ... } }
  ```
- **Output:**
  ```json
  { "solidityCode": "contract MyContract { ... }" }
  ```
- **Frontend Example:**
  ```js
  await fetch("http://localhost:4000/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ graph })
  })
  ```

### 2️⃣ POST /compile
- **Input:**
  ```json
  { "solidityCode": "contract MyContract { ... }" }
  ```
- **Output:**
  ```json
  {
    "abi": [...],
    "bytecode": "0x6080...",
    "errors": []
  }
  ```
- **Frontend Example:**
  ```js
  await fetch("http://localhost:4000/compile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ solidityCode })
  })
  ```

### 3️⃣ POST /deploy
- **Input:**
  ```json
  {
    "abi": [...],
    "bytecode": "0x...",
    "rpcUrl": "https://sepolia.infura.io/v3/KEY",
    "privateKey": "0xabc...",
    "constructorArgs": []
  }
  ```
- **Output:**
  ```json
  {
    "contractAddress": "0x1234...",
    "txHash": "0xabcd..."
  }
  ```
- **Frontend Example:**
  ```js
  await fetch("http://localhost:4000/deploy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ abi, bytecode, rpcUrl, privateKey, constructorArgs })
  })
  ```

## 🧩 Tech Stack
- Node.js (ESM)
- Express
- CORS
- solc-js (WASM)
- ethers.js v6
- body-parser

## 🗂️ Folder Structure
```
backend/
  src/
    index.js
    routes/
      generate.js
      compile.js
      deploy.js
    core/
      ir/
        buildIR.js
      codegen/
        solidityGenerator.js
      compiler/
        compileSolidity.js
      deployer/
        deployContract.js
  package.json
  README.md
```
