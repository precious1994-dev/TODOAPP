import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { TodoStore } from '@/types/todo';

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],
      
      addTodo: (todo) => set((state) => ({
        todos: [...state.todos, { 
          ...todo, 
          id: crypto.randomUUID(), 
          createdAt: new Date().toISOString(),
          dueDate: todo.dueDate,
        }]
      })),
      
      toggleTodo: (id) => set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      })),
      
      deleteTodo: (id) => set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id)
      })),
      
      editTodo: (id, updatedTodo) => set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { 
            ...todo, 
            ...updatedTodo,
            dueDate: updatedTodo.dueDate || todo.dueDate,
          } : todo
        )
      })),
      
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
          case 'priority':
            return todos.sort((a, b) => {
              const priority = { high: 3, medium: 2, low: 1 };
              return priority[b.priority] - priority[a.priority];
            });
          case 'dueDate':
            return todos.sort((a, b) => {
              if (!a.dueDate) return 1;
              if (!b.dueDate) return -1;
              return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
            });
          case 'createdAt':
            return todos.sort((a, b) => 
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          default:
            return todos;
        }
      },
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ todos: state.todos }),
    }
  )
); 