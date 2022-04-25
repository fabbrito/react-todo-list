import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Card } from "./Card";
import type { Todo } from "../components/TodoItem";

interface Props {
  updateTodos: (operation: string, todo: Todo) => void;
}

export const AddTodo: React.FC<Props> = ({ updateTodos }) => {
  const [text, setText] = useState<string | null>(null);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const _date = new Date();
    updateTodos("add", {
      id: uuidv4(),
      text,
      checked: false,
      createdAt: _date.toISOString(),
      isVisible: true,
    });
    setText(null);
  };

  const onTextChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setText(event.target.value);
  };

  return (
    <Card rounded>
      <form onSubmit={submitHandler}>
        <textarea
          placeholder="Add an item to the list ..."
          onChange={onTextChange}
          value={text ?? ""}
          className="textarea"
          maxLength={500}
        />
        <div className="actions">
          <input type="submit" value="Add" className="btn" />
        </div>
      </form>
    </Card>
  );
};
