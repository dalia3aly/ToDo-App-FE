import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AllTodos from "./AllTodos";
import todoService from "../../services/todoService";
import { Todo } from "../../services/todoService";

jest.mock("../../services/todoService");

describe("AllTodos", () => {
  const mockTodos: Todo[] = [
    {
      id: 1,
      title: "Test Todo 1",
      description: "Description 1",
      category: { id: 3, name: "Work", createdAt: "", updatedAt: "" },
      completed: false,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 2,
      title: "Test Todo 2",
      description: "Description 2",
      category: { id: 1, name: "Family", createdAt: "", updatedAt: "" },
      completed: true,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 3,
      title: "Test Todo 3",
      description: "Description 3",
      category: { id: 2, name: "Personal", createdAt: "", updatedAt: "" },
      completed: false,
      createdAt: "",
      updatedAt: "",
    },
  ];

  const setTodos = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders todos correctly based on the filter", () => {
    const { rerender } = render(
      <AllTodos todos={mockTodos} setTodos={setTodos} filter="all" />
    );
    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 3")).toBeInTheDocument();

    rerender(
      <AllTodos todos={mockTodos} setTodos={setTodos} filter="completed" />
    );
    expect(screen.queryByText("Test Todo 1")).not.toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
    expect(screen.queryByText("Test Todo 3")).not.toBeInTheDocument();

    rerender(
      <AllTodos todos={mockTodos} setTodos={setTodos} filter="incomplete" />
    );
    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.queryByText("Test Todo 2")).not.toBeInTheDocument();
    expect(screen.getByText("Test Todo 3")).toBeInTheDocument();
  });

  it("handles delete functionality", async () => {
    (todoService.deleteTodoById as jest.Mock).mockResolvedValue({ ok: true });
    render(<AllTodos todos={mockTodos} setTodos={setTodos} filter="all" />);

    const deleteButton = screen.getAllByText("Delete")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(todoService.deleteTodoById).toHaveBeenCalledWith(1);
      expect(setTodos).toHaveBeenCalledWith(expect.any(Function));
    });
  });
});
