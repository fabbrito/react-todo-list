import React from "react";

interface Props {
  scrollTop?: () => void;
}

export const ScrollTop: React.FC<Props> = ({ scrollTop = () => {} }) => {
  const onClickScroll: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    scrollTop();
  };

  return (
    <div className="scroll-top-container">
      <button className="btn" onClick={onClickScroll}>
        <div className="chevron up"></div>
      </button>
    </div>
  );
};
