import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const products = [
  {
    id: 1,
    name: 'Organic Vegetables Bundle',
    price: 499,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3',
    category: 'Vegetables',
    weight: '2 kg'
  },
  {
    id: 2,
    name: 'Fresh Fruits Package',
    price: 599,
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3',
    category: 'Fruits',
    weight: '2 kg'
  },
  {
    id: 3,
    name: 'Farm Fresh Eggs',
    price: 89,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-4.0.3',
    category: 'Eggs',
    weight: '6 pcs'
  },
  {
    id: 4,
    name: 'Organic Honey',
    price: 299,
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    category: 'Other',
    weight: '500g'
  },
  {
    id: 5,
    name: 'Fresh Milk',
    price: 62,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3',
    category: 'Dairy',
    weight: '1 L'
  },
  {
    id: 6,
    name: 'Organic Beef',
    price: 399,
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3',
    category: 'Meat',
    weight: '500g'
  },
];

export default function ProductsPage() {
  const navigate = useNavigate();
  const { dispatch } = useCart();

  const handleAddToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  return (
    <div className="py-24 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">All Products</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div 
              className="h-64 overflow-hidden cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 
                    className="font-semibold text-xl mb-1 cursor-pointer hover:text-green-600"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {product.name}
                  </h3>
                  <span className="text-sm text-gray-500">{product.category}</span>
                </div>
                <span className="text-green-600 font-bold text-xl">₹{product.price}</span>
              </div>
              <button 
                onClick={() => handleAddToCart(product)}
                className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
