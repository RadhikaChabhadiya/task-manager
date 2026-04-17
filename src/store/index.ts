import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import tasksReducer from "./slices/tasksSlice";
import filtersReducer from "./slices/filtersSlice";

export const makeStore = () =>
    configureStore({
        reducer: { tasks: tasksReducer, filters: filtersReducer },
    });

export const store = makeStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
