import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Lock, ArrowRight } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, message }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-sm shadow-2xl overflow-hidden animate-slide-up">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-orange/10 rounded-full mb-6 text-brand-orange">
            <Lock size={32} />
          </div>
          
          <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Member Access Only</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            {message || "Please sign in or create an account to add items to your bag and proceed to checkout."}
          </p>

          <div className="space-y-3">
            <button
              onClick={() => {
                onClose();
                navigate('/login');
              }}
              className="w-full bg-brand-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
            >
              Sign In <ArrowRight size={18} />
            </button>
            <button
              onClick={onClose}
              className="w-full bg-transparent text-gray-500 py-3 text-sm font-bold uppercase tracking-widest hover:text-black transition-all"
            >
              Continue Guest Browsing
            </button>
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-100">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Join Walkin+ for free shipping and exclusive drops
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;