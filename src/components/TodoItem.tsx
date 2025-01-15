import { useTodoStore } from '@/store/todoStore';
import { Todo } from '@/types/todo';
import { format } from 'date-fns';
import { Trash2, Edit2, Check, X } from 'lucide-react';
import { useState } from 'react';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const { toggleTodo, deleteTodo, updateTodoTitle } = useTodoStore();

  const handleEdit = () => {
    if (isEditing) {
      updateTodoTitle(todo.id, editedTitle);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setEditedTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-[#e6ccb2] bg-white shadow-lg transition-all duration-200 hover:shadow-xl">
      <div className="flex items-center gap-4 p-6">
        <button
          onClick={() => toggleTodo(todo.id)}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#e6ccb2] transition-colors hover:bg-[#faf6f1]"
          type="button"
          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {todo.completed && (
            <Check className="h-4 w-4 text-[#7f4f24]" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full rounded-lg border border-[#e6ccb2] bg-[#faf6f1] px-3 py-1.5 text-[#7f4f24] focus:border-[#7f4f24] focus:outline-none focus:ring-2 focus:ring-[#7f4f24]"
              autoFocus
            />
          ) : (
            <div className="flex items-center gap-3">
              <span
                className={`flex-1 truncate ${
                  todo.completed ? 'text-[#7f4f24]/50 line-through' : 'text-[#7f4f24]'
                }`}
              >
                {todo.title}
              </span>
              <span
                className="shrink-0 rounded-full bg-[#7f4f24]/10 px-2.5 py-0.5 text-xs font-medium text-[#7f4f24]"
              >
                {todo.priority}
              </span>
              <span className="shrink-0 text-sm text-[#7f4f24]/50">
                {format(new Date(todo.dueDate), 'MMM d')}
              </span>
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleEdit}
                className="rounded-lg p-2 transition-colors hover:bg-[#faf6f1]"
                type="button"
                aria-label="Save changes"
              >
                <Check className="h-4 w-4 text-[#7f4f24]" />
              </button>
              <button
                onClick={handleCancel}
                className="rounded-lg p-2 transition-colors hover:bg-[#faf6f1]"
                type="button"
                aria-label="Cancel editing"
              >
                <X className="h-4 w-4 text-[#7f4f24]" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="rounded-lg p-2 transition-colors hover:bg-[#faf6f1]"
                type="button"
                aria-label="Edit task"
              >
                <Edit2 className="h-4 w-4 text-[#7f4f24]" />
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="rounded-lg p-2 transition-colors hover:bg-[#faf6f1]"
                type="button"
                aria-label="Delete task"
              >
                <Trash2 className="h-4 w-4 text-[#7f4f24]" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem; 