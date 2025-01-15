import { Priority } from '@/types/todo';
import { Filter, SortAsc } from 'lucide-react';

interface TodoFiltersProps {
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  sortBy: 'priority' | 'dueDate' | 'createdAt';
  setSortBy: (sortBy: 'priority' | 'dueDate' | 'createdAt') => void;
  priorityFilter: Priority | 'all';
  setPriorityFilter: (priority: Priority | 'all') => void;
}

const TodoFilters = ({
  filter,
  setFilter,
  sortBy,
  setSortBy,
  priorityFilter,
  setPriorityFilter,
}: TodoFiltersProps) => {
  return (
    <div className="backdrop-blur-sm bg-white/80 rounded-3xl border border-white/20 shadow-xl p-6">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7f4f24]/5 text-sm font-medium text-[#7f4f24]">
              <Filter className="h-4 w-4" />
              <span>Status</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  filter === 'all'
                    ? 'bg-[#7f4f24] text-white shadow-lg shadow-[#7f4f24]/20 scale-105'
                    : 'bg-white/50 text-[#7f4f24] hover:bg-white hover:shadow-md'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  filter === 'active'
                    ? 'bg-[#7f4f24] text-white shadow-lg shadow-[#7f4f24]/20 scale-105'
                    : 'bg-white/50 text-[#7f4f24] hover:bg-white hover:shadow-md'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  filter === 'completed'
                    ? 'bg-[#7f4f24] text-white shadow-lg shadow-[#7f4f24]/20 scale-105'
                    : 'bg-white/50 text-[#7f4f24] hover:bg-white hover:shadow-md'
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7f4f24]/5 text-sm font-medium text-[#7f4f24]">
              <Filter className="h-4 w-4" />
              <span>Priority</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setPriorityFilter('all')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  priorityFilter === 'all'
                    ? 'bg-[#7f4f24] text-white shadow-lg shadow-[#7f4f24]/20 scale-105'
                    : 'bg-white/50 text-[#7f4f24] hover:bg-white hover:shadow-md'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setPriorityFilter('low')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  priorityFilter === 'low'
                    ? 'bg-[#7f4f24] text-white shadow-lg shadow-[#7f4f24]/20 scale-105'
                    : 'bg-white/50 text-[#7f4f24] hover:bg-white hover:shadow-md'
                }`}
              >
                Low
              </button>
              <button
                onClick={() => setPriorityFilter('medium')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  priorityFilter === 'medium'
                    ? 'bg-[#7f4f24] text-white shadow-lg shadow-[#7f4f24]/20 scale-105'
                    : 'bg-white/50 text-[#7f4f24] hover:bg-white hover:shadow-md'
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setPriorityFilter('high')}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  priorityFilter === 'high'
                    ? 'bg-[#7f4f24] text-white shadow-lg shadow-[#7f4f24]/20 scale-105'
                    : 'bg-white/50 text-[#7f4f24] hover:bg-white hover:shadow-md'
                }`}
              >
                High
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7f4f24]/5 text-sm font-medium text-[#7f4f24]">
            <SortAsc className="h-4 w-4" />
            <span>Sort By</span>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setSortBy('priority')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                sortBy === 'priority'
                  ? 'bg-[#7f4f24] text-white shadow-lg shadow-[#7f4f24]/20 scale-105'
                  : 'bg-white/50 text-[#7f4f24] hover:bg-white hover:shadow-md'
              }`}
            >
              Priority
            </button>
            <button
              onClick={() => setSortBy('dueDate')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                sortBy === 'dueDate'
                  ? 'bg-[#7f4f24] text-white shadow-lg shadow-[#7f4f24]/20 scale-105'
                  : 'bg-white/50 text-[#7f4f24] hover:bg-white hover:shadow-md'
              }`}
            >
              Due Date
            </button>
            <button
              onClick={() => setSortBy('createdAt')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                sortBy === 'createdAt'
                  ? 'bg-[#7f4f24] text-white shadow-lg shadow-[#7f4f24]/20 scale-105'
                  : 'bg-white/50 text-[#7f4f24] hover:bg-white hover:shadow-md'
              }`}
            >
              Created Date
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoFilters; 