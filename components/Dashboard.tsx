import React, { useState, useEffect } from 'react';
import { Transaction, Budget, Goal, Account, User, Expense } from '../types';
import { useTranslation } from '../contexts/LanguageContext';
import { motion, Variants } from 'framer-motion';
import SummaryCard from './dashboard/SummaryCard';
import MonthlyBudget from './dashboard/MonthlyBudget';
import FinancialGoals from './dashboard/FinancialGoals';
import WeeklyExpenses from './dashboard/WeeklyExpenses';
import TipOfTheDay from './dashboard/TipOfTheDay';
import Button from './ui/Button';
import Modal from './ui/Modal';

interface DashboardProps {
  transactions: Transaction[];
  budgets: Budget[];
  goals: Goal[];
  accounts: Account[];
  currentUser: User;
}

const WelcomeModal: React.FC<{ isOpen: boolean; onClose: () => void; userName: string; }> = ({ isOpen, onClose, userName }) => (
    <Modal isOpen={isOpen} onClose={onClose} title="Welcome to FinTrack!">
        <div className="space-y-4 text-sm text-[var(--text-secondary)]">
            <p>Hi {userName},</p>
            <p>Welcome aboard! We're thrilled to have you join the FinTrack family. You've just taken the first and most important step towards mastering your finances.</p>
            <p className="font-semibold text-[var(--text-primary)]">With FinTrack, you can:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Track all your income and expenses in one place.</li>
                <li>Set and crush your financial goals.</li>
                <li>Monitor your investments and watch your wealth grow.</li>
                <li>Get personalized insights from our AI Advisor.</li>
            </ul>
            <p>To get started, we recommend linking your first account or adding a few recent transactions.</p>
            <p className="font-semibold text-center pt-2 text-[var(--text-primary)]">Happy tracking!</p>
            <Button onClick={onClose} className="w-full mt-4">Get Started</Button>
        </div>
    </Modal>
);

const Dashboard: React.FC<DashboardProps> = ({ transactions, budgets, goals, accounts, currentUser }) => {
  const { t, language } = useTranslation();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  
  useEffect(() => {
    const isNewUser = sessionStorage.getItem('isNewUser');
    if (isNewUser) {
        setShowWelcomeModal(true);
        sessionStorage.removeItem('isNewUser');
    }
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };
  
  const today = new Date();
  const dateString = today.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const expenses = transactions.filter((t): t is Expense => t.type === 'expense');
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalSavings = totalIncome - totalExpenses;

  return (
    <div className="space-y-8">
       <WelcomeModal isOpen={showWelcomeModal} onClose={() => setShowWelcomeModal(false)} userName={currentUser.name} />
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)]">{t('dashboard.title')} {currentUser.name}!</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1">{dateString}</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard title={t('dashboard.totalBalance')} amount={totalBalance} transactions={transactions} />
        <SummaryCard title={t('dashboard.income')} amount={totalIncome} transactions={transactions} type="income" />
        <SummaryCard title={t('dashboard.expenses')} amount={totalExpenses} transactions={transactions} type="expense" />
        <SummaryCard title={t('dashboard.savings')} amount={totalSavings} transactions={transactions} />
      </motion.div>
      
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <MonthlyBudget budgets={budgets} expenses={expenses} />
          </div>
          <div className="lg:col-span-3">
             <FinancialGoals goals={goals} />
          </div>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WeeklyExpenses transactions={transactions} />
          <TipOfTheDay />
      </motion.div>

    </div>
  );
};

export default Dashboard;