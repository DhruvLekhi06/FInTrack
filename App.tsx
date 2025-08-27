import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext.tsx';
import Sidebar from './components/layout/Sidebar.tsx';
import Header from './components/layout/Header.tsx';
import DashboardPage from './components/pages/DashboardPage.tsx';
import TransactionsPage from './components/pages/TransactionsPage.tsx';
import WealthPage from './components/pages/WealthPage.tsx';
import GoalsPage from './components/pages/GoalsPage.tsx';
import ReportsPage from './components/pages/ReportsPage.tsx';
import SettingsPage from './components/pages/SettingsPage.tsx';
import InsightsPage from './components/pages/InsightsPage.tsx';
import AIAssistant from './components/assistant/AIAssistant.tsx';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion, Transition } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition: Transition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};


const App: React.FC = () => {
  const location = useLocation();

  return (
    <AppProvider>
      <div className="bg-gray-100 dark:bg-navy text-charcoal dark:text-off-white font-sans flex min-h-screen">
        <Toaster position="top-right" toastOptions={{
          className: 'dark:bg-charcoal dark:text-white shadow-lg',
        }}/>
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
             <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Routes location={location}>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/transactions" element={<TransactionsPage />} />
                  <Route path="/wealth" element={<WealthPage />} />
                  <Route path="/goals" element={<GoalsPage />} />
                  <Route path="/reports" element={<ReportsPage />} />
                  <Route path="/insights" element={<InsightsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
        <AIAssistant />
      </div>
    </AppProvider>
  );
};

export default App;