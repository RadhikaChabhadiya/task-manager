import { Task } from "@/types/task";

export const mockTasks: Task[] = [
  { id: 1, title: "Task 1", userId: 1, completed: false, createdAt: "2026-01-03" },
  { id: 2, title: "Task 2", userId: 2, completed: true, createdAt: "2026-02-02" },
  { id: 3, title: "Task 3", userId: 3, completed: false, createdAt: "2026-03-01" },
];

export const mockTask: Task = {
  id: 1,
  title: "Test Task",
  completed: false,
  userId: 1,
  createdAt: "2024-01-03",
};