'use client';

import { ReactNode, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface LanguageWrapperProps {
  children: (t: (key: string) => string) => ReactNode;
}
export default function LanguageWrapper({ children }: LanguageWrapperProps) {
  const { language: currentLanguage, setLanguage } = useLanguage();

  // Define a translate function that returns the key if translation is not available
  const translate = (key: string): string => {
    // Here you would typically use your translation logic
    // For now, we'll just return the key
    return key;
  };

  useEffect(() => {
    // Load 'en' as default if no other language is selected
    if (!currentLanguage) {
      setLanguage('en');
    }
  }, [currentLanguage, setLanguage]);

  return <>{children(translate)}</>;
}