import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, Smartphone, Truck } from 'lucide-react';

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentDetails, setPaymentDetails] = useState({
    card: { number: '', name: '', expiry: '', cvv: '' },
    upi: { id: '' },
  });
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    pincode: '',
    phone: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      dispatch({ type: 'CLEAR_CART' });
      navigate('/');
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentDetailsChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('card.')) {
      setPaymentDetails({
        ...paymentDetails,
        card: {
          ...paymentDetails.card,
          [name.split('.')[1]]: value,
        },
      });
    } else if (name.startsWith('upi.')) {
      setPaymentDetails({
        ...paymentDetails,
        upi: {
          ...paymentDetails.upi,
          [name.split('.')[1]]: value,
        },
      });
    }
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-4">Thank you for shopping with FarmFresh.</p>
          <p className="text-sm text-gray-500">Redirecting to homepage...</p>
        </div>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="py-24 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <button
          onClick={() => navigate('/')}
          className="text-green-600 hover:text-green-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`flex-1 p-4 rounded-lg border ${paymentMethod === 'card' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                  >
                    <CreditCard className="w-6 h-6 mx-auto mb-2" />
                    <span className="block text-sm">Card</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex-1 p-4 rounded-lg border ${paymentMethod === 'upi' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                  >
                    <Smartphone className="w-6 h-6 mx-auto mb-2" />
                    <span className="block text-sm">UPI</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex-1 p-4 rounded-lg border ${paymentMethod === 'cod' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                  >
                    <Truck className="w-6 h-6 mx-auto mb-2" />
                    <span className="block text-sm">Cash on Delivery</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        name="card.number"
                        value={paymentDetails.card.number}
                        onChange={handlePaymentDetailsChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        name="card.name"
                        value={paymentDetails.card.name}
                        onChange={handlePaymentDetailsChange}
                        className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          name="card.expiry"
                          value={paymentDetails.card.expiry}
                          onChange={handlePaymentDetailsChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                          type="text"
                          name="card.cvv"
                          value={paymentDetails.card.cvv}
                          onChange={handlePaymentDetailsChange}
                          className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                      <input
                        type="text"
                        name="upi.id"
                        value={paymentDetails.upi.id}
                        onChange={handlePaymentDetailsChange}
                        placeholder="example@upi"
                        className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="mt-4 text-gray-600">
                    <p>Cash on Delivery selected. Pay when you receive the products.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {state.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>
                  ${state.items.reduce((total, item) => total + item.price * item.quantity, 0)}
                </span>
              </div>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="mt-8 w-full bg-green-600 text-white py-2 rounded-lg"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
