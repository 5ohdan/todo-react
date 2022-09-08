import { useState, useRef } from 'react';
import { TextField, Button, ButtonGroup } from '@mui/material';

import { v4 as uuidv4 } from 'uuid';

import { TodoList } from './components/TodoList';

const todoConditions = {
  all: 'All',
  completed: 'Completed',
  active: 'Active',
};

export const App = () => {
  const [condition, setCondition] = useState(todoConditions.all);
  const [todos, setTodos] = useState([]);
  const [todoInputValue, setTodoInputValue] = useState('');

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
    <>
      <form onSubmit={addHandler}>
        <TextField
          ref={inputRef}
          id="outlined-basic"
          label="Input todo"
          variant="outlined"
          type="text"
          value={todoInputValue}
          placeholder="Input todo"
          onChange={todoInputHandler}
        />
        <Button variant="outlined" type="submit">
          Add
        </Button>
      </form>
      <ButtonGroup>
        <Button onClick={() => setCondition(todoConditions.all)}>
          {todoConditions.all}
        </Button>
        <Button onClick={() => setCondition(todoConditions.active)}>
          {todoConditions.active}
        </Button>
        <Button onClick={() => setCondition(todoConditions.completed)}>
          {todoConditions.completed}
        </Button>
      </ButtonGroup>
      <TodoList
        itemsList={renderedList}
        onDelete={removeHandler}
        onUpdate={saveChangesHandler}
        onDone={doneTodoToggle}
      />
    </>
  );
};

export default App;
