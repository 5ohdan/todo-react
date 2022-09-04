import { List } from '@mui/material';

import { TodoItem } from './TodoItem';

export const TodoList = (props) => {

  return (
    <List>
      {props.itemsList.map((item) => (
        <TodoItem key={item.id} item={item} onRemove={item.onDelete} />
      ))}
    </List>
  );
};
