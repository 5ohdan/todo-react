import { ListItem, ListItemText, Button, Input } from '@mui/material';
import { useState } from 'react';

export const TodoItem = ({ item, onRemove, onSave }) => {
  const [editValue, setEditValue] = useState(item.title);
  const [isEditing, setIsEditing] = useState(false);

  const saveChangesHandler = (updatedValue) => {
    setIsEditing(false);
    onSave(updatedValue, item.id);
  };

  const renderedItem = isEditing ? (
    <>
      <Input value={editValue} onChange={(e) => setEditValue(e.target.value)} />
      <Button onClick={() => saveChangesHandler(editValue)}>Save</Button>
    </>
  ) : (
    <>
      <ListItemText>{item.title}</ListItemText>
      <Button variant="outlined" onClick={() => setIsEditing(true)}>
        Edit
      </Button>
      <Button variant="outlined" onClick={() => onRemove(item.id)}>
        Delete
      </Button>
    </>
  );

  return <ListItem>{renderedItem}</ListItem>;
};
