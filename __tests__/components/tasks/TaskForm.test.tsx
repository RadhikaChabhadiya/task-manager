import { render, screen, fireEvent } from "@testing-library/react";
import { TaskForm } from "@/components/tasks/TaskForm";
import { useTaskForm } from "@/hook/useTaskForm";

jest.mock("@/hook/useTaskForm", () => ({
  useTaskForm: jest.fn(),
}));

const mockSetTitle = jest.fn();
const mockSubmit = jest.fn();

const createMock = (overrides = {}) => ({
  title: "",
  setTitle: mockSetTitle,
  error: "",
  onSubmit: mockSubmit,
  isPending: false,
  ...overrides,
});

describe("TaskForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input and button", () => {
    (useTaskForm as jest.Mock).mockReturnValue(createMock());
    render(<TaskForm />);
    expect(
      screen.getByPlaceholderText(/add a new task/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i }))
      .toBeInTheDocument();
  });

  it("calls setTitle on input change", () => {
    (useTaskForm as jest.Mock).mockReturnValue(
      createMock({ title: "" })
    );
    render(<TaskForm />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    fireEvent.change(input, { target: { value: "New Task" } });
    expect(mockSetTitle).toHaveBeenCalledWith("New Task");
    expect(mockSetTitle).toHaveBeenCalledTimes(1);
  });

  it("calls onSubmit when form is submitted", () => {
    (useTaskForm as jest.Mock).mockReturnValue(
      createMock({ title: "Task 1" })
    );
    render(<TaskForm />);
    const form = screen.getByRole("button", { name: /add/i }).closest("form")!;
    fireEvent.submit(form);
    expect(mockSubmit).toHaveBeenCalled();
  });

  it("disables button when title is empty", () => {
    (useTaskForm as jest.Mock).mockReturnValue(
      createMock({ title: "" })
    );
    render(<TaskForm />);
    expect(
      screen.getByRole("button", { name: /add/i })
    ).toBeDisabled();
  });

  it("disables button when only whitespace", () => {
    (useTaskForm as jest.Mock).mockReturnValue(
      createMock({ title: "   " })
    );
    render(<TaskForm />);
    expect(
      screen.getByRole("button", { name: /add/i })
    ).toBeDisabled();
  });

  it("renders error message", () => {
    (useTaskForm as jest.Mock).mockReturnValue(
      createMock({ error: "Title is required" })
    );
    render(<TaskForm />);
    expect(
      screen.getByText(/title is required/i)
    ).toBeInTheDocument();
  });

  it("shows loading state when pending", () => {
    (useTaskForm as jest.Mock).mockReturnValue(
      createMock({
        title: "Task",
        isPending: true,
      })
    );
    render(<TaskForm />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/adding/i);
    expect(button).toBeDisabled();
  });
});