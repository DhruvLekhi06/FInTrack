import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext.tsx';
import Card from '../common/Card.tsx';
import ProgressBar from '../common/ProgressBar.tsx';
import { formatCurrency, formatDate } from '../../utils/formatter.ts';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};


const GoalsPage: React.FC = () => {
  const { goals } = useAppContext();

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      {goals.map(goal => {
        const progress = (goal.currentAmount / goal.targetAmount) * 100;
        const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

        return (
          <Card key={goal.id} className="h-full flex flex-col justify-between">
              <div>
                  <h3 className="text-xl font-bold">{goal.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Deadline: {formatDate(goal.deadline)}</p>
                  <div className="my-4">
                      <p className="text-3xl font-bold">{formatCurrency(goal.currentAmount)}</p>
                      <p className="text-gray-500 dark:text-gray-400">of {formatCurrency(goal.targetAmount)}</p>
                  </div>
              </div>
              <div>
                  <ProgressBar progress={progress} colorClass="bg-accent-green" />
                  <p className="text-sm text-center mt-2 text-gray-500 dark:text-gray-400">
                      {daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
                  </p>
              </div>
          </Card>
        )
      })}
    </motion.div>
  );
};

export default GoalsPage;