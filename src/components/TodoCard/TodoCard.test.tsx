import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TodoCard from "./TodoCard";
import { Todo } from "../../services/todoService";

describe("TodoCard", () => {
  const todo: Todo = {
    id: 1,
    title: "Test Todo",
    description: "Test Description",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: { id: 1, name: "Work", createdAt: "", updatedAt: "" },
  };

  const mockOnDelete = jest.fn();
  const mockOnUpdate = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the TodoCard with correct data", () => {
    render(
      <TodoCard todo={todo} onDelete={mockOnDelete} onUpdate={mockOnUpdate} />
    );
    expect(screen.getByText("Test Todo")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Category: Work")).toBeInTheDocument();
    expect(screen.getByText(/Posted/i)).toBeInTheDocument();
    expect(screen.getByText("Mark as Complete")).toBeInTheDocument();
  });

  it("toggles the completion status", async () => {
    render(
      <TodoCard todo={todo} onDelete={mockOnDelete} onUpdate={mockOnUpdate} />
    );
    const toggleButton = screen.getByText("Mark as Complete");
    fireEvent.click(toggleButton);
    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith(1, { completed: true });
    });
  });

  it("deletes a todo", async () => {
    render(
      <TodoCard todo={todo} onDelete={mockOnDelete} onUpdate={mockOnUpdate} />
    );
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);
    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith(1);
    });
  });

  it("updates the title", async () => {
    render(
      <TodoCard todo={todo} onDelete={mockOnDelete} onUpdate={mockOnUpdate} />
    );
    const editTitleIcon = screen.getAllByTestId("pencil-icon")[0];
    fireEvent.click(editTitleIcon);
    const titleInput = screen.getByTestId("editable-field-input");
    fireEvent.change(titleInput, { target: { value: "Updated Title" } });
    const checkIcon = screen.getByTestId("check-icon");
    fireEvent.click(checkIcon);
    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith(1, { title: "Updated Title" });
    });
  });

  it("updates the description", async () => {
    render(
      <TodoCard todo={todo} onDelete={mockOnDelete} onUpdate={mockOnUpdate} />
    );
    const editDescriptionIcon = screen.getAllByTestId("pencil-icon")[1];
    fireEvent.click(editDescriptionIcon);
    const descriptionInput = screen.getByTestId("editable-field-input");
    fireEvent.change(descriptionInput, {
      target: { value: "Updated Description" },
    });
    const checkIcon = screen.getByTestId("check-icon");
    fireEvent.click(checkIcon);
    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith(1, {
        description: "Updated Description",
      });
    });
  });
});
