import React, { useState } from "react";
import { Category } from "../../services/todoService";

interface TaskFormProps {
  onSave: (title: string, description: string, categoryId: number) => void;
  onClose: () => void;
  categories: Category[];
}

const TaskForm: React.FC<TaskFormProps> = ({ onSave, onClose, categories }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>(categories[0]?.id || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && categoryId) {
      onSave(title, description, categoryId);
      setTitle("");
      setDescription("");
      setCategoryId(categories[0]?.id || 0);
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-gray-700">
          Title:
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-gray-700">
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"></textarea>
      </div>
      <div>
        <label htmlFor="category" className="block text-gray-700">
          Category:
        </label>
        <select
          id="category"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md">
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded-md">
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Save Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
