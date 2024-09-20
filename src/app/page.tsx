"use client";

import './globals.css';
import React, { useState, useEffect } from 'react';
import { escapeHtml } from '../utils/escapeHtml';
import { initialData, Data, Transaction } from '../data/initialData';
import Button from '@/components/Button';

const Page: React.FC = () => {
    const [jsonData, setJsonData] = useState<Data[]>([]);
    const [jsonPathExpression, setJsonPathExpression] = useState<string>('$..*');
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [jsonpath, setJsonpath] = useState<any>(null);
    const [suggestedJsonPaths, setSuggestedJsonPaths] = useState<{ label: string; path: string }[]>([]);

    useEffect(() => {
        const loadDependencies = async () => {
            const jsonpathModule = await import('jsonpath');
            setJsonpath(jsonpathModule.default);
            setJsonData(initialData);
        };
        loadDependencies();
    }, []);

    const generateSuggestedJsonPaths = (data: any): { label: string; path: string }[] => {
        const paths: { label: string; path: string }[] = [];
        const addPaths = (obj: any, currentPath: string = '$') => {
            if (Array.isArray(obj)) {
                paths.push({ label: `Array at ${currentPath}`, path: currentPath });
                if (obj.length > 0) addPaths(obj[0], `${currentPath}[*]`);
            } else if (typeof obj === 'object' && obj !== null) {
                for (const key in obj) {
                    const newPath = `${currentPath}.${key}`;
                    const value = obj[key];
                    const type = Array.isArray(value) ? 'array' : typeof value;
                    paths.push({ label: `${key} (${type}) at ${newPath}`, path: newPath });
                    addPaths(value, newPath);
                }
            }
        };
        addPaths(data);
        return paths;
    };

    const handleAnalyze = () => {
        const newSuggestedPaths = generateSuggestedJsonPaths(jsonData);
        setSuggestedJsonPaths(newSuggestedPaths);
    };

    const handleFilter = () => {
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
        <div className="container">
            <h1 className="title">Triage & Evaluator</h1>
            <div className="grid">
                <div className="column">
                    <h2>JSON Input</h2>
                    <textarea
                        className="textarea"
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
                    <Button variant="primary" onClick={handleAnalyze}>
                        Analyze JSON
                    </Button>
                </div>
                <div className="column">
                    <h2>JSONPath Filter</h2>
                    <div className="input-group">
                        <input
                            type="text"
                            value={jsonPathExpression}
                            onChange={(e) => setJsonPathExpression(e.target.value)}
                            className="input"
                        />
                        <Button variant="secondary" onClick={handleFilter}>Filter</Button>
                    </div>
                    {error && <p className="error">{error}</p>}
                    <div className="select-wrapper">
                        <label>Select Suggested JSONPath: </label>
                        <select onChange={(e) => setJsonPathExpression(e.target.value)} className="select">
                            <option value="">Select a path</option>
                            {suggestedJsonPaths.map((suggestion, index) => (
                                <option key={index} value={suggestion.path}>
                                    {suggestion.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="results">
                <h2>Filtered Data:</h2>
                <pre className="pre">{JSON.stringify(filteredData, null, 2)}</pre>
            </div>
            <div className="tips">
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