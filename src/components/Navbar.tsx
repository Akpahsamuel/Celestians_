import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Plus, Home, HelpCircle, Layout } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Navbar() {
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
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                <Home className="h-4 w-4 mr-1" />
                Home
              </Link>
              <Link to="/create" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                <Plus className="h-4 w-4 mr-1" />
                Create Page
              </Link>
              <Link to="/browse" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                <BookOpen className="h-4 w-4 mr-1" />
                Browse Pages
              </Link>
              <Link to="/faq" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
                <HelpCircle className="h-4 w-4 mr-1" />
                FAQ
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}