import React, { useState } from "react";
import { Todo } from "../components/Todo";
import { v4 as uuidv4 } from "uuid";
import "../css/App.css";

type TodosType = { id: string; title: string | null }[];

const todosArray: (string | null)[] = [
  "Learn React!",
  "Learn Typescript!",
  "Explore full Typescript courses! Now on YouTube!",
  null,
];

const todosArrayOfObj: TodosType = todosArray.map((title) => {
  return { id: uuidv4(), title };
});

export const App: React.FC = () => {
  const [todosState, setTodosState] = useState<TodosType>(todosArrayOfObj);

  const onDeleteTodo = (id: string) => {
    // console.group(id);
    // console.debug("Removed Todo");
    // console.debug(
    //   [...todosState].filter((todoObj) => {
    //     return todoObj.id === id;
    //   })[0]
    // );
    // console.groupEnd();

    // Remove the object that matches the provided id and updates the app state
    setTodosState(
      todosState.filter((todoObj) => {
        return todoObj.id !== id;
      })
    );
  };

  // useEffect(() => {
  //   console.log("Mounted");
  //   return () => {
  //     console.log("Unmounted");
  //   };
  // }, []);

  return (
    <div>
      <h1>My Todos</h1>
      {todosState.map((todo) => {
        return (
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            onDeleteTodo={onDeleteTodo}
          />
        );
      })}
    </div>
  );
};
