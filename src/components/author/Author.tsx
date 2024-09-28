"use client";

import React from 'react';
import Image from 'next/image';
import Footer from '../../app/components/layout-pages/Footer';
import Header from '../../app/components/layout-pages/Header'; // Make sure this path is correct

const AuthorPage: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-4 text-center">Meet the Author</h1>
                    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                        <div className="flex flex-col md:flex-row items-center justify-center">
                            <div className="md:w-1/3 mb-8 md:mb-0">
                                <Image
                                    src="/images/author-portrait.jpg"
                                    alt="Author Portrait"
                                    width={300}
                                    height={300}
                                    className="rounded-full shadow-lg"
                                />
                            </div>
                            <div className="md:w-2/3 md:pl-8">
                                <h2 className="text-2xl font-semibold mb-4">Sireesh Yarlagadda</h2>
                                <p className="text-lg mb-4">
                                    Sireesh Yarlagadda is a visionary technologist and business strategist, 
                                    dedicated to bridging the gap between cutting-edge technology and 
                                    real-world business challenges. With over a decade of experience in 
                                    software development and digital transformation, Sireesh has become 
                                    a driving force in helping businesses leverage technology to achieve 
                                    unprecedented growth.
                                </p>
                                <p className="text-lg mb-4">
                                    As the creator of the Triage &amp; Evaluator tool, Sireesh combines his 
                                    deep understanding of data structures with a passion for simplifying 
                                    complex processes. This innovative tool is just one example of how 
                                    he's revolutionizing the way businesses interact with and analyze their data.
                                </p>
                                <p className="text-lg mb-4">
                                    Sireesh's unique approach to problem-solving involves:
                                </p>
                                <ul className="list-disc list-inside mb-4 pl-4">
                                    <li>Identifying key business pain points</li>
                                    <li>Developing tailored technological solutions</li>
                                    <li>Implementing strategies for seamless integration</li>
                                    <li>Fostering a culture of continuous innovation</li>
                                </ul>
                                <p className="text-lg italic bg-gray-100 p-4 rounded">
                                    "In the digital age, the synergy between business acumen and technological 
                                    prowess is not just an advantage—it's a necessity. My mission is to empower 
                                    organizations to harness this synergy, driving growth and innovation in 
                                    ways they never thought possible." - Sireesh Yarlagadda
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AuthorPage;