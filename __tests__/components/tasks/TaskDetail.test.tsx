import { render, screen, fireEvent } from "@testing-library/react";
import TaskDetail from "@/components/tasks/TaskDetail";
import { useTaskDetail } from "@/hook/useTaskDetail";
import { notFound } from "next/navigation";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  notFound: jest.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

jest.mock("next/link", () => {
  return ({ children }: any) => <a>{children}</a>;
});

jest.mock("@/hook/useTaskDetail", () => ({
  useTaskDetail: jest.fn(),
}));

const createMock = (overrides = {}) => ({
  router: { push: mockPush },
  task: null,
  taskStatus: null,
  isLoading: false,
  isError: false,
  ...overrides,
});

describe("TaskDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders skeleton when loading", () => {
    (useTaskDetail as jest.Mock).mockReturnValue(
      createMock({ isLoading: true })
    );
    render(<TaskDetail />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("renders error message and handles back action", () => {
    (useTaskDetail as jest.Mock).mockReturnValue(
      createMock({ isError: true })
    );
    render(<TaskDetail />);
    expect(
      screen.getByText(/failed to load tasks/i)
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText(/back/i));
    expect(mockPush).toHaveBeenCalledWith("/tasks");
    expect(mockPush).toHaveBeenCalledTimes(1);
  });

  it("calls notFound when task is missing", () => {
    (useTaskDetail as jest.Mock).mockReturnValue(
      createMock({
        task: null,
        taskStatus: null,
      })
    );
    expect(() => render(<TaskDetail />)).toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalled();
  });

  it("renders task details correctly", () => {
    (useTaskDetail as jest.Mock).mockReturnValue(
      createMock({
        task: {
          id: 1,
          title: "Test Task",
          userId: 10,
        },
        taskStatus: {
          isCompleted: false,
          statusLabel: "Pending",
          statusClass: "bg-yellow",
          titleClass: "text-yellow",
        },
      })
    );
    render(<TaskDetail />);
    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("User #10")).toBeInTheDocument();
    expect(screen.getAllByText("Pending").length).toBeGreaterThan(0);
  });
});