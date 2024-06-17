import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import EditableField from "../EditableField/EditableField";
dayjs.extend(relativeTime);

interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

interface TodoCardProps {
  todo: Todo;
  onDelete: (id: number) => Promise<void>;
  onUpdate: (id: number, data: Partial<Todo>) => Promise<void>;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onDelete, onUpdate }) => {
  const handleToggleComplete = () => {
    onUpdate(todo.id, { completed: !todo.completed });
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleUpdateTitle = async (newTitle: string) => {
    await onUpdate(todo.id, { title: newTitle });
  };

  const handleUpdateDescription = async (newDescription: string) => {
    await onUpdate(todo.id, { description: newDescription });
  };

  return (
    <div className="p-4 bg-beige shadow-md rounded-lg mb-4">
      <EditableField value={todo.title} onSubmit={handleUpdateTitle} />
      <EditableField
        value={todo.description}
        onSubmit={handleUpdateDescription}
      />
      <h4 className="text-sm text-gray-600">Category: {todo.category.name}</h4>
      <h4 className="text-sm text-gray-600">
        Posted {dayjs(todo.createdAt).fromNow()}
      </h4>
      <div className="flex justify-between mt-4">
        <button
          className={`px-4 py-2 rounded ${
            todo.completed ? "bg-green-500" : "bg-gray-500"
          } text-white`}
          onClick={handleToggleComplete}>
          {todo.completed ? "Mark as Incomplete" : "Mark as Complete"}
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
