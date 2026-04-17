"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksApi } from "@/lib/api";
import {  removeTask, updateTask } from "@/store/slices/tasksSlice";
import type { Task } from "@/types/task";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/store";

export const TASKS_KEY = ["tasks"] as const;

export function useTasksQuery() {
  return useQuery({ queryKey: TASKS_KEY, queryFn: tasksApi.list });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: ({ id, ...patch }: Partial<Task> & { id: number }) =>
      tasksApi.update(id, patch),
    onMutate: async (vars) => {
      await qc.cancelQueries({ queryKey: TASKS_KEY });
      const prev = qc.getQueryData<Task[]>(TASKS_KEY);
      qc.setQueryData<Task[]>(TASKS_KEY, (old = []) =>
        old.map((t) => (t.id === vars.id ? { ...t, ...vars } : t)),
      );
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData(TASKS_KEY, ctx.prev);
      toast.error("Update failed");
    },
    onSuccess: (task) => {
      dispatch(updateTask(task));
      toast.success("Task updated");
    },
  });
}

export function useDeleteTask() {
  const qc = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (id: number) => tasksApi.remove(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: TASKS_KEY });
      const prev = qc.getQueryData<Task[]>(TASKS_KEY);
      qc.setQueryData<Task[]>(TASKS_KEY, (old = []) => old.filter((t) => t.id !== id));
      dispatch(removeTask(id));
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData(TASKS_KEY, ctx.prev);
      toast.error("Delete failed");
    },
    onSuccess: () => toast.success("Task deleted"),
  });
}
