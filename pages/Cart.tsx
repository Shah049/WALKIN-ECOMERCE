import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Trash2, ArrowRight, Lock } from 'lucide-react';

const Cart: React.FC = () => {
  const { cart, removeFromCart, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center animate-fade-in">
        <div className="flex justify-center mb-6 text-gray-300">
          <Lock size={64} />
        </div>
        <h2 className="text-3xl font-black uppercase mb-4 tracking-tighter">Login Required</h2>
        <p className="text-gray-500 mb-10 max-w-sm mx-auto">Please sign in to view your shopping bag and proceed with your order.</p>
        <button 
          onClick={() => navigate('/login')}
          className="bg-brand-black text-white px-12 py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg"
        >
          Sign In to Shopping Bag
        </button>
        <p className="mt-8">
          <Link to="/shop" className="text-sm font-bold text-brand-orange uppercase hover:underline">
            Continue Browsing Shoes
          </Link>
        </p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center animate-fade-in">
        <h2 className="text-3xl font-black uppercase mb-4 tracking-tighter">Your Bag is Empty</h2>
        <p className="text-gray-500 mb-10">Looks like you haven't made your choice yet.</p>
        <Link to="/shop" className="inline-block bg-brand-black text-white px-12 py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-all">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <h1 className="text-3xl font-black uppercase mb-12 tracking-tighter">Shopping Bag</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1 space-y-8">
          {cart.map((item) => (
            <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6 border-b pb-8">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 flex-shrink-0 rounded-sm overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg tracking-tight">{item.name}</h3>
                    <p className="font-bold text-brand-orange">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{item.category}</p>
                  <p className="text-sm mt-2 text-gray-600">Size: <span className="font-bold text-black">{item.selectedSize}</span></p>
                  <p className="text-sm mt-1 text-gray-600">Qty: <span className="font-bold text-black">{item.quantity}</span></p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id, item.selectedSize)}
                  className="text-gray-400 hover:text-red-500 self-start flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest mt-4 transition-colors"
                >
                  <Trash2 size={14} /> Remove Item
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:w-96 bg-gray-50 p-8 h-fit rounded-sm border border-gray-100">
          <h3 className="text-xl font-black uppercase tracking-tight mb-8">Order Summary</h3>
          <div className="space-y-4 mb-10">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="font-bold">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-medium">Shipping</span>
              <span className="text-green-600 font-bold uppercase text-[10px] tracking-widest">Free</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-medium">Estimated Tax</span>
              <span className="font-bold">${(cartTotal * 0.08).toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-6 flex justify-between items-baseline">
              <span className="text-lg font-black uppercase tracking-tighter">Total</span>
              <span className="text-3xl font-black text-brand-orange">${(cartTotal * 1.08).toFixed(2)}</span>
            </div>
          </div>
          <button 
            onClick={() => navigate('/checkout')}
            className="w-full bg-brand-black text-white py-5 font-black uppercase tracking-widest hover:bg-gray-800 transition-all flex justify-center items-center gap-3 shadow-xl"
          >
            Checkout <ArrowRight size={20} />
          </button>
          <p className="mt-6 text-[10px] text-gray-400 text-center font-bold uppercase tracking-widest">
            30-day free returns on all orders
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;