import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, validation and API call here.
    // For mock:
    if (email && password) {
      login(email);
      navigate('/profile');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-black text-center mb-8 uppercase tracking-wide text-brand-black">
          {isLogin ? 'Welcome Back' : 'Join the Club'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition bg-white text-gray-900 placeholder-gray-400"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition bg-white text-gray-900 placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-black text-white font-bold uppercase py-4 hover:bg-gray-900 transition-colors shadow-md"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-gray-500 hover:text-brand-orange underline"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already a member? Sign in"}
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t text-xs text-gray-400 text-center">
          <p>For Demo Admin Access:</p>
          <p>Email: admin@walkin.com | Pass: admin</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;