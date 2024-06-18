import React from "react";
import Button from "../Button/Button";

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  return (
    <nav className=" text-black p-4 flex justify-between items-center lg:hidden">
      <h1 className="text-xl">
        <img src="/icon.png" alt="Icon" className="mr-2" />
      </h1>
      <Button
        onClick={onToggleSidebar}
        className=" hover:bg-gray-300 rounded bg-yellow-500">
        View Categories
      </Button>
    </nav>
  );
};

export default Navbar;
