import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react';
import { categoryProducts } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = Object.values(categoryProducts)
    .flat()
    .find(p => p.id === Number(productId));

  if (!product) {
    return (
      <div className="py-24 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
  };

  return (
    <div className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="aspect-square overflow-hidden rounded-lg shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-3xl text-green-600 font-bold mb-4">₹{product.price}</p>
              <p className="text-gray-600 text-lg mb-2">Weight: {product.weight}</p>
            </div>
            
            <div className="border-t border-b py-6">
              <h2 className="text-xl font-semibold mb-4">Product Description</h2>
              <p className="text-gray-600 leading-relaxed">
                Our {product.name} is carefully selected from local farms to ensure the highest quality.
                Each product undergoes strict quality control to maintain freshness and nutritional value.
                Perfect for your daily cooking needs and healthy lifestyle.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-lg font-medium">Quantity:</span>
                <div className="flex items-center gap-4 border rounded-lg p-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-12 text-center text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 flex items-center justify-center gap-3 text-lg font-medium"
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Product Features:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>100% Organic</li>
                <li>Locally Sourced</li>
                <li>Farm Fresh</li>
                <li>Quality Guaranteed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
