import "./index.css";
import React from "react";
import TodosContainer from "./components/TodosContainer/TodosContainer";

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full">
        <TodosContainer />
      </div>
    </div>
  );
};

export default App;
