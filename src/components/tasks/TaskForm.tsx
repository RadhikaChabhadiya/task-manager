"use client";
import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useCreateTask } from "@/hook/useTask";

export function TaskForm() {
  const [title, setTitle] = useState("");
  const create = useCreateTask();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    create.mutate(
      { title: title.trim(), completed: false, userId: 1 },
      { onSuccess: () => setTitle("") },
    );
  };

  return (
    <form onSubmit={onSubmit} className="glass rounded-2xl p-4 flex gap-3">
      <Input
        placeholder="Add a new task…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button type="submit" disabled={create.isPending || !title.trim()}>
        {create.isPending ? "Adding…" : "Add"}
      </Button>
    </form>
  );
}
