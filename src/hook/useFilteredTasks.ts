import { Task, TaskFilters } from "@/types/task";
import { useMemo } from "react";

export function useFilteredTasks(tasks: Task[], filters: TaskFilters, debouncedSearch: string) {
  return useMemo(() => {
    let list = [...tasks];

    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter(t => t.title.toLowerCase().includes(q));
    }

    if (filters.status !== "all") {
      list = list.filter(t =>
        filters.status === "completed" ? t.completed : !t.completed
      );
    }

    if (filters.sortBy === "title") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (filters.sortBy === "newest") {
      list.sort((a, b) =>
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime()
      );
    }

    if (filters.sortBy === "oldest") {
      list.sort((a, b) =>
        new Date(a.createdAt ?? 0).getTime() -
        new Date(b.createdAt ?? 0).getTime()
      );
    }

    return list;
  }, [tasks, filters, debouncedSearch]);
}