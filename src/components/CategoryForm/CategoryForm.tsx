import React, { useState } from "react";

interface CategoryFormProps {
  onSave: (name: string) => void;
  onClose: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onSave, onClose }) => {
  const [name, setName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name);
      setName("");
      onClose();
    }
  };

  return (
    <div>
        {/* <h2 className="text-2xl font-semibold m-2 flex items-center justify-center text-gray-800">
            Add a Category
        </h2> */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Category Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          />
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
            Save Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
