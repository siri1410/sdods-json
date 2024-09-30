import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import styles from './JsonEditor.module.css';
import Footer from '../layout-pages/Footer';
import JSONEditorReact from 'react-json-editor-ajrm';
import { ErrorBoundary } from 'react-error-boundary';
import Image from 'next/image';

type JSONEditorProps = React.ComponentProps<typeof JSONEditorReact>;

const DynamicJSONEditor = dynamic<JSONEditorProps>(
  () => import('react-json-editor-ajrm').then((mod) => mod.default),
  { ssr: false }
);

interface JsonEditorComponentProps {
  initialJson: object;
}

const JsonEditor: React.FC<JsonEditorComponentProps> = ({ initialJson }) => {
  const [jsonData, setJsonData] = useState<object>(initialJson);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isFormatted, setIsFormatted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [locale, setLocale] = useState<any>(null);
  const [copyMessage, setCopyMessage] = useState<string>('');

  const editorRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    import('react-json-editor-ajrm/locale/en')
      .then((module) => {
        setLocale(module.default);
      })
      .catch((error) => {
        console.error('Error loading locale:', error);
      });
  }, []);

  const handleJsonChange = (data: { jsObject?: object; json?: string; error?: any }) => {
    if (data.jsObject) {
      setJsonData(data.jsObject);
      setError(null);
    } else if (data.error) {
      setError(data.error.reason || 'Invalid JSON');
    }
  };

  const handleFormat = () => {
    try {
      // Parse and stringify the JSON to ensure it's valid
      const formattedJson = JSON.parse(JSON.stringify(jsonData, null, isFormatted ? 0 : 2));
      setJsonData(formattedJson);
      setIsFormatted(!isFormatted);
    } catch (error) {
      console.error('Error formatting JSON:', error);
      // Optionally, you can show an error message to the user here
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(jsonData, null, isFormatted ? 2 : undefined));
      setCopyMessage('Copied!');
      setTimeout(() => setCopyMessage(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      setCopyMessage('Failed to copy');
      setTimeout(() => setCopyMessage(''), 2000);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (!locale) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${styles.jsonEditorContainer} ${isDarkMode ? styles.darkMode : ''}`}>
      <section className={styles.jsonEditorSection}>
        <div className={styles.container}>
          <h1 className={styles.title}>Modern JSON Editor</h1>
          <div className={styles.controls}>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleTheme}
              />
              <span className={styles.slider}>
                <span className={styles.sliderIcon}>
                  {isDarkMode ? '🌙' : '☀️'}
                </span>
              </span>
            </label>
            <button onClick={handleFormat} className={styles.iconButton}>
              <Image
                src="/images/icons/format.png"
                alt="Format"
                width={24}
                height={24}
              />
            </button>
            <button onClick={handleCopy} className={styles.button}>
              Copy
              {copyMessage && <span className={styles.copyMessage}>{copyMessage}</span>}
            </button>
          </div>
          <div className={styles.editorWrapper}>
            {error && <div className={styles.error}>{error}</div>}
            {locale ? (
              <ErrorBoundary fallbackRender={() => <div>Something went wrong with the JSON editor. Please try again.</div>}>
                <DynamicJSONEditor
                  key={isDarkMode ? 'dark' : 'light'} // Add a key prop to force re-render on theme change
                  id="jsonEditor"
                  placeholder={jsonData}
                  locale={locale}
                  onChange={handleJsonChange}
                  // Remove the ref prop as it's not supported by JSONInputProperties
                  theme={isDarkMode ? 'dark_vscode_tribute' : 'light_mitsuketa_tribute'}
                  colors={{
                    default: isDarkMode ? '#d4d4d4' : '#000000',
                    background: isDarkMode ? '#1e1e1e' : '#ffffff',
                    background_warning: '#ffd700',
                    string: '#00ff00',
                    number: '#ffab00',
                    colon: '#ff00ff',
                    keys: '#59a5d8',
                    keys_whiteSpace: '#835fb6',
                    primitive: '#ff5500'
                  }}
                  height="400px"
                  width="100%"
                />
              </ErrorBoundary>
            ) : (
              <div>Loading editor...</div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default JsonEditor;
