import React from "react";

const FUNCTIONS = [
  { id: "contract_init", label: "Contract Initialization", jsonValue: null, type: "form" },
  { id: "owner_init", label: "Owner Initialization", jsonValue: null, type: "form" },
  { id: "mint_init", label: "Mint Initialization", jsonValue: null, type: "form" },
  { id: "owner_check", label: "Owner Check", jsonValue: null, type: "form" },
  { id: "allowance_check", label: "Allowance Check", jsonValue: null, type: "form" },
  { id: "approve", label: "Approve", jsonValue: null, type: "form" },
  { id: "direct_transfer", label: "Direct Transfer", jsonValue: null, type: "form" },
  { id: "approved_transfer", label: "Approved Transfer", jsonValue: null, type: "form" },
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


