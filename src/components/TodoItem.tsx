import { useState } from 'react';
import { Todo } from '@/types/todo';
import { useTodoStore } from '@/store/todoStore';
import Button from './ui/Button';
import { format, parseISO } from 'date-fns';
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const { toggleTodo, deleteTodo, editTodo } = useTodoStore();

  const handleEdit = () => {
    if (isEditing) {
      editTodo(todo.id, { title: editedTitle });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setEditedTitle(todo.title);
    setIsEditing(false);
  };

  const priorityColors = {
    low: 'bg-[#e6ccb2]/20 text-[#7f4f24] ring-[#e6ccb2]',
    medium: 'bg-[#7f4f24]/10 text-[#7f4f24] ring-[#7f4f24]/30',
    high: 'bg-[#7f4f24]/20 text-[#7f4f24] ring-[#7f4f24]',
  };

  return (
    <div className="group relative flex items-center gap-4 rounded-xl border border-[#e6ccb2] bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#e6ccb2]/10 to-[#7f4f24]/5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="relative h-5 w-5 rounded-md border-[#e6ccb2] text-[#7f4f24] transition-all duration-200 hover:scale-110 focus:ring-[#7f4f24]"
      />
      
      <div className="relative flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full rounded-lg border-[#e6ccb2] bg-white/50 shadow-sm backdrop-blur-sm focus:border-[#7f4f24] focus:ring-[#7f4f24]"
            autoFocus
          />
        ) : (
          <div className="space-y-1">
            <p className={`text-lg font-medium transition-all duration-200 ${todo.completed ? 'text-[#7f4f24]/40 line-through' : 'text-[#7f4f24]'}`}>
              {todo.title}
            </p>
            <div className="flex items-center gap-3 text-sm">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${priorityColors[todo.priority]}`}>
                {todo.priority}
              </span>
              {todo.dueDate && (
                <span className="inline-flex items-center gap-1 text-[#7f4f24]/60">
                  <CalendarIcon className="h-4 w-4" />
                  {format(parseISO(todo.dueDate), 'MMM d, yyyy')}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="relative flex items-center gap-2">
        {isEditing ? (
          <>
            <Button
              variant="primary"
              size="sm"
              onClick={handleEdit}
            >
              <CheckIcon className="h-4 w-4" />
              Save
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCancel}
            >
              <XMarkIcon className="h-4 w-4" />
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleEdit}
            >
              <PencilIcon className="h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => deleteTodo(todo.id)}
            >
              <TrashIcon className="h-4 w-4" />
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem; 