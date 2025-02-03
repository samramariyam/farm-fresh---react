import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Organic Vegetables Bundle',
    price: 499,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3',
    weight: '2 kg',
  },
  {
    id: 2,
    name: 'Fresh Fruits Package',
    price: 599,
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3',
    weight: '2 kg',
  },
  {
    id: 3,
    name: 'Farm Fresh Eggs',
    price: 89,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-4.0.3',
    weight: '6 pcs',
  },
  {
    id: 4,
    name: 'Organic Honey',
    price: 299,
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    weight: '500g',
  },
];

export default function FeaturedProducts() {
  const { dispatch } = useCart();

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-green-600 font-bold">₹{product.price}</p>
              <button
                onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
