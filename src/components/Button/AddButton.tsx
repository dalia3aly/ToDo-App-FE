import React from "react";

interface AddButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const AddButton: React.FC<AddButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={`px-4 py-2 bg-yellow-500 hover:bg-green-500 rounded text-black ${className}`}
      {...props}>
      {children}
    </button>
  );
};

export default AddButton;