import React from 'react'

const ModeSelector: React.FC = () => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Select Mode</h2>
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Mode 1</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Mode 2</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Mode 3</button>
      </div>
    </div>
  )
}

export default ModeSelector