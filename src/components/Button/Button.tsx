import React from "react";

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({ onClick, children, className, type }) => {
  return (
    <button
      className={`px-4 py-2 rounded ${className}`}
      onClick={onClick}
      type={type}>
      {children}
    </button>
  );
};

export default Button;
