import React from "react";

const Header = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="text-3xl font-extrabold text-red-800 tracking-wide select-none">
          GlucoMate
        </div>
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li>
            <a href="/signuppage" className="hover:text-red-800 transition-colors duration-300">
              Sign Up
            </a>
          </li>
          <li>
            <a href="/login" className="hover:text-red-800 transition-colors duration-300">
              Log In
            </a>
          </li>
          <li>
            <a href="/accountpage" className="hover:text-red-800 transition-colors duration-300">
              Account
            </a>
          </li>
          <li>
            <a href="/chatbot" className="hover:text-red-800 transition-colors duration-300">
              ChatBot
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
