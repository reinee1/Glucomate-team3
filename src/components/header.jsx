"use client";

import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { User, Edit, LogOut, MessageCircle } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { user, isAuthenticated, logout } = useUser();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getUserInitials = () => {
    if (!user) return 'U';
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <Link to="/" className="text-3xl font-extrabold text-red-800 tracking-wide select-none">
            GlucoMate
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-gray-700 font-medium items-center">
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/chatbot" className="hover:text-red-800 transition-colors duration-300 flex items-center">
                    <MessageCircle size={18} className="mr-1" />
                    ChatBot
                  </Link>
                </li>
                <li className="relative" ref={dropdownRef}>
                  <button 
                    className="flex items-center justify-center w-10 h-10 bg-red-700 text-white rounded-full hover:bg-red-800 transition-colors duration-300"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    {getUserInitials()}
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <Link
                        to="/accountpage"
                        className="block w-full text-left px-4 py-3 flex items-center text-gray-800 hover:bg-gray-100 transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        <User size={18} className="mr-2" />
                        View Profile
                      </Link>
                      <button
                        className="w-full text-left px-4 py-3 flex items-center text-red-600 hover:bg-gray-100 transition-colors"
                        onClick={() => {
                          setShowLogoutConfirm(true);
                          setShowDropdown(false);
                        }}
                      >
                        <LogOut size={18} className="mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signuppage" className="hover:text-red-800 transition-colors duration-300">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-red-800 transition-colors duration-300">
                    Log In
                  </Link>
                </li>
                <li>
                  <Link to="/chatbot" className="hover:text-red-800 transition-colors duration-300 flex items-center">
                    <MessageCircle size={18} className="mr-1" />
                    ChatBot
                  </Link>
                </li>
              </>
            )}
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
          {isAuthenticated ? (
            <>
              <li>
                <Link 
                  to="/chatbot" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 hover:text-red-800 transition-colors duration-300"
                >
                  <MessageCircle size={18} />
                  ChatBot
                </Link>
              </li>
              <li>
                <Link 
                  to="/accountpage" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 hover:text-red-800 transition-colors duration-300"
                >
                  <User size={18} />
                  View Profile
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setShowLogoutConfirm(true);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 hover:text-red-800 transition-colors duration-300"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signuppage" onClick={() => setIsOpen(false)} className="hover:text-red-800 transition-colors duration-300">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={() => setIsOpen(false)} className="hover:text-red-800 transition-colors duration-300">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/chatbot" onClick={() => setIsOpen(false)} className="hover:text-red-800 transition-colors duration-300">
                  ChatBot
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Optional overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-xl font-bold text-red-700 mb-4">Confirm Logout</h3>
            <p className="mb-6">Are you sure you want to logout?</p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-700 text-white font-bold py-2 rounded-md hover:bg-red-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;