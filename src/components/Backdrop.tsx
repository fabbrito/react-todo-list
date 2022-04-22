import React from "react";

interface Props {
  onClickHandler?: React.MouseEventHandler<HTMLDivElement>;
}

export const Backdrop: React.FC<Props> = (props) => {
  return <div className="backdrop" onClick={props?.onClickHandler} />;
};

