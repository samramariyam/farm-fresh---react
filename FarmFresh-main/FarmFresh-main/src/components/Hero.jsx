import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative h-[600px] flex items-center justify-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Fresh from Farm to Table
        </h1>
        <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
          Discover nature's finest selection of organic produce, delivered fresh to your doorstep
        </p>
        <button
          onClick={() => navigate('/products')}
          className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}
