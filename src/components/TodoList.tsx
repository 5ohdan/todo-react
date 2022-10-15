import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../App';

interface TodoListProps {
  itemsList: Todo[];
  onDelete: (id: string) => void;
  onUpdate: (updatedValue: string, id: string) => void;
  onDone: (id: string) => void;
}

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
