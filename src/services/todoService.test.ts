import todoService, { CreateTodoDTO, UpdateTodoDTO } from "./todoService";

// Mock the global fetch function
global.fetch = jest.fn();

const mockFetch = global.fetch as jest.Mock;

const baseURL = "http://localhost:8080/api/todos";

describe("todoService", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch all todos", async () => {
    const todos = [
      { id: 1, title: "Test Todo", description: "Test", completed: false },
    ];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => todos,
    });

    const result = await todoService.findAllTodos();
    expect(result).toEqual(todos);
    expect(mockFetch).toHaveBeenCalledWith(baseURL);
  });

  it("should create a new todo", async () => {
    const newTodo: CreateTodoDTO = {
      title: "New Todo",
      description: "Test",
      completed: false,
    };
    const createdTodo = { id: 1, ...newTodo };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => createdTodo,
    });

    const result = await todoService.createTodo(newTodo);
    expect(result).toEqual(createdTodo);
    expect(mockFetch).toHaveBeenCalledWith(
      baseURL,
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      })
    );
  });

  it("should fetch a todo by id", async () => {
    const todo = {
      id: 1,
      title: "Test Todo",
      description: "Test",
      completed: false,
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => todo,
    });

    const result = await todoService.getTodoById(1);
    expect(result).toEqual(todo);
    expect(mockFetch).toHaveBeenCalledWith(`${baseURL}/1`);
  });

  it("should update a todo by id", async () => {
    const updateData: UpdateTodoDTO = { title: "Updated Todo" };
    const updatedTodo = {
      id: 1,
      title: "Updated Todo",
      description: "Test",
      completed: false,
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => updatedTodo,
    });

    const result = await todoService.updateTodoById(1, updateData);
    expect(result).toEqual(updatedTodo);
    expect(mockFetch).toHaveBeenCalledWith(
      `${baseURL}/1`,
      expect.objectContaining({
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })
    );
  });

  it("should delete a todo by id", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
    });

    const response = await todoService.deleteTodoById(1);
    expect(response.ok).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(
      `${baseURL}/1`,
      expect.objectContaining({
        method: "DELETE",
      })
    );
  });

  it("should fetch all categories", async () => {
    const categories = [{ id: 1, name: "Work", createdAt: "", updatedAt: "" }];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => categories,
    });

    const result = await todoService.findAllCategories();
    expect(result).toEqual(categories);
    expect(mockFetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/categories"
    );
  });
});
