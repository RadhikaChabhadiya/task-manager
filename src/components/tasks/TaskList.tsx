"use client";
import { TaskItem } from "./TaskItem";
import type { Task } from "@/types/task";

export function TaskList({ tasks, loading }: { tasks: Task[]; loading?: boolean }) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="glass rounded-xl h-16 animate-pulse" />
        ))}
      </div>
    );
  }
  if (!tasks.length) {
    return (
      <div className="glass rounded-2xl p-12 text-center">
        <p className="text-slate-500 dark:text-slate-400">No tasks match your filters.</p>
      </div>
    );
  }
  return (
    <ul className="space-y-3">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} />
      ))}
    </ul>
  );
}
