"use client";
import { useAppDispatch, useAppSelector } from "@/store";
import { setSearch, setStatus, setSortBy } from "@/store/slices/filtersSlice";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

export function TaskFilters() {
  const dispatch = useAppDispatch();
  const f = useAppSelector((s) => s.filters);
  return (
    <div className="glass rounded-2xl p-4 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
      <Input
        type="search"
        placeholder="Search tasks…"
        value={f.search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
      <Select value={f.status} onChange={(e) => dispatch(setStatus(e.target.value as any))}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </Select>
      <Select value={f.sortBy} onChange={(e) => dispatch(setSortBy(e.target.value as any))}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="title">Title (A-Z)</option>
      </Select>
    </div>
  );
}
