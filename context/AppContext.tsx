import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Transaction, Goal, Budget, Badge, Language, Investment, CreditScore, FinancialHealth, ChatMessage, Subscription } from '../types.ts';
import { MOCK_TRANSACTIONS, MOCK_GOALS, MOCK_BUDGETS, MOCK_BADGES, translations, MOCK_INVESTMENTS, MOCK_CREDIT_SCORE, MOCK_FINANCIAL_HEALTH, MOCK_SUBSCRIPTIONS } from '../constants.ts';
import useLocalStorage from '../hooks/useLocalStorage.ts';
import { getAIAssistantResponse } from '../services/geminiService.ts';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  budgets: Budget[];
  setBudgets: (budgets: Budget[]) => void;
  badges: Badge[];
  investments: Investment[];
  subscriptions: Subscription[];
  creditScore: CreditScore;
  financialHealth: FinancialHealth;
  chatHistory: ChatMessage[];
  addChatMessage: (message: Omit<ChatMessage, 'id'>) => Promise<void>;
  isAiResponding: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'dark');
  const [language, setLanguage] = useLocalStorage<Language>('language', 'en');
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', MOCK_TRANSACTIONS);
  const [goals, setGoals] = useLocalStorage<Goal[]>('goals', MOCK_GOALS);
  const [budgets, setBudgets] = useLocalStorage<Budget[]>('budgets', MOCK_BUDGETS);
  const [badges] = useState<Badge[]>(MOCK_BADGES);
  const [investments] = useState<Investment[]>(MOCK_INVESTMENTS);
  const [subscriptions] = useState<Subscription[]>(MOCK_SUBSCRIPTIONS);
  const [creditScore] = useState<CreditScore>(MOCK_CREDIT_SCORE);
  const [financialHealth] = useState<FinancialHealth>(MOCK_FINANCIAL_HEALTH);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isAiResponding, setIsAiResponding] = useState(false);


  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const t = (key: keyof typeof translations['en']): string => {
    return translations[language][key] || translations['en'][key];
  };

  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...tx,
      id: new Date().getTime().toString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...goal,
      id: new Date().getTime().toString(),
    }
    setGoals(prev => [newGoal, ...prev]);
  }

  const addChatMessage = async (message: Omit<ChatMessage, 'id'>) => {
    const userMessage: ChatMessage = { ...message, id: new Date().getTime().toString() };
    setChatHistory(prev => [...prev, userMessage]);
    setIsAiResponding(true);

    try {
        const financialContext = { transactions, goals, investments, budgets, financialHealth, creditScore };
        const aiResponseText = await getAIAssistantResponse(message.text, [...chatHistory, userMessage], financialContext);
        
        const aiMessage: ChatMessage = { id: new Date().getTime().toString() + '-ai', text: aiResponseText, sender: 'ai' };
        setChatHistory(prev => [...prev.filter(m => m.id !== 'error'), aiMessage]);
    } catch (error) {
        console.error("AI Assistant Error:", error);
        const errorMessage: ChatMessage = { id: 'error', text: "Sorry, I'm having trouble connecting. Please try again later.", sender: 'ai' };
        setChatHistory(prev => [...prev, errorMessage]);
    } finally {
        setIsAiResponding(false);
    }
  };

  const value = {
    theme,
    toggleTheme,
    language,
    setLanguage,
    t,
    transactions,
    addTransaction,
    goals,
    addGoal,
    budgets,
    setBudgets,
    badges,
    investments,
    subscriptions,
    creditScore,
    financialHealth,
    chatHistory,
    addChatMessage,
    isAiResponding,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};