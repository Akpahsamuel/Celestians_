import React, { useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { ethers } from 'ethers';

const GRID_SIZE = 100;
const PIXEL_PRICE = 0.0001; // Price in ETH per pixel

interface Pixel {
  owner: string;
  color: string;
  link: string;
  image: string;
}

interface SelectedPixel {
  x: number;
  y: number;
}

export function PixelGrid() {
  const { walletState } = useWallet();
  const [pixels, setPixels] = useState<Pixel[][]>(
    Array(GRID_SIZE).fill(null).map(() =>
      Array(GRID_SIZE).fill(null).map(() => ({
        owner: '',
        color: '#FFFFFF',
        link: '',
        image: ''
      }))
    )
  );

  const [selectedPixels, setSelectedPixels] = useState<SelectedPixel[]>([]);
  const [customColor, setCustomColor] = useState('#000000');
  const [customLink, setCustomLink] = useState('');
  const [customImage, setCustomImage] = useState('');

  const handlePixelClick = (x: number, y: number) => {
    if (!walletState.isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    const pixel = pixels[y][x];
    if (pixel.owner) {
      alert('This pixel is already owned');
      return;
    }

    const isSelected = selectedPixels.some(p => p.x === x && p.y === y);
    if (isSelected) {
      setSelectedPixels(selectedPixels.filter(p => !(p.x === x && p.y === y)));
    } else {
      setSelectedPixels([...selectedPixels, { x, y }]);
    }
  };

  const handlePurchase = async () => {
    if (!walletState.isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (selectedPixels.length === 0) {
      alert('Please select at least one pixel');
      return;
    }

    const totalPrice = selectedPixels.length * PIXEL_PRICE;
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Create transaction
      const tx = await signer.sendTransaction({
        to: walletState.address, // This should be the contract address in production
        value: ethers.parseEther(totalPrice.toString())
      });

      // Wait for transaction to be mined
      await tx.wait();

      // Update pixels
      const newPixels = [...pixels];
      selectedPixels.forEach(({ x, y }) => {
        newPixels[y][x] = {
          owner: walletState.address!,
          color: customColor,
          link: customLink,
          image: customImage
        };
      });

      setPixels(newPixels);
      setSelectedPixels([]);
      
      alert('Purchase successful!');
    } catch (error) {
      console.error('Purchase error:', error);
      alert('Failed to purchase pixels. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gap: '1px',
          backgroundColor: '#ddd',
          padding: '1px'
        }}>
          {pixels.map((row, y) =>
            row.map((pixel, x) => {
              const isSelected = selectedPixels.some(p => p.x === x && p.y === y);
              return (
                <div
                  key={`${x}-${y}`}
                  className={`w-2 h-2 cursor-pointer transition-all duration-200 ${
                    isSelected ? 'ring-2 ring-blue-500 ring-offset-1' : 'hover:opacity-75'
                  }`}
                  style={{ 
                    backgroundColor: isSelected ? customColor : pixel.color,
                    transform: isSelected ? 'scale(1.2)' : 'scale(1)'
                  }}
                  onClick={() => handlePixelClick(x, y)}
                  title={pixel.owner ? `Owned by: ${pixel.owner}` : 'Available'}
                />
              );
            })
          )}
        </div>
      </div>

      {selectedPixels.length > 0 && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-lg w-full max-w-md">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Color</label>
              <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="mt-1 block w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Link URL</label>
              <input
                type="url"
                value={customLink}
                onChange={(e) => setCustomLink(e.target.value)}
                placeholder="https://example.com"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="url"
                value={customImage}
                onChange={(e) => setCustomImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600">
                  Selected: {selectedPixels.length} pixels
                </span>
                <span className="text-sm font-medium">
                  Total: {(selectedPixels.length * PIXEL_PRICE).toFixed(4)} ETH
                </span>
              </div>

              <button
                onClick={handlePurchase}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Purchase Pixels
              </button>
            </div>
          </div>
        </div>
      )}

      {!selectedPixels.length && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Price per pixel: {PIXEL_PRICE} ETH
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Select pixels to purchase and customize
          </p>
        </div>
      )}
    </div>
  );
}