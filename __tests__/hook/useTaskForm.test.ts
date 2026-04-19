import { renderHook, act } from "@testing-library/react";
import { useTaskForm } from "@/hook/useTaskForm";
import { useCreateTask } from "@/hook/useTask";
import type { CreateTaskInput } from "@/types/task";
import { createSubmitEvent, createTaskPayload } from "test-utils";

jest.mock("@/hook/useTask", () => ({
    useCreateTask: jest.fn(),
}));

describe("useTaskForm", () => {
    type MutateArgs = [CreateTaskInput, { onSuccess: () => void }];

    const mutateMock = jest.fn<void, MutateArgs>();
    const useCreateTaskMock = useCreateTask as jest.MockedFunction<typeof useCreateTask>;

    const renderTaskForm = () => renderHook(() => useTaskForm());

    beforeEach(() => {
        jest.clearAllMocks();

        useCreateTaskMock.mockReturnValue({
            mutate: mutateMock,
            isPending: false,
        } as unknown as ReturnType<typeof useCreateTask>);
    });

    it("initializes with default state", () => {
        const { result } = renderHook(() => useTaskForm());

        expect(result.current.title).toBe("");
        expect(result.current.error).toBeNull();
        expect(result.current.isPending).toBe(false);
    });

    it("updates title state", () => {
        const { result } = renderHook(() => useTaskForm());

        act(() => {
            result.current.setTitle("New Task");
        });

        expect(result.current.title).toBe("New Task");
    });

    it("shows error when title is empty", () => {
        const { result } = renderHook(() => useTaskForm());
        const event = createSubmitEvent();

        act(() => {
            result.current.setTitle("   ");
        });

        act(() => {
            result.current.onSubmit(event);
        });

        expect(result.current.error).toBe("Title is required");
        expect(mutateMock).not.toHaveBeenCalled();
    });

    it("shows error when title is too short", () => {
        const { result } = renderHook(() => useTaskForm());
        const event = createSubmitEvent();

        act(() => {
            result.current.setTitle("ab");
        });

        act(() => {
            result.current.onSubmit(event);
        });

        expect(result.current.error).toBe(
            "Title must be at least 3 characters"
        );
        expect(mutateMock).not.toHaveBeenCalled();
    });

    it("submits valid task and clears title", () => {
        const { result } = renderHook(() => useTaskForm());
        const preventDefault = jest.fn();
        const event = createSubmitEvent(preventDefault);
        const taskPayload = createTaskPayload("Valid Task");

        act(() => {
            result.current.setTitle("Valid Task");
        });

        act(() => {
            result.current.onSubmit(event);
        });

        expect(preventDefault).toHaveBeenCalled();
        expect(mutateMock).toHaveBeenCalledWith(
            taskPayload,
            expect.objectContaining({
                onSuccess: expect.any(Function),
            })
        );

        const onSuccess =
            mutateMock.mock.calls[0][1].onSuccess;

        act(() => {
            onSuccess();
        });

        expect(result.current.title).toBe("");
        expect(result.current.error).toBeNull();
    });

    it("trims title before submitting", () => {
        const { result } = renderHook(() => useTaskForm());
        const event = createSubmitEvent();
        const taskPayload = createTaskPayload("Clean Task");

        act(() => {
            result.current.setTitle("   Clean Task   ");
        });

        act(() => {
            result.current.onSubmit(event);
        });

        expect(mutateMock).toHaveBeenCalledWith(
            taskPayload,
            expect.anything()
        );
    });

    it("exposes isPending from create task hook", () => {
        useCreateTaskMock.mockReturnValueOnce({
            mutate: mutateMock,
            isPending: true,
        } as unknown as ReturnType<typeof useCreateTask>);

        const { result } = renderTaskForm();

        expect(result.current.isPending).toBe(true);
    });
});