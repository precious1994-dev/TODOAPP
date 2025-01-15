import { useTodoStore } from '@/store/todoStore';
import { Priority } from '@/types/todo';
import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Plus } from 'lucide-react';

const AddTodo = () => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const { addTodo } = useTodoStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTodo({
      title: title.trim(),
      completed: false,
      priority,
      dueDate,
    });

    setTitle('');
    setPriority('medium');
    setDueDate(format(new Date(), 'yyyy-MM-dd'));
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
            className="w-full rounded-xl border border-[#e6ccb2] bg-[#faf6f1] pl-4 pr-4 py-3 text-[#7f4f24] placeholder-[#7f4f24]/50 focus:border-[#7f4f24] focus:outline-none focus:ring-2 focus:ring-[#7f4f24] transition-all duration-200"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:w-auto">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="rounded-xl border border-[#e6ccb2] bg-[#faf6f1] px-4 py-3 text-[#7f4f24] focus:border-[#7f4f24] focus:outline-none focus:ring-2 focus:ring-[#7f4f24] transition-all duration-200"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          <div className="relative flex-shrink-0">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-xl border border-[#e6ccb2] bg-[#faf6f1] pl-10 pr-3 py-3 text-[#7f4f24] focus:border-[#7f4f24] focus:outline-none focus:ring-2 focus:ring-[#7f4f24] transition-all duration-200"
            />
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7f4f24]" />
          </div>

          <button
            type="submit"
            disabled={!title.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-[#7f4f24] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[#7f4f24]/90 focus:outline-none focus:ring-2 focus:ring-[#7f4f24] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo; 