import { renderHook } from "@testing-library/react";
import { useTaskDetail } from "@/hook/useTaskDetail";
import { useParams, useRouter } from "next/navigation";
import { useAppSelector } from "@/store";
import { useTask } from "@/hook/useTask";
import { getTaskStatus } from "@/utils/tasks";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock("@/store", () => ({
  useAppSelector: jest.fn(),
}));

jest.mock("@/hook/useTask", () => ({
  useTask: jest.fn(),
}));

jest.mock("@/utils/tasks", () => ({
  getTaskStatus: jest.fn(),
}));

describe("useTaskDetail", () => {
  const routerMock = {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.MockedFunction<typeof useRouter>).mockReturnValue(routerMock);
  });

  it("returns local task and disables API fetch", () => {
    (useParams as jest.MockedFunction<typeof useParams>).mockReturnValue({ id: "1" });
    const localTask = {
      id: 1,
      title: "Local Task",
    };

    (useAppSelector as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        tasks: { items: [localTask] },
      })
    );

    (useTask as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    });

    (getTaskStatus as jest.MockedFunction<typeof getTaskStatus>).mockReturnValue("completed");

    const { result } = renderHook(() => useTaskDetail());

    expect(result.current.task).toEqual(localTask);
    expect(result.current.taskId).toBe(1);
    expect(useTask).toHaveBeenCalledWith(1, {
      enabled: false,
    });

    expect(result.current.taskStatus).toBe("completed");
    expect(result.current.router).toBe(routerMock);
  });

  it("uses API data when local task is missing", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "2" });

    const apiTask = {
      id: 2,
      title: "API Task",
    };

    (useAppSelector as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        tasks: { items: [] }, // No local tasks
      })
    );

    (useTask as jest.Mock).mockReturnValue({
      data: apiTask,
      isLoading: false,
      isError: false,
    });

    (getTaskStatus as jest.Mock).mockReturnValue("pending");

    const { result } = renderHook(() => useTaskDetail());

    expect(result.current.task).toEqual(apiTask);
    expect(useTask).toHaveBeenCalledWith(2, {
      enabled: true,
    });

    expect(result.current.taskStatus).toBe("pending");
  });

  it("returns loading state from useTask", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "3" });

    (useAppSelector as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        tasks: { items: [] }, // No local tasks
      })
    );

    (useTask as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    (getTaskStatus as jest.Mock).mockReturnValue(undefined);

    const { result } = renderHook(() => useTaskDetail());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.task).toBeUndefined();
  });

  it("returns error state from API", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "4" });

    (useAppSelector as jest.Mock).mockReturnValue([]);

    (useTask as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    const { result } = renderHook(() => useTaskDetail());

    expect(result.current.isError).toBe(true);
  });

  it("handles invalid id gracefully", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "invalid" });

    (useAppSelector as jest.Mock).mockReturnValue([]);

    (useTask as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    });

    const { result } = renderHook(() => useTaskDetail());

    expect(result.current.taskId).toBeNaN();
  });
});