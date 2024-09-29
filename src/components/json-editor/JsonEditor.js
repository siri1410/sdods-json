"use client";

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { JSONPath } from 'jsonpath-plus';

const AceEditor = dynamic(
  async () => {
    const ace = await import('react-ace');
    await import('ace-builds/src-noconflict/mode-json');
    await import('ace-builds/src-noconflict/theme-github');
    return ace;
  },
  { ssr: false }
);

function JsonEditor() {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonPathQuery, setJsonPathQuery] = useState('');
  const [filteredOutput, setFilteredOutput] = useState('');
  const [removeEmptyArrays, setRemoveEmptyArrays] = useState(false);
  const [removeNullValues, setRemoveNullValues] = useState(false);
  const [removeEmptyStrings, setRemoveEmptyStrings] = useState(false);

  const handleInputChange = (value) => {
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

  return (
    <div className="json-editor">
      <div className="editor-container">
        <AceEditor
          mode="json"
          theme="github"
          onChange={handleInputChange}
          name="json-input"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            useWorker: false
          }}
          value={jsonInput}
          width="100%"
          height="400px"
        />
      </div>

      <div className="jsonpath-filter">
        <h3>JsonPath Filter</h3>
        <input
          type="text"
          value={jsonPathQuery}
          onChange={(e) => setJsonPathQuery(e.target.value)}
          placeholder="Enter JSONPath query"
        />
        <div className="filter-data">
          <h4>Filter Data</h4>
          <div>
            <label>
              <input
                type="checkbox"
                checked={removeEmptyArrays}
                onChange={(e) => setRemoveEmptyArrays(e.target.checked)}
              />
              Remove empty arrays
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={removeNullValues}
                onChange={(e) => setRemoveNullValues(e.target.checked)}
              />
              Remove null values
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={removeEmptyStrings}
                onChange={(e) => setRemoveEmptyStrings(e.target.checked)}
              />
              Remove empty strings
            </label>
          </div>
        </div>
        <button onClick={handleFilter}>Filter</button>
      </div>

      <div className="output-container">
        <h3>Filtered Output</h3>
        <AceEditor
          mode="json"
          theme="github"
          name="json-output"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            useWorker: false,
            readOnly: true
          }}
          value={filteredOutput}
          width="100%"
          height="400px"
        />
      </div>
    </div>
  );
}

export default JsonEditor;