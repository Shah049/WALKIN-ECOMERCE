import React, { useState } from 'react';
import { useProducts } from '../contexts/ProductContext';
import { useAuth } from '../contexts/AuthContext';
import { Product } from '../types';
import { CATEGORIES } from '../constants';
import { Plus, Trash2, Edit2, X, Upload, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Admin: React.FC = () => {
  const { user } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
  const [imageInputType, setImageInputType] = useState<'url' | 'file'>('url');

  if (!user?.isAdmin) {
    return <div className="p-10 text-center text-red-500">Access Denied. Admins only.</div>;
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...currentProduct,
      sizes: typeof currentProduct.sizes === 'string' ? (currentProduct.sizes as string).split(',').map(Number) : currentProduct.sizes || [7,8,9,10,11],
      image: currentProduct.image || `https://picsum.photos/seed/${currentProduct.name}/800/800`
    } as Product;

    if (productData.id) {
      updateProduct(productData);
    } else {
      addProduct({ ...productData, id: Date.now().toString() });
    }
    setIsEditing(false);
    setCurrentProduct({});
    setImageInputType('url');
  };

  const startEdit = (product?: Product) => {
    setCurrentProduct(product || {
      name: '', price: 0, category: 'Lifestyle', description: '', sizes: [7,8,9,10,11], featured: false
    });
    setIsEditing(true);
    setImageInputType('url');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentProduct(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black uppercase">Product Management</h1>
        <button 
          onClick={() => startEdit()}
          className="bg-brand-black text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-800"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Product List */}
      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map(product => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded object-cover" src={product.image} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => startEdit(product)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => deleteProduct(product.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{currentProduct.id ? 'Edit Product' : 'New Product'}</h2>
              <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-900"><X /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">Name</label>
                <input 
                  required 
                  value={currentProduct.name} 
                  onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} 
                  className="w-full border border-gray-300 p-2 rounded text-gray-900 bg-white focus:ring-2 focus:ring-brand-orange focus:border-transparent focus:outline-none" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1 text-gray-700">Price</label>
                  <input 
                    required 
                    type="number" 
                    step="0.01" 
                    value={currentProduct.price} 
                    onChange={e => setCurrentProduct({...currentProduct, price: parseFloat(e.target.value)})} 
                    className="w-full border border-gray-300 p-2 rounded text-gray-900 bg-white focus:ring-2 focus:ring-brand-orange focus:border-transparent focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 text-gray-700">Category</label>
                  <select 
                    value={currentProduct.category} 
                    onChange={e => setCurrentProduct({...currentProduct, category: e.target.value})} 
                    className="w-full border border-gray-300 p-2 rounded text-gray-900 bg-white focus:ring-2 focus:ring-brand-orange focus:border-transparent focus:outline-none"
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-700">Description</label>
                <textarea 
                  required 
                  value={currentProduct.description} 
                  onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})} 
                  className="w-full border border-gray-300 p-2 rounded text-gray-900 bg-white focus:ring-2 focus:ring-brand-orange focus:border-transparent focus:outline-none" 
                  rows={3} 
                />
              </div>

              {/* Image Selection Logic */}
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-700">Product Image</label>
                
                <div className="flex gap-4 mb-3">
                  <button
                    type="button"
                    onClick={() => setImageInputType('url')}
                    className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full border ${imageInputType === 'url' ? 'bg-brand-black text-white border-brand-black' : 'text-gray-600 border-gray-300'}`}
                  >
                    <LinkIcon size={14} /> URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageInputType('file')}
                    className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full border ${imageInputType === 'file' ? 'bg-brand-black text-white border-brand-black' : 'text-gray-600 border-gray-300'}`}
                  >
                    <Upload size={14} /> Upload
                  </button>
                </div>

                {imageInputType === 'url' ? (
                  <input 
                    value={currentProduct.image || ''} 
                    onChange={e => setCurrentProduct({...currentProduct, image: e.target.value})} 
                    className="w-full border border-gray-300 p-2 rounded text-gray-900 bg-white focus:ring-2 focus:ring-brand-orange focus:border-transparent focus:outline-none" 
                    placeholder="https://example.com/image.jpg" 
                  />
                ) : (
                  <div className="border border-dashed border-gray-300 p-4 rounded text-center hover:bg-gray-50 transition-colors">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-brand-orange file:text-white
                        hover:file:bg-orange-700 cursor-pointer
                      "
                    />
                    <p className="text-xs text-gray-400 mt-2">Recommended: 800x800px or larger</p>
                  </div>
                )}
                
                {currentProduct.image && (
                  <div className="mt-3 relative h-32 w-32 rounded border border-gray-200 overflow-hidden group">
                     <img src={currentProduct.image} alt="Preview" className="h-full w-full object-cover" />
                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ImageIcon className="text-white" />
                     </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mt-4">
                <input 
                  type="checkbox" 
                  checked={currentProduct.featured || false} 
                  onChange={e => setCurrentProduct({...currentProduct, featured: e.target.checked})} 
                  className="w-4 h-4 text-brand-orange border-gray-300 rounded focus:ring-brand-orange"
                />
                <label className="text-sm font-bold text-gray-700">Featured Product</label>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-brand-orange text-white font-bold py-3 rounded hover:bg-orange-700 transition-colors mt-6 shadow-md"
              >
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;