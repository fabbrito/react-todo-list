import React, { useState, useEffect } from "react";
import { TodoItem, Todo } from "../components/TodoItem";
import { AddTodo } from "../components/AddTodo";
import { differenceInSeconds } from "date-fns";
import "../styles/app.scss";

// import { v4 as uuidv4 } from "uuid";
// const todosArray: (string | null)[] = [
//   "Learn React!",
//   "Learn Typescript!",
//   "Explore full Typescript courses! Now on YouTube!",
//   null,
// ];

// const _date = new Date();
// const todosArrayOfObj: Todos = todosArray.map((text) => {
//   return { id: uuidv4(), text, checked: false, createdAt: _date.toISOString() };
// });

type Todos = Todo[];

export const App: React.FC = () => {
  const loadTodos = (): Todos => {
    const _itemsString = localStorage.getItem("items");
    if (_itemsString == null) return [];

    const _items: Todos = JSON.parse(_itemsString);
    _items.sort((a, b) => {
      return differenceInSeconds(new Date(b.createdAt), new Date(a.createdAt));
    });
    return _items;
  };

  const [todoItems, setTodoItems] = useState<Todos>(loadTodos());

  const saveTodos = () => {
    if (todoItems === undefined) return;
    localStorage.setItem("items", JSON.stringify(todoItems));
    // console.debug([...todoItems]);
  };

  const onDelete = (id: string) => {
    // console.debug(
    //   "REMOVED",
    //   todoItems.filter((todo) => {
    //     return todo.id === id;
    //   })[0]
    // );
    // console.debug(
    //   "REMAINING",
    //   todoItems.filter((todo) => {
    //     return todo.id !== id;
    //   })
    // );

    // Remove the object that matches the provided id and updates the app state
    setTodoItems(
      todoItems.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

  const onAddTodo = (todo: Todo) => {
    // "todoItems ?? []" means that if todoItems is undefined or null then it returns []
    // the result from above is destructured and "todo" is appended at the end
    setTodoItems([...(todoItems ?? []), todo]);
  };

  // Call "saveTodos" on every change to "todoItems"
  useEffect(saveTodos, [todoItems]);

  return (
    <div className="container">
      <div className="left-container">
        <h1>My Todos</h1>
        <div className="todo-container">
          {todoItems?.map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                checked={todo.checked}
                createdAt={todo.createdAt}
                onDelete={onDelete}
              />
            );
          })}
        </div>
      </div>
      <div className="right-container">
        <h1>Add Todos</h1>
        <AddTodo onAddTodo={onAddTodo} />
      </div>
    </div>
  );
};
