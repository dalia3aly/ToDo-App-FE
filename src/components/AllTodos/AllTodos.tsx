import React, { useEffect, useState } from "react";
import TodoCard from "../../components/TodoCard/TodoCard";
import todoService, { Todo } from "../../services/todoService";

interface AllTodosProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: string;
}

const AllTodos: React.FC<AllTodosProps> = ({ todos, setTodos, filter }) => {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    let sortedTodos = [...todos].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    let filtered: Todo[] = [];
    if (filter === "completed") {
      filtered = sortedTodos.filter((todo) => todo.completed);
    } else if (filter === "incomplete") {
      filtered = sortedTodos.filter((todo) => !todo.completed);
    } else {
      filtered = sortedTodos;
    }
    setFilteredTodos(filtered);
  }, [todos, filter]);

  const handleDelete = async (id: number) => {
    try {
      const response = await todoService.deleteTodoById(id);
      if (response.ok) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      } else {
        console.error("Failed to delete todo:", response.statusText);
      }
    } catch (e) {
      console.error("Error deleting todo:", e);
    }
  };

  const handleUpdate = async (id: number, data: Partial<Todo>) => {
    try {
      const updatedTodo = await todoService.updateTodoById(id, data);
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default AllTodos;
