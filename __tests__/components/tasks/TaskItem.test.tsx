import { TaskItem } from "@/components/tasks/TaskItem";
import { render, screen, fireEvent } from "@testing-library/react";
import { mockTask } from "__mocks__/tasks";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const mockUpdate = jest.fn();
const mockDelete = jest.fn();

jest.mock("@/hook/useTask", () => ({
  useUpdateTask: () => ({
    mutate: mockUpdate,
  }),
  useDeleteTask: () => ({
    mutate: mockDelete,
    isPending: false,
  }),
}));

describe("TaskItem", () => {
  it("renders task title", () => {
    render(<TaskItem task={mockTask} />);
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it("calls update on checkbox toggle", () => {
    render(<TaskItem task={mockTask} />);
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(mockUpdate).toHaveBeenCalled();
  });

  it("calls delete when delete button clicked", () => {
    render(<TaskItem task={mockTask} />);
    const deleteBtn = screen.getByText("Delete");
    fireEvent.click(deleteBtn);
    expect(mockDelete).toHaveBeenCalledWith(1);
  });
});