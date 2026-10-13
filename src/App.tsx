/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { FriscaProvider } from './context/FriscaContext';
import { FriscaHeader } from './components/FriscaHeader';
import { FriscaHero } from './components/FriscaHero';
import { FriscaIdentity } from './components/FriscaIdentity';
import { FriscaGallery } from './components/FriscaGallery';
import { FriscaFooter } from './components/FriscaFooter';
import { FriscaMenuPage } from './components/FriscaMenuPage';
import { FriscaBookingModal } from './components/FriscaBookingModal';
import { FriscaCartDrawer } from './components/FriscaCartDrawer';
import { FriscaAdminDashboard } from './components/FriscaAdminDashboard';
import { FriscaAdminLogin } from './components/FriscaAdminLogin';
import { useFrisca } from './context/FriscaContext';

export type AppRoute = 'home' | 'menu' | 'dashboard';

/**
 * Normalizes pathname or hash to our supported routes:
 * - '/' or '' => 'home'
 * - '/Menu', '/menu' => 'menu'
 * - '/dashboard', '/admin' => 'dashboard'
 */
function parseCurrentRoute(): AppRoute {
  // 1. Check pathname first (standard HTML5 history)
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  if (path === '/menu') {
    return 'menu';
  }
  if (path === '/dashboard' || path === '/admin') {
    return 'dashboard';
  }

  // 2. Fallback check for hash (#/Menu, #menu)
  const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '').replace(/\/+$/, '');
  if (hash === 'menu') {
    return 'menu';
  }
  if (hash === 'dashboard' || hash === 'admin') {
    return 'dashboard';
  }

  return 'home';
}

function FriscaMainApp() {
  const { isAdminAuthenticated, setIsAdminAuthenticated } = useFrisca();
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(parseCurrentRoute);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedDish, setPreselectedDish] = useState<string | undefined>(undefined);

  // Synchronize browser history and route navigation
  const navigateTo = useCallback((route: AppRoute, replace = false) => {
    setCurrentRoute(route);

    let targetPath = '/';
    if (route === 'menu') {
      targetPath = '/Menu';
    } else if (route === 'dashboard') {
      targetPath = '/dashboard';
    }

    if (window.location.pathname !== targetPath) {
      if (replace) {
        window.history.replaceState({ route }, '', targetPath);
      } else {
        window.history.pushState({ route }, '', targetPath);
      }
    }
  }, []);

  // Listen to popstate (Back / Forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const detected = parseCurrentRoute();
      setCurrentRoute(detected);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute]);

  const handleOpenBookingModal = (dish?: string) => {
    setPreselectedDish(dish);
    setIsBookingModalOpen(true);
  };

  // If dashboard route is active
  if (currentRoute === 'dashboard') {
    if (!isAdminAuthenticated) {
      return (
        <FriscaAdminLogin
          onLoginSuccess={() => {
            setIsAdminAuthenticated(true);
          }}
          onBackToSite={() => navigateTo('home')}
        />
      );
    }
    return <FriscaAdminDashboard onExit={() => navigateTo('home')} />;
  }

  return (
    <div className="min-h-screen bg-[#1a0508] text-white flex flex-col font-sans selection:bg-[#782229] selection:text-white">
      {currentRoute === 'home' ? (
        <>
          {/* Header & Navbar (Top Bar + Main Nav) */}
          <FriscaHeader
            currentPage="home"
            onNavigateToHome={() => navigateTo('home')}
            onNavigateToMenu={() => navigateTo('menu')}
            onOpenBookingModal={() => handleOpenBookingModal()}
            onOpenDashboard={() => navigateTo('dashboard')}
          />

          <main className="flex-1">
            {/* 1. Hero with Exciting Words, 2 Buttons, & 4 Stats Cards */}
            <FriscaHero
              onExploreMenu={() => navigateTo('menu')}
              onBookTable={() => handleOpenBookingModal()}
            />

            {/* 2. Frisca Identity (هوية فريسكا) */}
            <FriscaIdentity onOpenBookingModal={(hall) => handleOpenBookingModal(hall)} />

            {/* 3. Frisca Gallery (معرض فريسكا) */}
            <FriscaGallery />
          </main>

          {/* 4. Footer (الفوتر) */}
          <FriscaFooter
            onNavigateToHome={() => navigateTo('home')}
            onNavigateToMenu={() => navigateTo('menu')}
            onOpenBookingModal={() => handleOpenBookingModal()}
            onOpenDashboard={() => navigateTo('dashboard')}
          />
        </>
      ) : (
        /* Dedicated Menu Page on /Menu */
        <FriscaMenuPage
          onBackToHome={() => navigateTo('home')}
          onOpenBookingModal={(dish) => handleOpenBookingModal(dish)}
          onOpenDashboard={() => navigateTo('dashboard')}
        />
      )}

      {/* Shopping Cart Drawer */}
      <FriscaCartDrawer />

      {/* Booking Modal */}
      <FriscaBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preselectedDish={preselectedDish}
      />
    </div>
  );
}

export default function App() {
  return (
    <FriscaProvider>
      <FriscaMainApp />
    </FriscaProvider>
  );
}
