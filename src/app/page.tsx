'use client';

import { useState } from 'react';
import { useTodoStore } from '@/store/todoStore';
import AddTodo from '@/components/AddTodo';
import TodoItem from '@/components/TodoItem';
import TodoFilters from '@/components/TodoFilters';
import { Priority } from '@/types/todo';

export default function Home() {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'dueDate' | 'createdAt'>('priority');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
  const { sortTodos } = useTodoStore();

  const sortedTodos = sortTodos(sortBy);
  const displayedTodos = sortedTodos.filter(todo => {
    // Status filter
    if (filter === 'active' && todo.completed) return false;
    if (filter === 'completed' && !todo.completed) return false;

    // Priority filter
    if (priorityFilter !== 'all' && todo.priority !== priorityFilter) return false;

    return true;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#e6ccb2]/30 via-white to-[#7f4f24]/5">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-3 bg-gradient-to-r from-[#7f4f24] to-[#7f4f24]/70 bg-clip-text text-5xl font-bold text-transparent">
            Task Manager
          </h1>
          <p className="text-[#7f4f24]/70">
            Organize your tasks efficiently and boost your productivity
          </p>
        </div>

        <div className="space-y-8">
          <div className="overflow-hidden rounded-2xl border border-[#e6ccb2] bg-white/70 p-6 shadow-lg shadow-[#7f4f24]/5 backdrop-blur-xl">
            <AddTodo />
          </div>

          <TodoFilters
            filter={filter}
            setFilter={setFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
          />

          <div className="space-y-4">
            {displayedTodos.length === 0 ? (
              <div className="flex min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-[#e6ccb2] bg-white/50 p-8 text-center backdrop-blur-sm">
                <p className="text-[#7f4f24]/70">
                  {filter === 'all'
                    ? priorityFilter === 'all'
                      ? 'No tasks yet. Add your first task above!'
                      : `No ${priorityFilter} priority tasks found.`
                    : filter === 'active'
                    ? `No active ${priorityFilter === 'all' ? '' : priorityFilter + ' priority '}tasks.`
                    : `No completed ${priorityFilter === 'all' ? '' : priorityFilter + ' priority '}tasks.`}
                </p>
              </div>
            ) : (
              displayedTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
