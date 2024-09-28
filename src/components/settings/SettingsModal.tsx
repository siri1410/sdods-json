"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Language } from "@/translations";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [tempLanguage, setTempLanguage] = useState<Language>(language);
  const [tempTheme, setTempTheme] = useState<'light' | 'dark'>(theme);
  const [isDeveloperMode, setIsDeveloperMode] = useState(false);

  useEffect(() => {
    setTempLanguage(language);
    setTempTheme(theme);
  }, [language, theme]);

  const handleSave = () => {
    setLanguage(tempLanguage);
    setTheme(tempTheme);
    onClose();
  };

  const toggleTheme = () => {
    setTempTheme(tempTheme === 'light' ? 'dark' : 'light');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Settings</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Language
            </label>
            <select
              id="language"
              value={tempLanguage}
              onChange={(e) => setTempLanguage(e.target.value as Language)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
          <div>
            <label htmlFor="theme" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Theme
            </label>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  tempTheme === 'light'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white'
                }`}
              >
                {tempTheme === 'light' ? 'Light' : 'Dark'}
              </button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {tempTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="developer-mode" className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                id="developer-mode"
                checked={isDeveloperMode}
                onChange={(e) => setIsDeveloperMode(e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Developer Mode</span>
            </label>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;