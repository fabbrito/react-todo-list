import React from "react";

interface Props {
  text: string;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Modal: React.FC<Props> = ({ text, onCancel, onConfirm }) => {
  return (
    <div className="modal">
      <p>Delete "{text}"?</p>
      <button
        className="btn btn--alt"
        onClick={onCancel}
        disabled={onCancel == null}
      >
        Cancel
      </button>
      <button className="btn" onClick={onConfirm} disabled={onConfirm == null}>
        Confirm
      </button>
    </div>
  );
};
