"use client";

import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X,
  Upload
} from 'lucide-react';
import { products } from '@/../public/data';
import { Product } from '@/../public/data/types';

export default function GalleryManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<Product | null>(null);

  // Filter products that are featured or marked as gallery designs
  // For now, we'll just show all products as "designs"
  const designs = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (design: Product) => {
    setSelectedDesign(design);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this design?')) {
      console.log('Deleting design:', id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ডিজাইন গ্যালারি</h1>
          <p className="text-gray-500">Manage your showcase designs</p>
        </div>
        <button 
          onClick={() => {
            setSelectedDesign(null);
            setIsModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <Plus size={20} />
          <span>Add New Design</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search designs..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {designs.map((design) => (
          <div key={design.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden group">
            <div className="relative aspect-square">
              <img 
                src={design.images[0]} 
                alt={design.name} 
                className="w-full h-full object-cover transition-transform group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button 
                  onClick={() => handleEdit(design)}
                  className="p-2 bg-white text-gray-900 rounded-full hover:bg-blue-500 hover:text-white transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(design.id)}
                  className="p-2 bg-white text-gray-900 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 truncate">{design.name}</h3>
              <p className="text-xs text-gray-500">{design.categoryId}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedDesign ? 'Edit Design' : 'Add New Design'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Design Name</label>
                <input 
                  type="text" 
                  defaultValue={selectedDesign?.name}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  defaultValue={selectedDesign?.categoryId}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none"
                >
                  <option value="chairs">Chairs</option>
                  <option value="tables">Tables</option>
                  <option value="beds">Beds</option>
                  <option value="sofas">Sofas</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Design Image</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-slate-400 transition-colors cursor-pointer">
                  <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                >
                  {selectedDesign ? 'Update Design' : 'Save Design'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
