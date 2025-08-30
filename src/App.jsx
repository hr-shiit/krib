import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import Modal from "./components/Modal";
import ContractForm from "./components/ContractForm";
import OwnerForm from "./components/OwnerForm";
import MintForm from "./components/MintForm";
import OwnerCheckForm from "./components/OwnerCheckForm";
import AllowanceCheckForm from "./components/AllowanceCheckForm";
import ApproveForm from "./components/ApproveForm";
import DirectTransferForm from "./components/DirectTransferForm";
import ApprovedTransferForm from "./components/ApprovedTransferForm";
import buildExecutionOrder from "./utils/buildExecutionOrder";
import { setLatestExecutionPayload } from "./state/executionStore";

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [connectingFrom, setConnectingFrom] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPayload, setModalPayload] = useState(null);
  const [contractFormOpen, setContractFormOpen] = useState(false);
  const [ownerFormOpen, setOwnerFormOpen] = useState(false);
  const [mintFormOpen, setMintFormOpen] = useState(false);
  const [ownerCheckFormOpen, setOwnerCheckFormOpen] = useState(false);
  const [allowanceCheckFormOpen, setAllowanceCheckFormOpen] = useState(false);
  const [approveFormOpen, setApproveFormOpen] = useState(false);
  const [directTransferFormOpen, setDirectTransferFormOpen] = useState(false);
  const [approvedTransferFormOpen, setApprovedTransferFormOpen] = useState(false);

  function addNodeFromSidebar(fn) {
    if (fn.type === "form") {
      if (fn.id === "contract_init") {
        setContractFormOpen(true);
      } else if (fn.id === "owner_init") {
        setOwnerFormOpen(true);
      } else if (fn.id === "mint_init") {
        setMintFormOpen(true);
      } else if (fn.id === "owner_check") {
        setOwnerCheckFormOpen(true);
      } else if (fn.id === "allowance_check") {
        setAllowanceCheckFormOpen(true);
      } else if (fn.id === "approve") {
        setApproveFormOpen(true);
      } else if (fn.id === "direct_transfer") {
        setDirectTransferFormOpen(true);
      } else if (fn.id === "approved_transfer") {
        setApprovedTransferFormOpen(true);
      }
      return;
    }
    
    const id = `${fn.id}-${Date.now()}`;
    setNodes(prev => [...prev, { id, fn: fn.id, label: fn.label, x: 60 + (prev.length * 10) % 400, y: 60 + (prev.length * 20) % 300, value: fn.jsonValue }]);
  }

  function handleContractFormSubmit(formData) {
    const id = `contract_init-${Date.now()}`;
    const contractNode = {
      id,
      fn: "contract_init",
      label: `Contract: ${formData.name}`,
      x: 60 + (nodes.length * 10) % 400,
      y: 60 + (nodes.length * 20) % 300,
      value: formData,
      contractData: formData
    };
    
    setNodes(prev => [...prev, contractNode]);
    setContractFormOpen(false);
  }

  function handleOwnerFormSubmit(formData) {
    const id = `owner_init-${Date.now()}`;
    const ownerNode = {
      id,
      fn: "owner_init",
      label: `Owner: ${formData.address.slice(0, 8)}...`,
      x: 60 + (nodes.length * 10) % 400,
      y: 60 + (nodes.length * 20) % 300,
      value: formData,
      ownerData: formData
    };
    
    setNodes(prev => [...prev, ownerNode]);
    setOwnerFormOpen(false);
  }

  function handleMintFormSubmit(formData) {
    const id = `mint_init-${Date.now()}`;
    const mintNode = {
      id,
      fn: "mint_init",
      label: `Mint: ${formData.address.slice(0, 8)}...`,
      x: 60 + (nodes.length * 10) % 400,
      y: 60 + (nodes.length * 20) % 300,
      value: formData,
      mintData: formData
    };
    
    setNodes(prev => [...prev, mintNode]);
    setMintFormOpen(false);
  }

  function handleOwnerCheckFormSubmit(formData) {
    const id = `owner_check-${Date.now()}`;
    const ownerCheckNode = {
      id,
      fn: "owner_check",
      label: `Owner Check: ${formData.tokenID}`,
      x: 60 + (nodes.length * 10) % 400,
      y: 60 + (nodes.length * 20) % 300,
      value: formData,
      ownerCheckData: formData
    };
    
    setNodes(prev => [...prev, ownerCheckNode]);
    setOwnerCheckFormOpen(false);
  }

  function handleAllowanceCheckFormSubmit(formData) {
    const id = `allowance_check-${Date.now()}`;
    const allowanceCheckNode = {
      id,
      fn: "allowance_check",
      label: `Allowance: ${formData.ownerAddress.slice(0, 8)}...`,
      x: 60 + (nodes.length * 10) % 400,
      y: 60 + (nodes.length * 20) % 300,
      value: formData,
      allowanceCheckData: formData
    };
    
    setNodes(prev => [...prev, allowanceCheckNode]);
    setAllowanceCheckFormOpen(false);
  }

  function handleApproveFormSubmit(formData) {
    const id = `approve-${Date.now()}`;
    const approveNode = {
      id,
      fn: "approve",
      label: `Approve: ${formData.spender.slice(0, 8)}...`,
      x: 60 + (nodes.length * 10) % 400,
      y: 60 + (nodes.length * 20) % 300,
      value: formData,
      approveData: formData
    };
    
    setNodes(prev => [...prev, approveNode]);
    setApproveFormOpen(false);
  }

  function handleDirectTransferFormSubmit(formData) {
    const id = `direct_transfer-${Date.now()}`;
    const directTransferNode = {
      id,
      fn: "direct_transfer",
      label: `Transfer: ${formData.address.slice(0, 8)}...`,
      x: 60 + (nodes.length * 10) % 400,
      y: 60 + (nodes.length * 20) % 300,
      value: formData,
      directTransferData: formData
    };
    
    setNodes(prev => [...prev, directTransferNode]);
    setDirectTransferFormOpen(false);
  }

  function handleApprovedTransferFormSubmit(formData) {
    const id = `approved_transfer-${Date.now()}`;
    const approvedTransferNode = {
      id,
      fn: "approved_transfer",
      label: `Approved Transfer: ${formData.addressFrom.slice(0, 8)}...`,
      x: 60 + (nodes.length * 10) % 400,
      y: 60 + (nodes.length * 20) % 300,
      value: formData,
      approvedTransferData: formData
    };
    
    setNodes(prev => [...prev, approvedTransferNode]);
    setApprovedTransferFormOpen(false);
  }

  function handleConnectClick(targetId) {
    if (!connectingFrom) {
      setConnectingFrom(targetId);
      return;
    }
    if (connectingFrom === targetId) {
      setConnectingFrom(null);
      return;
    }
    setConnections(prev => {
      const withoutTo = prev.filter(c => c.to !== targetId);
      const exists = withoutTo.some(c => c.from === connectingFrom && c.to === targetId);
      if (exists) {
        setConnectingFrom(null);
        return withoutTo;
      }
      return [...withoutTo, { from: connectingFrom, to: targetId }];
    });
    setConnectingFrom(null);
  }

  function handleDeleteNode(id) {
    setNodes(prev => prev.filter(n => n.id !== id));
    setConnections(prev => prev.filter(c => c.from !== id && c.to !== id));
    if (connectingFrom === id) setConnectingFrom(null);
  }

  function handleClear() {
    setNodes([]);
    setConnections([]);
    setConnectingFrom(null);
  }

  async function postExecutionPayload(payload) {
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const responseBody = await response
        .json()
        .catch(() => null);
      return { ok: response.ok, status: response.status, body: responseBody };
    } catch (error) {
      return { ok: false, error: String(error) };
    }
  }

  async function handleSubmit() {
    const orderedNodes = buildExecutionOrder(nodes, connections);
    const dataMap = { 
      contract_init: { contractData: null }, // Will be filled with actual contract data
      owner_init: { ownerData: null }, // Will be filled with actual owner data
      mint_init: { mintData: null }, // Will be filled with actual mint data
      owner_check: { ownerCheckData: null }, // Will be filled with actual owner check data
      allowance_check: { allowanceCheckData: null }, // Will be filled with actual allowance check data
      approve: { approveData: null }, // Will be filled with actual approve data
      direct_transfer: { directTransferData: null }, // Will be filled with actual transfer data
      approved_transfer: { approvedTransferData: null } // Will be filled with actual approved transfer data
    };
    
    const result = orderedNodes.map(n => ({ 
      id: n.id, 
      fn: n.fn, 
      label: n.label, 
      payload: n.contractData ? { contractData: n.contractData } : 
              n.ownerData ? { ownerData: n.ownerData } : 
              n.mintData ? { mintData: n.mintData } :
              n.ownerCheckData ? { ownerCheckData: n.ownerCheckData } :
              n.allowanceCheckData ? { allowanceCheckData: n.allowanceCheckData } :
              n.approveData ? { approveData: n.approveData } :
              n.directTransferData ? { directTransferData: n.directTransferData } :
              n.approvedTransferData ? { approvedTransferData: n.approvedTransferData } :
              (dataMap[n.fn] ?? {})
    }));
    
    const payload = { order: orderedNodes.map(n => n.fn), result };

    setModalPayload(payload);
    setModalOpen(true);
    console.log("Submit payload:", payload);

    // Save globally for reuse elsewhere
    setLatestExecutionPayload(payload);

    // Optional: POST the payload to your backend API
    const postResult = await postExecutionPayload(payload);
    console.log("POST /api/submit result:", postResult);
  }

  return (
    <div className="app">
      <Sidebar onDragStartFn={() => {}} onClickAdd={addNodeFromSidebar} />

      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <div className="topbar">
          <button
            className="btn primary"
            onClick={(e) => { e.stopPropagation(); handleSubmit(); }}
          >
            Submit
          </button>
          <button
            className="btn"
            onClick={(e) => { e.stopPropagation(); handleClear(); }}
          >
            Clear
          </button>
          <div style={{ marginLeft: 12, color: "#9aa0a6" }}>
            {connectingFrom ? `Connecting from: ${connectingFrom}` : "Click Connect on a node, then Connect on another to link."}
          </div>
        </div>

        <div className="canvas-wrap">
          <Canvas
            nodes={nodes}
            setNodes={setNodes}
            connections={connections}
            setConnections={setConnections}
            onConnectClick={handleConnectClick}
            onDelete={handleDeleteNode}
            connectingFrom={connectingFrom}
            setConnectingFrom={setConnectingFrom}
          />
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Execution JSON">
        <pre>{modalPayload ? JSON.stringify(modalPayload, null, 2) : "No data"}</pre>
      </Modal>

      <Modal open={contractFormOpen} onClose={() => setContractFormOpen(false)} title="">
        <ContractForm 
          onSubmit={handleContractFormSubmit}
          onCancel={() => setContractFormOpen(false)}
        />
      </Modal>

      <Modal open={ownerFormOpen} onClose={() => setOwnerFormOpen(false)} title="">
        <OwnerForm 
          onSubmit={handleOwnerFormSubmit}
          onCancel={() => setOwnerFormOpen(false)}
        />
      </Modal>

      <Modal open={mintFormOpen} onClose={() => setMintFormOpen(false)} title="">
        <MintForm 
          onSubmit={handleMintFormSubmit}
          onCancel={() => setMintFormOpen(false)}
        />
      </Modal>

      <Modal open={ownerCheckFormOpen} onClose={() => setOwnerCheckFormOpen(false)} title="">
        <OwnerCheckForm 
          onSubmit={handleOwnerCheckFormSubmit}
          onCancel={() => setOwnerCheckFormOpen(false)}
        />
      </Modal>

      <Modal open={allowanceCheckFormOpen} onClose={() => setAllowanceCheckFormOpen(false)} title="">
        <AllowanceCheckForm 
          onSubmit={handleAllowanceCheckFormSubmit}
          onCancel={() => setAllowanceCheckFormOpen(false)}
        />
      </Modal>

      <Modal open={approveFormOpen} onClose={() => setApproveFormOpen(false)} title="">
        <ApproveForm 
          onSubmit={handleApproveFormSubmit}
          onCancel={() => setApproveFormOpen(false)}
        />
      </Modal>

      <Modal open={directTransferFormOpen} onClose={() => setDirectTransferFormOpen(false)} title="">
        <DirectTransferForm 
          onSubmit={handleDirectTransferFormSubmit}
          onCancel={() => setDirectTransferFormOpen(false)}
        />
      </Modal>

      <Modal open={approvedTransferFormOpen} onClose={() => setApprovedTransferFormOpen(false)} title="">
        <ApprovedTransferForm 
          onSubmit={handleApprovedTransferFormSubmit}
          onCancel={() => setApprovedTransferFormOpen(false)}
        />
      </Modal>
      </div>
  );
}

