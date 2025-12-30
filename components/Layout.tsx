import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, ShieldCheck } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import AIAssistant from './AIAssistant';
import LoginModal from './LoginModal';

const Layout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCartClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setIsLoginModalOpen(true);
    }
  };

  const isTransparent = isHome && !scrolled;
  const navbarClasses = isTransparent 
    ? 'bg-transparent text-white' 
    : 'bg-white text-black shadow-md';

  return (
    <div className="min-h-screen flex flex-col">
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        message="Sign in to view your bag and manage your premium sneaker collection."
      />

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${navbarClasses}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-black tracking-tighter uppercase flex items-center gap-1">
                Walkin<span className="text-brand-orange">.</span>
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-8 items-center font-bold text-xs tracking-[0.2em]">
              <Link to="/" className="hover:text-brand-orange transition-colors">HOME</Link>
              <Link to="/shop" className="hover:text-brand-orange transition-colors">SHOP</Link>
              <Link to="/contact" className="hover:text-brand-orange transition-colors">CONTACT</Link>
              <Link to="/help" className="hover:text-brand-orange transition-colors">HELP</Link>
              {user?.isAdmin && (
                <Link to="/admin" className="px-3 py-1 bg-brand-orange text-white rounded font-bold hover:bg-orange-700 transition-colors flex items-center gap-2 tracking-normal">
                  <ShieldCheck size={14} /> ADMIN
                </Link>
              )}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-6">
              <Link to="/shop" className="hover:text-brand-orange transition-colors">
                <Search size={22} />
              </Link>
              
              <Link to="/cart" onClick={handleCartClick} className="relative hover:text-brand-orange transition-colors">
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="relative group">
                <Link to={user ? "/profile" : "/login"} className="block hover:opacity-80 transition-opacity">
                  {user ? (
                    <img 
                      src={`https://ui-avatars.com/api/?name=${user.name}&background=FF5722&color=fff&size=128`} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full border border-gray-200"
                    />
                  ) : (
                     <div className="text-[10px] font-black border-2 border-current px-3 py-1 rounded-sm hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all tracking-widest uppercase">
                       Login
                     </div>
                  )}
                </Link>
                {/* Dropdown for user */}
                {user && (
                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 hidden group-hover:block transform origin-top-right transition-all">
                     <div className="px-4 py-3 text-xs text-gray-500 border-b">
                       Signed in as <br/> <span className="font-bold text-gray-900 text-sm">{user.name}</span>
                     </div>
                     <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</Link>
                     {user.isAdmin && <Link to="/admin" className="block px-4 py-2 text-sm text-brand-orange hover:bg-gray-100 font-bold">Admin Panel</Link>}
                     <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</button>
                   </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button 
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white text-black border-t absolute w-full h-screen left-0 top-16 z-50 animate-fade-in">
            <div className="px-4 pt-8 pb-3 space-y-6 flex flex-col items-center text-xl font-bold">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/shop" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <Link to="/help" onClick={() => setMobileMenuOpen(false)}>Help Center</Link>
              {user?.isAdmin && <Link to="/admin" className="text-brand-orange" onClick={() => setMobileMenuOpen(false)}>Admin Panel</Link>}
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>My Profile</Link>
                  <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-red-500">Sign Out</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-brand-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-3xl font-black tracking-tighter">WALKIN<span className="text-brand-orange">.</span></h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium footwear designed for the modern urban explorer. Quality, comfort, and style in every step.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg tracking-wide">SHOP</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/shop" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop?sort=best" className="hover:text-white transition-colors">Best Sellers</Link></li>
              <li><Link to="/shop?category=Sale" className="hover:text-white transition-colors">Sale</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Collections</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg tracking-wide">SUPPORT</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors">Size Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg tracking-wide">NEWSLETTER</h4>
            <p className="text-gray-400 text-sm mb-4">Stay updated with our latest drops.</p>
            <div className="flex">
              <input type="email" placeholder="Enter your email" className="bg-gray-800 text-white px-4 py-3 text-sm rounded-l focus:outline-none focus:ring-1 focus:ring-brand-orange w-full" />
              <button className="bg-brand-orange px-6 py-3 rounded-r font-bold text-sm hover:bg-orange-700 transition-colors">JOIN</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Walkin Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
             <Link to="/help" className="hover:text-white">Privacy Policy</Link>
             <Link to="/help" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </footer>
      <AIAssistant />
    </div>
  );
};

export default Layout;