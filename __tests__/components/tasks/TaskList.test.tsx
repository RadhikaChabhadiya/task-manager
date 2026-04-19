import { render, screen } from "@testing-library/react";
import { TaskList } from "@/components/tasks/TaskList";
import { renderWithProviders } from "test-utils";
import { mockTasks } from "__mocks__/tasks";

describe("TaskList", () => {
    it("renders loading skeleton when loading is true", () => {
        render(<TaskList tasks={[]} loading />);
        expect(
            screen.getByTestId("task-skeleton-container")
        ).toBeInTheDocument();
        expect(
            screen.getAllByTestId("task-skeleton-item")
        ).toHaveLength(5);
    });

    it("renders empty state when no tasks", () => {
        renderWithProviders(<TaskList tasks={[]} loading={false} />);
        expect(
            screen.getByText("No tasks match your filters.")
        ).toBeInTheDocument();
    });

    it("renders task list when tasks are available", () => {
        renderWithProviders(<TaskList tasks={mockTasks} />);
        expect(screen.getByText("Task 1")).toBeInTheDocument();
    });

    it("does not render skeleton or empty state when tasks exist", () => {
        renderWithProviders(<TaskList tasks={mockTasks} />);
        expect(screen.queryByTestId("task-skeleton")).not.toBeInTheDocument();
        expect(
            screen.queryByText("No tasks match your filters.")
        ).not.toBeInTheDocument();
    });
});