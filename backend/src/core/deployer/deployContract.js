// Deploys contract using ethers.js v6
import { Wallet, ContractFactory, JsonRpcProvider } from "ethers";

/**
 * Deploy contract to EVM chain
 * @param {Object} params
 * @param {any[]} params.abi
 * @param {string} params.bytecode
 * @param {string} params.rpcUrl
 * @param {string} params.privateKey
 * @param {any[]} params.constructorArgs
 * @returns {Promise<{ contractAddress: string, txHash: string }>}
 */
export default async function deployContract({ abi, bytecode, rpcUrl, privateKey, constructorArgs }) {
  // Connect to provider
  const provider = new JsonRpcProvider(rpcUrl);
  const wallet = new Wallet(privateKey, provider);
  // Create contract factory
  const factory = new ContractFactory(abi, bytecode, wallet);
  // Deploy contract
  const contract = await factory.deploy(...constructorArgs);
  await contract.deploymentTransaction().wait();
  return {
    contractAddress: contract.getAddress(),
    txHash: contract.deploymentTransaction().hash
  };
}
