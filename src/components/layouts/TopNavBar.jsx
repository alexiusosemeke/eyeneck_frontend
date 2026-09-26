import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/useAuth";
import {Link} from 'react-router-dom';

const TopNavBar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking anywhere outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    if (logout) logout();
  };

  return (
      <header className="w-full sticky top-0 z-40 bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline flex justify-between items-center px-6 md:px-margin-desktop py-4 md:ml-64 md:w-[calc(100%-16rem)]">
        <div className="flex items-center space-x-4">
        <span className="font-headline-md text-headline-md text-primary dark:text-primary-fixed tracking-tight md:hidden">
          eyeneck
        </span>
          <div className="hidden md:flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant">
          <span className="material-symbols-outlined text-on-surface-variant mr-2">
            search
          </span>
            <input
                className="bg-transparent border-none focus:ring-0 text-body-md font-body-md w-64 focus:outline-none"
                placeholder="Search elections, units..."
                type="text"
            />
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex space-x-4">
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:bg-surface-container-low p-2 rounded-full transition-colors">
            notifications
          </span>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:bg-surface-container-low p-2 rounded-full transition-colors">
            help
          </span>
          </div>

          {/* Profile Dropdown Container */}
          <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center space-x-3 cursor-pointer group focus:outline-none"
                aria-expanded={isOpen}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary group-hover:border-primary-container transition-colors">
                <img
                    className="w-full h-full object-cover"
                    alt={user?.first_name ? `${user.first_name}'s profile picture` : 'User profile picture'}
                    src={user?.profile?.profile_image ?? '/avatar.png'}
                />
              </div>
              <div className="hidden sm:block text-left">
                <p className="font-label-lg text-label-lg font-bold text-primary">
                  {user?.first_name || 'User'}
                </p>
                <p className="text-[10px] text-on-surface-variant tracking-wider uppercase">
                  {user?.username}
                </p>
              </div>
              <span
                  className={`material-symbols-outlined text-on-surface-variant text-sm transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                  }`}
              >
              expand_more
            </span>
            </button>

            {/* Menu Options */}
            {isOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-surface dark:bg-surface-dim border border-outline-variant rounded-xl shadow-lg py-1.5 z-50">
                  <Link
                      href="/settings"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center px-4 py-2.5 text-sm font-medium text-on-surface hover:bg-surface-container-low transition-colors"
                  >
                <span className="material-symbols-outlined text-on-surface-variant mr-3 text-xl">
                  settings
                </span>
                    Settings
                  </Link>

                  <div className="my-1 border-t border-outline-variant" />

                  <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2.5 text-sm font-medium text-error hover:bg-error-container/20 transition-colors"
                  >
                <span className="material-symbols-outlined text-error mr-3 text-xl">
                  logout
                </span>
                    Logout
                  </button>
                </div>
            )}
          </div>
        </div>
      </header>
  );
};

export default TopNavBar;