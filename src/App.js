import React, { useState } from 'react';
import jsonpath from 'jsonpath';
import './App.css';

function App() {
    const [jsonData, setJsonData] = useState([
        { name: 'Sireesh', amount: 100, transactions: [{ date: '2024-01-01', type: 'purchase' }] },
        { name: 'Siri1410', amount: 200, transactions: [{ date: '2027-02-15', type: 'deposit' }] },
    ]); // Sample JSON data
    const [jsonPathExpression, setJsonPathExpression] = useState('$..*');
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState(null);

    const generateSuggestedJsonPaths = (jsonData) => {
        const paths = [];
        const addPaths = (obj, currentPath) => {
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const newPath = `${currentPath}.${key}`;
                    const description = `Selects all ${key}`;
                    paths.push({ label: description, path: `$..${key}` });
                    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                        addPaths(obj[key], newPath);
                    }
                }
            }
        };
        addPaths(jsonData[0], '$');
        return paths;
    };

    const [suggestedJsonPaths, setSuggestedJsonPaths] = useState(generateSuggestedJsonPaths(jsonData));

    const handleFilter = () => {
        try {
            const result = jsonpath.query(jsonData, jsonPathExpression);
            setFilteredData(result);
            setError(null);
        } catch (err) {
            setError(`Invalid JSONPath expression: ${err.message}`);
            setFilteredData([]);
        }
    };

    return (
        <div className="App">
            <h2>Triage & Evaluator</h2>
            <textarea
                value={JSON.stringify(jsonData, null, 2)}
                onChange={(e) => {
                    const newData = JSON.parse(e.target.value);
                    setJsonData(newData);
                    setSuggestedJsonPaths(generateSuggestedJsonPaths(newData));
                }}
                rows={10}
                cols={50}
            />
            <br />
            <input
                type="text"
                value={jsonPathExpression}
                onChange={(e) => setJsonPathExpression(e.target.value)}
            />
            <button onClick={handleFilter}>Filter</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div style={{ marginBottom: '10px' }}>
                <label>Select Suggested JSONPath: </label>
                <select onChange={(e) => setJsonPathExpression(e.target.value)}>
                    {suggestedJsonPaths.map((suggestion, index) => (
                        <option key={index} value={suggestion.path}>
                            {suggestion.label}
                        </option>
                    ))}
                </select>
            </div>
            <h3>Filtered Data:</h3>
            <pre>{JSON.stringify(filteredData, null, 2)}</pre>
            <h3>Few Tips</h3>
            <ul>
                <li><code>$..name</code> - Selects all names</li>
                <li><code>$..amount</code> - Selects all amounts</li>
                <li><code>$..transactions[?(@.length > 0)]</code> - Selects all transactions with size greater than 0</li>
                <li><code>$..transactions[?(@.date > "2023-01-01")]</code> - Selects all transactions with a date after 2023-01-01</li>
                <li><code>$[?(@.amount > 150)]</code> - Selects all items where the amount is greater than 150</li>
            </ul>
        </div>
    );
}

export default App;
