// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className=" bg-gray-50">
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <img
                src="https://public.readdy.ai/ai/img_res/c1730b8ef3bddec8b7c827d4c4d4932c.jpg"
                alt="Company Logo"
                className="h-8 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1 px-8">
              <div className="flex space-x-8">
                {[
                  "Home",
                  "Products",
                  "Solutions",
                  "Resources",
                  "About Us",
                  "Contact",
                ].map((item) => (
                  <Link
                    key={item}
                    to={`/${item}`}
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium !rounded-button cursor-pointer whitespace-nowrap transition-colors duration-200"
                  >
                   {item} 
                  </Link>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200"
                />
                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              </form>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              {/* <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 p-2 !rounded-button cursor-pointer whitespace-nowrap border"
                aria-label="Toggle menu"
              >
                <i
                  className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-xl`}
                ></i>
              </button> */}

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 p-2 !rounded-button cursor-pointer whitespace-nowrap"
                aria-label="Toggle menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[
                "Home",
                "Products",
                "Solutions",
                "Resources",
                "About Us",
                "Contact",
              ].map((item) => (
                <button
                  key={item}
                  className="cursor-pointer block w-full text-left text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 text-base font-medium !rounded-button cursor-pointer whitespace-nowrap"
                >
                <Linkink> {item} </Linkink>  
                </button>
              ))}
              <form onSubmit={handleSearch} className="px-3 py-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-200"
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                </div>
              </form>
            </div>
          </div>
        )}
      </nav>
     
    </div>
  );
};

export default Navbar;
