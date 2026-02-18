import React, { useState, useCallback, useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

import Navbar from './primecfo/Navbar';
import Hero from './primecfo/Hero';
import Features from './primecfo/Features';
import Footer from './primecfo/Footer';
import Sidebar from './primecfo/Sidebar';
import DashboardView from './primecfo/DashboardView';
import ReportViewer from './primecfo/ReportViewer';
import AIInsights from './primecfo/AIInsights';
import ClientManager from './primecfo/ClientManager';
import QuickBooksConnect from './primecfo/QuickBooksConnect';
import SettingsPanel from './primecfo/SettingsPanel';
import LoginModal from './primecfo/LoginModal';

import {
  Client, mockClients, mockMetrics, monthlyChartData, mockInsights
} from '@/lib/financialData';

type ViewType = 'landing' | 'dashboard' | 'reports' | 'insights' | 'clients' | 'connect' | 'settings';

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();

  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [selectedClient, setSelectedClient] = useState<Client>(mockClients[0]);

  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const isLoggedIn = !!session;

  // Session persistence - listen for auth state changes
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      if (currentSession) {
        setCurrentView('dashboard');
      }
      setAuthLoading(false);
    });

    // Listen for auth changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);

        if (_event === 'SIGNED_IN' && newSession) {
          setCurrentView('dashboard');
        } else if (_event === 'SIGNED_OUT') {
          setCurrentView('landing');
          setUser(null);
          setSession(null);
        } else if (_event === 'PASSWORD_RECOVERY') {
          // User clicked password reset link - could show a password update form
          toast({ title: 'Password Recovery', description: 'You can now set a new password in Settings.' });
          setCurrentView('settings');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleNavigate = useCallback((view: string) => {
    // Protected routes - require auth
    if (['dashboard', 'reports', 'insights', 'clients', 'connect', 'settings'].includes(view)) {
      if (!session) {
        setShowLoginModal(true);
        return;
      }
    }
    setCurrentView(view as ViewType);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [session]);

  const handleLogin = useCallback(async () => {
    if (isLoggedIn) {
      // Sign out
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({ title: 'Error', description: 'Failed to sign out. Please try again.' });
        return;
      }
      setCurrentView('landing');
      toast({ title: 'Signed out', description: 'You have been signed out successfully.' });
    } else {
      setShowLoginModal(true);
    }
  }, [isLoggedIn]);

  const handleLoginComplete = useCallback(() => {
    // Auth state change listener will handle setting session/user
    // Just close modal and navigate
    setShowLoginModal(false);
    setCurrentView('dashboard');
    const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'there';
    toast({ title: `Welcome, ${displayName}!`, description: 'You are now signed in to PrimeCFO.ai' });
  }, [user]);

  const handleGetStarted = useCallback(() => {
    if (isLoggedIn) {
      setCurrentView('dashboard');
    } else {
      setShowLoginModal(true);
    }
  }, [isLoggedIn]);

  const handleAddClient = useCallback((newClient: Omit<Client, 'id' | 'qbStatus' | 'lastSync' | 'createdAt'>) => {
    const client: Client = {
      ...newClient,
      id: String(Date.now()),
      qbStatus: 'disconnected',
      lastSync: '',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setClients(prev => [...prev, client]);
    toast({ title: 'Client added', description: `${newClient.companyName} has been added successfully.` });
  }, []);

  const handleDeleteClient = useCallback((id: string) => {
    setClients(prev => prev.filter(c => c.id !== id));
    toast({ title: 'Client removed', description: 'The client has been removed.' });
  }, []);

  const handleSelectClient = useCallback((client: Client) => {
    setSelectedClient(client);
  }, []);

  const handleQBConnect = useCallback(() => {
    if (selectedClient) {
      const updated = clients.map(c =>
        c.id === selectedClient.id
          ? { ...c, qbStatus: 'connected' as const, lastSync: new Date().toISOString() }
          : c
      );
      setClients(updated);
      const updatedClient = updated.find(c => c.id === selectedClient.id)!;
      setSelectedClient(updatedClient);
      toast({ title: 'QuickBooks Connected', description: `${selectedClient.companyName} is now connected to QuickBooks.` });
    }
  }, [selectedClient, clients]);

  const handleQBDisconnect = useCallback(() => {
    if (selectedClient) {
      const updated = clients.map(c =>
        c.id === selectedClient.id
          ? { ...c, qbStatus: 'disconnected' as const, lastSync: '' }
          : c
      );
      setClients(updated);
      const updatedClient = updated.find(c => c.id === selectedClient.id)!;
      setSelectedClient(updatedClient);
      toast({ title: 'Disconnected', description: `${selectedClient.companyName} has been disconnected from QuickBooks.` });
    }
  }, [selectedClient, clients]);

  const handleQBSync = useCallback(() => {
    if (selectedClient) {
      const updated = clients.map(c =>
        c.id === selectedClient.id
          ? { ...c, lastSync: new Date().toISOString() }
          : c
      );
      setClients(updated);
      const updatedClient = updated.find(c => c.id === selectedClient.id)!;
      setSelectedClient(updatedClient);
      toast({ title: 'Sync Complete', description: 'Financial data has been updated from QuickBooks.' });
    }
  }, [selectedClient, clients]);

  const isDashboardView = isLoggedIn && currentView !== 'landing';

  // Show loading spinner while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
          <p className="text-sm text-slate-400">Loading PrimeCFO.ai...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardView
            metrics={mockMetrics}
            chartData={monthlyChartData}
            insights={mockInsights}
            client={selectedClient}
            onNavigate={handleNavigate}
          />
        );
      case 'reports':
        return <ReportViewer />;
      case 'insights':
        return <AIInsights insights={mockInsights} />;
      case 'clients':
        return (
          <ClientManager
            clients={clients}
            onSelectClient={handleSelectClient}
            onAddClient={handleAddClient}
            onDeleteClient={handleDeleteClient}
            onNavigate={handleNavigate}
          />
        );
      case 'connect':
        return (
          <QuickBooksConnect
            client={selectedClient}
            onConnect={handleQBConnect}
            onDisconnect={handleQBDisconnect}
            onSync={handleQBSync}
          />
        );
      case 'settings':
        return <SettingsPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
      />

      {/* Landing Page */}
      {currentView === 'landing' && (
        <>
          <Hero onGetStarted={handleGetStarted} />
          <Features onGetStarted={handleGetStarted} />
          <Footer onNavigate={handleNavigate} />
        </>
      )}

      {/* Dashboard Layout */}
      {isDashboardView && (
        <div className="flex">
          <Sidebar
            currentView={currentView}
            onNavigate={handleNavigate}
            selectedClient={selectedClient}
            clients={clients}
            onSelectClient={handleSelectClient}
            isOpen={sidebarOpen}
            onClose={toggleSidebar}
          />
          <main className="flex-1 lg:ml-64 min-h-[calc(100vh-4rem)]">
            <div className="p-6 lg:p-8 max-w-7xl">
              {renderContent()}
            </div>
          </main>

          {/* Mobile sidebar toggle */}
          {isMobile && !sidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="fixed bottom-6 left-6 z-30 w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-full shadow-xl shadow-teal-500/25 flex items-center justify-center lg:hidden"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginComplete}
      />
    </div>
  );
};

export default AppLayout;
