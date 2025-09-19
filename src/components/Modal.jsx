import React from "react";

export default function Modal({ open, onClose, children, title = "Result", hideDefaultButtons = false }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {title && <h3>{title}</h3>}
        <div className="modal-content">
          {children}
        </div>
        {!hideDefaultButtons && title && (
          <div className="form-buttons">
            <button className="secondary" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


