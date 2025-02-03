import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { categories } from '../components/Categories';
import { categoryProducts } from '../data/products';
import { useCart } from '../context/CartContext';

export default function CategoryPage() {
  const { categoryName } = useParams();
  const { dispatch } = useCart();
  const navigate = useNavigate();
  const category = categories.find(
    (cat) => cat.name.toLowerCase().replace(/\s+/g, '-') === categoryName
  );

  if (!category) {
    return (
      <div className="py-24 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Category not found</h1>
      </div>
    );
  }

  const Icon = category.icon;
  const products = categoryProducts[categoryName] || [];

  const handleAddToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  return (
    <div className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className={`p-3 rounded-full bg-${category.color.split('-')[1]}-50`}>
            <Icon className={`w-8 h-8 ${category.color}`} />
          </div>
          <h1 className="text-4xl font-bold">{category.name}</h1>
        </div>
        
        <p className="text-xl text-gray-600 mb-12">{category.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div 
                className="h-48 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 
                  className="font-semibold text-lg mb-2 cursor-pointer hover:text-green-600"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {product.name}
                </h3>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-green-600 font-bold">₹{product.price}</p>
                  <span className="text-sm text-gray-500">{product.weight}</span>
                </div>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Products coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
