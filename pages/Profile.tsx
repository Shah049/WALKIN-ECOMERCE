import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProducts } from '../contexts/ProductContext';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Profile: React.FC = () => {
  const { user, orders, logout } = useAuth();
  const { products } = useProducts();

  if (!user) {
    return <div className="p-10 text-center"><Link to="/login" className="underline">Please login</Link></div>;
  }

  const wishlistProducts = products.filter(p => user.wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase">My Profile</h1>
          <p className="text-gray-600">Welcome back, {user.name}</p>
        </div>
        <button onClick={logout} className="text-sm underline text-red-500 hover:text-red-700">Sign Out</button>
      </div>

      {/* Orders */}
      <div className="mb-16">
        <h2 className="text-xl font-bold mb-6 border-b pb-2">Order History</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="border rounded-lg p-6 bg-gray-50">
                <div className="flex justify-between flex-wrap gap-4 mb-4 text-sm">
                  <div>
                    <span className="block text-gray-500">Order ID</span>
                    <span className="font-mono font-bold">#{order.id}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Date</span>
                    <span className="font-bold">{new Date(order.date).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Total</span>
                    <span className="font-bold text-brand-orange">${order.total.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Status</span>
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-bold">{order.status}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {order.items.map(item => (
                    <div key={`${order.id}-${item.id}`} className="flex items-center gap-4 text-sm">
                      <img src={item.image} alt="" className="w-10 h-10 object-cover rounded" />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-500">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Wishlist */}
      <div>
        <h2 className="text-xl font-bold mb-6 border-b pb-2">My Wishlist</h2>
        {wishlistProducts.length === 0 ? (
          <p className="text-gray-500">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
