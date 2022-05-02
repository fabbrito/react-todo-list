import React, { useState, useEffect, useCallback } from "react";
import { TodoItem, Todo } from "../components/TodoItem";
import { AddTodo } from "../components/AddTodo";
import { Toolbar } from "../components/Toolbar";
import { ScrollTop } from "../components/ScrollTop";
import { compareAsc } from "date-fns";
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";
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

const sortByDate = (_items: Todos): Todos => {
  // Since
  return _items.sort((a, b) => {
    return compareAsc(new Date(b.createdAt), new Date(a.createdAt));
  });
};

export const App: React.FC = () => {
  // Access localstorage and returns a sorted list of todos under the key "items"
  const loadTodos = (): Todos => {
    const _itemsString = localStorage.getItem("items");
    if (_itemsString == null) return [];

    const _items: Todos = JSON.parse(_itemsString);
    return sortByDate(_items).map((_todo) => {
      return { ..._todo, isVisible: true };
    });
  };

  // Initialized state with localstorage items
  const [todoItems, setTodoItems] = useState<Todos>(loadTodos());

  const updateTodos = (action: string, _todo: Todo) => {
    if (action === "delete") {
      setTodoItems(onDelete(_todo, todoItems));
    } else if (action === "update") {
      setTodoItems(onAddTodo(_todo, onDelete(_todo, todoItems)));
    } else if (action === "add") {
      setTodoItems(onAddTodo(_todo, todoItems));
    } else {
      console.debug("No action provided!");
    }
  };

  // Find and remove a single item from the provided list, then returns the modified list
  const onDelete = (todo: Todo, todoList: Todos): Todos => {
    // Remove the object that matches the provided id and updates the app state
    const _items = todoList.filter((_todo) => {
      return _todo.id !== todo.id;
    });
    return sortByDate(_items);
  };

  // Given a new todo and a todo list, returns a new sorted list that extends the one provided
  const onAddTodo = (todo: Todo, todoList: Todos): Todos => {
    // "todoItems ?? []" means that if todoItems is undefined or null then it returns []
    // the result from above is then destructured and "todo" is appended at the end.
    const _items = [...(todoList ?? []), todo];
    return sortByDate(_items);
  };

  // Using _debounce from lodash to debounce input for 300ms and call the search function every 1s.
  const debouncedSearchFunction = debounce(
    (text: string) => {
      setTodoItems(
        [...todoItems].map((_todo) => {
          let isVisible: boolean;
          if (_todo.text === null) {
            // if text is null, searchs using a new string "Id: ${id}"
            isVisible = "Id :"
              .concat(_todo.id)
              .toLowerCase()
              .includes(text.toLowerCase());
          } else {
            isVisible =
              _todo.id.toLowerCase().includes(text.toLowerCase()) ||
              _todo.text.toLowerCase().includes(text.toLowerCase());
          }
          return { ..._todo, isVisible };
        })
      );
    },
    300,
    { maxWait: 1000 }
  );

  // "useCallback" is used so that the debounced search function is memoized for each set of "todoItems",
  // which means that a cached version of "debouncedSearch" is used until a change occurs with "todoItems".
  const debouncedSearch = useCallback(
    (text) => debouncedSearchFunction(text),
    [debouncedSearchFunction]
  );

  // Change "checked" property of all visible items
  const onCheckAll = (isChecked: boolean) => {
    const visibleItems = [...todoItems]
      .filter((_todo) => {
        return _todo.isVisible;
      })
      .map((_todo) => {
        return { ..._todo, checked: isChecked };
      });
    const notVisibleItems = [...todoItems].filter((_todo) => {
      return !_todo.isVisible;
    });
    setTodoItems(sortByDate([...visibleItems, ...notVisibleItems]));
  };

  // Delete all items with truthy "checked" property then make the rest of the items visible
  const onDeleteAll = async () => {
    setTodoItems(
      [...todoItems]
        .filter((_todo) => {
          // Filter out all those that are "checked" and "isVisible"
          return !(_todo.checked && _todo.isVisible);
        })
        .map((_todo) => {
          return { ..._todo, isVisible: true };
        })
    );
  };

  // Save the state variable "todoItems" to the localstorage
  const saveTodos = () => {
    if (todoItems === undefined) return;
    localStorage.setItem("items", JSON.stringify(todoItems));
    // console.debug([...todoItems]);
  };

  // Call "saveTodos" on every change to "todoItems"
  useEffect(saveTodos, [todoItems]);

  // TODO: Change state from Todo[] to an object of the type{[id: string]: Omit<Todo, "id">}

  /* useEffect(() => {
    type T = {
      [id: string]: Omit<Todo, "id">;
    };

    const todoObj: T = todoItems
      .map((_todo) => {
        const { id, ...__todo } = _todo;
        return { [_todo.id]: __todo };
      })
      .reduce((prev, curr) => {
        return { ...prev, ...curr };
      }, {});

    console.log(todoObj);

    const aTodo = todoItems[0];
    const idForSearch = aTodo.id;

    console.log(todoObj[idForSearch]);

    console.log(Object.keys(todoObj).map((key, index) => {return {id: key, ...todoObj[key]}}));
  }, [todoItems]); */

  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);

  const scrollToTheTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Add a scroll event listener to the window with a throttled function that sets showScrollButton depending on the pageYOffset
  useEffect(() => {
    const throttledScroll = throttle(() => {
      if (window.pageYOffset > 300) setShowScrollButton(true);
      else if (window.pageYOffset <= 300) setShowScrollButton(false);
    }, 500);

    window.addEventListener("scroll", throttledScroll);

    // When unmounting
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  return (
    <div className="app">
      <div className="top-container stick">
        <Toolbar
          searchFunction={debouncedSearch}
          onCheckAll={onCheckAll}
          onDeleteAll={onDeleteAll}
        />
      </div>
      <div className="main-container">
        <div className="left-container">
          <h1>My Todos</h1>
          <div className="todos-container">
            {todoItems.map((todo) => {
              return (
                <TodoItem key={todo.id} todo={todo} updateTodos={updateTodos} />
              );
            })}
          </div>
        </div>
        <div className="right-container">
          {/* <div className="stick-top"> */}
          <h1>Add Todos</h1>
          <AddTodo updateTodos={updateTodos} />
          {/* </div> */}
        </div>
      </div>
      <ScrollTop
        scrollToTheTop={scrollToTheTop}
        showScrollButton={showScrollButton}
      />
    </div>
  );
};
