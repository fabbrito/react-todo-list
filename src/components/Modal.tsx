import React from "react";

interface ModalProps {
  text?: string
  onCancel?: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  onCancel,
  onConfirm,
  text,
}) => {
  return (
    <div className="modal-container">
      <div className="modal">
        {text && <p>{text}</p>}
        {children}
        <button
          className="btn btn--alt"
          onClick={onCancel}
          disabled={onCancel == null}
        >
          Cancel
        </button>
        <button
          className="btn"
          onClick={onConfirm}
          disabled={onConfirm == null}
        >
          Confirm
        </button>
      </div>
      <div className="backdrop" onClick={onCancel}></div>
    </div>
  );
};
