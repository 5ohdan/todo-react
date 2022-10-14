import { TodoItem } from './TodoItem';

export const TodoList = ({ itemsList, onDelete, onUpdate, onDone }) => {
  return (
    <ul className="flex flex-col space-y-2 min-w-full">
      {itemsList.map((item) => (
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
