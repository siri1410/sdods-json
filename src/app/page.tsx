"use client";

import React, { useState, useEffect } from 'react';
import { escapeHtml } from '../utils/escapeHtml';
import Spinner from '../components/Spinner';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ href, children }) => (
  <Link href={href} className="inline-block px-4 py-2 bg-gray-800 text-white border-2 border-blue-500 rounded font-semibold transition-colors duration-200 hover:bg-gray-700">
    {children}
  </Link>
);

const Page: React.FC = () => {
    // State declarations
    const [jsonData, setJsonData] = useState<any>({});
    const [jsonPathExpression, setJsonPathExpression] = useState<string>('$..*');
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [jsonpath, setJsonpath] = useState<any>(null);
    const [suggestedJsonPaths, setSuggestedJsonPaths] = useState<{ label: string; path: string }[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Load jsonpath dependency
    useEffect(() => {
        const loadDependencies = async () => {
            const jsonpathModule = await import('jsonpath');
            setJsonpath(jsonpathModule.default);
        };
        loadDependencies();
    }, []);

    // Function to generate suggested JSON paths
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

    // Handle JSON analysis
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

    // Handle JSON filtering
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

    // Load sample JSON data
    const handleLoadSample = () => {
        const initialData = {
            example: "This is a sample JSON object",
            number: 42,
            array: [1, 2, 3],
            nested: {
                key: "value"
            }
        };
        setJsonData(initialData);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-5xl font-bold mb-6">JSON Triage & Evaluator v2</h1>
                            <p className="text-xl mb-8">Powerful JSON manipulation and analysis tool for developers</p>
                            <Link href="#json-editor" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Feature Section */}
                <section className="py-16 bg-gray-100">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="text-4xl mb-4 text-blue-500">🔍</div>
                                <h3 className="text-xl font-semibold mb-2">JSON Analysis</h3>
                                <p>Analyze complex JSON structures with ease using our powerful analysis tools.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="text-4xl mb-4 text-green-500">🛠️</div>
                                <h3 className="text-xl font-semibold mb-2">JSONPath Filtering</h3>
                                <p>Use JSONPath expressions to filter and extract specific data from your JSON.</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="text-4xl mb-4 text-purple-500">📊</div>
                                <h3 className="text-xl font-semibold mb-2">Visualization</h3>
                                <p>Visualize your JSON data with interactive charts and graphs for better insights.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* JSON Editor Section */}
                <section id="json-editor" className="py-16 bg-gradient-to-r from-blue-100 to-purple-100">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">JSON Editor</h2>
                        {/* Existing JSON Editor content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h2 className="text-2xl font-semibold mb-4">JSON Input</h2>
                                <textarea
                                    className="w-full h-64 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={JSON.stringify(jsonData, null, 2)}
                                    onChange={(e) => {
                                        try {
                                            const newData = JSON.parse(e.target.value);
                                            setJsonData(newData);
                                        } catch (error) {
                                            console.error("Invalid JSON:", error);
                                        }
                                    }}
                                />
                                <div className="mt-4 flex space-x-4">
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                                        onClick={handleAnalyze}
                                        disabled={isAnalyzing}
                                    >
                                        {isAnalyzing ? 'Analyzing...' : 'Analyze JSON'}
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200"
                                        onClick={handleLoadSample}
                                    >
                                        Load Sample JSON
                                    </button>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h2 className="text-2xl font-semibold mb-4">JSONPath Filter</h2>
                                <div className="flex space-x-2 mb-4">
                                    <input
                                        type="text"
                                        value={jsonPathExpression}
                                        onChange={(e) => setJsonPathExpression(e.target.value)}
                                        className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                                        onClick={handleFilter}
                                    >
                                        Filter
                                    </button>
                                </div>
                                {error && <p className="text-red-500 mb-4">{error}</p>}
                                <div className="mb-4">
                                    <label className="block mb-2">Select Suggested JSONPath: </label>
                                    {isAnalyzing ? (
                                        <Spinner />
                                    ) : (
                                        <select 
                                            onChange={(e) => setJsonPathExpression(e.target.value)} 
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4">Filtered Data:</h2>
                            <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-64">{JSON.stringify(filteredData, null, 2)}</pre>
                        </div>
                        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4">Few Tips</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><code className="bg-gray-100 px-2 py-1 rounded">{escapeHtml('$..name')}</code> - Selects all names</li>
                                <li><code className="bg-gray-100 px-2 py-1 rounded">{escapeHtml('$..amount')}</code> - Selects all amounts</li>
                                <li><code className="bg-gray-100 px-2 py-1 rounded">{escapeHtml('$..transactions[?(@.length > 0)]')}</code> - Selects all transactions with size greater than 0</li>
                                <li><code className="bg-gray-100 px-2 py-1 rounded">{escapeHtml('$..transactions[?(@.date > "2023-01-01")]')}</code> - Selects all transactions with a date after 2023-01-01</li>
                                <li><code className="bg-gray-100 px-2 py-1 rounded">{escapeHtml('$[?(@.amount > 150)]')}</code> - Selects all items where the amount is greater than 150</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Page;