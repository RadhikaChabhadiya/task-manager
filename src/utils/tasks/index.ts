import { Task } from "@/types/task";

export function mergeTasks(localTasks: Task[], apiTasks: Task[]) {
  const reduxIds = new Set(localTasks.map(t => t.id));

  return [
    ...localTasks,
    ...apiTasks.filter(t => !reduxIds.has(t.id)),
  ];
}

export function getTaskStatus(task?: Task) {
  if (!task) return null;

  return {
    isCompleted: task.completed,
    statusLabel: task.completed ? "Completed" : "In Progress",
    statusClass: task.completed
      ? "bg-green-500/10 text-green-600 dark:text-green-400 dark:border-green-500/20"
      : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 dark:border-yellow-500/20",
    titleClass: task.completed
      ? "line-through text-slate-600"
      : "dark:text-white",
  };
}