// Compiles Solidity code using solc-js (WASM)
import solc from "solc";

/**
 * @param {string} solidityCode
 * @returns {Promise<{ abi: any, bytecode: string, errors: any[] }>}
 */
export default async function compileSolidity(solidityCode) {
  // Prepare input for solc
  const input = {
    language: "Solidity",
    sources: {
      "Contract.sol": { content: solidityCode }
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["abi", "evm.bytecode"]
        }
      }
    }
  };

  // Compile
  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  const contractName = Object.keys(output.contracts["Contract.sol"])[0];
  const contract = output.contracts["Contract.sol"][contractName];

  return {
    abi: contract.abi,
    bytecode: contract.evm.bytecode.object ? `0x${contract.evm.bytecode.object}` : "",
    errors: output.errors || []
  };
}
