"use client";
import React, { memo } from "react";
import { TaskItem } from "./TaskItem";
import type { Task } from "@/types/task";
const SKELETON_COUNT = 5;

function TaskListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <div
          key={i}
          className="glass h-26 animate-pulse rounded-xl border-slate-300 bg-slate-200/60"
        />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="glass rounded-2xl border-slate-300 p-12 text-center">
      <p className="text-slate-600 dark:text-slate-400">
        No tasks match your filters.
      </p>
    </div>
  );
}

type TaskListProps = {
  tasks: Task[];
  loading?: boolean;
};

function TaskListComponent({ tasks, loading = false }: TaskListProps) {
  if (loading) return <TaskListSkeleton />;

  if (!tasks?.length) return <EmptyState />;

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export const TaskList = memo(TaskListComponent);