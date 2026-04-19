import { render, screen } from "@testing-library/react";
import { TasksDashboard } from "@/components/tasks/TasksDashboard";
import { useTasksQuery } from "@/hook/useTask";
import { useDebounce } from "@/hook/useDebounce";
import { useFilteredTasks } from "@/hook/useFilteredTasks";
import { useAppDispatch, useAppSelector } from "@/store";
import { setTasks } from "@/store/slices/tasksSlice";
import type { Task } from "@/types/task";
import { mockTasks } from "__mocks__/tasks";

jest.mock("@/hook/useTask", () => ({
  useTasksQuery: jest.fn(),
}));

jest.mock("@/hook/useDebounce", () => ({
  useDebounce: jest.fn(),
}));

jest.mock("@/hook/useFilteredTasks", () => ({
  useFilteredTasks: jest.fn(),
}));

jest.mock("@/store", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock("@/components/tasks/TaskForm", () => ({
  TaskForm: () => <div data-testid="task-form" />,
}));

jest.mock("@/components/tasks/TaskFilters", () => ({
  TaskFilters: () => <div data-testid="task-filters" />,
}));

jest.mock("@/components/tasks/TaskList", () => ({
  TaskList: ({ tasks, loading }: any) => (
    <div data-testid="task-list">
      {loading ? "loading" : `tasks:${tasks.length}`}
    </div>
  ),
}));

const mockDispatch = jest.fn();

const setupSelectors = ({
  filters = { search: "", status: "all", sortBy: "newest" },
  localTasks = [],
} : {
  filters?: { search: string; status: string; sortBy: string };
  localTasks?: Task[];
} = {}) => {
  (useAppSelector as jest.Mock).mockImplementation((cb) =>
    cb({
      filters,
      tasks: { items: localTasks },
    })
  );
};

describe("TasksDashboard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as jest.MockedFunction<typeof useAppDispatch>).mockReturnValue(mockDispatch);
    (useDebounce as jest.MockedFunction<typeof useDebounce>).mockReturnValue("");
    (useFilteredTasks as jest.MockedFunction<typeof useFilteredTasks>).mockReturnValue(mockTasks);
  });

  it("renders core components", () => {
    setupSelectors();
    (useTasksQuery as jest.Mock).mockReturnValue({
      data: mockTasks,
      isLoading: false,
      isError: false,
    });
    render(<TasksDashboard initialTasks={[]} />);
    expect(screen.getByTestId("task-form")).toBeInTheDocument();
    expect(screen.getByTestId("task-filters")).toBeInTheDocument();
    expect(screen.getByTestId("task-list")).toBeInTheDocument();
  });

  it("displays correct task count", () => {
    setupSelectors();
    (useTasksQuery as jest.Mock).mockReturnValue({
      data: mockTasks,
      isLoading: false,
      isError: false,
    });
    render(<TasksDashboard initialTasks={[]} />);
    expect(
      screen.getByText(/3 of 3 shown/i)
    ).toBeInTheDocument();
  });

  it("dispatches setTasks when data is available", () => {
    setupSelectors();
    (useTasksQuery as jest.Mock).mockReturnValue({
      data: mockTasks,
      isLoading: false,
      isError: false,
    });
    render(<TasksDashboard initialTasks={[]} />);
    expect(mockDispatch).toHaveBeenCalledWith(setTasks(mockTasks));
  });

  it("uses initialTasks when API data is missing", () => {
    setupSelectors();
    (useTasksQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    });
    render(<TasksDashboard initialTasks={mockTasks} />);
    expect(mockDispatch).toHaveBeenCalledWith(setTasks(mockTasks));
  });

  it("renders error message when API fails", () => {
    setupSelectors();
    (useTasksQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      refetch: jest.fn(),
    });
    render(<TasksDashboard initialTasks={[]} />);
    expect(
      screen.getByText(/failed to load tasks/i)
    ).toBeInTheDocument();
  });

  it("passes loading state to TaskList", () => {
    setupSelectors();
    (useTasksQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });
    render(<TasksDashboard initialTasks={[]} />);
    expect(screen.getByTestId("task-list")).toHaveTextContent(
      "loading"
    );
  });

  it("passes merged tasks into filtering hook", () => {
    setupSelectors({
      localTasks: [{ id: 3, title: "Local Task", userId: 1, completed: false }],
    });
    (useTasksQuery as jest.Mock).mockReturnValue({
      data: mockTasks,
      isLoading: false,
      isError: false,
    });
    render(<TasksDashboard initialTasks={[]} />);
    expect(useFilteredTasks).toHaveBeenCalled();
  });
});