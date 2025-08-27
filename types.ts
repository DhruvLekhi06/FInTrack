export type Language = 'en' | 'hi' | 'kn' | 'bn' | 'ta';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string; // ISO string
  category: Category['id'];
  type: 'income' | 'expense';
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string; // ISO string
}

export interface Budget {
  categoryId: Category['id'];
  limit: number;
}

export interface Badge {
  id:string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

export type InvestmentType = 'sip' | 'fd' | 'stocks' | 'gold' | 'crypto';

export interface Investment {
  id: string;
  name: string;
  type: InvestmentType;
  investedValue: number;
  currentValue: number;
  // SIP specific
  sipAmount?: number;
  nextSipDate?: string;
  // FD specific
  maturityDate?: string;
  interestRate?: number;
}

export interface Subscription {
    id: string;
    name: string;
    amount: number;
    nextBillDate: string; // ISO string
    icon: string;
}

export interface CreditScore {
  score: number;
  provider: 'CIBIL' | 'Experian';
  lastUpdated: string; // ISO String
  status: 'Excellent' | 'Good' | 'Fair' | 'Poor';
}

export interface FinancialHealth {
    score: number; // 0-100
    summary: string;
}

export interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'ai';
}