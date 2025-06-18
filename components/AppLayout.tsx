import { ReactNode } from 'react';
import AppBottomNav from './AppBottomNav';
import { isMobileApp } from '../utils/mobileUtils';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  // Add bottom padding only for mobile app to accommodate the nav bar
  const contentClass = isMobileApp() ? 'pb-20' : '';

  return (
    <div className={contentClass}>
      {children}
      <AppBottomNav />
    </div>
  );
} 