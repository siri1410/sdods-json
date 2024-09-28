import React from 'react'

const JsonEditor: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded p-4">
      <h2 className="text-xl font-semibold mb-4">JSON Editor</h2>
      <textarea
        className="w-full h-64 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your JSON here..."
      ></textarea>
    </div>
  )
}

export default JsonEditor