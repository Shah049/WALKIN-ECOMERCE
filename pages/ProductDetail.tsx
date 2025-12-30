import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Check, Truck, ShieldCheck, Heart, Star, User as UserIcon } from 'lucide-react';
import { Review } from '../types';
import LoginModal from '../components/LoginModal';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProduct, addReview } = useProducts();
  const { addToCart } = useCart();
  const { user, toggleWishlist } = useAuth();

  const product = getProduct(id || '');
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // Review Form State
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  const handleAddToCart = () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }
    setIsAdding(true);
    addToCart(product, selectedSize);
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        setIsLoginModalOpen(true);
        return;
    }
    setSubmittingReview(true);
    const newReview: Review = {
        id: Date.now().toString(),
        userId: user.id,
        userName: user.name,
        rating,
        comment,
        date: new Date().toISOString().split('T')[0]
    };

    // Simulate network delay
    setTimeout(() => {
        addReview(product.id, newReview);
        setComment('');
        setRating(5);
        setSubmittingReview(false);
    }, 1000);
  };

  const isLiked = user?.wishlist.includes(product.id);
  const reviews = product.reviews || [];
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
    : 'New';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        message="Please sign in to add this product to your shopping bag."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-20">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 overflow-hidden rounded-lg shadow-sm">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
             {/* Mock thumbnails */}
             {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-md overflow-hidden opacity-70 hover:opacity-100 cursor-pointer">
                    <img src={product.image} className="w-full h-full object-cover" alt="thumbnail" />
                </div>
             ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-2 flex justify-between items-center">
            <span className="text-brand-orange font-bold text-sm tracking-widest uppercase">{product.category}</span>
            <div className="flex items-center gap-1 text-sm font-bold text-yellow-500">
                <Star size={16} fill="currentColor" /> {averageRating}
            </div>
          </div>
          <h1 className="text-4xl font-black text-brand-black mb-4 tracking-tighter">{product.name}</h1>
          <p className="text-2xl text-gray-900 font-medium mb-6">${product.price.toFixed(2)}</p>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Size Selector */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-sm">Select Size (US)</span>
              <button className="text-xs underline text-gray-500">Size Guide</button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 text-sm font-bold border rounded-md transition-all ${
                    selectedSize === size
                      ? 'bg-brand-black text-white border-brand-black'
                      : 'bg-white text-gray-900 border-gray-200 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-10">
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`flex-1 bg-brand-orange text-white py-4 font-bold uppercase tracking-wider hover:bg-orange-700 transition-colors flex justify-center items-center gap-2 rounded-sm shadow-md ${isAdding ? 'opacity-75 cursor-wait' : ''}`}
            >
              {isAdding ? <Check /> : 'Add to Cart'}
            </button>
            <button 
                onClick={() => user ? toggleWishlist(product.id) : setIsLoginModalOpen(true)}
                className={`px-6 border border-gray-300 rounded-sm hover:border-black transition-colors flex items-center justify-center ${isLiked ? 'text-red-500 border-red-200 bg-red-50' : ''}`}
            >
              <Heart fill={isLiked ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Benefits */}
          <div className="border-t pt-8 space-y-4">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Truck size={20} />
              <span>Free standard shipping on orders over $150</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <ShieldCheck size={20} />
              <span>2-year warranty on all premium models</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t pt-12">
        <h2 className="text-2xl font-black uppercase mb-8">Customer Reviews ({reviews.length})</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Review List */}
            <div className="space-y-8">
                {reviews.length === 0 ? (
                    <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>
                ) : (
                    reviews.map(review => (
                        <div key={review.id} className="border-b pb-6 last:border-0">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2 font-bold">
                                    <div className="bg-gray-200 rounded-full p-1"><UserIcon size={14} /></div>
                                    {review.userName}
                                </div>
                                <span className="text-xs text-gray-400">{review.date}</span>
                            </div>
                            <div className="flex text-yellow-500 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                                ))}
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
                        </div>
                    ))
                )}
            </div>

            {/* Add Review Form */}
            <div className="bg-gray-50 p-8 rounded-lg h-fit">
                <h3 className="font-bold text-lg mb-4">Write a Review</h3>
                {user ? (
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className={`text-2xl focus:outline-none transition-colors ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">Comment</label>
                            <textarea
                                required
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                rows={4}
                                className="w-full border p-3 rounded bg-white focus:outline-none focus:border-brand-orange"
                                placeholder="Tell us what you think..."
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={submittingReview}
                            className="w-full bg-black text-white font-bold py-3 rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
                        >
                            {submittingReview ? 'Posting...' : 'Submit Review'}
                        </button>
                    </form>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-600 mb-4">Please log in to write a review.</p>
                        <button onClick={() => navigate('/login')} className="text-brand-orange font-bold underline">Go to Login</button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;