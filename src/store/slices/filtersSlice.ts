import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TaskFilters } from "@/types/task";

const initialState: TaskFilters = { search: "", status: "all", sortBy: "newest" };

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => { state.search = action.payload; },
    setStatus: (state, action: PayloadAction<TaskFilters["status"]>) => { state.status = action.payload; },
    setSortBy: (state, action: PayloadAction<TaskFilters["sortBy"]>) => { state.sortBy = action.payload; },
    resetFilters: () => initialState,
  },
});

export const { setSearch, setStatus, setSortBy, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
