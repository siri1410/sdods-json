"use client";

import JsonEditor from "@/components/json-editor/JsonEditor";
import React from "react";

const JSONEditorPage: React.FC = () => {
    const initialJson = {
        "name": "John Doe",
        "age": 30,
        "city": "New York"
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold mb-8">JSON Editor</h1>
            <p>Welcome to the JSON Editor. Here you can edit and analyze your JSON data.</p>
            <JsonEditor initialJson={JSON.stringify(initialJson)} />
        </div>
    );
};

export default JSONEditorPage;