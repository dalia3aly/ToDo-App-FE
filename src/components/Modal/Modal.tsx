import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-orange-100 p-6 rounded-lg shadow-lg max-w-lg sm:w-4/5 md:w-4/5 lg:w-1/2 xl:w-1/3">
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
