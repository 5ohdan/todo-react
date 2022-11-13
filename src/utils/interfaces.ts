export interface Todo {
  id: string;
  title: string;
  done: boolean;
}

export interface EditingFormProps {
  onEdit: (value: string) => void;
  onSave: () => void;
  initState: string;
}

export interface TodoItemProps {
  item: Todo;
  onRemove: (id: string) => void;
  onSave: (updatedValue: string, id: string) => void;
  onDone: (id: string) => void;
}

export interface TodoListProps {
  itemsList: Todo[];
  onDelete: (id: string) => void;
  onUpdate: (updatedValue: string, id: string) => void;
  onDone: (id: string) => void;
}
