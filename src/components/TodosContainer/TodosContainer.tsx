import React, { useEffect, useState } from "react";
import AllTodos from "../AllTodos/AllTodos";
import todoService, { Todo } from "../../services/todoService";
import Modal from "../../components/Modal/Modal";
import AddButton from "../../components/Button/AddButton";
import TaskForm from "../../components/TaskForm/TaskForm";
import categoryService, { Category } from "../../services/categoryService";

interface TodosContainerProps {
  selectedCategory: number | null;
}

const TodosContainer: React.FC<TodosContainerProps> = ({
  selectedCategory,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    todoService
      .findAllTodos()
      .then((data) => setTodos(data))
      .catch((e) => console.error(e));

    categoryService
      .findAllCategories()
      .then((data) => setCategories(data))
      .catch((e) => console.error(e));
  }, []);

  const filteredTodos = todos.filter((todo) => {
    const matchesCategory = selectedCategory
      ? todo.category.id === selectedCategory
      : true;
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "completed"
        ? todo.completed
        : !todo.completed;
    return matchesCategory && matchesFilter;
  });

  return (
    <div className="todo-container">
      <AddButton className="mb-4" onClick={() => setIsModalOpen(true)}>
        Add Task
      </AddButton>
      <div className="header">
        <div className="filters flex justify-between items-center mb-4">
          <select className="mr-2" onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
      </div>
      <AllTodos todos={filteredTodos} setTodos={setTodos} filter={filter} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskForm
          onSave={(title, description, categoryId) => {
            todoService
              .createTodo({ title, description, completed: false, categoryId })
              .then((newTodo) => setTodos([...todos, newTodo]))
              .catch((e) => console.error(e));
          }}
          onClose={() => setIsModalOpen(false)}
          categories={categories}
        />
      </Modal>
    </div>
  );
};

export default TodosContainer;
