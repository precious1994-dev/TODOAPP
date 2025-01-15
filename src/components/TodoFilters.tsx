import { useState } from 'react';
import { FunnelIcon, ArrowsUpDownIcon, FlagIcon } from '@heroicons/react/24/outline';
import { Priority } from '@/types/todo';
import Button from './ui/Button';

interface TodoFiltersProps {
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  sortBy: 'priority' | 'dueDate' | 'createdAt';
  setSortBy: (sort: 'priority' | 'dueDate' | 'createdAt') => void;
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
  const [showFilters, setShowFilters] = useState(false);

  const priorityColors = {
    low: 'text-green-600',
    medium: 'text-yellow-600',
    high: 'text-red-600',
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white/50 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? 'bg-gray-100 text-blue-600' : ''}
          >
            <FunnelIcon className="h-4 w-4" />
            Filters {priorityFilter !== 'all' && '(1)'}
          </Button>

          <div className="h-6 w-px bg-gray-200" />

          <div className="flex items-center gap-2">
            <Button
              variant={filter === 'all' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'active' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilter('active')}
            >
              Active
            </Button>
            <Button
              variant={filter === 'completed' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilter('completed')}
            >
              Completed
            </Button>
          </div>
        </div>

        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'priority' | 'dueDate' | 'createdAt')}
            className="appearance-none rounded-xl border-gray-200 bg-gray-50/50 pl-10 pr-8 text-sm focus:border-blue-500 focus:bg-white focus:ring-blue-500"
          >
            <option value="priority">Sort by Priority</option>
            <option value="dueDate">Sort by Due Date</option>
            <option value="createdAt">Sort by Created Date</option>
          </select>
          <ArrowsUpDownIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {showFilters && (
        <div className="rounded-xl border border-gray-200 bg-white/50 p-4 backdrop-blur-sm">
          <div className="space-y-4">
            <div>
              <h3 className="mb-3 text-sm font-medium text-gray-700">Filter by Priority</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={priorityFilter === 'all' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setPriorityFilter('all')}
                >
                  All Priorities
                </Button>
                {(['high', 'medium', 'low'] as const).map((p) => (
                  <Button
                    key={p}
                    variant={priorityFilter === p ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => setPriorityFilter(p)}
                    className="gap-1.5"
                  >
                    <FlagIcon className={`h-4 w-4 ${priorityColors[p]}`} />
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-medium text-gray-700">Sort Tasks</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'priority', label: 'Priority' },
                  { value: 'dueDate', label: 'Due Date' },
                  { value: 'createdAt', label: 'Created Date' },
                ].map((option) => (
                  <Button
                    key={option.value}
                    variant={sortBy === option.value ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => setSortBy(option.value as typeof sortBy)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoFilters; 