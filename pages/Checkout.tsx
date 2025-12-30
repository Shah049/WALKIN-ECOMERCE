import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Order } from '../types';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    paymentMethod: 'card',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);

    try {
      // SEND TO GOOGLE APPS SCRIPT (FINAL, WORKING)
   const response = await fetch(
  'https://script.google.com/macros/s/AKfycbxyyrMhMFsQWUZYX3baIJOJt4uGiBkoY__gGiMGPksUFcH8SrHIdpec6ydmIdEzghseXQ/exec',
  {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      streetAddress: `${formData.address}${formData.city ? ', ' + formData.city : ''}`,
      qty: cart.reduce((acc, item) => acc + item.quantity, 0),
      zipCode: formData.zip,
      productName: cart.map((item) => item.name).join(', '),
      totalAmount: Number((cartTotal * 1.08).toFixed(2)),
    }),
  }
);


      const result = await response.text();
      console.log('Google Sheet response:', result);

      // Local order creation
      const newOrder: Order = {
        id: Math.random().toString(36).substring(2, 11).toUpperCase(),
        userId: user?.id || 'guest',
        items: cart,
        total: cartTotal * 1.08,
        date: new Date().toISOString(),
        status: 'Processing',
      };

      setTimeout(() => {
        addOrder(newOrder);
        clearCart();
        setLoading(false);
        setStep(3);

        setTimeout(() => {
          navigate(user ? '/profile' : '/');
        }, 4000);
      }, 1200);
    } catch (error) {
      console.error('Order sync error:', error);
      setLoading(false);
      alert(
        'Order completed locally, but failed to sync with Google Sheets.'
      );
    }
  };

  if (cart.length === 0 && step !== 3) {
    return <div className="p-10 text-center">Cart is empty</div>;
  }

  if (step === 3) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="flex justify-center mb-6 text-green-500">
          <CheckCircle size={80} strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-black uppercase mb-4">
          Order Confirmed!
        </h1>
        <p className="text-gray-500 mb-8">
          Thank you, {formData.firstName}. Your order has been received.
        </p>
        <p className="text-sm text-gray-400">
          Redirecting to your profile...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black uppercase mb-8">Checkout</h1>

      <form
        onSubmit={step === 1 ? handleNextStep : handleSubmit}
        className="space-y-8"
      >
        {step === 1 && (
          <div className="bg-gray-50 p-6 border">
            <h2 className="text-xl font-bold mb-6">Shipping Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                required
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              <input
                required
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="md:col-span-2"
              />
              <input
                required
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleChange}
                className="md:col-span-2"
              />
              <input
                required
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
              <input
                required
                name="zip"
                placeholder="ZIP Code"
                value={formData.zip}
                onChange={handleChange}
              />
            </div>

            <div className="mt-8 text-right">
              <button
                type="submit"
                className="bg-black text-white px-10 py-4"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-gray-50 p-6 border">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Lock size={18} /> Secure Payment
            </h2>

            <div className="flex justify-between items-center mt-8">
              <button type="button" onClick={() => setStep(1)}>
                Go Back
              </button>

              <button
                type="submit"
                disabled={loading}
                className="bg-orange-600 text-white px-12 py-4"
              >
                {loading ? 'Processing…' : 'Complete Order'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Checkout;
