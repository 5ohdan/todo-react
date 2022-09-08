import { List } from '@mui/material';

import { TodoItem } from './TodoItem';

export const TodoList = (props) => {

  return (
    <List>
      {props.itemsList.map((item) => (
        <TodoItem key={item.id} item={item} onRemove={props.onDelete} onSave={props.onUpdate} onDone={props.onDone} />
      ))}
    </List>
  );
};
