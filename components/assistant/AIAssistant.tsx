import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Remarkable } from 'remarkable';
import Icon from '../common/Icon.tsx';
import { useAppContext } from '../../context/AppContext.tsx';
import VoiceInput from './VoiceInput.tsx';

const md = new Remarkable();

const AIAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const { chatHistory, addChatMessage, isAiResponding } = useAppContext();
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSend = () => {
        if (message.trim()) {
            addChatMessage({ text: message, sender: 'user' });
            setMessage('');
        }
    };
    
    const handleVoiceResult = (transcript: string) => {
        setMessage(transcript);
        addChatMessage({ text: transcript, sender: 'user' });
        setMessage('');
    };

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 w-16 h-16 bg-accent-blue rounded-full text-white shadow-2xl flex items-center justify-center z-50 animate-float"
                aria-label="Open AI Assistant"
            >
                <Icon name="Sparkles" size={32} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="fixed bottom-28 right-8 w-[90vw] max-w-md h-[70vh] bg-off-white dark:bg-charcoal rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-200 dark:border-gray-700"
                    >
                        <header className="p-4 border-b dark:border-gray-700 flex justify-between items-center bg-white/50 dark:bg-navy/50 shrink-0">
                            <h3 className="text-lg font-bold">Your Financial Buddy</h3>
                            <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                                <Icon name="X" size={20} />
                            </button>
                        </header>

                        <div ref={chatContainerRef} className="flex-1 p-4 space-y-4 overflow-y-auto">
                            {chatHistory.length === 0 && (
                                <div className="text-center text-gray-500 h-full flex flex-col justify-center items-center">
                                    <Icon name="Bot" size={48} className="mb-4 text-gray-400" />
                                    <p>Ask me anything!</p>
                                    <p className="text-sm">e.g., "Can I afford a new phone?" or "Explain what an SIP is."</p>
                                </div>
                            )}
                            {chatHistory.map((chat) => (
                                <div key={chat.id} className={`flex items-end gap-2 ${chat.sender === 'user' ? 'justify-end' : ''}`}>
                                    {chat.sender === 'ai' && <Icon name="Bot" className="self-start text-accent-blue" />}
                                    <div className={`max-w-xs md:max-w-sm p-3 rounded-2xl ${chat.sender === 'user' ? 'bg-accent-blue text-white rounded-br-none' : 'bg-gray-100 dark:bg-gray-700 rounded-bl-none'}`}>
                                       <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: md.render(chat.text) }} />
                                    </div>
                                </div>
                            ))}
                             {isAiResponding && (
                                 <div className="flex items-end gap-2">
                                     <Icon name="Bot" className="self-start text-accent-blue" />
                                     <div className="max-w-xs p-3 rounded-2xl bg-gray-100 dark:bg-gray-700 rounded-bl-none">
                                         <div className="flex items-center gap-2">
                                             <span className="w-2 h-2 bg-accent-blue rounded-full animate-bounce"></span>
                                             <span className="w-2 h-2 bg-accent-blue rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                                             <span className="w-2 h-2 bg-accent-blue rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                                         </div>
                                     </div>
                                 </div>
                             )}
                        </div>

                        <footer className="p-4 border-t dark:border-gray-700 bg-white/50 dark:bg-navy/50 shrink-0">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && !isAiResponding && handleSend()}
                                    placeholder="Ask a question..."
                                    className="flex-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 border-transparent focus:ring-2 focus:ring-accent-blue"
                                    disabled={isAiResponding}
                                />
                                <VoiceInput onTranscript={handleVoiceResult} disabled={isAiResponding} />
                                <button onClick={handleSend} disabled={isAiResponding} className="p-2 bg-accent-blue text-white rounded-lg disabled:bg-opacity-50">
                                    <Icon name="Send" size={20} />
                                </button>
                            </div>
                        </footer>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIAssistant;