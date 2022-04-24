import React from "react";
// // A SVG can be manipulated as a ReactComponent
// import { ReactComponent as Garbage } from "../img/garbageIcon.svg";

interface Props {
  rounded?: boolean;
  hasGradient?: boolean;
  gradient?: number;
  hasDelete?: boolean;
  onClickDelete?: React.MouseEventHandler<HTMLSpanElement>;
  children?: React.ReactNode;
}

export const Card: React.FC<Props> = ({
  children,
  rounded,
  hasGradient,
  gradient,
  hasDelete,
  onClickDelete = () => {},
}) => {
  return (
    <div
      className={`card ${rounded ? "rounded" : ""} ${
        hasGradient ? `gradient gradient-${gradient ?? 0}` : ""
      }`}
    >
      {children}
      {hasDelete && (
        <span className="delete-btn" onClick={onClickDelete}>
          &times;
          {/* <Garbage className="garbage-icon" /> */}
        </span>
      )}
    </div>
  );
};
