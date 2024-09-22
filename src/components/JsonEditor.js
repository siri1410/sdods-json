import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';
import { JSONPath } from 'jsonpath-plus';

function JsonEditor() {
  // ... existing state variables ...

  const handleFilter = () => {
    try {
      const result = JSONPath({ path: jsonPathQuery, json: jsonInput });
      setFilteredOutput(result);
    } catch (error) {
      console.error("Invalid JSONPath Expression:", error);
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