export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  priority: Priority;
  dueDate?: string;
}

export interface TodoStore {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, todo: Partial<Todo>) => void;
  filterTodos: (filter: 'all' | 'active' | 'completed') => Todo[];
  sortTodos: (by: 'priority' | 'dueDate' | 'createdAt') => Todo[];
} 