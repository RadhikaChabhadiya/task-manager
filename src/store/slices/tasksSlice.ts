import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "@/types/task";

interface TasksState {
    items: Task[];
    selectedId: number | null;
}

const initialState: TasksState = { items: [], selectedId: null };

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => { state.items = action.payload; },
        addTask: (state, action: PayloadAction<Task>) => { state.items.unshift(action.payload); },
        updateTask: (state, action: PayloadAction<Task>) => {
            const i = state.items.findIndex((t) => t.id === action.payload.id);
            if (i !== -1) state.items[i] = action.payload;
        },
        removeTask: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((t) => t.id !== action.payload);
        },
        toggleTask: (state, action: PayloadAction<number>) => {
            const t = state.items.find((x) => x.id === action.payload);
            if (t) t.completed = !t.completed;
        },
        selectTask: (state, action: PayloadAction<number | null>) => { state.selectedId = action.payload; },
    },
});

export const { setTasks, addTask, updateTask, removeTask, toggleTask, selectTask } =
    tasksSlice.actions;
export default tasksSlice.reducer;
