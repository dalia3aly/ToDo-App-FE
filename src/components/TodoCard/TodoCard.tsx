import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import EditableField from "../EditableField/EditableField";
import DoneButton from "../Button/DoneButton";
import DeleteButton from "../Button/DeleteButton";
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
    <div className="w-full max-w-xl p-4 bg-white bg-opacity-80 shadow-md rounded-lg mb-4">
      <div className="text-md font-semibold break-words">
        <EditableField value={todo.title} onSubmit={handleUpdateTitle} />
      </div>
      <div className="text-lg break-words">
        <EditableField
          value={todo.description}
          onSubmit={handleUpdateDescription}
        />
      </div>
      <h4 className="text-md text-gray-800 break-words">
        Category: {todo.category.name}
      </h4>
      <h4 className="text-sm text-gray-500">
        Created {dayjs(todo.createdAt).fromNow()}
      </h4>
      <div className="flex justify-between mt-4">
        <DoneButton
          className={`px-4 py-2 rounded ${
            todo.completed ? "bg-green-500" : "bg-gray-500 opacity-60"
          } text-white`}
          onClick={handleToggleComplete}>
          {todo.completed ? "✓ Done" : "Done"}
        </DoneButton>
        <DeleteButton
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={handleDelete}>
          Delete
        </DeleteButton>
      </div>
    </div>
  );
};

export default TodoCard;
