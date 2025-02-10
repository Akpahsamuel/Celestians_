import React, { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';

interface Page {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
  owner: string;
  price: number;
  createdAt: string;
}

// Mock data for demonstration
const mockPages: Page[] = [
  {
    id: '1',
    title: 'Crypto Exchange',
    description: 'Leading cryptocurrency exchange platform',
    imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=600',
    websiteUrl: 'https://example.com',
    owner: '0x1234...5678',
    price: 0.001,
    createdAt: '2024-03-15'
  },
  {
    id: '2',
    title: 'NFT Marketplace',
    description: 'Discover unique digital collectibles',
    imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600',
    websiteUrl: 'https://example.com',
    owner: '0x9876...4321',
    price: 0.002,
    createdAt: '2024-03-14'
  },
  // Add more mock pages as needed
];

export function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'price'>('date');

  const filteredPages = mockPages
    .filter(page => 
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return b.price - a.price;
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Pages</h1>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search pages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="sm:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'price')}
                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="date">Sort by Date</option>
                <option value="price">Sort by Price</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPages.map(page => (
            <div key={page.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={page.imageUrl}
                alt={page.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{page.title}</h2>
                <p className="text-gray-600 mb-4">{page.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Owner: {page.owner}</span>
                  <span>{page.price} ETH</span>
                </div>
                
                <a
                  href={page.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700"
                >
                  Visit Site
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredPages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No pages found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}