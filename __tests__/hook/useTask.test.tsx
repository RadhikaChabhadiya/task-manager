import { renderHook, act, waitFor } from "@testing-library/react";
import { tasksApi } from "@/lib/api";
import { useAppDispatch } from "@/store";
import toast from "react-hot-toast";
import type { Task } from "@/types/task";
import {
  useCreateTask,
  useDeleteTask,
  useTasksQuery,
  useUpdateTask,
} from "@/hook/useTask";
import { mockTask, mockTasks } from "__mocks__/tasks";
import { createQueryClientWrapper } from "test-utils";

jest.mock("@/lib/api", () => ({
  tasksApi: {
    list: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  },
}));

jest.mock("@/store", () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));


describe("tasks hooks", () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
  });

  it("fetches tasks list successfully", async () => {
    (tasksApi.list as jest.Mock).mockResolvedValue(mockTasks);

    const { result } = renderHook(() => useTasksQuery(), {
      wrapper: createQueryClientWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(tasksApi.list).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockTasks);
  });

  it("creates task and updates redux + cache", async () => {
    (tasksApi.create as jest.Mock).mockResolvedValue(mockTask);

    const { result } = renderHook(() => useCreateTask(), {
      wrapper: createQueryClientWrapper(),
    });

    await act(async () => {
      await result.current.mutateAsync({
        title: "Test Task",
      } as Task);
    });

    expect(tasksApi.create).toHaveBeenCalledWith(
      { title: "Test Task" },
      expect.anything()
    );

    expect(dispatchMock).toHaveBeenCalled();
  });

  it("updates task successfully", async () => {
    const updatedTask: Task = {
      id: 1,
      title: "Updated Task",
      createdAt: "2024-01-03",
      completed: false,
      userId: 1,
    };

    (tasksApi.update as jest.Mock).mockResolvedValue(updatedTask);

    const { result } = renderHook(() => useUpdateTask(), {
      wrapper: createQueryClientWrapper(),
    });

    await act(async () => {
      await result.current.mutateAsync({
        id: 1,
        title: "Updated Task",
      });
    });

    expect(tasksApi.update).toHaveBeenCalledWith(1, {
      title: "Updated Task",
    });

    expect(dispatchMock).toHaveBeenCalled();

    expect(toast.success).toHaveBeenCalledWith(
      "Task updated successfully"
    );
  });

  it("rolls back update on error", async () => {
    (tasksApi.update as jest.Mock).mockRejectedValue(
      new Error("Update failed")
    );

    const { result } = renderHook(() => useUpdateTask(), {
      wrapper: createQueryClientWrapper(),
    });

    await expect(
      result.current.mutateAsync({
        id: 1,
        title: "Fail",
      })
    ).rejects.toThrow();

    expect(toast.error).toHaveBeenCalledWith("Update failed");
  });

  it("deletes task successfully", async () => {
    (tasksApi.remove as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useDeleteTask(), {
      wrapper: createQueryClientWrapper(),
    });

    await act(async () => {
      await result.current.mutateAsync(1);
    });

    expect(tasksApi.remove).toHaveBeenCalledWith(1);

    expect(dispatchMock).toHaveBeenCalled();

    expect(toast.success).toHaveBeenCalledWith(
      "Task deleted successfully"
    );
  });

  it("handles delete failure", async () => {
    (tasksApi.remove as jest.Mock).mockRejectedValue(
      new Error("Delete failed")
    );

    const { result } = renderHook(() => useDeleteTask(), {
      wrapper: createQueryClientWrapper(),
    });

    await expect(result.current.mutateAsync(1)).rejects.toThrow();

    expect(toast.error).toHaveBeenCalledWith("Delete failed");
  });
});