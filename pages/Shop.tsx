import React, { useState, useMemo } from 'react';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';
import { CATEGORIES } from '../constants';
import { Filter, SlidersHorizontal } from 'lucide-react';

const Shop: React.FC = () => {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <h1 className="text-4xl font-black uppercase">All Products</h1>
        
        <div className="flex items-center gap-4">
           {/* Mobile Filter Toggle */}
           <button 
             className="md:hidden flex items-center gap-2 border px-4 py-2 rounded-md hover:bg-gray-50"
             onClick={() => setShowFilters(!showFilters)}
           >
             <Filter size={18} /> Filters
           </button>

           <div className="relative">
             <input
               type="text"
               placeholder="Search..."
               className="pl-4 pr-10 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-black w-full md:w-80 bg-gray-50"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
           </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Filters Sidebar */}
        <aside className={`md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-24 space-y-10">
            <div>
              <h3 className="font-bold mb-6 flex items-center gap-2 text-lg"><SlidersHorizontal size={20} /> Category</h3>
              <ul className="space-y-3 text-sm">
                {CATEGORIES.map(category => (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left py-1 hover:text-brand-orange transition-colors ${selectedCategory === category ? 'font-bold text-brand-orange text-base' : 'text-gray-600'}`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Example of another filter group */}
            <div>
              <h3 className="font-bold mb-6 text-lg">Price</h3>
              <div className="flex flex-col gap-3 text-sm text-gray-600">
                <label className="flex items-center gap-2 cursor-pointer hover:text-black"><input type="checkbox" className="rounded" /> Under $100</label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-black"><input type="checkbox" className="rounded" /> $100 - $150</label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-black"><input type="checkbox" className="rounded" /> $150 - $200</label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-black"><input type="checkbox" className="rounded" /> $200+</label>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filteredProducts.map((product, idx) => (
                <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-lg">
              <p className="text-xl text-gray-500">No products found matching your criteria.</p>
              <button 
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="mt-4 text-brand-orange font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;