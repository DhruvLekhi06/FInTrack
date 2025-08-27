import React from 'react';
import { motion } from 'framer-motion';
import Card from '../common/Card.tsx';
import Icon from '../common/Icon.tsx';
import ThemeToggle from '../layout/ThemeToggle.tsx';
import LanguageSelector from '../layout/LanguageSelector.tsx';

const SettingsPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card>
                    <h2 className="text-2xl font-bold mb-6">General Settings</h2>
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">Dark Mode</h3>
                                <p className="text-sm text-gray-500">Toggle between light and dark themes.</p>
                            </div>
                            <ThemeToggle />
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">Language</h3>
                                <p className="text-sm text-gray-500">Choose your preferred language.</p>
                            </div>
                            <div className="w-40">
                                <LanguageSelector />
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card>
                    <h2 className="text-2xl font-bold mb-6">Profile</h2>
                     <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-500">Name</label>
                            <input type="text" value="John Doe" readOnly className="w-full p-2 mt-1 rounded-lg bg-gray-100 dark:bg-gray-700 border-transparent"/>
                        </div>
                         <div>
                            <label className="text-sm font-medium text-gray-500">Email</label>
                            <input type="email" value="john.doe@example.com" readOnly className="w-full p-2 mt-1 rounded-lg bg-gray-100 dark:bg-gray-700 border-transparent"/>
                        </div>
                        <button className="px-4 py-2 font-semibold text-white bg-accent-blue rounded-lg">Edit Profile</button>
                     </div>
                </Card>
            </motion.div>
            
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card>
                    <h2 className="text-2xl font-bold mb-6">Danger Zone</h2>
                    <div className="flex justify-between items-center p-4 border border-red-500/50 bg-red-500/10 rounded-lg">
                       <div>
                           <h3 className="font-bold text-red-600 dark:text-red-400">Delete Account</h3>
                           <p className="text-sm text-red-600/80 dark:text-red-400/80">Permanently delete your account and all associated data.</p>
                       </div>
                       <button className="px-4 py-2 font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg">Delete</button>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};

export default SettingsPage;