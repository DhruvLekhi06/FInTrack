import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../common/Icon.tsx';
import ThemeToggle from './ThemeToggle.tsx';
import { NAV_ITEMS } from '../../constants.ts';

const Header: React.FC = () => {
  const location = useLocation();
  const currentNavItem = NAV_ITEMS.find(item => item.to === location.pathname);
  const pageTitle = currentNavItem ? currentNavItem.label : 'Settings';

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gray-100/80 dark:bg-navy/80 backdrop-blur-sm sticky top-0 z-30 p-4 sm:p-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-800"
    >
      <div>
        <h1 className="text-2xl font-bold">{pageTitle}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm hidden sm:block">Welcome back, User!</p>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <Icon name="Search" size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <Icon name="Bell" size={20} />
        </button>
        <ThemeToggle />
      </div>
    </motion.header>
  );
};

export default Header;