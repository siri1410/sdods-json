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
        <div className="container mx-auto px-4 py-8">
            <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-8">
                        <h1 className="text-4xl font-bold mb-4">JSON Editor</h1>
                        <p className="text-xl mb-6">Welcome to the JSON Editor. Here you can edit and analyze your JSON data.</p>
                    </div>
                </div>
            </section>
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <JsonEditor initialJson={initialJson} />
                </div>
            </div>
        </div>
    );
};

export default JSONEditorPage;