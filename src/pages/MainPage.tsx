import React, { useEffect, useState, useRef } from "react";
import TodosContainer from "../components/TodosContainer/TodosContainer";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import categoryService, {
  Category,
  CreateCategoryDTO,
} from "../services/categoryService";
import Modal from "../components/Modal/Modal";
import CategoryForm from "../components/CategoryForm/CategoryForm";

const MainPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    categoryService
      .findAllCategories()
      .then((data) => setCategories(data))
      .catch((e) => console.error(e));
  }, []);

  const handleCreateCategory = (name: string) => {
    const newCategory: CreateCategoryDTO = { name };
    categoryService
      .createCategory(newCategory)
      .then((createdCategory) => {
        setCategories([...categories, createdCategory]);
        setIsModalOpen(false);
      })
      .catch((e) => console.error(e));
  };

  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setIsSidebarOpen(false);
  };

  const handleAddCategory = () => {
    setIsModalOpen(true);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: 'url("/todo_bg.png")' }}>
      <Navbar onToggleSidebar={toggleSidebar} />
      <div ref={sidebarRef} className="relative">
        <Sidebar
          categories={categories}
          onCategorySelect={handleCategorySelect}
          onAddCategory={handleAddCategory}
          isSidebarOpen={isSidebarOpen}
          selectedCategory={selectedCategory}
          onToggleSidebar={toggleSidebar}
        />
      </div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-3xl w-60% p-4">
          <TodosContainer selectedCategory={selectedCategory} />
        </div>
      </div>
      <div className="min-h-screen right-0 p-4">
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <CategoryForm
            onSave={handleCreateCategory}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default MainPage;
