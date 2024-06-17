import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "./TaskForm";
import { Category } from "../../services/todoService";

describe("TaskForm", () => {
  const categories: Category[] = [
    { id: 1, name: "Work", createdAt: "", updatedAt: "" },
    { id: 2, name: "Personal", createdAt: "", updatedAt: "" },
  ];

  const mockOnSave = jest.fn();
  const mockOnClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form correctly", () => {
    render(
      <TaskForm
        onSave={mockOnSave}
        onClose={mockOnClose}
        categories={categories}
      />
    );
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/Save Task/i)).toBeInTheDocument();
  });

  it("submits the form with valid data", () => {
    render(
      <TaskForm
        onSave={mockOnSave}
        onClose={mockOnClose}
        categories={categories}
      />
    );
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Task Description" },
    });
    fireEvent.change(screen.getByLabelText(/Category/i), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByText(/Save Task/i));
    expect(mockOnSave).toHaveBeenCalledWith("New Task", "Task Description", 2);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("does not submit the form with empty title", () => {
    render(
      <TaskForm
        onSave={mockOnSave}
        onClose={mockOnClose}
        categories={categories}
      />
    );
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Task Description" },
    });
    fireEvent.change(screen.getByLabelText(/Category/i), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByText(/Save Task/i));
    expect(mockOnSave).not.toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("closes the form when the Cancel button is clicked", () => {
    render(
      <TaskForm
        onSave={mockOnSave}
        onClose={mockOnClose}
        categories={categories}
      />
    );
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("changes category selection", () => {
    render(
      <TaskForm
        onSave={mockOnSave}
        onClose={mockOnClose}
        categories={categories}
      />
    );
    const categorySelect = screen.getByLabelText(/Category/i);
    fireEvent.change(categorySelect, { target: { value: "2" } });
    expect(categorySelect).toHaveValue("2");
  });
});