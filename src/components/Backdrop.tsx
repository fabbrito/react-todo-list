import React from "react";

interface Props {
  onClickHandler?: React.MouseEventHandler<HTMLDivElement>;
}

const Backdrop: React.FC<Props> = ({ onClickHandler = () => {} }) => {
  return <div className="backdrop" onClick={onClickHandler} />;
};

export default Backdrop;
