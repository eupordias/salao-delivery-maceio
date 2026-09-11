'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, PackageSearch, CircleDollarSign, Users, LogOut } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/inventory', icon: PackageSearch, label: 'Estoque' },
  { href: '/admin/financial', icon: CircleDollarSign, label: 'Financeiro' },
  { href: '/admin/crm', icon: Users, label: 'CRM & Retenção' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#0B0B0B]">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-[#111111] border-r border-[#2A2A2A] flex flex-col z-20">
        <div className="p-6">
          <h1 className="text-2xl font-bold font-['Syne'] tracking-wide">
            <span className="gradient-text">✦ SALÃO</span>
          </h1>
          <p className="text-xs text-gray-500 tracking-[0.2em] mt-1">DELIVERY MCZ</p>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                  isActive 
                    ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400' 
                    : 'text-gray-400 hover:bg-[#1A1A1A] hover:text-gray-200 border-l-2 border-transparent'
                )}
              >
                <Icon size={20} className={isActive ? 'text-cyan-400' : 'text-gray-500'} />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#2A2A2A]">
          <div className="flex items-center justify-between p-3 rounded-lg bg-[#1A1A1A]">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                AD
              </div>
              <div>
                <p className="text-sm font-medium text-gray-200">Admin</p>
              </div>
            </div>
            <button className="text-gray-500 hover:text-pink-500 transition-colors">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8 min-h-screen relative overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
