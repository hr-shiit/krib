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
      <div className="sidebar-header">
        <h2>Krib</h2>
        <span className="sidebar-subtitle">Smart Contract Workflows</span>
      </div>
      
      <div className="fn-section">
        <h3>Contract Setup</h3>
        <div className="fn-list">
          {FUNCTIONS.slice(0, 2).map((fn) => (
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
              title={fn.label}
            >
              <div className="fn-pill-icon contract-icon"></div>
              <div className="fn-pill-content">
                <div className="fn-pill-title">{fn.label}</div>
                <div className="fn-pill-description">Configure {fn.id === 'contract_init' ? 'smart contract' : 'owner'} settings</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fn-section">
        <h3>Token Operations</h3>
        <div className="fn-list">
          {FUNCTIONS.slice(2, 4).map((fn) => (
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
              title={fn.label}
            >
              <div className="fn-pill-icon token-icon"></div>
              <div className="fn-pill-content">
                <div className="fn-pill-title">{fn.label}</div>
                <div className="fn-pill-description">{fn.id === 'mint_init' ? 'Create new tokens' : 'Check token ownership'}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fn-section">
        <h3>Permissions</h3>
        <div className="fn-list">
          {FUNCTIONS.slice(4, 6).map((fn) => (
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
              title={fn.label}
            >
              <div className="fn-pill-icon permission-icon"></div>
              <div className="fn-pill-content">
                <div className="fn-pill-title">{fn.label}</div>
                <div className="fn-pill-description">{fn.id === 'allowance_check' ? 'Check transfer permissions' : 'Grant transfer permissions'}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fn-section">
        <h3>Transfer</h3>
        <div className="fn-list">
          {FUNCTIONS.slice(6).map((fn) => (
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
              title={fn.label}
            >
              <div className="fn-pill-icon transfer-icon"></div>
              <div className="fn-pill-content">
                <div className="fn-pill-title">{fn.label}</div>
                <div className="fn-pill-description">{fn.id === 'direct_transfer' ? 'Transfer your own tokens' : 'Transfer approved tokens'}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-help">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-4h2v2h-2zm1.61-9.96c-2.06-.3-3.88.97-4.43 2.79-.18.58.26 1.17.87 1.17h.2c.41 0 .74-.29.88-.67.32-.89 1.27-1.5 2.3-1.28.95.2 1.65 1.13 1.57 2.1-.1 1.34-1.62 1.63-2.45 2.88 0 .01-.01.01-.01.02-.01.02-.02.03-.03.05-.09.15-.18.32-.25.5-.01.03-.03.05-.04.08-.01.02-.01.04-.02.07-.12.34-.2.75-.2 1.25h2c0-.42.11-.77.28-1.07.02-.03.03-.06.05-.09.08-.14.18-.27.28-.39.01-.01.02-.03.03-.04.1-.12.21-.23.33-.34.96-.91 2.26-1.65 1.99-3.56-.24-1.74-1.61-3.21-3.35-3.47z"/></svg>
          Drag nodes to canvas or click to add
        </div>
      </div>
    </aside>
  );
}


