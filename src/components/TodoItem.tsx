import React, { useState } from "react";
import { Modal } from "./Modal";
import { Backdrop } from "./Backdrop";
import { DateItem } from "./DateItem";
import { Card } from "./Card";

export type Todo = {
  id: string;
  text: string | null;
  checked: boolean;
  createdAt: string;
};

interface Props extends Todo {
  onDelete: (id: string) => void;
}

// // Remove "createdAt" property and extend interface
// interface Props extends Omit<Todo, "createdAt"> {
//   onDelete: (id: string) => void;
// }

export const TodoItem: React.FC<Props> = ({
  id,
  text,
  checked,
  createdAt,
  onDelete,
}) => {
  const todoText: string = text ?? `Id: ${id}`;

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

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
    // Calls the passed function to delete the todo component with matching "id"
    onDelete(id);
    setModalIsOpen(false);
  };

  return (
    <Card rounded hasDelete onClickDelete={openModalToDelete}>
      <h3>{todoText}</h3>
      {/* <div className="actions">
          <DateItem dateString={createdAt} />
          <button className="btn" onClick={openModalToDelete}>
            Delete
          </button>
        </div> */}
      <DateItem dateString={createdAt} />
      {modalIsOpen && (
        <Modal
          text={todoText}
          onCancel={closeModalHandler}
          onConfirm={deleteHandler}
        />
      )}
      {modalIsOpen && <Backdrop onClickHandler={closeModalHandler} />}
    </Card>
  );
};
