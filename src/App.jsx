import { useState, useRef, useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { TodoList } from './components/TodoList';

const todoConditions = {
  all: 'All',
  completed: 'Completed',
  active: 'Active',
};

export const App = () => {
  const [condition, setCondition] = useState(todoConditions.all);
  const [todos, setTodos] = useState(() => {
    if (localStorage.todos === undefined) {
      return [];
    } else {
      return JSON.parse(localStorage.todos);
    }
  });
  const [todoInputValue, setTodoInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const inputRef = useRef();

  const todoInputHandler = (event) => {
    setTodoInputValue(event.target.value);
  };

  const addHandler = (e) => {
    e.preventDefault();
    if (todoInputValue.trim().length === 0) return;
    setTodos([
      { id: uuidv4(), title: todoInputValue.trim(), done: false },
      ...todos,
    ]);
    setTodoInputValue('');
    inputRef.current.focus();
  };

  const removeHandler = (id) => {
    const filteredTodos = todos.filter((item) => item.id !== id);
    setTodos(filteredTodos);
  };

  const saveChangesHandler = (updatedValue, id) => {
    const updatedItemIndex = todos.findIndex((item) => item.id === id);
    const changingItem = todos[updatedItemIndex];
    const updatedItem = { ...changingItem, title: updatedValue };
    let updatedList = [...todos];
    updatedList[updatedItemIndex] = updatedItem;
    setTodos(() => [...updatedList]);
  };

  const doneTodoToggle = (id) => {
    const toggledTodoIndex = todos.findIndex((item) => item.id === id);
    const updatableItem = todos[toggledTodoIndex];
    const toggledItem = { ...updatableItem, done: !updatableItem.done };
    console.log(toggledItem);
    let updatedList = [...todos];
    updatedList[toggledTodoIndex] = toggledItem;
    setTodos(() => [...updatedList]);
  };

  let renderedList = [...todos];
  if (condition === todoConditions.active) {
    renderedList = todos.filter((item) => item.done === false);
  } else if (condition === todoConditions.completed) {
    renderedList = todos.filter((item) => item.done === true);
  } else if (condition === todoConditions.all) {
    renderedList;
  }

  return (
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
    </div>
  );
};

export default App;
