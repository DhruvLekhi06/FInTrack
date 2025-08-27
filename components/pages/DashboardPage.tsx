import React, { useMemo, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useAppContext } from '../../context/AppContext.tsx';
import { formatCurrency, formatDate } from '../../utils/formatter.ts';
import Card from '../common/Card.tsx';
import Icon from '../common/Icon.tsx';
import ProgressBar from '../common/ProgressBar.tsx';
import { CATEGORIES } from '../../constants.ts';

const AnimatedCounter: React.FC<{ value: number }> = ({ value }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => formatCurrency(Math.round(latest)));

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.5, ease: "easeOut" });
    return controls.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const DashboardPage: React.FC = () => {
  const { transactions, investments, budgets, goals, subscriptions } = useAppContext();

  const summary = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const balance = income - expense;
    return { income, expense, balance };
  }, [transactions]);

  const categorySpending = useMemo(() => {
    const spending = new Map<string, number>();
    transactions
      .filter(tx => tx.type === 'expense')
      .forEach(tx => {
        spending.set(tx.category, (spending.get(tx.category) || 0) + tx.amount);
      });
    return Array.from(spending.entries())
      .map(([categoryId, amount]) => ({
        category: CATEGORIES.find(c => c.id === categoryId),
        amount,
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
  }, [transactions]);
  
  const totalSpending = categorySpending.reduce((sum, item) => sum + item.amount, 0);


  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {/* Summary Cards */}
      <Card className="lg:col-span-1 xl:col-span-1 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-navy">
        <h3 className="font-bold text-lg mb-2">Current Balance</h3>
        <p className="text-3xl font-extrabold text-accent-blue"><AnimatedCounter value={summary.balance} /></p>
      </Card>
      <Card className="lg:col-span-1 xl:col-span-1">
        <h3 className="font-bold text-lg mb-2 text-green-500">Total Income</h3>
        <p className="text-2xl font-bold"><AnimatedCounter value={summary.income} /></p>
      </Card>
      <Card className="lg:col-span-1 xl:col-span-1">
        <h3 className="font-bold text-lg mb-2 text-red-500">Total Expense</h3>
        <p className="text-2xl font-bold"><AnimatedCounter value={summary.expense} /></p>
      </Card>
      <Card className="lg:col-span-1 xl:col-span-1">
        <h3 className="font-bold text-lg mb-2 text-indigo-500">Investments</h3>
        <p className="text-2xl font-bold"><AnimatedCounter value={investments.reduce((acc, inv) => acc + inv.currentValue, 0)} /></p>
      </Card>

      {/* Spending Breakdown & Budgets */}
      <Card className="lg:col-span-3 xl:col-span-2">
         <h3 className="font-bold text-lg mb-4">Spending Breakdown</h3>
         <div className="space-y-3">
             {categorySpending.map(({ category, amount }) => (
                 <div key={category?.id}>
                     <div className="flex justify-between mb-1 text-sm">
                         <span className="font-medium">{category?.name}</span>
                         <span className="font-semibold">{formatCurrency(amount)}</span>
                     </div>
                     <ProgressBar progress={(amount / totalSpending) * 100} colorClass="bg-accent-blue" />
                 </div>
             ))}
         </div>
      </Card>

      <Card className="lg:col-span-3 xl:col-span-2">
        <h3 className="font-bold text-lg mb-4">Budget Status</h3>
        <div className="space-y-4">
          {budgets.map(budget => {
            const category = CATEGORIES.find(c => c.id === budget.categoryId);
            const spent = transactions
              .filter(t => t.category === budget.categoryId && t.type === 'expense')
              .reduce((acc, t) => acc + t.amount, 0);
            const progress = (spent / budget.limit) * 100;
            return (
              <div key={budget.categoryId}>
                <div className="flex justify-between items-end mb-1">
                  <span className="font-medium">{category?.name}</span>
                  <div className="text-sm">
                    <span className="font-semibold">{formatCurrency(spent)}</span>
                    <span className="text-gray-500"> / {formatCurrency(budget.limit)}</span>
                  </div>
                </div>
                <ProgressBar progress={progress} colorClass={progress > 100 ? 'bg-accent-red' : 'bg-accent-green'} />
              </div>
            )
          })}
        </div>
      </Card>

      {/* Goals & Subscriptions */}
      <Card className="lg:col-span-2 xl:col-span-2">
        <h3 className="font-bold text-lg mb-4">Active Goals</h3>
        <div className="space-y-4">
          {goals.slice(0, 3).map(goal => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            return (
              <div key={goal.id}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{goal.name}</span>
                  <span className="text-sm font-semibold">{Math.round(progress)}%</span>
                </div>
                <ProgressBar progress={progress} colorClass="bg-accent-green" />
              </div>
            )
          })}
        </div>
      </Card>
      <Card className="lg:col-span-2 xl:col-span-2">
        <h3 className="font-bold text-lg mb-4">Upcoming Subscriptions</h3>
        <ul className="space-y-3">
            {subscriptions.map(sub => (
                <li key={sub.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Icon name={sub.icon} size={20} className="text-gray-500" />
                        <span className="font-medium">{sub.name}</span>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold">{formatCurrency(sub.amount)}</p>
                        <p className="text-sm text-gray-500">{formatDate(sub.nextBillDate)}</p>
                    </div>
                </li>
            ))}
        </ul>
      </Card>
    </motion.div>
  );
};

export default DashboardPage;