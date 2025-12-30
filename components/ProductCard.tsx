import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { user, toggleWishlist } = useAuth();
  const isLiked = user?.wishlist.includes(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      toggleWishlist(product.id);
    } else {
      alert("Please login to use wishlist");
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="group relative block">
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-sm">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-900 hover:text-red-500 transition-colors"
        >
          <Heart size={20} fill={isLiked ? "currentColor" : "none"} className={isLiked ? "text-red-500" : ""} />
        </button>
        {product.featured && (
          <span className="absolute top-3 left-3 bg-brand-black text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">
            Featured
          </span>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700 font-medium">
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <p className="text-sm font-bold text-gray-900">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
