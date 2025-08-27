import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import Icon from '../common/Icon.tsx';
import { NAV_ITEMS } from '../../constants.ts';

const sidebarVariants: Variants = {
  hidden: { x: -250 },
  visible: { x: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
};

const navItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1 + 0.3, ease: 'easeOut' },
  }),
};

const Sidebar: React.FC = () => {
  return (
    <motion.aside
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="w-64 bg-white dark:bg-charcoal border-r border-gray-200 dark:border-gray-800 flex-col justify-between p-6 hidden md:flex"
    >
      <div>
        <div className="flex items-center gap-2 mb-10">
          <Icon name="CircleDollarSign" className="text-accent-blue" size={36} />
          <span className="text-2xl font-bold text-charcoal dark:text-white">FinTrack</span>
        </div>

        <nav>
          <ul>
            {NAV_ITEMS.map((item, i) => (
              <motion.li key={item.to} custom={i} variants={navItemVariants}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 my-2 rounded-lg text-lg font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-accent-blue/10 text-accent-blue'
                        : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700/50'
                    }`
                  }
                >
                  <Icon name={item.icon} size={22} />
                  <span>{item.label}</span>
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1 } }}
      >
        <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 my-2 rounded-lg text-lg font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-accent-blue/10 text-accent-blue'
                  : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700/50'
              }`
            }
          >
          <Icon name="Settings" size={22} />
          <span>Settings</span>
        </NavLink>
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar;