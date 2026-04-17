import React from 'react';
import { 
  ShoppingBag, 
  Users, 
  DollarSign, 
  TrendingUp,
  Package,
  Clock
} from 'lucide-react';
import { products } from '@/../public/data';

export default function AdminDashboard() {
  const totalProducts = products.length;
  const totalCategories = 8; // Based on productsArea keys

  const stats = [
    { label: 'Total Products', value: totalProducts, icon: <Package className="text-blue-600" />, bgColor: 'bg-blue-100' },
    { label: 'Categories', value: totalCategories, icon: <ShoppingBag className="text-purple-600" />, bgColor: 'bg-purple-100' },
    { label: 'Total Orders', value: '124', icon: <DollarSign className="text-green-600" />, bgColor: 'bg-green-100' },
    { label: 'Active Users', value: '1,205', icon: <Users className="text-orange-600" />, bgColor: 'bg-orange-100' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Products */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800">Recent Products</h3>
            <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900">{product.name}</h4>
                  <p className="text-xs text-gray-500">{product.material}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">${product.price}</p>
                  <p className={`text-[10px] px-2 py-0.5 rounded-full inline-block ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800">Recent Activity</h3>
          </div>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex gap-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                    <Clock size={18} className="text-slate-500" />
                  </div>
                  {item !== 5 && <div className="absolute top-10 left-5 w-0.5 h-6 bg-gray-100" />}
                </div>
                <div>
                  <p className="text-sm text-gray-800">
                    <span className="font-semibold text-gray-900">New Order #ORD-{1000 + item}</span> placed by Customer
                  </p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
