import { useRef } from 'react';
import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
// import { InputUnstyled } from '@mui/base';
import {
  TextField,
  Button,
  ButtonGroup,
  List,
  ListItem,
  Input,
  ListItemText,
} from '@mui/material';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoInputValue, setTodoInputValue] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

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

  const editHandler = (item) => {
    // setEditingTodo(item.id)
  };

  return (
    <>
      <form onSubmit={addHandler}>
        <TextField
          id="outlined-basic"
          label="Input todo"
          variant="outlined"
          ref={inputRef}
          type="text"
          value={todoInputValue}
          placeholder="Input todo"
          onChange={todoInputHandler}
        />
        <Button variant="outlined" type="submit">
          Add
        </Button>
      </form>

      <List>
        {todos.map((item) => (
          <ListItem key={item.id}>
            <ListItemText>{item.title}</ListItemText>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button onClick={editHandler}>Edit</Button>
              <Button onClick={removeHandler}>Delete</Button>
            </ButtonGroup>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default App;
