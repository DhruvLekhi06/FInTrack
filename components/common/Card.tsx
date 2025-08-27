import React, { ReactNode } from 'react';
import { motion, Variants, TargetAndTransition } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  whileHover?: TargetAndTransition;
}

const cardVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Card: React.FC<CardProps> = ({ children, className = '', whileHover = { y: -5 } }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover={whileHover}
      className={`bg-white dark:bg-charcoal rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700/50 p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;