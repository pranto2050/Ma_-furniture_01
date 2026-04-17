"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Home,
  Package,
  MessageSquare,
  Image as ImageIcon,
  Layers
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // Mock auth check
    const isAuth = localStorage.getItem('admin_auth');
    if (!isAuth && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [isLoginPage, router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    router.push('/admin/login');
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 text-white transition-all duration-300 ease-in-out flex flex-col fixed inset-y-0 z-50`}
      >
        <div className="p-4 flex items-center justify-between border-b border-slate-800">
          {isSidebarOpen && <span className="font-bold text-xl">Admin Panel</span>}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-slate-800 rounded-md"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 mt-6 px-3 space-y-2">
          <NavItem 
            href="/admin" 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            isOpen={isSidebarOpen} 
            active={pathname === '/admin'}
          />
          <NavItem 
            href="/admin/products" 
            icon={<ShoppingBag size={20} />} 
            label="Product List" 
            isOpen={isSidebarOpen} 
            active={pathname === '/admin/products'}
          />
          <NavItem 
            href="/admin/gallery" 
            icon={<ImageIcon size={20} />} 
            label="ডিজাইন গ্যালারি" 
            isOpen={isSidebarOpen} 
            active={pathname === '/admin/gallery'}
          />
          <NavItem 
            href="/admin/categories" 
            icon={<Layers size={20} />} 
            label="ক্যাটাগরি" 
            isOpen={isSidebarOpen} 
            active={pathname === '/admin/categories'}
          />
          <NavItem 
            href="/admin/orders" 
            icon={<Package size={20} />} 
            label="Orders" 
            isOpen={isSidebarOpen} 
            active={pathname === '/admin/orders'}
          />
          <NavItem 
            href="/admin/messages" 
            icon={<MessageSquare size={20} />} 
            label="Messages" 
            isOpen={isSidebarOpen} 
            active={pathname === '/admin/messages'}
          />
          <NavItem 
            href="/admin/users" 
            icon={<Users size={20} />} 
            label="Users" 
            isOpen={isSidebarOpen} 
            active={pathname === '/admin/users'}
          />
          <div className="pt-4 mt-4 border-t border-slate-800">
            <NavItem 
              href="/admin/settings" 
              icon={<Settings size={20} />} 
              label="Settings" 
              isOpen={isSidebarOpen} 
              active={pathname === '/admin/settings'}
            />
            <NavItem 
              href="/" 
              icon={<Home size={20} />} 
              label="View Site" 
              isOpen={isSidebarOpen} 
              active={false}
            />
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full text-left text-red-400 hover:bg-slate-800 rounded-md transition-colors"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40">
          <h2 className="text-xl font-semibold text-gray-800">
            {pathname === '/admin' ? 'Dashboard' : 
             pathname.startsWith('/admin/products') ? 'Product List' : 
             pathname.startsWith('/admin/gallery') ? 'ডিজাইন গ্যালারি' : 
             pathname.startsWith('/admin/categories') ? 'ক্যাটাগরি' : 
             pathname.startsWith('/admin/orders') ? 'Orders' : 
             pathname.startsWith('/admin/messages') ? 'Messages' : 
             pathname.startsWith('/admin/users') ? 'Users' : 
             pathname.startsWith('/admin/settings') ? 'Settings' : 'Admin'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right mr-2">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
              <Users size={20} className="text-slate-600" />
            </div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ 
  href, 
  icon, 
  label, 
  isOpen,
  active
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string; 
  isOpen: boolean;
  active: boolean;
}) {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors group ${
        active ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 text-slate-300 hover:text-white'
      }`}
    >
      <div className={`${active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
        {icon}
      </div>
      {isOpen && <span>{label}</span>}
    </Link>
  );
}

