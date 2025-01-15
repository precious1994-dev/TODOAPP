export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  dueDate: string;
  createdAt: string;
}

export interface TodoStore {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodoTitle: (id: string, title: string) => void;
  filterTodos: (filter: 'all' | 'active' | 'completed') => Todo[];
  sortTodos: (by: 'priority' | 'dueDate' | 'createdAt') => Todo[];
} 