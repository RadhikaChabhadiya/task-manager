"use client";
import { TaskList } from "./TaskList";
import type { Task } from "@/types/task";
import { useTasksQuery } from "@/hook/useTask";

export function TasksDashboard({ initialTasks }: { initialTasks: Task[] }) {
  const { data, isLoading, isError, refetch } = useTasksQuery();
  const tasks = data ?? initialTasks;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Your Tasks</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {tasks.length} of {tasks.length} shown
          </p>
        </div>
      </div>
      {isError ? (
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-red-500">Failed to load tasks.</p>
          <button onClick={() => refetch()} className="mt-2 text-brand-600 hover:underline">
            Retry
          </button>
        </div>
      ) : (
        <TaskList tasks={tasks} loading={isLoading && !initialTasks.length} />
      )}
    </div>
  );
}
