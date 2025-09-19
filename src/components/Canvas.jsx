import React, { useRef } from "react";
import NodeBlock from "./NodeBlock";

/**
 * Canvas draws nodes + SVG lines and handles drop from Sidebar.
 * Props:
 *  - nodes, setNodes
 *  - connections, setConnections
 *  - onConnectClick(nodeId)
 *  - onDelete(nodeId)
 *  - setConnectingFrom (for clearing)
 */
export default function Canvas({
  nodes,
  setNodes,
  connections,
  setConnections,
  onConnectClick,
  onDelete,
  connectingFrom,
  setConnectingFrom,
}) {
  const canvasRef = useRef(null);

  function handleDrop(e) {
    e.preventDefault();
    const json = e.dataTransfer.getData("application/json");
    if (!json) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const payload = JSON.parse(json);
    const id = `${payload.id}-${Date.now()}`;
    const x = (e.clientX - rect.left) - 70;
    const y = (e.clientY - rect.top) - 20;
    setNodes(prev => [...prev, { id, fn: payload.id, label: payload.label, x, y, value: payload.jsonValue }]);
  }

  function handleCanvasClick() {
    // clicking empty canvas cancels a pending connect
    if (connectingFrom) setConnectingFrom(null);
  }

  return (
    <div
      ref={canvasRef}
      className="canvas"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={handleCanvasClick}
    >
      {/* SVG lines go behind nodes */}
      <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} pointerEvents="none">
        {connections.map((c, idx) => {
          const from = nodes.find(n => n.id === c.from);
          const to = nodes.find(n => n.id === c.to);
          if (!from || !to) return null;
          const x1 = from.x + 70; // center of node (approx)
          const y1 = from.y + 25;
          const x2 = to.x + 10;
          const y2 = to.y + 25;
          const dx = x2 - x1;
          const dy = y2 - y1;
          const midX = x1 + dx * 0.5;
          
          // Create an S-curve using cubic bezier
          return (
            <path
              key={idx}
              d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`}
              stroke="var(--color-secondary)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              className="connection-line"
            />
          );
        })}
      </svg>

      {/* render nodes (z-indexed above svg) */}
      {nodes.map(node => (
        <NodeBlock
          key={node.id}
          node={node}
          setNodes={setNodes}
          onDelete={onDelete}
          onConnectClick={onConnectClick}
          connectingFrom={connectingFrom}
        />
      ))}
    </div>
  );
}


