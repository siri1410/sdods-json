"use client";

import { useState, useCallback } from 'react';
import { JSONEditor, Content } from 'vanilla-jsoneditor';
import { JSONPath } from 'jsonpath-plus';
import styles from './JsonEditor.module.css';
import Footer from '../layout-pages/Footer';

interface JsonEditorProps {
  initialJson: object;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ initialJson }) => {
  const [jsonData, setJsonData] = useState<object>(initialJson);
  const [editor, setEditor] = useState<JSONEditor | null>(null);
  const [jsonPathQuery, setJsonPathQuery] = useState<string>('');
  const [filteredOutput, setFilteredOutput] = useState<string>('');
  const [copyStatus, setCopyStatus] = useState<string>('');

  const refContainer = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      const ed = new JSONEditor({
        target: node,
        props: {
          content: { json: jsonData },
          onChange: (content: Content) => {
            if ('json' in content && content.json !== undefined) {
              setJsonData(content.json as object);
            }
          },
        }
      });
      setEditor(ed);
    }
  }, [jsonData]);

  const handleFormat = () => {
    if (editor) {
      const content = editor.get();
      if ('json' in content && content.json !== undefined) {
        const formattedJson = JSON.stringify(content.json, null, 2);
        editor.set({ json: JSON.parse(formattedJson) });
      }
    }
  };

  const handleMinify = () => {
    if (editor) {
      const content = editor.get();
      if ('json' in content && content.json !== undefined) {
        const minifiedJson = JSON.stringify(content.json);
        editor.set({ json: JSON.parse(minifiedJson) });
      }
    }
  };

  const handleCopy = async () => {
    if (editor) {
      const content = editor.get();
      if ('json' in content && content.json !== undefined) {
        try {
          await navigator.clipboard.writeText(JSON.stringify(content.json, null, 2));
          setCopyStatus('Copied!');
          setTimeout(() => setCopyStatus(''), 2000);
        } catch (err) {
          console.error('Failed to copy: ', err);
          setCopyStatus('Copy failed');
          setTimeout(() => setCopyStatus(''), 2000);
        }
      }
    }
  };

  const handleFilter = () => {
    try {
      const result = JSONPath({ path: jsonPathQuery, json: jsonData });
      setFilteredOutput(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error("Invalid JSONPath Expression or JSON input:", error);
      setFilteredOutput('Error: Invalid JSONPath Expression or JSON input');
    }
  };

  return (
    <div className={styles.jsonEditorContainer}>
      <section className={styles.jsonEditorSection}>
        <div className={styles.container}>
          <h2 className={styles.title}>JSON Editor</h2>
          <div className={styles.editorGrid}>
            <div className={styles.editorCard}>
              <h2 className={styles.cardTitle}>JSON Input</h2>
              <div ref={refContainer} className={styles.jsonEditorArea}></div>
              <div className={styles.buttonGroup}>
                <button className={styles.button} onClick={handleFormat}>Format</button>
                <button className={styles.button} onClick={handleMinify}>Minify</button>
                <button className={styles.button} onClick={handleCopy}>
                  {copyStatus || 'Copy'}
                </button>
              </div>
            </div>
            <div className={styles.editorCard}>
              <h2 className={styles.cardTitle}>JSONPath Filter</h2>
              <input
                type="text"
                value={jsonPathQuery}
                onChange={(e) => setJsonPathQuery(e.target.value)}
                className={styles.input}
                placeholder="Enter JSONPath query"
              />
              <button className={styles.button} onClick={handleFilter}>Filter</button>
              <pre className={styles.filteredDataOutput}>{filteredOutput}</pre>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default JsonEditor;



function setCopyStatus(status: string) {
  navigator.clipboard.writeText(status);
  setTimeout(() => setCopyStatus(''), 2000);
}



function setFilteredOutput(arg0: string) {
  throw new Error('Function not implemented.');
}

