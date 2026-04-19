import { TaskFilters } from "@/components/tasks/TaskFilters";
import { render, screen, fireEvent } from "@testing-library/react";

const mockDispatch = jest.fn();

jest.mock("@/store", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: () => ({
    search: "",
    status: "all",
    sortBy: "newest",
  }),
}));

describe("TaskFilters", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it("renders all controls", () => {
    render(<TaskFilters />);

    expect(screen.getByRole("searchbox")).toBeInTheDocument();
    expect(screen.getAllByRole("combobox")).toHaveLength(2);
  });

  it("dispatches search action on input change", () => {
    render(<TaskFilters />);
    const input = screen.getByRole("searchbox");

    fireEvent.change(input, { target: { value: "test" } });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("dispatches status change", () => {
    render(<TaskFilters />);
    const selects = screen.getAllByRole("combobox");

    fireEvent.change(selects[0], { target: { value: "completed" } });

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("dispatches sort change", () => {
    render(<TaskFilters />);
    const selects = screen.getAllByRole("combobox");

    fireEvent.change(selects[1], { target: { value: "oldest" } });

    expect(mockDispatch).toHaveBeenCalled();
  });
});