/**
 * ABC Air Care - Multi-Page Master AC Repair & Maintenance Web Application
 * @license Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header, PageId } from './components/common/Header';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AIDiagnosisPage } from './pages/AIDiagnosisPage';
import { PricingPage } from './pages/PricingPage';
import { CoveragePage } from './pages/CoveragePage';
import { GalleryPage } from './pages/GalleryPage';
import { VideosPage } from './pages/VideosPage';
import { ThreeDLabPage } from './pages/ThreeDLabPage';
import { ContactPage } from './pages/ContactPage';
import { Footer } from './components/common/Footer';
import { FloatingCTABar } from './components/common/FloatingCTABar';
import { ScrollProgressBar } from './components/common/ScrollProgressBar';
import { ScrollToTopButton } from './components/common/ScrollToTopButton';
import { BookServiceModal } from './components/sections/BookServiceModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { SiteSettings } from './types';
import { initialSiteSettings } from './data/mockData';
import { Language } from './data/translations';
import { fetchSiteSettings } from './lib/api';

export default function App() {
  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings);
  const [language, setLanguage] = useState<Language>('roman'); // Defaults to Roman Urdu
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingServiceId, setBookingServiceId] = useState<string>('');
  const [bookingInitialNotes, setBookingInitialNotes] = useState<string>('');
  const [adminOpen, setAdminOpen] = useState(() => window.location.pathname.replace(/\/+$/, '') === '/admin');
  const [presetSymptom, setPresetSymptom] = useState<string>('');

  // Open the protected admin portal directly at /admin and support browser navigation.
  useEffect(() => {
    const syncAdminRoute = () => setAdminOpen(window.location.pathname.replace(/\/+$/, '') === '/admin');
    window.addEventListener('popstate', syncAdminRoute);
    return () => window.removeEventListener('popstate', syncAdminRoute);
  }, []);

  const closeAdmin = () => {
    setAdminOpen(false);
    if (window.location.pathname.replace(/\/+$/, '') === '/admin') {
      window.history.pushState({}, '', '/');
    }
  };

  // Synchronize hash with page state for deep-linking and browser navigation
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validPages: PageId[] = ['home', 'services', '3d-lab', 'videos', 'ai-diagnosis', 'pricing', 'coverage', 'gallery', 'contact'];
      if (validPages.includes(hash as PageId)) {
        setCurrentPage(hash as PageId);
      } else if (!hash) {
        setCurrentPage('home');
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : `#${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load latest settings on mount
  useEffect(() => {
    fetchSiteSettings().then((res) => {
      if (res) setSettings(res);
    });
  }, []);

  const handleOpenBooking = (serviceId?: string, notes?: string) => {
    setBookingServiceId(serviceId || 'ac-cooling-issue');
    setBookingInitialNotes(notes || '');
    setBookingOpen(true);
  };

  const handleSelectQuickSymptom = (symptom: string) => {
    setPresetSymptom(symptom);
  };

  const handleBookWithDiagnosis = (serviceId: string, problemDetails: string) => {
    handleOpenBooking(serviceId, problemDetails);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-cyan-500 selection:text-white pb-16 sm:pb-0">
      {/* Scroll-Driven Dynamic Progress Bar */}
      <ScrollProgressBar />

      {/* Header with Multi-Page Navigation and Roman Urdu / English Toggle */}
      <Header
        settings={settings}
        language={language}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onToggleLanguage={setLanguage}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Multi-Page Route Render with Page Entrance Animation */}
      <main className="flex-1 overflow-x-hidden">
        <div key={currentPage} className="animate-page-entrance">
          {currentPage === 'home' && (
            <HomePage
              settings={settings}
              language={language}
              onNavigate={handleNavigate}
              onOpenBooking={handleOpenBooking}
              onSelectQuickSymptom={handleSelectQuickSymptom}
            />
          )}

        {currentPage === 'services' && (
          <ServicesPage
            language={language}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentPage === '3d-lab' && (
          <ThreeDLabPage
            settings={settings}
            language={language}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentPage === 'videos' && (
          <VideosPage
            settings={settings}
            language={language}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentPage === 'ai-diagnosis' && (
          <AIDiagnosisPage
            language={language}
            presetSymptom={presetSymptom}
            onBookWithDiagnosis={handleBookWithDiagnosis}
          />
        )}

        {currentPage === 'pricing' && (
          <PricingPage
            settings={settings}
            language={language}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {currentPage === 'coverage' && (
          <CoveragePage
            settings={settings}
            language={language}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage
            language={language}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            settings={settings}
            language={language}
          />
        )}
        </div>
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        language={language}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Floating Bottom Bar for Mobile Visitors */}
      <FloatingCTABar
        settings={settings}
        language={language}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Floating Scroll to Top Button */}
      <ScrollToTopButton />

      {/* Book Service Modal */}
      <BookServiceModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        language={language}
        initialServiceId={bookingServiceId}
        initialNotes={bookingInitialNotes}
        settings={settings}
      />

      {/* Admin Portal Modal */}
      <AdminDashboard
        isOpen={adminOpen}
        onClose={closeAdmin}
        settings={settings}
        onUpdateSettings={(newSet) => setSettings(newSet)}
      />
    </div>
  );
}
