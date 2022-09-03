import { useRef } from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoInputValue, setTodoInputValue] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  const inputRef = useRef();

  const todoInputHandler = (event) => {
    event.preventDefault();

    setTodoInputValue(event.target.value);
  };

  const addTodoHandler = (item) => {
    if (todoInputValue.trim().length === 0) return;
    setTodos([{ id: uuidv4(), title: todoInputValue.trim() }, ...todos]);
    setTodoInputValue('');
    inputRef.current.focus();
  };

  return (
    <>
      <div>
        <input
          ref={inputRef}
          type="text"
          value={todoInputValue}
          placeholder="Input todo"
          onChange={todoInputHandler}
          onSubmit={addTodoHandler}
        />
        <button onClick={addTodoHandler}>Add</button>
      </div>
      <div>
        <ul>
          {todos.map((item) => (
            <>
              <li key={item.id}>{item.title}</li>
            </>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
