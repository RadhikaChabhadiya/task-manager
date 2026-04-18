"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "@/store";
import { useTask } from "@/hook/useTask";
import { getTaskStatus } from "@/utils/tasks";

export function useTaskDetail() {
  const { id } = useParams();
  const router = useRouter();

  const taskId = Number(id);

  const localTask = useAppSelector((state) =>
    state.tasks.items.find((t) => t.id === taskId)
  );

  const {
    data,
    isLoading,
    isError,
    isFetching,
  } = useTask(taskId, {
    enabled: !localTask,
  });

  const task = localTask ?? data;

  const taskStatus = useMemo(() => getTaskStatus(task), [task]);

  return {
    router,
    task,
    taskId,
    isLoading,
    isError,
    isFetching,
    taskStatus,
  };
}