import React from "react";

const FUNCTIONS = [
  { id: "fn1", label: "fn1", jsonValue: 1 },
  { id: "fn2", label: "fn2", jsonValue: 2 },
  { id: "fn3", label: "fn3", jsonValue: 3 },
  { id: "fn4", label: "fn4", jsonValue: 4 },
  { id: "fn5", label: "fn5", jsonValue: 5 },
];

export default function Sidebar({ onDragStartFn, onClickAdd }) {
  return (
    <aside className="sidebar">
      <h2>Functions</h2>
      <div className="fn-list">
        {FUNCTIONS.map((fn) => (
          <div
            key={fn.id}
            className="fn-pill"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("application/json", JSON.stringify(fn));
              e.dataTransfer.effectAllowed = "copy";
              if (onDragStartFn) onDragStartFn(fn);
            }}
            onClick={() => onClickAdd && onClickAdd(fn)}
            title="Drag to canvas or click to add"
          >
            {fn.id.toUpperCase()} — {fn.label}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, color: "#9aa0a6", fontSize: 13 }}>
        Drag from here and drop onto canvas — or click to add.
      </div>
    </aside>
  );
}


