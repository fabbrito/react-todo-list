import React from "react";

interface Props {
  onClickHandler?: React.MouseEventHandler<HTMLDivElement>;
}

export const Backdrop: React.FC<Props> = ({ onClickHandler = () => {} }) => {
  return <div className="backdrop" onClick={onClickHandler} />;
};
