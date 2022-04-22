import React from "react";

interface Props {
  text: string;
  onCancel?: React.MouseEventHandler<HTMLButtonElement>;
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Modal: React.FC<Props> = ({ text, onCancel, onConfirm }) => {
  const lettersToShow: number = 40;
  const lettersToShowEnd: number = 5;
  return (
    <div className="modal">
      <p>
        Delete "
        {text.length > lettersToShow
          ? text
              .slice(0, lettersToShow - lettersToShowEnd - 3)
              .concat("...", text.slice(-lettersToShowEnd))
          : text}
        "?
      </p>
      <button className="btn btn--alt" onClick={onCancel}>
        Cancel
      </button>
      <button className="btn" onClick={onConfirm}>
        Confirm
      </button>
    </div>
  );
};
