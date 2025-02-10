import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Plus, Home, HelpCircle, Layout, Menu, X } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/create', icon: Plus, label: 'Create Page' },
    { path: '/browse', icon: BookOpen, label: 'Browse Pages' },
    { path: '/faq', icon: HelpCircle, label: 'FAQ' },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Layout className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">PageChain</span>
            </Link>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.map(({ path, icon: Icon, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                    isActivePath(path)
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-1" />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <div className="hidden sm:block">
              <ConnectButton />
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center px-4 py-2 text-sm font-medium ${
                  isActivePath(path)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 px-4">
            <ConnectButton />
          </div>
        </div>
      )}
    </nav>
  );
}