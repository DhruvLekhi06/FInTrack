import React from 'react';
import { useAppContext } from '../../context/AppContext.tsx';
import { Language } from '../../types.ts';

const languages: { code: Language; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'ta', name: 'தமிழ்' },
];

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useAppContext();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  return (
    <div className="w-full">
      <label htmlFor="language-select" className="sr-only">Select Language</label>
      <select
        id="language-select"
        value={language}
        onChange={handleLanguageChange}
        className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-accent focus:outline-none"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;