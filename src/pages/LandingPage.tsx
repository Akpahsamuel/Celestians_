import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Define pixel grid size
const GRID_SIZE = 100; // 100x100 grid
const PIXEL_SIZE = 10; // 10px per cell
const TOTAL_PIXELS = GRID_SIZE * GRID_SIZE;

// Mock data for demonstration
const mockPixels = Array.from({ length: TOTAL_PIXELS }, (_, index) => ({
  id: index,
  owner: Math.random() > 0.8 ? '0x1234...5678' : null,
  color: Math.random() > 0.8 ? `#${Math.floor(Math.random()*16777215).toString(16)}` : '#f0f0f0',
  price: 0.001, // Price per pixel in ETH
}));

export function LandingPage() {
  const [hoveredPixel, setHoveredPixel] = useState<number | null>(null);
  const [selectedPixels, setSelectedPixels] = useState<number[]>([]);

  const handlePixelClick = (index: number) => {
    if (!mockPixels[index].owner) {
      setSelectedPixels(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            The Blockchain Pixel Grid
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            Own a piece of blockchain history! Each pixel is an NFT.
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <div className="bg-gray-800 rounded-lg px-4 py-2">
              <p className="text-gray-400">Price per pixel</p>
              <p className="text-white font-bold">0.001 ETH</p>
            </div>
            <div className="bg-gray-800 rounded-lg px-4 py-2">
              <p className="text-gray-400">Available pixels</p>
              <p className="text-white font-bold">
                {mockPixels.filter(p => !p.owner).length} / {TOTAL_PIXELS}
              </p>
            </div>
          </div>
        </div>

        {/* Pixel Grid */}
        <div className="bg-white rounded-lg p-4 shadow-xl overflow-auto">
          <div 
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, ${PIXEL_SIZE}px)`,
              gap: '1px',
              background: '#ddd',
              width: 'fit-content',
              margin: '0 auto'
            }}
          >
            {mockPixels.map((pixel, index) => (
              <motion.div
                key={pixel.id}
                className="cursor-pointer relative"
                style={{
                  width: PIXEL_SIZE,
                  height: PIXEL_SIZE,
                  backgroundColor: selectedPixels.includes(index) 
                    ? '#4CAF50' 
                    : pixel.color,
                }}
                whileHover={{ scale: 1.2, zIndex: 10 }}
                onHoverStart={() => setHoveredPixel(index)}
                onHoverEnd={() => setHoveredPixel(null)}
                onClick={() => handlePixelClick(index)}
              >
                {hoveredPixel === index && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-nowrap bg-gray-900 text-white text-xs py-1 px-2 rounded">
                    {pixel.owner ? `Owned by ${pixel.owner}` : 'Available!'}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Selection Info */}
        {selectedPixels.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-lg p-4 shadow-lg"
          >
            <div className="text-center">
              <p className="text-white mb-2">
                Selected: {selectedPixels.length} pixels
              </p>
              <p className="text-gray-400 mb-4">
                Total: {(selectedPixels.length * 0.001).toFixed(3)} ETH
              </p>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => {
                  // Handle purchase
                  console.log('Purchasing pixels:', selectedPixels);
                }}
              >
                Purchase Selected Pixels
              </button>
            </div>
          </motion.div>
        )}

        {/* Instructions */}
        <div className="mt-8 text-center text-gray-400">
          <p>Click on available pixels to select them for purchase.</p>
          <p>Hover over pixels to see ownership information.</p>
        </div>
      </div>
    </div>
  );
} 