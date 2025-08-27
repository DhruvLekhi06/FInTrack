import { Category, Transaction, Goal, Budget, Badge, Investment, CreditScore, FinancialHealth, Subscription } from './types.ts';

export const CATEGORIES: Category[] = [
  { id: 'rent', name: 'Rent', icon: 'Home', color: 'text-blue-500' },
  { id: 'chai-coffee', name: 'Chai/Coffee', icon: 'Coffee', color: 'text-yellow-600' },
  { id: 'food-delivery', name: 'Zomato/Swiggy', icon: 'Bike', color: 'text-orange-500' },
  { id: 'transport', name: 'Ola/Uber', icon: 'Car', color: 'text-indigo-500' },
  { id: 'recharge', name: 'Recharge', icon: 'Smartphone', color: 'text-green-500' },
  { id: 'electricity', name: 'Electricity', icon: 'Zap', color: 'text-yellow-400' },
  { id: 'tuition', name: 'Tuition Fees', icon: 'BookOpen', color: 'text-purple-500' },
  { id: 'investments', name: 'Mutual Funds', icon: 'TrendingUp', color: 'text-teal-500' },
  { id: 'upi', name: 'UPI', icon: 'Repeat', color: 'text-pink-500' },
  { id: 'groceries', name: 'Groceries', icon: 'ShoppingCart', color: 'text-lime-500' },
  { id: 'salary', name: 'Salary', icon: 'Banknote', color: 'text-emerald-500' },
  { id: 'subscriptions', name: 'Subscriptions', icon: 'CalendarClock', color: 'text-rose-500' },
  { id: 'other', name: 'Other', icon: 'MoreHorizontal', color: 'text-gray-500' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', description: 'Salary', amount: 75000, date: new Date('2025-02-01').toISOString(), category: 'salary', type: 'income' },
  { id: '2', description: 'Rent', amount: 15000, date: new Date('2025-02-05').toISOString(), category: 'rent', type: 'expense' },
  { id: '3', description: 'Swiggy Dinner', amount: 450, date: new Date('2025-02-10').toISOString(), category: 'food-delivery', type: 'expense' },
  { id: '4', description: 'Morning Chai', amount: 20, date: new Date('2025-02-18').toISOString(), category: 'chai-coffee', type: 'expense' },
  { id: '5', description: 'Uber to office', amount: 180, date: new Date('2025-02-18').toISOString(), category: 'transport', type: 'expense' },
  { id: '6', description: 'Jio Recharge', amount: 299, date: new Date('2025-02-15').toISOString(), category: 'recharge', type: 'expense' },
  { id: '7', description: 'Nippon India MF', amount: 5000, date: new Date('2025-02-07').toISOString(), category: 'investments', type: 'expense' },
  { id: '8', description: 'Netflix', amount: 499, date: new Date('2025-02-20').toISOString(), category: 'subscriptions', type: 'expense' },
];

export const MOCK_GOALS: Goal[] = [
  { id: '1', name: 'Goa Trip', targetAmount: 25000, currentAmount: 12000, deadline: new Date('2025-12-31').toISOString() },
  { id: '2', name: 'New Bike', targetAmount: 120000, currentAmount: 45000, deadline: new Date('2026-06-30').toISOString() },
  { id: '3', name: 'Emergency Fund', targetAmount: 50000, currentAmount: 50000, deadline: new Date('2025-10-01').toISOString() },
];

export const MOCK_BUDGETS: Budget[] = [
  { categoryId: 'food-delivery', limit: 5000 },
  { categoryId: 'transport', limit: 3000 },
  { categoryId: 'chai-coffee', limit: 1000 },
];

export const MOCK_BADGES: Badge[] = [
    { id: '1', name: 'First 7 Days Tracked', description: 'Consistency is key!', unlocked: true, icon: 'CalendarCheck' },
    { id: '2', name: 'No Swiggy Streak', description: 'You resisted the temptation for 3 days.', unlocked: false, icon: 'BikeOff' },
    { id: '3', name: 'Saved ₹10k Milestone', description: 'Your savings are growing.', unlocked: true, icon: 'Milestone' },
    { id: '4', name: 'Budget Master', description: 'Stayed within all budgets this month.', unlocked: false, icon: 'Target' },
];

export const MOCK_INVESTMENTS: Investment[] = [
    { id: 'inv1', name: 'Parag Parikh Flexi Cap', type: 'sip', investedValue: 50000, currentValue: 62000, sipAmount: 5000, nextSipDate: new Date('2025-03-05').toISOString() },
    { id: 'inv2', name: 'HDFC Bank FD', type: 'fd', investedValue: 100000, currentValue: 103500, maturityDate: new Date('2025-08-15').toISOString(), interestRate: 7.2 },
    { id: 'inv3', name: 'Reliance Industries', type: 'stocks', investedValue: 45000, currentValue: 51000 },
    { id: 'inv4', name: 'Digital Gold', type: 'gold', investedValue: 25000, currentValue: 28000 },
];

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
    { id: 'sub1', name: 'Netflix', amount: 499, nextBillDate: new Date('2025-03-20').toISOString(), icon: 'Clapperboard' },
    { id: 'sub2', name: 'Spotify', amount: 129, nextBillDate: new Date('2025-03-15').toISOString(), icon: 'Music' },
    { id: 'sub3', name: 'Amazon Prime', amount: 299, nextBillDate: new Date('2025-03-28').toISOString(), icon: 'Package' },
];

export const MOCK_CREDIT_SCORE: CreditScore = {
    score: 780,
    provider: 'CIBIL',
    lastUpdated: new Date('2025-02-10').toISOString(),
    status: 'Excellent'
};

export const MOCK_FINANCIAL_HEALTH: FinancialHealth = {
    score: 82,
    summary: 'Looking great! Your savings rate is healthy and debt is low.'
};

export const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: 'LayoutDashboard' },
  { to: '/transactions', label: 'Transactions', icon: 'ArrowRightLeft' },
  { to: '/wealth', label: 'Wealth', icon: 'TrendingUp' },
  { to: '/goals', label: 'Goals', icon: 'Target' },
  { to: '/reports', label: 'Reports', icon: 'PieChart' },
  { to: '/insights', label: 'AI Insights', icon: 'Sparkles' },
];

export const translations = {
  en: {
    dashboard: "Dashboard",
    transactions: "Transactions",
    wealth: "Wealth",
    goals: "Goals",
    budgets: "Budgets",
    insights: "Insights",
    reports: "Reports",
    welcome: "Welcome Back",
    balance: "Balance",
    income: "Income",
    expense: "Expense",
    recent_transactions: "Recent Transactions",
    all_transactions: "See All",
    your_goals: "Your Goals",
    financial_health: "Financial Health",
    credit_score: "Credit Score",
    investments: "Investments",
    // Add more translations...
  },
  hi: {
    dashboard: "डैशबोर्ड",
    transactions: "लेन-देन",
    wealth: "धन",
    goals: "लक्ष्य",
    budgets: "बजट",
    insights: "अंतर्दृष्टि",
    reports: "रिपोर्ट",
    welcome: "वापसी पर स्वागत है",
    balance: "शेष",
    income: "आय",
    expense: "व्यय",
    recent_transactions: "हाल के लेन-देन",
    all_transactions: "सभी देखें",
    your_goals: "आपके लक्ष्य",
    financial_health: "वित्तीय स्वास्थ्य",
    credit_score: "क्रेडिट स्कोर",
    investments: "निवेश",
  },
  kn: {
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    transactions: "ವಹಿವಾಟುಗಳು",
    wealth: "ಸಂಪತ್ತು",
    goals: "ಗುರಿಗಳು",
    budgets: "ಬಜೆಟ್‌ಗಳು",
    insights: "ಒಳನೋಟಗಳು",
    reports: "ವರದಿಗಳು",
    welcome: "ಮರಳಿ ಸ್ವಾಗತ",
    balance: "ಬ್ಯಾಲೆನ್ಸ್",
    income: "ಆದಾಯ",
    expense: "ಖರ್ಚು",
    recent_transactions: "ಇತ್ತೀಚಿನ ವಹಿವಾಟುಗಳು",
    all_transactions: "ಎಲ್ಲವನ್ನೂ ನೋಡಿ",
    your_goals: "ನಿಮ್ಮ ಗುರಿಗಳು",
    financial_health: "ಹಣಕಾಸು ಆರೋಗ್ಯ",
    credit_score: "ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್",
    investments: "ಹೂಡಿಕೆಗಳು",
  },
  bn: {
    dashboard: "ড্যাশবোর্ড",
    transactions: "লেনদেন",
    wealth: "সম্পদ",
    goals: "লক্ষ্য",
    budgets: "বাজেট",
    insights: "अंतर्दृष्टि",
    reports: "রিপোর্ট",
    welcome: "আবারো স্বাগতম",
    balance: "ব্যালেন্স",
    income: "আয়",
    expense: "ব্যয়",
    recent_transactions: "সাম্প্রতিক লেনদেন",
    all_transactions: "সব দেখুন",
    your_goals: "আপনার লক্ষ্য",
    financial_health: "আর্থিক স্বাস্থ্য",
    credit_score: "ক্রেডিট স্কোর",
    investments: "বিনিয়োগ",
  },
  ta: {
    dashboard: "டேஷ்போர்டு",
    transactions: "பரிவர்த்தனைகள்",
    wealth: "செல்வம்",
    goals: "இலக்குகள்",
    budgets: "வரவு செலவு திட்டம்",
    insights: "உள்ளுணர்வுகள்",
    reports: "அறிக்கைகள்",
    welcome: "மீண்டும் வருக",
    balance: "இருப்பு",
    income: "வருமானம்",
    expense: "செலவு",
    recent_transactions: "சமீபத்திய பரிவர்த்தனைகள்",
    all_transactions: "அனைத்தையும் பார்க்கவும்",
    your_goals: "உங்கள் இலக்குகள்",
    financial_health: "நிதி ஆரோக்கியம்",
    credit_score: "கடன் மதிப்பெண்",
    investments: "முதலீடுகள்",
  },
};