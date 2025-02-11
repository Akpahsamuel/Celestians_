import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Plus, Home, HelpCircle, Layout, Menu, X } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Detect scroll position
      setIsScrolled(window.scrollY > 5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <>
      <div className="h-16"></div>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
          ${isScrolled 
            ? 'bg-white/50 backdrop-blur-xl shadow-lg' 
            : 'bg-white'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link 
                to="/" 
                className="flex items-center group"
              >
                <Layout className="h-8 w-8 text-blue-600 transition-transform duration-200 group-hover:scale-110" />
                <span className="ml-2 text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  PageChain
                </span>
              </Link>
              
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navLinks.map(({ path, icon: Icon, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`inline-flex items-center px-3 pt-1 text-sm font-medium
                      relative group transition-all duration-200
                      ${isActivePath(path)
                        ? 'text-blue-600'
                        : 'text-gray-500 hover:text-blue-600'
                      }`}
                  >
                    <Icon className={`h-4 w-4 mr-1.5 transition-all duration-200 
                      ${isActivePath(path)
                        ? 'text-blue-600'
                        : 'text-gray-400 group-hover:text-blue-600'
                      }`} 
                    />
                    {label}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 
                      transform transition-all duration-200 
                      ${isActivePath(path)
                        ? 'bg-blue-600'
                        : 'bg-transparent group-hover:bg-blue-600/40'
                      }`} 
                    />
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:block hover:opacity-90 transition-opacity duration-200">
                <ConnectButton />
              </div>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="sm:hidden p-2 rounded-md text-gray-500 hover:text-blue-600 
                  hover:bg-blue-50 transition-all duration-200"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={`sm:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className={`${
            isScrolled 
              ? 'bg-white/50 backdrop-blur-xl' 
              : 'bg-white'
          } border-t border-gray-100`}>
            <div className="space-y-1 px-4 pb-3 pt-2">
              {navLinks.map(({ path, icon: Icon, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg
                    transition-all duration-200
                    ${isActivePath(path)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-500 hover:bg-blue-50/50 hover:text-blue-600'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className={`h-4 w-4 mr-2 ${
                    isActivePath(path) ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  {label}
                </Link>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-gray-100">
              <ConnectButton />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}