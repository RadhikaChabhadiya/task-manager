import { useRouter } from "next/navigation";
import { useDeleteTask, useUpdateTask } from "@/hook/useTask";
import type { Task } from "@/types/task";

export function useTaskItem(task: Task) {
  const router = useRouter();
  const update = useUpdateTask();
  const del = useDeleteTask();

  const isCompleted = task.completed;

  const goToDetail = () => {
    router.push(`/tasks/${task.id}`);
  };

  const toggleTask = () => {
    update.mutate({
      id: task.id,
      completed: !task.completed,
    });
  };

  const deleteTask = (e: React.MouseEvent) => {
    e.stopPropagation();
    del.mutate(task.id);
  };

  return {
    isCompleted,
    goToDetail,
    toggleTask,
    deleteTask,
    isDeleting: del.isPending,
  };
}