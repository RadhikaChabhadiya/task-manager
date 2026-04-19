import { useDebounce } from "@/hook/useDebounce";
import { renderHook, act } from "@testing-library/react";

jest.useFakeTimers();

afterEach(() => {
  jest.clearAllTimers();
});

describe("useDebounce", () => {
  it("debounces value", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "a" } }
    );

    rerender({ value: "b" });

    expect(result.current).toBe("a");

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe("b");
  });

  it("clears previous timeout on rapid changes", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "a" } }
    );

    rerender({ value: "b" });
    rerender({ value: "c" });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe("c");
  });
});