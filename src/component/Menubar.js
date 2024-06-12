// Navbar and sidebar
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { HiOutlineBars3 } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";
import { menuList } from "../constant";

export const Menubar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the mobile menu open/close
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">My App</div>
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8">
          {menuList?.map(({ title, path }) => {
            return (
              <Link key={title} to={path} className="text-white hover:text-gray-200 transition duration-300">
                {title}
              </Link>
            );
          })}
        </div>

        {/* Mobile menu toggle button */}
        <button className="md:hidden text-white focus:outline-none" onClick={toggleMenu}>
          {!isOpen && <HiOutlineBars3 size={24} />}
        </button>
      </div>

      {/* Overlay for mobile menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 ${
          isOpen ? "block" : "hidden"
        } transition-opacity duration-300 md:hidden`}
        onClick={toggleMenu}
      ></div>

      {/* Mobile menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-700 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-50`}
      >
        <div className="p-4">
          <div className="text-white text-xl font-bold mb-8">My App</div>
          <div className="mt-4">
            {menuList?.map(({ title, path }) => {
              return (
                <Link
                  key={title}
                  to={path}
                  className="block text-white py-2 px-4 border-b border-blue-600 hover:bg-blue-800 transition duration-300"
                  onClick={toggleMenu}
                >
                  {title}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Close button for mobile menu */}
        <button className="absolute top-4 right-4 text-white focus:outline-none" onClick={toggleMenu}>
          <AiOutlineClose size={24} />
        </button>
      </div>
    </nav>
  );
};
