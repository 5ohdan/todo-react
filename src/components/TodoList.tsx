import React from 'react';
import { TodoItem } from './TodoItem.js';

import { TodoListProps, Todo } from '../utils/interfaces.js';

export const TodoList = ({
  itemsList,
  onDelete,
  onUpdate,
  onDone,
}: TodoListProps) => {
  return (
    <ul className="flex flex-col space-y-2 min-w-full">
      {itemsList.map((item: Todo) => (
        <TodoItem
          key={item.id}
          item={item}
          onRemove={onDelete}
          onSave={onUpdate}
          onDone={onDone}
        />
      ))}
    </ul>
  );
};
