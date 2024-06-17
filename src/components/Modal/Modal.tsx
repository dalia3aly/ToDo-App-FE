import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-lg">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-xl font-bold text-gray-800">
            ×
          </button>
        </div>
        <h2 className="text-2xl font-semibold flex items-center justify-center text-gray-800">
          Add a Task
        </h2>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
