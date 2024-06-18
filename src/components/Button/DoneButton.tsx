import React from "react";
import Button from "./Button";

type DoneButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

const DoneButton: React.FC<DoneButtonProps> = ({
  onClick,
  children,
  className,
}) => {
  return (
    <Button
      onClick={onClick}
      className={` hover:bg-green-700 text-white ${className}`}>
      {children}
    </Button>
  );
};

export default DoneButton;
