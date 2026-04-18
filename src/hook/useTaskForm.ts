import { useState } from "react";
import { useCreateTask } from "@/hook/useTask";

export function useTaskForm() {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const create = useCreateTask();

  const validate = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return "Title is required";
    if (trimmed.length < 3) return "Title must be at least 3 characters";
    return null;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validate(title);
    if (validationError) {
      setError(validationError);
      return;
    }

    create.mutate(
      { title: title.trim(), completed: false, userId: 1 },
      { onSuccess: () => setTitle("") }
    );

    setError(null);
  };

  return {
    title,
    setTitle,
    error,
    onSubmit,
    isPending: create.isPending,
  };
}