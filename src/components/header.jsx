"use client";

import React, { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <div className="text-3xl font-extrabold text-red-800 tracking-wide select-none">
            GlucoMate
          </div>

          {/* Desktop Menu */}
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

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden p-2 rounded-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-44 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md hover:bg-red-200"
          >
            <svg
              className="w-6 h-6 text-red-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <ul className="flex flex-col mt-4 space-y-6 px-6 text-gray-700 font-medium">
          <li>
            <a href="/signuppage" onClick={() => setIsOpen(false)} className="hover:text-red-800 transition-colors duration-300">
              Sign Up
            </a>
          </li>
          <li>
            <a href="/login" onClick={() => setIsOpen(false)} className="hover:text-red-800 transition-colors duration-300">
              Log In
            </a>
          </li>
          <li>
            <a href="/accountpage" onClick={() => setIsOpen(false)} className="hover:text-red-800 transition-colors duration-300">
              Account
            </a>
          </li>
          <li>
            <a href="/chatbot" onClick={() => setIsOpen(false)} className="hover:text-red-800 transition-colors duration-300">
              ChatBot
            </a>
          </li>
        </ul>
      </div>

      {/* Optional overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
