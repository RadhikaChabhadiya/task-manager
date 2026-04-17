import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TaskFilters } from "@/types/task";

const initialState: TaskFilters = { search: "", status: "all", sortBy: "newest" };

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch: (s, a: PayloadAction<string>) => { s.search = a.payload; },
    setStatus: (s, a: PayloadAction<TaskFilters["status"]>) => { s.status = a.payload; },
    setSortBy: (s, a: PayloadAction<TaskFilters["sortBy"]>) => { s.sortBy = a.payload; },
    resetFilters: () => initialState,
  },
});

export const { setSearch, setStatus, setSortBy, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
