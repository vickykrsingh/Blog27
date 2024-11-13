import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '/logo.png';

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleLogout = async () => {
    console.log('hello world')
  }

  return (
    <nav className="bg-primary">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-8" alt="Blog27 Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-secondary">
            BLOG276
          </span>
        </Link>

        <div className="flex items-center md:order-2 space-x-3 rtl:space-x-reverse">
          {/* <button
            type="button"
            onClick={toggleDropdown}
            className="flex text-sm bg-primary-light text-secondary rounded-full w-10 h-10 focus:ring-secondary-light z-20"
            aria-expanded={dropdownOpen}
          >
            <img
              className="w-10 h-10 rounded-full"
              src="/avatar.png" 
              alt="user photo"
            />
          </button> */}

          <Link to={'/sign-in'} className="button-secondary px-3 py-1 rounded-md text-sm">Get Started</Link>

          {dropdownOpen && (
            <div
              className="z-50 my-4 text-base list-none bg-primary border-2 border-gray-100 text-gray-200  divide-y divide-gray-100 rounded-lg shadow absolute right-0 md:right-24 top-4 mt-12"
            >
              <div className="px-4 py-3">
                <span className="block text-sm">Vicky Kumar</span>
                <span className="block text-sm truncate">
                  vickykrsingh27@gmail.com
                </span>
              </div>
              <ul className="py-2 text-gray-200">
                <li>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm hover:bg-secondary-light"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm hover:bg-secondary-light"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          )}

          <button
            onClick={toggleMobileMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-secondary-light focus:outline-none focus:ring-2 focus:ring-secondary-light"
            aria-controls="navbar-user"
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-primary md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-primary">
            <li>
              <Link
                to="/"
                className="block py-4 px-3 text-secondary rounded md:bg-transparent md:text-secondary md:p-0"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/stories"
                className="block py-2 px-3 text-secondary rounded md:hover:bg-transparent md:hover:text-primary-light md:p-0"
              >
                Stories
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 text-secondary rounded md:hover:bg-transparent md:hover:text-primary-light md:p-0"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 text-secondary rounded md:hover:bg-transparent md:hover:text-primary-light md:p-0"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
