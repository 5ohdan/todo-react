import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  ChangeEvent,
} from 'react';
import { Todo } from './utils/interfaces.js';
import { v4 as uuidv4 } from 'uuid';
import { AuthComponent } from './components/AuthComponent.js';
import { TodoList } from './components/TodoList.js';
import { isLogged, signOut } from './utils/helpers.js';

const todoConditions = {
  all: 'All',
  completed: 'Completed',
  active: 'Active',
};

export const App = () => {
  const [condition, setCondition] = useState(todoConditions.all);
  const [logged, setLogged] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (localStorage.todos === undefined) {
      return [];
    } else {
      return JSON.parse(localStorage.todos);
    }
  });
  const [todoInputValue, setTodoInputValue] = useState('');

  useEffect(() => {
    const user = isLogged();
    if (user !== null) setLogged(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const inputRef = useRef<HTMLInputElement>(null);

  const todoInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoInputValue(event.target.value);
  };

  const addHandler = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todoInputValue.trim().length === 0) return;
    setTodos([
      { id: uuidv4(), title: todoInputValue.trim(), done: false },
      ...todos,
    ]);
    setTodoInputValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const removeHandler = (id: string) => {
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos(filteredTodos);
  };

  const saveChangesHandler = (updatedValue: string, id: string) => {
    const updatedItemIndex = todos.findIndex((item) => item.id === id);
    const changingItem = todos[updatedItemIndex];
    const updatedItem = { ...changingItem, title: updatedValue };
    let updatedList = [...todos];
    updatedList[updatedItemIndex] = updatedItem;
    setTodos(updatedList);
  };

  const doneTodoToggle = (id: string) => {
    const toggledTodoIndex = todos.findIndex((item) => item.id === id);
    const updatableItem = todos[toggledTodoIndex];
    const toggledItem = { ...updatableItem, done: !updatableItem.done };
    let updatedList = [...todos];
    updatedList[toggledTodoIndex] = toggledItem;
    setTodos(() => [...updatedList]);
  };

  const renderedList = useMemo(() => {
    if (condition === todoConditions.active) {
      return todos.filter((item) => !item.done);
    } else if (condition === todoConditions.completed) {
      return todos.filter((item) => item.done);
    }
    return [...todos];
  }, [todos, condition]);

  return logged ? (
    <div className="container md:mx-auto flex flex-col items-center">
      <form onSubmit={addHandler} className="m-2">
        <input
          className="p-2 border-blue-700 border-2 rounded-l-lg"
          ref={inputRef}
          id="outlined-basic"
          type="text"
          value={todoInputValue}
          placeholder="Input todo"
          onChange={todoInputHandler}
        />
        <button
          className="bg-blue-700 text-white p-2 border-2 border-blue-700 rounded-r-lg hover:bg-blue-800"
          type="submit"
        >
          Add
        </button>
      </form>
      <div className="mx-auto m-2 p-2 flex justify-between w-max mt-0">
        <button
          className="p-2 bg-blue-700 text-white border-blue-800 border-2 w-28 rounded-l-lg hover:bg-blue-800"
          onClick={() => setCondition(todoConditions.all)}
        >
          {todoConditions.all}
        </button>
        <button
          className="p-2 bg-blue-700 text-white border-blue-800 border-t-2 border-b-2 w-28 hover:bg-blue-800"
          onClick={() => setCondition(todoConditions.active)}
        >
          {todoConditions.active}
        </button>
        <button
          className="p-2 bg-blue-700 text-white border-blue-800 border-2 w-28 rounded-r-lg hover:bg-blue-800"
          onClick={() => setCondition(todoConditions.completed)}
        >
          {todoConditions.completed}
        </button>
      </div>
      <TodoList
        itemsList={renderedList}
        onDelete={removeHandler}
        onUpdate={saveChangesHandler}
        onDone={doneTodoToggle}
      />
      <button
        onClick={async () => {
          await signOut();
          setLogged(false);
        }}
      >
        Sign out
      </button>
    </div>
  ) : (
    <AuthComponent onLogin={setLogged} />
  );
};

export default App;
