import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../common/Card.tsx';
import { useAppContext } from '../../context/AppContext.tsx';
import { formatCurrency } from '../../utils/formatter.ts';

const TIME_VIEWS = ['Monthly', 'Weekly', 'Daily'];

const AnimatedBarChart: React.FC<{ data: { label: string, income: number, expense: number }[] }> = ({ data }) => {
    const maxVal = Math.max(...data.flatMap(d => [d.income, d.expense]));
    if (maxVal === 0) return <div className="h-64 flex items-center justify-center text-gray-500">No data available for this period.</div>;
    
    return (
        <div className="flex justify-around items-end h-64 space-x-2">
            {data.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="flex items-end h-full w-full justify-center gap-1">
                         <motion.div
                            className="w-1/2 bg-accent-green"
                            initial={{ height: 0 }}
                            animate={{ height: `${(item.income / maxVal) * 100}%` }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                         />
                         <motion.div
                            className="w-1/2 bg-accent-red"
                            initial={{ height: 0 }}
                            animate={{ height: `${(item.expense / maxVal) * 100}%` }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                         />
                    </div>
                    <span className="text-xs mt-2 text-gray-500">{item.label}</span>
                </div>
            ))}
        </div>
    );
};


const ReportsPage: React.FC = () => {
    const { transactions } = useAppContext();
    const [activeView, setActiveView] = useState(TIME_VIEWS[0]);

    // This is a simplified data generation logic. A real app would have more complex grouping.
    const chartData = useMemo(() => {
        if (activeView === 'Monthly') {
            return [
                { label: 'Dec', income: 50000, expense: 35000 },
                { label: 'Jan', income: 65000, expense: 42000 },
                { label: 'Feb', income: 75000, expense: 25000 },
            ];
        }
        if (activeView === 'Weekly') {
             return [
                { label: 'W1', income: 15000, expense: 8000 },
                { label: 'W2', income: 18000, expense: 12000 },
                { label: 'W3', income: 12000, expense: 9000 },
                { label: 'W4', income: 20000, expense: 11000 },
            ];
        }
         return [
            { label: 'Mon', income: 2000, expense: 1500 },
            { label: 'Tue', income: 2500, expense: 1800 },
            { label: 'Wed', income: 1800, expense: 2200 },
            { label: 'Thu', income: 3000, expense: 1200 },
            { label: 'Fri', income: 5000, expense: 3500 },
        ];
    }, [activeView, transactions]);
    
    return (
        <Card>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Income vs Expense</h2>
                 <div className="flex bg-gray-100 dark:bg-charcoal/50 p-1 rounded-lg">
                    {TIME_VIEWS.map(view => (
                        <button 
                            key={view} 
                            onClick={() => setActiveView(view)}
                            className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${activeView === view ? 'bg-white dark:bg-charcoal shadow' : 'text-gray-500'}`}
                        >
                            {view}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                 <motion.div
                    key={activeView}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                 >
                    <AnimatedBarChart data={chartData} />
                 </motion.div>
            </AnimatePresence>
        </Card>
    );
};

export default ReportsPage;