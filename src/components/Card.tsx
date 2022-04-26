import React, { useEffect, useState } from "react";

interface Props {
  rounded?: boolean;
  hasGradient?: boolean;
  gradient?: number;
  hasDelete?: boolean;
  onClickDelete?: React.MouseEventHandler<HTMLSpanElement>;
  checked?: boolean;
  hasCheckbox?: boolean;
  onCheckboxToggle?: (isChecked: boolean) => void;
  isVisible?: boolean;
  children?: React.ReactNode;
}

export const Card: React.FC<Props> = ({
  children,
  rounded,
  hasGradient,
  gradient,
  hasDelete,
  onClickDelete = () => {},
  checked = false,
  hasCheckbox,
  onCheckboxToggle = () => {},
  isVisible = true,
}) => {
  const [checkboxState, setCheckboxState] = useState<boolean>(checked);

  const onCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = () => {
    onCheckboxToggle(!checkboxState);
    setCheckboxState(!checkboxState);
  };

  useEffect(() => {
    setCheckboxState(checked);
  }, [checked]);

  return (
    <div
      className={`card${rounded ? " rounded" : ""}${
        hasGradient ? ` gradient gradient-${gradient ?? 0}` : ""
      }${checked ? " checked" : ""}${!isVisible ? " hide" : ""}`}
    >
      {children}
      {hasDelete && (
        <span className="delete-btn" onClick={onClickDelete}>
          &times;
        </span>
      )}
      {hasCheckbox && (
        <input
          type="checkbox"
          className="checkbox"
          checked={checkboxState}
          onChange={onCheckboxChange}
        />
      )}
    </div>
  );
};
