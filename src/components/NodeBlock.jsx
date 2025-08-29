import React from "react";

/**
 * NodeBlock is responsible for its own mouse-based drag (not HTML drag).
 * Props:
 *  - node { id, fn, label, x, y }
 *  - setNodes (setter)
 *  - onDelete(id)
 *  - onConnectClick(id)
 *  - connectingFrom (id or null)
 */
export default function NodeBlock({ node, setNodes, onDelete, onConnectClick, connectingFrom }) {
  const handleMouseDown = (e) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const initX = node.x;
    const initY = node.y;

    function onMove(ev) {
      const nx = initX + (ev.clientX - startX);
      const ny = initY + (ev.clientY - startY);
      setNodes(prev => prev.map(n => (n.id === node.id ? { ...n, x: nx, y: ny } : n)));
    }

    function onUp() {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  return (
    <div
      className="node"
      style={{ left: node.x, top: node.y }}
      onMouseDown={handleMouseDown}
    >
      <div className="node-title">{node.label}</div>

      <div className="node-controls">
        <button
          className="btn"
          onClick={(e) => {
            e.stopPropagation();
            onConnectClick(node.id);
          }}
        >
          {connectingFrom === node.id ? "Cancel" : "Connect"}
        </button>

        <button
          className="btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(node.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}


