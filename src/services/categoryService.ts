const baseURL = "http://localhost:8080/api/categories";

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

const categoryService = {
  findAllCategories: async () => {
    const response = await fetch(baseURL);
    return handleResponse(response);
  },

  createCategory: async (data: CreateCategoryDTO) => {
    const response = await fetch(baseURL, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  deleteCategoryById: async (id: number) => {
    const response = await fetch(`${baseURL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
    return response;
  },
};

export default categoryService;

// interfaces for request and response data
export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryDTO {
  name: string;
}
