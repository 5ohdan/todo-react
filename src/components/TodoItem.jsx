import {
  ListItem,
  ListItemText,
  Button,
  ButtonGroup,
  Input,
} from '@mui/material';

export const TodoItem = ({ item, onDelete }) => {
  

  return (
    <ListItem>
      <Input value={item.title} />
      <Button variant="outlined" onClick={() => onDelete}>
        Delete
      </Button>
    </ListItem>
  );
};
