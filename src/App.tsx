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
import { ContactPage } from './pages/ContactPage';
import { Footer } from './components/common/Footer';
import { FloatingCTABar } from './components/common/FloatingCTABar';
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
  const [adminOpen, setAdminOpen] = useState(false);
  const [presetSymptom, setPresetSymptom] = useState<string>('');

  // Synchronize hash with page state for deep-linking and browser navigation
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validPages: PageId[] = ['home', 'services', 'videos', 'ai-diagnosis', 'pricing', 'coverage', 'gallery', 'contact'];
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
      {/* Header with Multi-Page Navigation and Roman Urdu / English Toggle */}
      <Header
        settings={settings}
        language={language}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onToggleLanguage={setLanguage}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Multi-Page Route Render */}
      <main className="flex-1">
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
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        language={language}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Floating Bottom Bar for Mobile Visitors */}
      <FloatingCTABar
        settings={settings}
        language={language}
        onOpenBooking={() => handleOpenBooking()}
      />

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
        onClose={() => setAdminOpen(false)}
        settings={settings}
        onUpdateSettings={(newSet) => setSettings(newSet)}
      />
    </div>
  );
}
