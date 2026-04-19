"use client";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { useTaskForm } from "@/hook/useTaskForm";

export function TaskForm() {
  const {
    title,
    setTitle,
    error,
    onSubmit,
    isPending,
  } = useTaskForm();

  return (
    <form onSubmit={onSubmit} aria-label="task-form" className="glass border-slate-300 rounded-2xl p-4 flex items-start gap-3">
      <div className="flex-1">
        <Input
          placeholder="Add a new task…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full"
        />
        {error && (
          <p className="text-sm text-red-500 mt-1">{error}</p>
        )}
      </div>
      <Button type="submit" disabled={isPending || !title.trim()} className="py-3 shrink-0 self-start">
        {isPending ? "Adding…" : "Add"}
      </Button>
    </form>
  );
}
