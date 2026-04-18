"use client";
import { useAppDispatch, useAppSelector } from "@/store";
import { setSearch, setStatus, setSortBy } from "@/store/slices/filtersSlice";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import { TaskFilters as TaskFiltersType } from "@/types/task";

type TaskStatus = TaskFiltersType["status"];
type TaskSortBy = TaskFiltersType["sortBy"];

export function TaskFilters() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.filters);

  return (
    <div className="glass border-slate-300 rounded-2xl p-4 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
      <Input
        type="search"
        placeholder="Search tasks…"
        value={filter.search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
      <Select value={filter.status} onChange={(e) => dispatch(setStatus(e.target.value as TaskStatus))}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </Select>
      <Select value={filter.sortBy} onChange={(e) => dispatch(setSortBy(e.target.value as TaskSortBy))}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="title">Title (A-Z)</option>
      </Select>
    </div>
  );
}
