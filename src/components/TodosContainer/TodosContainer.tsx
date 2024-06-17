import React, { useEffect, useState } from "react";
import AllTodos from "../AllTodos/AllTodos";
import todoService, { Todo, Category } from "../../services/todoService";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import TaskForm from "../../components/TaskForm/TaskForm";

const TodosContainer: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    todoService
      .findAllTodos()
      .then((data) => setTodos(data))
      .catch((e) => console.error(e));

    todoService
      .findAllCategories()
      .then((data) => setCategories(data))
      .catch((e) => console.error(e));
  }, []);

  const handleCreate = (
    title: string,
    description: string,
    categoryId: number
  ) => {
    const newTodo = { title, description, completed: false, categoryId };
    todoService
      .createTodo(newTodo)
      .then((createdTodo) => {
        setTodos([...todos, createdTodo]);
      })
      .catch((e) => console.error(e));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    if (selectedCategory) return todo.category.id === selectedCategory;
    return true;
  });

  return (
    <div className="todo-container">
      <div className="header">
        <div className="filters flex justify-between items-center mb-4">
          <select
            className="mr-2"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
          <select
            className="mr-2"
            onChange={(e) => setSelectedCategory(Number(e.target.value))}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <AllTodos todos={filteredTodos} setTodos={setTodos} filter={filter} />
      <Button
        className="mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Add Task
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskForm
          onSave={handleCreate}
          onClose={() => setIsModalOpen(false)}
          categories={categories}
        />
      </Modal>
    </div>
  );
};

export default TodosContainer;
