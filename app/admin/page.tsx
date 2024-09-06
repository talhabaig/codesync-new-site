"use client";
import React, { useState } from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '@/app/firebase/config'
import {useRouter} from 'next/navigation'

const AdminLogin =()=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Email validation function using regex
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error message before validation

    // Frontend validation
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

  
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log("Sign-in successfully", { res });
      router.push("/admin/admindashboard");
      setEmail("");
      setPassword("");
    } catch (e) {
      console.error("sign-in error. please enter valid credentials", e);
      setError("Invalid email or password. Please try again.");
    } finally {
      
    }
  };

  return (
    <div className='sm:p-4 md:p-8 md:w-[500px]'>
      <div className="flex items-center justify-center bg-gray-100 p-4 md:p-12 max-w-[500px]">
        <div className="w-full bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-6">Admin Login</h2>
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          <form onSubmit={handleSignin}>
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
};
export default AdminLogin