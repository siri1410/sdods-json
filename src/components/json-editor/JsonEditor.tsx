"use client";

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { JSONPath } from 'jsonpath-plus';

const AceEditor = dynamic(
  async () => {
    const ace = await import('react-ace');
    await import('ace-builds/src-noconflict/mode-json');
    await import('ace-builds/src-noconflict/theme-monokai');
    return ace;
  },
  { ssr: false }
);

interface JsonEditorProps {
  initialJson: string;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ initialJson }) => {
  const [jsonInput, setJsonInput] = useState(initialJson);
  const [jsonPathQuery, setJsonPathQuery] = useState('');
  const [filteredOutput, setFilteredOutput] = useState('');
  const [removeEmptyArrays, setRemoveEmptyArrays] = useState(false);
  const [removeNullValues, setRemoveNullValues] = useState(false);
  const [removeEmptyStrings, setRemoveEmptyStrings] = useState(false);

  useEffect(() => {
    setJsonInput(initialJson);
  }, [initialJson]);

  const handleInputChange = (value: string) => {
    setJsonInput(value);
  };

  const handleFilter = () => {
    try {
      const result = JSONPath({ path: jsonPathQuery, json: JSON.parse(jsonInput) });
      setFilteredOutput(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error("Invalid JSONPath Expression or JSON input:", error);
      setFilteredOutput('Error: Invalid JSONPath Expression or JSON input');
    }
  };

  const editorOptions = {
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    showLineNumbers: true,
    tabSize: 2,
  };

  return (
    <div className="json-editor bg-gray-100 p-6 rounded-lg shadow-lg">
      <div className="editor-container mb-6">
        <h3 className="text-xl font-semibold mb-2">JSON Input</h3>
        <AceEditor
          mode="json"
          theme="monokai"
          onChange={handleInputChange}
          name="json-input"
          editorProps={{ $blockScrolling: true }}
          setOptions={editorOptions}
          value={jsonInput}
          width="100%"
          height="400px"
          className="rounded-md"
        />
        <div className="mt-2 space-x-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded" onClick={() => {}}>Format</button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded" onClick={() => {}}>Minify</button>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded" onClick={() => {}}>Copy</button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" onClick={() => setJsonInput('')}>Clear</button>
        </div>
      </div>

      <div className="jsonpath-filter mb-6">
        <h3 className="text-xl font-semibold mb-2">JSONPath Filter</h3>
        <input
          type="text"
          value={jsonPathQuery}
          onChange={(e) => setJsonPathQuery(e.target.value)}
          placeholder="Enter JSONPath query"
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <div className="filter-data mb-2">
          <h4 className="font-medium mb-1">Filter Options</h4>
          <div className="space-y-1">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={removeEmptyArrays}
                onChange={(e) => setRemoveEmptyArrays(e.target.checked)}
                className="mr-2"
              />
              Remove empty arrays
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={removeNullValues}
                onChange={(e) => setRemoveNullValues(e.target.checked)}
                className="mr-2"
              />
              Remove null values
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={removeEmptyStrings}
                onChange={(e) => setRemoveEmptyStrings(e.target.checked)}
                className="mr-2"
              />
              Remove empty strings
            </label>
          </div>
        </div>
        <button 
          onClick={handleFilter}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
        >
          Filter
        </button>
      </div>

      <div className="output-container">
        <h3 className="text-xl font-semibold mb-2">Filtered Output</h3>
        <AceEditor
          mode="json"
          theme="monokai"
          name="json-output"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            ...editorOptions,
            readOnly: true
          }}
          value={filteredOutput}
          width="100%"
          height="400px"
          className="rounded-md"
        />
        <div className="mt-2 space-x-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded" onClick={() => {}}>Format</button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded" onClick={() => {}}>Minify</button>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded" onClick={() => {}}>Copy</button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" onClick={() => setFilteredOutput('')}>Clear</button>
        </div>
      </div>
    </div>
  );
};

export default JsonEditor;