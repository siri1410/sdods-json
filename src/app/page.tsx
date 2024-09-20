"use client";

import React, { useState, useEffect } from 'react';
import { escapeHtml } from '../utils/escapeHtml';
import { initialData, Data } from '../data/initialData';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, children, ...props }) => (
  <button className={`btn btn-${variant}`} {...props}>
    {children}
  </button>
);

import Spinner from '../components/Spinner';
import styles from './Page.module.css';

const Page: React.FC = () => {
    const [jsonData, setJsonData] = useState<Data[]>(initialData);
    const [jsonPathExpression, setJsonPathExpression] = useState<string>('$..*');
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [jsonpath, setJsonpath] = useState<any>(null);
    const [suggestedJsonPaths, setSuggestedJsonPaths] = useState<{ label: string; path: string }[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    useEffect(() => {
        const loadDependencies = async () => {
            const jsonpathModule = await import('jsonpath');
            setJsonpath(jsonpathModule.default);
        };
        loadDependencies();
    }, []);

    const generateSuggestedJsonPaths = (data: any): { label: string; path: string }[] => {
        const paths: { label: string; path: string }[] = [];
        const addPaths = (obj: any, currentPath = '$'): void => {
            if (Array.isArray(obj)) {
                paths.push({ label: `Array at ${currentPath}`, path: currentPath });
                if (obj.length > 0) addPaths(obj[0], `${currentPath}[*]`);
            } else if (typeof obj === 'object' && obj !== null) {
                Object.entries(obj).forEach(([key, value]) => {
                    const newPath = `${currentPath}.${key}`;
                    const type = Array.isArray(value) ? 'array' : typeof value;
                    paths.push({ label: `${key} (${type}) at ${newPath}`, path: newPath });
                    addPaths(value, newPath);
                });
            }
        };
        addPaths(data);
        return paths;
    };

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        try {
            // Simulate an async operation
            await new Promise(resolve => setTimeout(resolve, 1000));
            const newSuggestedPaths = generateSuggestedJsonPaths(jsonData);
            setSuggestedJsonPaths(newSuggestedPaths);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleFilter = (): void => {
        if (!jsonpath) return;
        try {
            const result = jsonpath.query(jsonData, jsonPathExpression);
            setFilteredData(result);
            setError(null);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(`Invalid JSONPath expression: ${err.message}`);
            } else {
                setError('An unknown error occurred');
            }
            setFilteredData([]);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <img src="/firebase-logo.png" alt="Firebase Logo" className={styles.logo} />
            </header>
            <h1 className={styles.title}>Triage & Evaluator v2</h1>
            <div className={styles.grid}>
                <div className={styles.column}>
                    <h2>JSON Input</h2>
                    <textarea
                        className={styles.textarea}
                        value={JSON.stringify(jsonData, null, 2)}
                        onChange={(e) => {
                            try {
                                const newData = JSON.parse(e.target.value);
                                setJsonData(newData);
                            } catch (error) {
                                console.error("Invalid JSON:", error);
                            }
                        }}
                        rows={10}
                    />
                    <div className={styles.buttonContainer}>
                        <Button variant="primary" onClick={handleAnalyze} disabled={isAnalyzing}>
                            {isAnalyzing ? 'Analyzing...' : 'Analyze JSON'}
                        </Button>
                    </div>
                </div>
                <div className={styles.column}>
                    <h2>JSONPath Filter</h2>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            value={jsonPathExpression}
                            onChange={(e) => setJsonPathExpression(e.target.value)}
                            className={styles.input}
                        />
                        <Button variant="secondary" onClick={handleFilter}>Filter</Button>
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <div className={styles.selectWrapper}>
                        <label>Select Suggested JSONPath: </label>
                        {isAnalyzing ? (
                            <Spinner />
                        ) : (
                            <select 
                                onChange={(e) => setJsonPathExpression(e.target.value)} 
                                className={styles.select}
                            >
                                <option value="">Select a path</option>
                                {suggestedJsonPaths.map((suggestion, index) => (
                                    <option key={index} value={suggestion.path}>
                                        {suggestion.label}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.results}>
                <h2>Filtered Data:</h2>
                <pre className={styles.pre}>{JSON.stringify(filteredData, null, 2)}</pre>
            </div>
            <div className={styles.tips}>
                <h2>Few Tips</h2>
                <ul>
                    <li><code>{escapeHtml('$..name')}</code> - Selects all names</li>
                    <li><code>{escapeHtml('$..amount')}</code> - Selects all amounts</li>
                    <li><code>{escapeHtml('$..transactions[?(@.length > 0)]')}</code> - Selects all transactions with size greater than 0</li>
                    <li><code>{escapeHtml('$..transactions[?(@.date > "2023-01-01")]')}</code> - Selects all transactions with a date after 2023-01-01</li>
                    <li><code>{escapeHtml('$[?(@.amount > 150)]')}</code> - Selects all items where the amount is greater than 150</li>
                </ul>
            </div>
        </div>
    );
};

export default Page;