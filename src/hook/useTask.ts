"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksApi } from "@/lib/api";
import { addTask, removeTask, updateTask } from "@/store/slices/tasksSlice";
import type { CreateTaskInput, Task } from "@/types/task";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/store";

export const TASKS_KEY = ["tasks"] as const;

export function useTasksQuery() {
    return useQuery<Task[]>({ queryKey: TASKS_KEY, queryFn: tasksApi.list });
}

export function useTask(id: number, options?: { enabled?: boolean }) {
  return useQuery<Task>({
    queryKey: ["task", id],
    queryFn: () => tasksApi.get(id),
    enabled: options?.enabled ?? Number.isFinite(id),
    retry: 1,
  });
}

export function useCreateTask() {
  const qc = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: tasksApi.create,
    onSuccess: (task) => {
      const localTask: Task = {
        ...task,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      dispatch(addTask(localTask));
      qc.setQueryData<Task[]>(TASKS_KEY, (old = []) => [
        localTask,
        ...old,
      ]);
    },
  });
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
            toast.success("Task updated successfully");
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
        onSuccess: () => toast.success("Task deleted successfully"),
    });
}
