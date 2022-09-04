import {
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';

export const TodoItem = ({ item, onRemove }) => {


  return (
    <ListItem>
      <ListItemText>{item.title}</ListItemText>
      <Button variant="outlined" onClick={() => onRemove(item.id)}>
        Delete
      </Button>
    </ListItem>
  );
};
