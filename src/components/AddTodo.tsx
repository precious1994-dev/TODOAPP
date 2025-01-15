import { useState } from 'react';
import { useTodoStore } from '@/store/todoStore';
import Button from './ui/Button';
import { Priority } from '@/types/todo';
import { CalendarIcon, FlagIcon, PlusIcon } from '@heroicons/react/24/outline';

const AddTodo = () => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);
  const { addTodo } = useTodoStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTodo({
      title: title.trim(),
      completed: false,
      priority,
      dueDate: dueDate || undefined,
    });

    setTitle('');
    setPriority('medium');
    setDueDate('');
    setIsExpanded(false);
  };

  const priorityColors = {
    low: 'text-[#7f4f24] bg-[#e6ccb2]/20 border-[#e6ccb2]',
    medium: 'text-[#7f4f24] bg-[#7f4f24]/10 border-[#7f4f24]/30',
    high: 'text-[#7f4f24] bg-[#7f4f24]/20 border-[#7f4f24]',
  };

  const priorityLabels = {
    low: 'Low Priority',
    medium: 'Medium Priority',
    high: 'High Priority',
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" suppressHydrationWarning>
      <div className="group relative">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          placeholder="+ Add a new task..."
          className="peer w-full rounded-2xl border-2 border-[#e6ccb2] bg-white px-6 py-4 text-lg text-[#7f4f24] placeholder:text-[#7f4f24]/40 focus:border-[#7f4f24] focus:outline-none focus:ring-0"
        />
        
        {!isExpanded && (
          <Button
            type="submit"
            variant="primary"
            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 peer-focus:opacity-100"
          >
            <PlusIcon className="h-5 w-5" />
            Add Task
          </Button>
        )}
      </div>

      {isExpanded && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#7f4f24]/70">Priority</label>
              <div className="flex flex-wrap gap-2">
                {(['low', 'medium', 'high'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-all hover:opacity-80 ${
                      priority === p 
                        ? priorityColors[p]
                        : 'border-[#e6ccb2]/50 bg-white text-[#7f4f24]/40'
                    }`}
                  >
                    <FlagIcon className="h-4 w-4" />
                    {priorityLabels[p]}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#7f4f24]/70">Due Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full rounded-xl border-2 border-[#e6ccb2] bg-white pl-12 pr-4 py-2 text-[#7f4f24] focus:border-[#7f4f24] focus:outline-none focus:ring-0"
                />
                <CalendarIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7f4f24]/40" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsExpanded(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!title.trim()}
            >
              Add Task
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default AddTodo; 