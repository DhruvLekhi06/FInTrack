import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../context/AppContext.tsx';
import { formatCurrency, formatDate } from '../../utils/formatter.ts';
import Icon from '../common/Icon.tsx';
import Card from '../common/Card.tsx';

const TABS = ['SIPs', 'FDs', 'Stocks', 'Gold'];

const WealthPage: React.FC = () => {
    const { investments } = useAppContext();
    const [activeTab, setActiveTab] = useState(TABS[0]);

    const sips = investments.filter(inv => inv.type === 'sip');
    const fds = investments.filter(inv => inv.type === 'fd');
    const stocks = investments.filter(inv => inv.type === 'stocks');
    const gold = investments.filter(inv => inv.type === 'gold');

    const renderContent = () => {
        let content;
        switch (activeTab) {
            case 'SIPs':
                content = sips.map(sip => (
                    <div key={sip.id} className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border dark:border-gray-700 rounded-lg bg-white/50 dark:bg-charcoal/50">
                        <div><p className="font-bold">{sip.name}</p><p className="text-sm text-gray-500">SIP: {formatCurrency(sip.sipAmount!)}</p></div>
                        <div><p className="text-gray-500 dark:text-gray-400">Next Due</p><p className="font-semibold">{formatDate(sip.nextSipDate!)}</p></div>
                        <div><p className="text-gray-500 dark:text-gray-400">Current Value</p><p className="font-semibold">{formatCurrency(sip.currentValue)}</p></div>
                        <div><p className="text-gray-500 dark:text-gray-400">P&L</p><p className={`font-semibold ${sip.currentValue - sip.investedValue >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>{formatCurrency(sip.currentValue - sip.investedValue)}</p></div>
                    </div>
                ));
                break;
            case 'FDs':
                content = fds.map(fd => (
                    <div key={fd.id} className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border dark:border-gray-700 rounded-lg bg-white/50 dark:bg-charcoal/50">
                        <div><p className="font-bold">{fd.name}</p><p className="text-sm text-gray-500">Rate: {fd.interestRate}%</p></div>
                        <div><p className="text-gray-500 dark:text-gray-400">Maturity Date</p><p className="font-semibold">{formatDate(fd.maturityDate!)}</p></div>
                        <div><p className="text-gray-500 dark:text-gray-400">Invested</p><p className="font-semibold">{formatCurrency(fd.investedValue)}</p></div>
                        <div><p className="text-gray-500 dark:text-gray-400">Maturity Value</p><p className="font-semibold">{formatCurrency(fd.currentValue)}</p></div>
                    </div>
                ));
                break;
            case 'Stocks':
                 content = stocks.map(stock => (
                    <div key={stock.id} className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border dark:border-gray-700 rounded-lg bg-white/50 dark:bg-charcoal/50">
                        <p className="font-bold">{stock.name}</p>
                        <p className="font-semibold">{formatCurrency(stock.currentValue)}</p>
                        <p className={`font-semibold ${stock.currentValue - stock.investedValue >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>{formatCurrency(stock.currentValue - stock.investedValue)}</p>
                    </div>
                 ));
                 break;
             case 'Gold':
                 content = gold.map(g => (
                    <div key={g.id} className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border dark:border-gray-700 rounded-lg bg-white/50 dark:bg-charcoal/50">
                        <p className="font-bold">{g.name}</p>
                        <p className="font-semibold">{formatCurrency(g.currentValue)}</p>
                        <p className={`font-semibold ${g.currentValue - g.investedValue >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>{formatCurrency(g.currentValue - g.investedValue)}</p>
                    </div>
                 ));
                 break;
            default:
                content = null;
        }
        return <motion.div key={activeTab} initial={{ opacity: 0, y:10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y:-10 }} className="space-y-4">{content}</motion.div>;
    }

    return (
        <Card>
            <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
                {TABS.map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`relative px-6 py-3 text-lg font-semibold transition-colors shrink-0 ${activeTab === tab ? 'text-accent-blue' : 'text-gray-500 hover:text-accent-blue'}`}>
                        {tab}
                        {activeTab === tab && <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-accent-blue" layoutId="wealthTab" />}
                    </button>
                ))}
            </div>
            <AnimatePresence mode="wait">
                {renderContent()}
            </AnimatePresence>
        </Card>
    );
};

export default WealthPage;