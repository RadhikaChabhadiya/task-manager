"use client";
import { Button } from "@/components/common/Button";
import { useTaskItem } from "@/hook/useTaskItem";
import type { Task } from "@/types/task";

export function TaskItem({ task }: { task: Task }) {
  const {
    isCompleted,
    goToDetail,
    toggleTask,
    deleteTask,
    isDeleting,
  } = useTaskItem(task);

  return (
    <li
      onClick={goToDetail}
      className="group relative flex flex-col gap-2 rounded-2xl p-4 glass hover:shadow-xl transition-all duration-200 border border-slate-300 dark:border-white/10 cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isCompleted}
          onClick={(e) => e.stopPropagation()}
          onChange={toggleTask}
          className="w-5 h-5 rounded accent-brand-600 cursor-pointer"
        />
        <span
          className={`flex-1 font-medium truncate transition ${
            isCompleted
              ? "line-through text-slate-400"
              : "text-slate-900 dark:text-white group-hover:text-brand-400"
          }`}
        >
          {task.title}
        </span>
        <Button
          variant="danger"
          onClick={deleteTask}
          disabled={isDeleting}
          className="opacity-0 group-hover:opacity-100 transition py-1.5 border dark:border-none"
        >
          Delete
        </Button>
      </div>
      <div className="flex gap-2 text-sm">
        <span
          className={`px-3 py-1 rounded-full ${
            isCompleted
              ? "bg-emerald-100 text-emerald-700 border dark:border-none dark:bg-emerald-900/40 dark:text-emerald-300"
              : "bg-amber-100 text-amber-700 border dark:border-none dark:bg-amber-900/40 dark:text-amber-300"
          }`}
        >
          {isCompleted ? "Completed" : "Pending"}
        </span>
        <span className="px-3 py-1 rounded-full bg-slate-100 border dark:border-none dark:bg-slate-800">
          User #{task.userId}
        </span>
      </div>
    </li>
  );
}