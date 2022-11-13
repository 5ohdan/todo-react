import React, { useState } from 'react';
import { Todo } from '../utils/interfaces.js';
import { EditingForm } from './EditingForm.js';
import { TodoItemProps } from '../utils/interfaces.js';

export const TodoItem = ({ item, onRemove, onSave, onDone }: TodoItemProps) => {
  const [editValue, setEditValue] = useState(item.title);
  const [isEditing, setIsEditing] = useState(false);

  const editTodo = () => {
    setIsEditing(true);
  };

  const saveChangesHandler = () => {
    setIsEditing(false);
    onSave(editValue, item.id);
  };

  const renderedItem = isEditing ? (
    <EditingForm
      onSave={saveChangesHandler}
      onEdit={(value: string) => setEditValue(value)}
      initState={editValue}
    />
  ) : (
    <div className="flex flex-row min-w-full">
      <input
        className="appearance-none bg-blue-100 w-11 h-11 border-blue-800 border-2 border-r-0 rounded-l-lg cursor-pointer checked:bg-blue-700 peer"
        type="checkbox"
        id={item.title}
        onChange={() => onDone(item.id)}
        checked={item.done}
      />
      <label
        className="border-2 border-blue-800 p-2 w-full peer-checked:line-through"
        htmlFor={item.title}
      >
        {item.title}
      </label>
      <button
        className="bg-blue-700 border-2 border-blue-800 text-white p-2 focus:bg-blue-800"
        onClick={editTodo}
      >
        Edit
      </button>
      <button
        className="bg-blue-700 border-2 border-l-0 border-blue-800 rounded-r-lg text-white p-2 focus:bg-blue-800"
        onClick={() => onRemove(item.id)}
      >
        Delete
      </button>
    </div>
  );

  return <li>{renderedItem}</li>;
};
