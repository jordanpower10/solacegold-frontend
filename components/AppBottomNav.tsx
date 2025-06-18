import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { isMobileApp } from '../utils/mobileUtils';
import { supabase } from '../lib/supabaseClient';

interface NavItem {
  label: string;
  path: string;
  icon: (isActive: boolean) => JSX.Element;
}

export default function AppBottomNav() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render on client-side and for mobile app
  if (!mounted || !isMobileApp()) return null;

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const navItems: NavItem[] = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: (isActive) => (
        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 ${isActive ? 'text-[#e0b44a]' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      label: 'Buy Gold',
      path: '/buy',
      icon: (isActive) => (
        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 ${isActive ? 'text-[#e0b44a]' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      )
    },
    {
      label: 'Sell Gold',
      path: '/sell',
      icon: (isActive) => (
        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 ${isActive ? 'text-[#e0b44a]' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      )
    },
    {
      label: 'Log Out',
      path: '',
      icon: (isActive) => (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      )
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-[#2a2a2a] pb-safe">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const isActive = router.pathname === item.path;
          
          return item.path ? (
            <button
              key={item.label}
              onClick={() => router.push(item.path)}
              className={`flex flex-col items-center justify-center space-y-1 active:bg-[#1a1a1a] transition-colors
                ${isActive ? 'text-[#e0b44a]' : 'text-gray-400'}`}
            >
              {item.icon(isActive)}
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ) : (
            <button
              key={item.label}
              onClick={handleLogout}
              className="flex flex-col items-center justify-center space-y-1 active:bg-[#1a1a1a] transition-colors text-gray-400"
            >
              {item.icon(false)}
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
} 