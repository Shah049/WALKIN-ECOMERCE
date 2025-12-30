import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=2070&auto=format&fit=crop",
    title: "DEFY GRAVITY",
    subtitle: "Engineered for speed, designed for the streets.",
    cta: "Shop Running",
    link: "/shop?category=Running"
  },
  {
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=2070&auto=format&fit=crop",
    title: "URBAN LEGENDS",
    subtitle: "Classic silhouettes reimagined for modern life.",
    cta: "Shop Lifestyle",
    link: "/shop?category=Lifestyle"
  },
  {
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
    title: "JUST DROPPED",
    subtitle: "The all-new Velocity X is here. Feel the energy.",
    cta: "View Collection",
    link: "/shop"
  }
];

const Home: React.FC = () => {
  const { products } = useProducts();
  const featuredProducts = products.filter(p => p.featured).slice(0, 3);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide(prev => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? SLIDES.length - 1 : prev - 1));

  return (
    <div className="bg-white">
      {/* Hero Carousel */}
      <div className="relative h-screen w-full overflow-hidden bg-black">
        {SLIDES.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover object-center animate-fade-in-slow"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
              <div className="max-w-4xl animate-slide-up">
                <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-none drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-100 mb-10 font-light tracking-wide drop-shadow-md">
                  {slide.subtitle}
                </p>
                <div className="flex gap-4 justify-center">
                  <Link 
                    to={slide.link} 
                    className="bg-white text-black px-10 py-4 font-bold text-lg uppercase tracking-wider hover:bg-brand-orange hover:text-white transition-all transform hover:scale-105"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Carousel Controls */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 p-3 rounded-full text-white backdrop-blur-sm transition-all">
          <ChevronLeft size={32} />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 p-3 rounded-full text-white backdrop-blur-sm transition-all">
          <ChevronRight size={32} />
        </button>
        
        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all ${idx === currentSlide ? 'bg-brand-orange w-8' : 'bg-white/50 hover:bg-white'}`}
            />
          ))}
        </div>
      </div>

      {/* Featured Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12 animate-slide-up" style={{animationDelay: '0.2s'}}>
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tight mb-2">Trending Now</h2>
            <p className="text-gray-500">Our latest drops and most wanted styles.</p>
          </div>
          <Link to="/shop" className="hidden md:flex items-center gap-2 font-bold text-sm uppercase tracking-wide border-b-2 border-transparent hover:border-black transition-all pb-1 hover:text-brand-orange">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featuredProducts.map((product, idx) => (
            <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${0.2 + (idx * 0.1)}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link to="/shop" className="inline-block border-b border-black pb-1 font-bold">View All Products</Link>
        </div>
      </section>

      {/* Banner */}
      <section className="bg-brand-orange text-white py-32 px-4 overflow-hidden relative">
         <div className="max-w-7xl mx-auto text-center relative z-10 animate-slide-up">
           <h2 className="text-4xl md:text-7xl font-black uppercase mb-8">Join the Movement</h2>
           <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90 font-light">Sign up for exclusive access to drops, events, and member-only pricing.</p>
           <Link to="/login" className="bg-black text-white px-12 py-5 font-bold uppercase hover:bg-white hover:text-black transition-all inline-block shadow-lg">
             Become a Member
           </Link>
         </div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none flex items-center justify-center">
            <h2 className="text-[25vw] font-black leading-none text-black select-none whitespace-nowrap">WALKIN</h2>
         </div>
      </section>
    </div>
  );
};

export default Home;