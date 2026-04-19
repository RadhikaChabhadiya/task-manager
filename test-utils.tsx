import { ReactNode, type FormEvent, type MouseEvent } from "react";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import type { CreateTaskInput, Task } from "@/types/task";
import { store } from "@/store";

export function renderWithProviders(ui: ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {ui}
      </QueryClientProvider>
    </Provider>
  );
}

export function createQueryClientWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export function createSubmitEvent(
  preventDefault = jest.fn(),
): FormEvent<HTMLFormElement> {
  return {
    preventDefault,
    target: {} as EventTarget,
    currentTarget: {} as EventTarget,
    nativeEvent: {} as Event,
    bubbles: false,
    cancelable: false,
    defaultPrevented: false,
    eventPhase: 0,
    isTrusted: false,
    timeStamp: 0,
    type: "submit",
  } as FormEvent<HTMLFormElement>;
}

export function createTaskPayload(title: string): CreateTaskInput {
  return {
    title,
    completed: false,
    userId: 1,
  };
}

export function createMouseEvent(
  overrides: Partial<MouseEvent> = {},
): MouseEvent<HTMLElement> {
  return {
    preventDefault: jest.fn(),
    ...overrides,
  } as MouseEvent<HTMLElement>;
}

export interface TaskListProps {
  tasks: Task[];
  loading: boolean;
}
