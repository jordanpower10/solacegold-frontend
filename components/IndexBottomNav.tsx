import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { isMobileApp, vibrateOnPress } from '../utils/mobileUtils';
import {
  UserIcon,
  UserPlusIcon,
  InformationCircleIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

interface NavItem {
  label: string;
  path: string;
  icon: (isActive: boolean) => JSX.Element;
}

export default function IndexBottomNav() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render on client-side and for mobile app
  if (!mounted || !isMobileApp()) return null;

  const handleNavigation = (path: string) => {
    vibrateOnPress();
    router.push(path);
  };

  const navItems: NavItem[] = [
    {
      label: 'Log In',
      path: '/login',
      icon: (isActive) => (
        <UserIcon 
          className={`w-6 h-6 ${isActive ? 'text-[#e0b44a]' : 'text-gray-400'}`}
        />
      )
    },
    {
      label: 'Sign Up',
      path: '/signup',
      icon: (isActive) => (
        <UserPlusIcon 
          className={`w-6 h-6 ${isActive ? 'text-[#e0b44a]' : 'text-gray-400'}`}
        />
      )
    },
    {
      label: 'About',
      path: '/about',
      icon: (isActive) => (
        <InformationCircleIcon 
          className={`w-6 h-6 ${isActive ? 'text-[#e0b44a]' : 'text-gray-400'}`}
        />
      )
    },
    {
      label: 'Contact',
      path: '/contact',
      icon: (isActive) => (
        <ChatBubbleLeftRightIcon 
          className={`w-6 h-6 ${isActive ? 'text-[#e0b44a]' : 'text-gray-400'}`}
        />
      )
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-[#2a2a2a] pb-safe">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const isActive = router.pathname === item.path;
          
          return (
            <button
              key={item.label}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center justify-center space-y-1 active:bg-[#1a1a1a] transition-colors
                ${isActive ? 'text-[#e0b44a]' : 'text-gray-400'}`}
            >
              {item.icon(isActive)}
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
} 