"use client";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { setTasks } from "@/store/slices/tasksSlice";
import { TaskFilters } from "./TaskFilters";
import { TaskList } from "./TaskList";
import { TaskForm } from "./TaskForm";
import type { Task } from "@/types/task";
import { useTasksQuery } from "@/hook/useTask";
import { useDebounce } from "@/hook/useDebounce";

export function TasksDashboard({ initialTasks }: { initialTasks: Task[] }) {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError, refetch } = useTasksQuery();
  const filters = useAppSelector((s) => s.filters);
  const debouncedSearch = useDebounce(filters.search, 300);

  useEffect(() => {
    if (data?.length) dispatch(setTasks(data));
    else if (initialTasks.length) dispatch(setTasks(initialTasks));
  }, [data, initialTasks, dispatch]);

  const tasks = data ?? initialTasks;

  const filtered = useMemo(() => {
    let list = [...tasks];
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter((t) => t.title.toLowerCase().includes(q));
    }
    if (filters.status !== "all") {
      list = list.filter((t) => (filters.status === "completed" ? t.completed : !t.completed));
    }
    if (filters.sortBy === "title") list.sort((a, b) => a.title.localeCompare(b.title));
    if (filters.sortBy === "newest") list.reverse();
    return list;
  }, [tasks, debouncedSearch, filters.status, filters.sortBy]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Your Tasks</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {filtered.length} of {tasks.length} shown
          </p>
        </div>
      </div>
      <TaskForm />
      <TaskFilters />
      {isError ? (
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-red-500">Failed to load tasks.</p>
          <button onClick={() => refetch()} className="mt-2 text-brand-600 hover:underline">
            Retry
          </button>
        </div>
      ) : (
        <TaskList tasks={filtered} loading={isLoading && !initialTasks.length} />
      )}
    </div>
  );
}
