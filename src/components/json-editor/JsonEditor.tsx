import React, { useState, useCallback } from 'react';
import { JSONEditor, Content, JSONContent, OnChange } from 'vanilla-jsoneditor';
import { JSONPath } from 'jsonpath-plus';
import styles from './JsonEditor.module.css';

interface JsonEditorProps {
  
  initialJson: object;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ initialJson }) => {
  // Assign a sample JSON value if initialJson is empty
  const defaultJson = {
    "sample": "data",
    "number": 42,
    "nested": {
      "array": [1, 2, 3],
      "boolean": true
    }
  };

  const [jsonData, setJsonData] = useState<object>(
    Object.keys(initialJson).length === 0 ? defaultJson : initialJson
  );
  const [editor, setEditor] = useState<JSONEditor | null>(null);
  const [jsonPathExpression, setJsonPathExpression] = useState<string>('');
  const [filteredData, setFilteredData] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [suggestedJsonPaths, setSuggestedJsonPaths] = useState<Array<{path: string, label: string}>>([]);

  const refContainer = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      const ed = new JSONEditor({
        target: node,
        props: {
          content: { json: jsonData },
          onChange: ((content: Content) => {
            if ('json' in content && content.json !== undefined) {
              setJsonData(content.json as object);
            }
          }) as OnChange,
        }
      });
      setEditor(ed);
    }
  }, [jsonData]);

  const handleFormat = () => {
    if (editor) {
      editor.format();
    }
  };

  const handleCompact = () => {
    if (editor) {
      editor.compact();
    }
  };

  const handleRepair = () => {
    if (editor) {
      editor.repair();
    }
  };

  const handleTransform = (data: any) => {
    if (editor) {
      editor.transform(data);
    }
  };

  const handleSearch = () => {
    if (editor) {
      editor.search();
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Implement your analysis logic here
    // This is a simple example, you might want to use a more sophisticated algorithm
    const paths: Array<{path: string, label: string}> = [];
    const analyze = (obj: any, path: string = '$') => {
      if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
          const newPath = `${path}.${key}`;
          paths.push({ path: newPath, label: `${newPath} (${typeof obj[key]})` });
          analyze(obj[key], newPath);
        }
      }
    };
    analyze(jsonData);
    setSuggestedJsonPaths(paths);
    setIsAnalyzing(false);
  };

  const handleLoadSample = () => {
    const sampleJson = {
      name: "John Doe",
      age: 30,
      city: "New York",
      transactions: [
        { date: "2023-01-15", amount: 100 },
        { date: "2023-02-01", amount: 200 },
        { date: "2023-03-15", amount: 150 }
      ]
    };
    setJsonData(sampleJson);
    if (editor) {
      editor.set({ json: sampleJson });
    }
  };

  const handleFilter = () => {
    try {
      const result = JSONPath({ path: jsonPathExpression, json: jsonData });
      setFilteredData(result);
      setError(null);
    } catch (err) {
      setError('Invalid JSONPath expression');
      setFilteredData(null);
    }
  };
  return (
    <div className={styles.jsonEditorContainer}>
      <section id="json-editor" className={styles.jsonEditorSection}>
        <div className={styles.container}>
          <h2 className={styles.title}>JSON Editor</h2>
          <div className={styles.editorGrid}>
            <div className={styles.editorCard}>
              <h2 className={styles.cardTitle}>JSON Input</h2>
              <div ref={refContainer} className={styles.jsonEditorArea}></div>
              <div className={styles.buttonGroup}>
                <button
                  className={`${styles.button} ${styles.primaryButton}`}
                  onClick={handleFormat}
                >
                  Format
                </button>
                <button
                  className={`${styles.button} ${styles.primaryButton}`}
                  onClick={handleCompact}
                >
                  Compact
                </button>
                <button
                  className={`${styles.button} ${styles.primaryButton}`}
                  onClick={handleRepair}
                >
                  Repair
                </button>
                <button
                  className={`${styles.button} ${styles.primaryButton}`}
                  onClick={handleSearch}
                >
                  Search
                </button>
                <button
                  className={`${styles.button} ${styles.primaryButton}`}
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze JSON"}
                </button>
                <button
                  className={`${styles.button} ${styles.secondaryButton}`}
                  onClick={handleLoadSample}
                >
                  Load Sample JSON
                </button>
              </div>
            </div>
            <div className={styles.editorCard}>
              <h2 className={styles.cardTitle}>JSONPath Filter</h2>
              <div className={styles.filterInputGroup}>
                <input
                  type="text"
                  value={jsonPathExpression}
                  onChange={(e) => setJsonPathExpression(e.target.value)}
                  className={styles.input}
                  placeholder="Enter JSONPath expression"
                />
                <button
                  className={`${styles.button} ${styles.primaryButton}`}
                  onClick={handleFilter}
                >
                  Filter
                </button>
              </div>
              {error && <p className={styles.errorText}>{error}</p>}
              <div className={styles.selectGroup}>
                <label className={styles.label}>Select Suggested JSONPath: </label>
                {isAnalyzing ? (
                  <div className={styles.analyzingText}>Analyzing...</div>
                ) : (
                  <select
                    onChange={(e) => setJsonPathExpression(e.target.value)}
                    className={styles.select}
                  >
                    <option value="">Select a path</option>
                    {suggestedJsonPaths.map((suggestion: { path: string; label: string }, index: number) => (
                      <option key={index} value={suggestion.path}>
                        {suggestion.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>
          <div className={styles.editorCard}>
            <h2 className={styles.cardTitle}>Filtered Data:</h2>
            <pre className={styles.filteredDataOutput}>
              {JSON.stringify(filteredData, null, 2)}
            </pre>
          </div>
          <div className={styles.editorCard}>
            <h2 className={styles.cardTitle}>Few Tips</h2>
            <ul className={styles.tipsList}>
              <li>
                <code className={styles.codeSnippet}>$..name</code> - Selects all names
              </li>
              <li>
                <code className={styles.codeSnippet}>$..amount</code> - Selects all amounts
              </li>
              <li>
                <code className={styles.codeSnippet}>{"$..transactions[?(@.length > 0)]"}</code> - Selects all transactions with size greater than 0
              </li>
              <li>
                <code className={styles.codeSnippet}>{"$..transactions[?(@.date > \"2023-01-01\")]"}</code> - Selects all transactions with a date after 2023-01-01
              </li>
              <li>
                <code className={styles.codeSnippet}>{"$[?(@.amount > 150)]"}</code> - Selects all items where the amount is greater than 150
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JsonEditor;