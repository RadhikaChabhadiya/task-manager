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
        setTasks: (s, a: PayloadAction<Task[]>) => { s.items = a.payload; },
        addTask: (s, a: PayloadAction<Task>) => { s.items.unshift(a.payload); },
        updateTask: (s, a: PayloadAction<Task>) => {
            const i = s.items.findIndex((t) => t.id === a.payload.id);
            if (i !== -1) s.items[i] = a.payload;
        },
        removeTask: (s, a: PayloadAction<number>) => {
            s.items = s.items.filter((t) => t.id !== a.payload);
        },
        toggleTask: (s, a: PayloadAction<number>) => {
            const t = s.items.find((x) => x.id === a.payload);
            if (t) t.completed = !t.completed;
        },
        selectTask: (s, a: PayloadAction<number | null>) => { s.selectedId = a.payload; },
    },
});

export const { setTasks, addTask, updateTask, removeTask, toggleTask, selectTask } =
    tasksSlice.actions;
export default tasksSlice.reducer;
