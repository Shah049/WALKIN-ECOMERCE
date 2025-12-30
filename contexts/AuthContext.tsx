import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Order } from '../types';
import { db } from '../services/database';

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  toggleWishlist: (productId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('walkin_session_user');
    if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        // Load orders for this user
        setOrders(db.orders.getByUser(parsedUser.id));
    }
  }, []);

  const login = (email: string) => {
    const isAdmin = email === 'admin@walkin.com';
    
    // Check if user exists in DB, else create
    let dbUser = db.users.get(email);
    
    if (!dbUser) {
        dbUser = {
            id: email, // simple ID strategy
            name: email.split('@')[0],
            email,
            isAdmin,
            wishlist: []
        };
        db.users.save(dbUser);
    }

    setUser(dbUser);
    localStorage.setItem('walkin_session_user', JSON.stringify(dbUser));
    setOrders(db.orders.getByUser(dbUser.id));
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
    localStorage.removeItem('walkin_session_user');
  };

  const addOrder = (order: Order) => {
    db.orders.add(order);
    setOrders(db.orders.getByUser(user?.id || 'guest'));
  };

  const toggleWishlist = (productId: string) => {
    if (!user) return;
    const isLiked = user.wishlist.includes(productId);
    const newWishlist = isLiked 
      ? user.wishlist.filter(id => id !== productId) 
      : [...user.wishlist, productId];
    
    const updatedUser = { ...user, wishlist: newWishlist };
    setUser(updatedUser);
    localStorage.setItem('walkin_session_user', JSON.stringify(updatedUser)); // Update session
    db.users.save(updatedUser); // Update DB
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, orders, addOrder, toggleWishlist }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
