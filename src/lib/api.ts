import { api } from "./axios";
import type { Task, CreateTaskInput } from "@/types/task";

export const tasksApi = {
    list: async (): Promise<Task[]> => {
        const { data } = await api.get<Task[]>("/todos?_limit=20");
        return data.map((t) => ({ ...t, createdAt: new Date().toISOString() }));
    },
    get: async (id: number): Promise<Task> => {
        const { data } = await api.get<Task>(`/todos/${id}`);
        return data;
    },
    create: async (input: CreateTaskInput): Promise<Task> => {
        const { data } = await api.post<Task>("/todos", input);
        return data;
    },
    update: async (id: number, input: Partial<Task>): Promise<Task> => {
        const { data } = await api.patch<Task>(`/todos/${id}`, input);
        return data;
    },
    remove: async (id: number): Promise<void> => {
        await api.delete(`/todos/${id}`);
    },
};
