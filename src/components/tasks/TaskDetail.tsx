"use client";
import Link from "next/link";
import { Skeleton } from "../common/Skeleton";
import { ErrorMessage } from "../common/ErrorMessage";
import { notFound } from "next/navigation";
import { useTaskDetail } from "@/hook/useTaskDetail";

export default function TaskDetail() {
  const {
    router,
    task,
    isLoading,
    isFetching,
    isError,
    taskStatus,
  } = useTaskDetail();

  if (isLoading || isFetching) {
    return <Skeleton />;
  }

  if (isError) {
    return (
      <ErrorMessage
        description="Failed to load tasks."
        actionLabel="Back"
        onAction={() => router.push("/tasks")}
      />
    );
  }

  if (!task || !taskStatus) notFound();

  const { isCompleted, statusLabel, statusClass, titleClass } =
    taskStatus;

  return (
    <div className="mx-auto mt-10 max-w-4xl px-4">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/tasks"
          className="text-sm text-slate-900 transition dark:text-slate-400 dark:hover:text-white"
        >
          ← Back
        </Link>
        <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusClass}`}>
          {statusLabel}
        </span>
      </div>
      <div className="transform rounded-2xl border border-slate-300 bg-white/5 p-8 shadow-xl backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl dark:border-white/10">
        <h1 className={`text-3xl font-semibold tracking-tight ${titleClass}`}>
          {task.title}
        </h1>
        <div className="my-6 h-px bg-white/10" />
        <div className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-3">
          <div>
            <p className="mb-1 text-slate-900 dark:text-slate-400">Task ID</p>
            <p className="font-medium text-slate-500 dark:text-white">
              {task.id}
            </p>
          </div>
          <div>
            <p className="mb-1 text-slate-900 dark:text-slate-400">User</p>
            <p className="font-medium text-slate-500 dark:text-white">
              User #{task.userId}
            </p>
          </div>
          <div>
            <p className="mb-1 text-slate-900 dark:text-slate-400">Status</p>
            <p
              className={`font-medium ${
                isCompleted
                  ? "text-green-600 dark:text-green-400"
                  : "text-yellow-600 dark:text-yellow-400"
              }`}
            >
              {statusLabel}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}