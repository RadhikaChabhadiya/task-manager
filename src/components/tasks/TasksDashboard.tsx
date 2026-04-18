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
import { ErrorMessage } from "../common/ErrorMessage";
import { useFilteredTasks } from "@/hook/useFilteredTasks";
import { mergeTasks } from "@/utils/tasks";

type Props = {
  initialTasks: Task[];
};

export function TasksDashboard({ initialTasks }: Props) {
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching, isError, refetch } = useTasksQuery();
  const filters = useAppSelector((state) => state.filters);
  const localTasks = useAppSelector((state) => state.tasks.items);
  const debouncedSearch = useDebounce(filters.search, 300);
  const isInitialLoading = isLoading && isFetching && !initialTasks.length;

  const tasks = useMemo(() => {
    const apiTasks = data ?? initialTasks;
    return mergeTasks(localTasks, apiTasks);
  }, [data, initialTasks, localTasks]);

  const filteredTasks = useFilteredTasks(tasks, filters, debouncedSearch);

  useEffect(() => {
    const source = data?.length ? data : initialTasks;
    if (source?.length) {
      dispatch(setTasks(source));
    }
  }, [data, initialTasks, dispatch]);

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold">Your Tasks</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {filteredTasks.length} of {tasks.length} shown
          </p>
        </div>
      </header>
      <TaskForm />
      <TaskFilters />
      {isError ? (
        <ErrorMessage
          description="Failed to load tasks"
          actionLabel="Retry"
          onAction={refetch}
        />
      ) : (
        <TaskList tasks={filteredTasks} loading={isInitialLoading} />
      )}
    </div>
  );
}