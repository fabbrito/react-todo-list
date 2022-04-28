import React, { useState } from "react";
import { Modal } from "./Modal";
import { DateItem } from "./DateItem";
import { Card } from "./Card";

export type Todo = {
  id: string;
  text: string | null;
  checked: boolean;
  createdAt: string;
  isVisible: boolean;
};

interface Props {
  todo: Todo;
  updateTodos: (action: string, todo: Todo) => void;
}

// // Remove "createdAt" property and extend interface
// interface Props extends Omit<Todo, "createdAt"> {
//   onDelete: (id: string) => void;
// }

export const TodoItem: React.FC<Props> = ({ todo, updateTodos }) => {
  const todoText: string = todo.text ?? `Id: ${todo.id}`;

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
    updateTodos("delete", { ...todo });
    setModalIsOpen(false);
  };

  const onCheckboxToggle = (isChecked: boolean) => {
    // event.stopPropagation();
    let _newTodo = { ...todo };
    _newTodo.checked = isChecked;
    updateTodos("update", _newTodo);
  };

  return (
    <Card
      rounded
      hasDelete
      onClickDelete={openModalToDelete}
      checked={todo.checked}
      hasCheckbox
      onCheckboxToggle={onCheckboxToggle}
      isVisible={todo.isVisible}
    >
      <h3>{todoText}</h3>
      <DateItem dateString={todo.createdAt} />
      {modalIsOpen && (
        <Modal onCancel={closeModalHandler} onConfirm={deleteHandler}>
          <p>
            <b>DELETE</b> "{todoText}"?
          </p>
        </Modal>
      )}
    </Card>
  );
};
