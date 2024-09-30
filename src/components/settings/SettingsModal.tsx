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
      <Dialog 
        as="div" 
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onClose}
        aria-labelledby="settings-modal-title"
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                id="settings-modal-title"
              >
                Settings
              </Dialog.Title>
              <div className="mt-4">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Language
                    </label>
                    <select
                      id="language-select"
                      value={tempLanguage}
                      onChange={(e) => setTempLanguage(e.target.value as Language)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      {/* Add more language options as needed */}
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {tempTheme === 'light' ? 'Light Mode' : 'Dark Mode'}
                      </span>
                      <label htmlFor="theme-toggle" className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          id="theme-toggle"
                          className="sr-only peer"
                          checked={tempTheme === 'dark'}
                          onChange={toggleTheme}
                          aria-label="Toggle dark mode"
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
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SettingsModal;