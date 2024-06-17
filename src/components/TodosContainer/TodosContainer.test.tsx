import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TodosContainer from "./TodosContainer";
import todoService from "../../services/todoService";
import { Todo, Category } from "../../services/todoService";

jest.mock("../../services/todoService");

describe("TodosContainer", () => {
  const mockTodos: Todo[] = [
    {
      id: 1,
      title: "Test Todo 1",
      description: "Description 1",
      completed: false,
      createdAt: "",
      updatedAt: "",
      category: { id: 1, name: "Work", createdAt: "", updatedAt: "" },
    },
    {
      id: 2,
      title: "Test Todo 2",
      description: "Description 2",
      completed: true,
      createdAt: "",
      updatedAt: "",
      category: { id: 2, name: "Personal", createdAt: "", updatedAt: "" },
    },
  ];

  const mockCategories: Category[] = [
    { id: 1, name: "Work", createdAt: "", updatedAt: "" },
    { id: 2, name: "Personal", createdAt: "", updatedAt: "" },
  ];

  beforeEach(() => {
    (todoService.findAllTodos as jest.Mock).mockResolvedValue(mockTodos);
    (todoService.findAllCategories as jest.Mock).mockResolvedValue(
      mockCategories
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the TodosContainer and its components", async () => {
    render(<TodosContainer />);

    await waitFor(() => {
      expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
      expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
    });

    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });

  it("loads todos and categories on mount", async () => {
    render(<TodosContainer />);

    await waitFor(() => {
      expect(todoService.findAllTodos).toHaveBeenCalled();
      expect(todoService.findAllCategories).toHaveBeenCalled();
    });

    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
  });

  it("opens and closes the modal for adding a new task", async () => {
    render(<TodosContainer />);

    fireEvent.click(screen.getByText("Add Task"));
    expect(screen.getByText("Add a Task")).toBeInTheDocument();

    fireEvent.click(screen.getByText("×"));
    expect(screen.queryByText("Add a Task")).not.toBeInTheDocument();
  });
});
