import { ListItem, ListItemText, Button, Checkbox } from '@mui/material';
import { useState } from 'react';
import { EditingForm } from './EditingForm';

export const TodoItem = ({ item, onRemove, onSave, onDone }) => {
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
      onEdit={(value) => setEditValue(value)}
      initState={editValue}
    />
  ) : (
    <>
      <Checkbox onChange={() => onDone(item.id)} checked={item.done}/>
      <ListItemText>{item.title}</ListItemText>
      <Button variant="outlined" onClick={editTodo}>
        Edit
      </Button>
      <Button variant="outlined" onClick={() => onRemove(item.id)}>
        Delete
      </Button>
    </>
  );

  return <ListItem>{renderedItem}</ListItem>;
};
