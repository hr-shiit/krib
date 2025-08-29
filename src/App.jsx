import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import Modal from "./components/Modal";
import buildExecutionOrder from "./utils/buildExecutionOrder";

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [connectingFrom, setConnectingFrom] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPayload, setModalPayload] = useState(null);

  function addNodeFromSidebar(fn) {
    const id = `${fn.id}-${Date.now()}`;
    setNodes(prev => [...prev, { id, fn: fn.id, label: fn.label, x: 60 + (prev.length * 10) % 400, y: 60 + (prev.length * 20) % 300, value: fn.jsonValue }]);
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

  function handleSubmit() {
    const orderedNodes = buildExecutionOrder(nodes, connections);
    const dataMap = { fn1: { data: 1 }, fn2: { data: 2 }, fn3: { data: 3 }, fn4: { data: 4 }, fn5: { data: 5 } };
    const result = orderedNodes.map(n => ({ id: n.id, fn: n.fn, label: n.label, payload: dataMap[n.fn] ?? {} }));
    setModalPayload({ order: orderedNodes.map(n => n.fn), result });
    setModalOpen(true);
    console.log("Submit payload:", { order: orderedNodes.map(n => n.fn), result });
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
    </div>
  );
}

