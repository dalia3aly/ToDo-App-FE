import React from "react";
import { Category } from "../../services/categoryService";
import AddButton from "../Button/AddButton";

interface SidebarProps {
  categories: Category[];
  onCategorySelect: (categoryId: number | null) => void;
  onAddCategory: () => void;
  isSidebarOpen: boolean;
  selectedCategory: number | null;
  onToggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  onCategorySelect,
  onAddCategory,
  isSidebarOpen,
  selectedCategory,
}) => {
  return (
    <div
      className={`fixed min-h-full inset-y-0 left-0 z-30 w-64 bg-white bg-opacity-90 shadow-md p-4 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:transform-none`}>
      <h2 className="text-lg font-bold mb-4">Categories</h2>
      <ul className="mb-4">
        <li
          onClick={() => onCategorySelect(null)}
          className={`cursor-pointer mb-2 p-2 hover:bg-gray-300 rounded ${
            selectedCategory === null ? "bg-gray-400 text-black" : ""
          }`}>
          All Categories
        </li>
        {categories.map((category) => (
          <li
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`cursor-pointer mb-2 p-2 hover:bg-gray-300 rounded ${
              selectedCategory === category.id ? "bg-gray-400 text-black" : ""
            }`}>
            {category.name}
          </li>
        ))}
      </ul>
      <AddButton
        onClick={onAddCategory}
        className=" text-black px-4 py-2 rounded">
        + Add Category
      </AddButton>
    </div>
  );
};

export default Sidebar;
