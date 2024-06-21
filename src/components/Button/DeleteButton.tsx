import React from "react";
import Button from "./Button";

type DeleteButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({
  onClick,
  children,
  className,
}) => {
  return (
    <Button
      onClick={onClick}
      className={`bg-red-700 hover:bg-red-500 text-white ${className}`}>
      {children}
    </Button>
  );
};

export default DeleteButton;
