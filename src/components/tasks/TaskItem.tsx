"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { Task } from "@/types/task";
import { useDeleteTask, useUpdateTask } from "@/hook/useTask";

export function TaskItem({ task }: { task: Task }) {
  const update = useUpdateTask();
  const del = useDeleteTask();

  const isCompleted = task.completed;

  return (
    <li className="group relative flex flex-col gap-2 rounded-2xl p-4 glass hover:shadow-xl transition-all duration-200 border border-white/10">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() =>
            update.mutate({ id: task.id, completed: !isCompleted })
          }
          className="w-5 h-5 rounded accent-brand-600 cursor-pointer"
          aria-label={`Mark ${task.title} ${isCompleted ? "pending" : "completed"
            }`}
        />
        <Link
          href={`/tasks/${task.id}`}
          className={`flex-1 font-medium truncate transition ${isCompleted
            ? "line-through text-slate-400"
            : "text-white group-hover:text-brand-400"
            }`}
        >
          {task.title}
        </Link>
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${isCompleted
            ? "bg-green-500/20 text-green-400 border border-green-500/30"
            : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
            }`}
        >
          {isCompleted ? "Completed" : "Pending"}
        </span>
      </div>

      {/* Bottom Row */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        {/* User ID */}
        <span className="opacity-70">
          User: <span className="text-slate-300">{task.userId}</span>
        </span>
        <Button
          variant="danger"
          onClick={() => del.mutate(task.id)}
          disabled={del.isPending}
          className="opacity-0 group-hover:opacity-100 transition py-2"
        >
          Delete
        </Button>
      </div>
    </li>
  );
}
