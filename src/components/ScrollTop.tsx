import React from "react";

interface Props {
  scrollToTheTop?: () => void;
  showScrollButton?: boolean;
}

export const ScrollTop: React.FC<Props> = ({
  scrollToTheTop = () => {},
  showScrollButton = false,
}) => {
  const onClickScroll: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!showScrollButton) return;
    scrollToTheTop();
  };

  return (
    <div className={`scroll-top-container${showScrollButton ? "" : " hidden"}`}>
      <button
        className="btn"
        onClick={onClickScroll}
        disabled={!showScrollButton}
      >
        <div className="chevron up"></div>
      </button>
    </div>
  );
};
