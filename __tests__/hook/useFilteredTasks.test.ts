import { renderHook } from "@testing-library/react";
import { TaskFilters } from "@/types/task";
import { mockTasks } from "__mocks__/tasks";
import { useFilteredTasks } from "@/hook/useFilteredTasks";

const baseFilters: TaskFilters = {
  search: "",
  status: "all",
  sortBy: "newest",
};

describe("useFilteredTasks", () => {
  it("returns all tasks when no filters applied", () => {
    const { result } = renderHook(() =>
      useFilteredTasks(mockTasks, baseFilters, "")
    );
    expect(result.current).toHaveLength(3);
  });

  it("filters tasks by debounced search (case insensitive)", () => {
    const { result } = renderHook(() =>
      useFilteredTasks(mockTasks, baseFilters, "2")
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].title).toBe("Task 2");
  });

  it("filters only completed tasks", () => {
    const filters: TaskFilters = {
      ...baseFilters,
      status: "completed",
    };
    const { result } = renderHook(() =>
      useFilteredTasks(mockTasks, filters, "")
    );
    expect(result.current.every((t) => t.completed)).toBe(true);
    expect(result.current).toHaveLength(1);
  });

  it("filters only pending tasks", () => {
    const filters: TaskFilters = {
      ...baseFilters,
      status: "pending",
    };
    const { result } = renderHook(() =>
      useFilteredTasks(mockTasks, filters, "")
    );
    expect(result.current.every((t) => !t.completed)).toBe(true);
    expect(result.current).toHaveLength(2);
  });

  it("sorts by title (A-Z)", () => {
    const filters: TaskFilters = {
      ...baseFilters,
      sortBy: "title",
    };
    const { result } = renderHook(() =>
      useFilteredTasks(mockTasks, filters, "")
    );
    const titles = result.current.map((t) => t.title);
    expect(titles).toEqual(["Task 1", "Task 2", "Task 3"]);
  });

  it("sorts by newest first", () => {
    const filters: TaskFilters = {
      ...baseFilters,
      sortBy: "newest",
    };
    const { result } = renderHook(() =>
      useFilteredTasks(mockTasks, filters, "")
    );
    expect(result.current[0].id).toBe(3);
  });

  it("sorts by oldest first", () => {
    const filters: TaskFilters = {
      ...baseFilters,
      sortBy: "oldest",
    };
    const { result } = renderHook(() =>
      useFilteredTasks(mockTasks, filters, "")
    );
    expect(result.current[0].id).toBe(1);
  });

  it("combines search + status + sort correctly", () => {
    const filters: TaskFilters = {
      search: "",
      status: "pending",
      sortBy: "title",
    };
    const { result } = renderHook(() =>
      useFilteredTasks(mockTasks, filters, "1")
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].title).toBe("Task 1");
  });
});