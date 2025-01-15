import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TodoStore } from '@/types/todo';

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      
      addTodo: (todo) => {
        set((state) => ({
          todos: [
            ...state.todos,
            {
              ...todo,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
          ],
        }));
      },
      
      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }));
      },
      
      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },
      
      updateTodoTitle: (id, title) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, title } : todo
          ),
        }));
      },
      
      filterTodos: (filter) => {
        const todos = get().todos;
        switch (filter) {
          case 'active':
            return todos.filter((todo) => !todo.completed);
          case 'completed':
            return todos.filter((todo) => todo.completed);
          default:
            return todos;
        }
      },
      
      sortTodos: (by) => {
        const todos = [...get().todos];
        switch (by) {
          case 'priority': {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return todos.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
          }
          case 'dueDate':
            return todos.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
          case 'createdAt':
            return todos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          default:
            return todos;
        }
      },
    }),
    {
      name: 'todo-storage',
    }
  )
); 