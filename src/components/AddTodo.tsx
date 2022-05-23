import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Card from "./Card";
import type { Todo } from "../components/TodoItem";

interface Props {
  updateTodos: (operation: string, todo: Todo) => void;
}

const AddTodo: React.FC<Props> = ({ updateTodos }) => {
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

  const onTextareaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setText(event.target.value);
  };

  return (
    <Card rounded>
      <form onSubmit={submitHandler}>
        <textarea
          placeholder="Add a new TO-DO here..."
          onChange={onTextareaChange}
          value={text ?? ""}
          className="textarea"
          maxLength={500}
          data-testid="addtodo-textarea"
        />
        <div className="actions">
          <input type="submit" value="Add" className="btn" data-testid="addtodo-submit" />
        </div>
      </form>
    </Card>
  );
};

export default AddTodo;
