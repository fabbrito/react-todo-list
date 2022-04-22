import React, { useRef, useState } from "react";
import { Modal } from "../components/Modal";
import { Backdrop } from "../components/Backdrop";

interface Props {
  id: string;
  title?: string | null;
  onDeleteTodo: (id: string) => void;
}

export const Todo: React.FC<Props> = ({ title, id, onDeleteTodo }) => {
  const todoTitle: string = title ?? "Default title";

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const openModalToDelete: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    setModalIsOpen(true);
  };

  const closeModalHandler: React.MouseEventHandler<
    HTMLDivElement | HTMLButtonElement
  > = (event) => {
    setModalIsOpen(false);
  };

  const deleteHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onDeleteTodo(id);
    setModalIsOpen(false);
  };

  return (
    <div className="card" ref={cardRef}>
      <h2>{todoTitle}</h2>
      <div className="actions">
        <button className="btn" onClick={openModalToDelete}>
          Delete
        </button>
      </div>
      {modalIsOpen && (
        <Modal
          text={todoTitle}
          onCancel={closeModalHandler}
          onConfirm={deleteHandler}
        />
      )}
      {modalIsOpen && <Backdrop onClickHandler={closeModalHandler} />}
    </div>
  );
};
