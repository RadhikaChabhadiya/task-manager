"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { Task } from "@/types/task";
import { useDeleteTask, useUpdateTask } from "@/hook/useTask";

export function TaskItem({ task }: { task: Task }) {
  const update = useUpdateTask();
  const del = useDeleteTask();

  return (
    <li className="glass rounded-xl p-4 flex items-center gap-4 hover:shadow-lg transition group">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => update.mutate({ id: task.id, completed: !task.completed })}
        className="w-5 h-5 rounded accent-brand-600 cursor-pointer"
        aria-label={`Mark ${task.title} ${task.completed ? "pending" : "completed"}`}
      />
      <Link
        href={`/tasks/${task.id}`}
        className={`flex-1 truncate ${task.completed ? "line-through text-slate-400" : ""}`}
      >
        {task.title}
      </Link>
      <Button
        variant="danger"
        onClick={() => del.mutate(task.id)}
        disabled={del.isPending}
        className="opacity-0 group-hover:opacity-100 transition"
      >
        Delete
      </Button>
    </li>
  );
}
