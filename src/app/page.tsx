"use client";

import React, { useState, useEffect } from "react";
import Spinner from "../components/common/Spinner";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/layout-home/Footer";
import { JSONPath } from "jsonpath-plus";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ href, children, className }: ButtonProps) => (
  <Link
    href={href}
    className={`inline-block px-4 py-2 bg-gray-800 text-white border-2 border-blue-500 rounded font-semibold transition-colors duration-200 hover:bg-gray-700 ${className ?? ''}`}
  >
    {children}
  </Link>
);

const Page: React.FC = () => {
  const [jsonData, setJsonData] = useState<any>({});
  const [jsonPathExpression, setJsonPathExpression] = useState<string>("$..*");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [suggestedJsonPaths, setSuggestedJsonPaths] = useState<
    { label: string; path: string }[]
  >([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoadingJsonpath, setIsLoadingJsonpath] = useState(true);

  const generateSuggestedJsonPaths = (
    data: any
  ): { label: string; path: string }[] => {
    const paths: { label: string; path: string }[] = [];
    const addPaths = (obj: any, currentPath = "$"): void => {
      if (Array.isArray(obj)) {
        paths.push({ label: `Array at ${currentPath}`, path: currentPath });
        if (obj.length > 0) addPaths(obj[0], `${currentPath}[*]`);
      } else if (typeof obj === "object" && obj !== null) {
        Object.entries(obj).forEach(([key, value]) => {
          const newPath = `${currentPath}.${key}`;
          const type = Array.isArray(value) ? "array" : typeof value;
          paths.push({
            label: `${key} (${type}) at ${newPath}`,
            path: newPath,
          });
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newSuggestedPaths = generateSuggestedJsonPaths(jsonData);
      setSuggestedJsonPaths(newSuggestedPaths);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFilter = (): void => {
    try {
      const result = JSONPath({ path: jsonPathExpression, json: jsonData });
      setFilteredData(result);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Invalid JSONPath expression: ${err.message}`);
      } else {
        setError("An unknown error occurred");
      }
      setFilteredData([]);
    }
  };

  const handleLoadSample = (e: React.MouseEvent) => {
    e.preventDefault();
    const initialData = {
      example: "This is a sample JSON object",
      number: 42,
      array: [1, 2, 3],
      nested: {
        key: "value",
      },
    };
    setJsonData(initialData);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section id="hero" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Dev ToolBox</h1>
              <p className="text-xl mb-6">One place for all your developer needs.</p>
              <Link
                href="#json-editor"
                className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-blue-700 transition duration-300 shadow-lg"
              >
                Get Started
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
              <Button href="/" className="flex-grow sm:flex-1">Home</Button>
              <Button href="/contact" className="flex-grow sm:flex-1">Contact</Button>
              <Button href="/author" className="flex-grow sm:flex-1">Author</Button>
              <Button href="/isr" className="flex-grow sm:flex-1">ISR Demo</Button>
              <Button href="/ssg" className="flex-grow sm:flex-1">SSG</Button>
              <Button href="/ssr" className="flex-grow sm:flex-1">SSR</Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4 text-blue-500">🔍</div>
                <h3 className="text-xl font-semibold mb-2">JSON Analysis</h3>
                <p>
                  Analyze complex JSON structures with ease using our powerful
                  analysis tools.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4 text-green-500">🛠️</div>
                <h3 className="text-xl font-semibold mb-2">
                  JSONPath Filtering
                </h3>
                <p>
                  Use JSONPath expressions to filter and extract specific data
                  from your JSON.
                </p>
                <Link href="/json-editor" className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                  Try JSON Editor
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4 text-purple-500">📊</div>
                <h3 className="text-xl font-semibold mb-2">Visualization</h3>
                <p>
                  Visualize your JSON data with interactive charts and graphs
                  for better insights.
                </p>
              </div>
            </div>
          </div>
        </section>

        

        
      </main>
      <Footer />
    </div>
  );
};

export default Page;