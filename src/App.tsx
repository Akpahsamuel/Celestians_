import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { CreatePage } from './pages/CreatePage';
import { BrowsePage } from './pages/BrowsePage';
import { Layout, ArrowRight } from 'lucide-react';
import { Web3Provider } from './providers/Web3Provider';
import { PixelGrid } from './components/PixelGrid';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <Layout className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">The Million Dollar</span>
            <span className="block text-blue-600">Homepage</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Own a piece of internet history. Purchase pixels, customize them, and leave your mark on the blockchain forever.
          </p>
          
          <div className="mt-10 flex justify-center gap-x-6">
            <a href="#grid" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Buy Pixels
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>

        <div id="grid" className="mt-16">
          <PixelGrid />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Web3Provider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </div>
      </Router>
    </Web3Provider>
  );
}

export default App