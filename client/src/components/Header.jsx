import React, { useState } from 'react';
import { Menu, X, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <header className="bg-gray-900 text-gray-200 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <CheckSquare className="h-8 w-8 text-green-400 mr-2" />
              <span className="text-xl font-bold text-gray-100">Todo App</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-green-400">Home</Link>
            <Link to="/todos" className="hover:text-green-400">Todos</Link>
            <Link to="/profile" className="hover:text-green-400">Profile</Link>
          </nav>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-200 hover:text-green-400">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:bg-gray-700 hover:text-green-400">
            Home
          </Link>
          <Link to="/todos" className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:bg-gray-700 hover:text-green-400">
            Todos
          </Link>
          <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:bg-gray-700 hover:text-green-400">
            Profile
          </Link>
        </div>
      </div>
    </header>
  );
}
