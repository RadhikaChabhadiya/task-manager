import { renderHook, act } from "@testing-library/react";
import { useTaskItem } from "@/hook/useTaskItem";
import { useRouter } from "next/navigation";
import { useDeleteTask, useUpdateTask } from "@/hook/useTask";
import { mockTask } from "__mocks__/tasks";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hook/useTask", () => ({
  useUpdateTask: jest.fn(),
  useDeleteTask: jest.fn(),
}));

describe("useTaskItem", () => {
  const pushMock = jest.fn();
  const updateMutateMock = jest.fn();
  const deleteMutateMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    (useUpdateTask as jest.Mock).mockReturnValue({
      mutate: updateMutateMock,
      isPending: false,
    });

    (useDeleteTask as jest.Mock).mockReturnValue({
      mutate: deleteMutateMock,
      isPending: false,
    });
  });

  it("returns correct computed state", () => {
    const { result } = renderHook(() => useTaskItem(mockTask));

    expect(result.current.isCompleted).toBe(false);
    expect(result.current.isDeleting).toBe(false);
  });

  it("navigates to task detail page", () => {
    const { result } = renderHook(() => useTaskItem(mockTask));

    act(() => {
      result.current.goToDetail();
    });

    expect(pushMock).toHaveBeenCalledWith("/tasks/1");
  });

  it("toggles task completion", () => {
    const { result } = renderHook(() => useTaskItem(mockTask));

    act(() => {
      result.current.toggleTask();
    });

    expect(updateMutateMock).toHaveBeenCalledWith({
      id: 1,
      completed: true,
    });
  });

  it("toggles task from completed to false", () => {
    const completedTask = { ...mockTask, completed: true };

    const { result } = renderHook(() => useTaskItem(completedTask));

    act(() => {
      result.current.toggleTask();
    });

    expect(updateMutateMock).toHaveBeenCalledWith({
      id: 1,
      completed: false,
    });
  });

  it("deletes task and stops propagation", () => {
    const { result } = renderHook(() => useTaskItem(mockTask));

    const stopPropagation = jest.fn();

    act(() => {
      result.current.deleteTask({
        stopPropagation,
      } as unknown as React.MouseEvent);
    });

    expect(stopPropagation).toHaveBeenCalled();
    expect(deleteMutateMock).toHaveBeenCalledWith(1);
  });

  it("reflects deleting state", () => {
    (useDeleteTask as jest.Mock).mockReturnValue({
      mutate: deleteMutateMock,
      isPending: true,
    });

    const { result } = renderHook(() => useTaskItem(mockTask));

    expect(result.current.isDeleting).toBe(true);
  });
});