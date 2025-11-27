import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Education } from './components/Education';
import { Nutrition } from './components/Nutrition';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { EducationDetail } from './components/EducationDetail';
import { StructureDetail } from './components/StructureDetail';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { LegalPage } from './components/LegalPage';
import { CookieConsent } from './components/CookieConsent';
import { ContentProvider } from './contexts/ContentContext';
import { AdminAuth } from './components/admin/AdminAuth';
import { Dashboard } from './components/admin/Dashboard';
import { supabase } from './lib/supabaseClient';

type View = 'home' | 'education-detail' | 'structure' | 'contact' | 'privacy' | 'terms' | 'admin';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedLevelId, setSelectedLevelId] = useState<string>('');
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Smooth scroll implementation for anchor links logic when in home view
  useEffect(() => {
    if (currentView === 'home') {
       // Check if there is a hash in URL to scroll to
       const hash = window.location.hash;
       if (hash) {
         setTimeout(() => {
           const target = document.querySelector(hash);
           target?.scrollIntoView({ behavior: 'smooth' });
         }, 100);
       }
    }
  }, [currentView]);

  const handleNavigate = (page: string, id?: string) => {
    if (page === 'home') {
      setCurrentView('home');
      setSelectedLevelId('');
      window.history.pushState(null, '', '/');
    } else if (page === 'education-detail' && id) {
      setCurrentView('education-detail');
      setSelectedLevelId(id);
      window.history.pushState(null, '', `#${id}`);
    } else if (page === 'structure') {
      setCurrentView('structure');
      window.history.pushState(null, '', '/estrutura');
    } else if (page === 'contact') {
      setCurrentView('contact');
      window.history.pushState(null, '', '/contato');
    } else if (page === 'privacy') {
      setCurrentView('privacy');
      window.history.pushState(null, '', '/politica-de-privacidade');
    } else if (page === 'terms') {
      setCurrentView('terms');
      window.history.pushState(null, '', '/termos-de-uso');
    } else if (page === 'admin') {
      setCurrentView('admin');
      window.history.pushState(null, '', '/admin');
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'admin':
        return session 
          ? <Dashboard onLogout={() => supabase.auth.signOut()} />
          : <AdminAuth onLogin={() => {}} onBack={() => handleNavigate('home')} />;
      case 'education-detail':
        return <EducationDetail levelId={selectedLevelId} onBack={() => handleNavigate('home')} />;
      case 'structure':
        return <StructureDetail onBack={() => handleNavigate('home')} />;
      case 'contact':
        return <Contact isPage onBack={() => handleNavigate('home')} />;
      case 'privacy':
        return <LegalPage type="privacy" onBack={() => handleNavigate('home')} />;
      case 'terms':
        return <LegalPage type="terms" onBack={() => handleNavigate('home')} />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <Features />
            <Education onNavigate={handleNavigate} />
            <Nutrition />
            <Gallery />
          </>
        );
    }
  };

  return (
    <ContentProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col font-body text-casinha-brown selection:bg-casinha-light-green selection:text-casinha-brown">
        {currentView !== 'admin' && (
          <Navbar 
            onNavigate={handleNavigate} 
            transparentVariant={currentView === 'contact' ? 'light' : 'default'} 
          />
        )}
        
        {currentView !== 'admin' && <FloatingWhatsApp />}
        {currentView !== 'admin' && <CookieConsent />}
        
        <main className="flex-grow">
          {renderContent()}
        </main>
        
        {currentView !== 'admin' && <Footer onNavigate={handleNavigate} />}
      </div>
    </ContentProvider>
  );
};

export default App;