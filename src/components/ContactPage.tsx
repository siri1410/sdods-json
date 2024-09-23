/**
 * A contact page component that allows users to send a message.
 *
 * This component uses React functional components and hooks to manage state and handle form submissions.
 */

'use client';

import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

import { db } from '../firebase/firebaseConfig'; // Assuming you have initialized Firebase
import { addDoc, collection } from '@firebase/firestore';


const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date(),
        status: "unread"
      });
      console.log("Document written with ID: ", docRef.id);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' }); // Clear form on success
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus('error');
    }
  };

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setTimeout(() => {
        setStatus('idle');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>
          <p className="mb-4 text-center">Get in touch with us using the form below:</p>
          {status === 'success' && (
            <div className="mb-4 p-2 bg-green-100 text-green-700 rounded text-center">
              Message sent successfully!
            </div>
          )}
          {status === 'error' && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">
              An error occurred. Please try again.
            </div>
          )}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 font-medium">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block mb-2 font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">Send Message</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;