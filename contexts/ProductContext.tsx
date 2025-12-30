import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Review } from '../types';
import { db } from '../services/database';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  addReview: (productId: string, review: Review) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Load from DB service
    setProducts(db.products.getAll());
  }, []);

  const refreshProducts = () => {
    setProducts(db.products.getAll());
  };

  const addProduct = (product: Product) => {
    db.products.add(product);
    refreshProducts();
  };

  const updateProduct = (updatedProduct: Product) => {
    db.products.update(updatedProduct);
    refreshProducts();
  };

  const deleteProduct = (id: string) => {
    db.products.delete(id);
    refreshProducts();
  };

  const addReview = (productId: string, review: Review) => {
    const product = products.find(p => p.id === productId);
    if (product) {
        const updatedReviews = product.reviews ? [...product.reviews, review] : [review];
        const updatedProduct = { ...product, reviews: updatedReviews };
        updateProduct(updatedProduct);
    }
  };

  const getProduct = (id: string) => products.find(p => p.id === id);

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getProduct, addReview }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
};
