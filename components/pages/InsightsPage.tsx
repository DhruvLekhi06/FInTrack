import React, { useState, useEffect } from 'react';
import Card from '../common/Card.tsx';
import { useAppContext } from '../../context/AppContext.tsx';
import { getSpendingInsights } from '../../services/geminiService.ts';
import Icon from '../common/Icon.tsx';
import { Remarkable } from 'remarkable';
import { motion } from 'framer-motion';

const md = new Remarkable();

const InsightsPage: React.FC = () => {
    const { transactions } = useAppContext();
    const [insights, setInsights] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchInsights = async () => {
            setIsLoading(true);
            try {
                const result = await getSpendingInsights(transactions);
                setInsights(result);
            } catch (error) {
                console.error("Failed to fetch insights:", error);
                setInsights("Sorry, we couldn't generate insights right now. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        if (transactions.length > 0) {
            fetchInsights();
        } else {
            setInsights("No transaction data available to generate insights.");
            setIsLoading(false);
        }
    }, [transactions]);

    return (
        <Card>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Sparkles" className="text-accent-blue" />
                AI Spending Insights
            </h2>
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                        <Icon name="Loader" size={40} />
                    </motion.div>
                    <p className="mt-4">Analyzing your spending...</p>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="prose dark:prose-invert max-w-none prose-p:my-2 prose-li:my-1"
                    dangerouslySetInnerHTML={{ __html: md.render(insights) }}
                />
            )}
        </Card>
    );
};

export default InsightsPage;
