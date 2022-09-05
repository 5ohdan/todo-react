import { useState, useRef } from 'react';
import { TextField, Button } from '@mui/material';

import { v4 as uuidv4 } from 'uuid';

import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoInputValue, setTodoInputValue] = useState('');

  const inputRef = useRef();

  const todoInputHandler = (event) => {
    setTodoInputValue(event.target.value);
  };

  const addHandler = (e) => {
    e.preventDefault();
    if (todoInputValue.trim().length === 0) return;
    setTodos([{ id: uuidv4(), title: todoInputValue.trim() }, ...todos]);
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
    const updatedItem = {...changingItem, title: updatedValue}
    let updatedList = todos;
    updatedList[updatedItemIndex] = updatedItem;
    setTodos(() => [...updatedList]);
  };

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
      <TodoList
        itemsList={todos}
        onDelete={removeHandler}
        onUpdate={saveChangesHandler}
      />
    </>
  );
};

export default App;
