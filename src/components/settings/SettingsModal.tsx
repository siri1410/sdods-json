"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Language } from "@/translations";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }: SettingsModalProps) => {
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

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Settings
                </Dialog.Title>
                <div className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                    <label htmlFor="theme" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Theme
                    </label>
                    <div className="flex items-center">
                      <span className="mr-3 text-sm text-gray-700 dark:text-gray-300">
                        {tempTheme === 'light' ? 'Light Mode' : 'Dark Mode'}
                      </span>
                      <label htmlFor="theme-toggle" className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          id="theme-toggle"
                          className="sr-only peer"
                          checked={tempTheme === 'dark'}
                          onChange={toggleTheme}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="developer-mode"
                      checked={isDeveloperMode}
                      onChange={(e) => setIsDeveloperMode(e.target.checked)}
                      className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="developer-mode" className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Developer Mode
                    </label>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 border border-transparent rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SettingsModal;