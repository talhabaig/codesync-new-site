"use client";
import React, { useState } from 'react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here, e.g., authenticate the admin with an API
    console.log('Admin Login:', { email, password });
  };

  return (
    <div className='sm:p-4 md:p-8 md:w-[500px]'>
      <div className="flex items-center justify-center bg-gray-100 p-4 md:p-12 max-w-[500px]">
        <div className="w-full bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-6">Admin Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
