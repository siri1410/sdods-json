import React from 'react';

const ModeSelector = ({ mode, onModeChange }) => {
    const modes = ['tree', 'view', 'form', 'code', 'text'];

    return (
        <div>
            <label>Editor Mode: </label>
            <select value={mode} onChange={(e) => onModeChange(e.target.value)}>
                {modes.map((m) => (
                    <option key={m} value={m}>
                        {m.charAt(0).toUpperCase() + m.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ModeSelector;