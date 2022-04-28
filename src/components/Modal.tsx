import React from "react";

interface ModalProps {
  text?: string;
  children?: React.ReactNode;
  onCancel?: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>;
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
        {text && <p>{text ?? ""}</p>}
        {children}
        <button
          className="btn btn--alt"
          onClick={onCancel}
          disabled={onCancel == null}
          data-testid="modal-cancel-btn"
        >
          Cancel
        </button>
        <button
          className="btn"
          onClick={onConfirm}
          disabled={onConfirm == null}
          data-testid="modal-confirm-btn"
        >
          Confirm
        </button>
      </div>
      <div
        className="backdrop"
        onClick={onCancel}
        data-testid="modal-backdrop"
      ></div>
    </div>
  );
};
