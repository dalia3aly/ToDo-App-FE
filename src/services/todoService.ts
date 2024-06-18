// src/services/todoService.ts

const baseURL = "http://localhost:8080/api/todos";

const headers = {
  "Content-Type": "application/json",
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  return response.json();
};

const todoService = {
  findAllTodos: async () => {
    const response = await fetch(baseURL);
    return handleResponse(response);
  },

  createTodo: async (data: CreateTodoDTO) => {
    const response = await fetch(baseURL, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  getTodoById: async (id: number) => {
    const response = await fetch(`${baseURL}/${id}`);
    return handleResponse(response);
  },

  updateTodoById: async (id: number, data: UpdateTodoDTO) => {
    const response = await fetch(`${baseURL}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  deleteTodoById: async (id: number) => {
    const response = await fetch(`${baseURL}/${id}`, {
      method: "DELETE",
    });
    return response;
  },

  findAllCategories: async () => {
    const response = await fetch(`http://localhost:8080/api/categories`);
    return handleResponse(response);
  },
};

export default todoService;

// interfaces for request and response data
export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

export interface CreateTodoDTO {
  title: string;
  description: string;
  completed: boolean;
  categoryId: number;
}

export interface UpdateTodoDTO {
  title?: string;
  description?: string;
  completed?: boolean;
}
