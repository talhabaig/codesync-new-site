"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaEnvelope,
  FaShieldAlt,
} from "react-icons/fa";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });

  const router = useRouter();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log("Sign-in successfully", res);

      router.push("/admin/admindashboard");
      setEmail("");
      setPassword("");
    } catch (e) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
          {/* Header */}
          <div className="bg-blue-600 py-8 px-8 text-center relative">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <FaShieldAlt className="h-7 w-7 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Admin Portal</h2>
            <p className="text-blue-100 text-sm">
              Secure access to management dashboard
            </p>
          </div>

          {/* Form */}
          <div className="py-8 px-8">
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center animate-shake">
                <svg
                  className="w-5 h-5 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="font-medium text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSignin} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope
                      className={`h-5 w-5 transition-colors duration-300 ${
                        isFocused.email ? "text-blue-500" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="admin@example.com"
                    className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg 
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400
                    transition-all duration-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() =>
                      setIsFocused((prev) => ({ ...prev, email: true }))
                    }
                    onBlur={() =>
                      setIsFocused((prev) => ({ ...prev, email: false }))
                    }
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock
                      className={`h-5 w-5 transition-colors duration-300 ${
                        isFocused.password ? "text-blue-500" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="block w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg 
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400
                    transition-all duration-300"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() =>
                      setIsFocused((prev) => ({ ...prev, password: true }))
                    }
                    onBlur={() =>
                      setIsFocused((prev) => ({ ...prev, password: false }))
                    }
                  />

                  {/* Password Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5" />
                    ) : (
                      <FaEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg 
                font-semibold text-sm shadow-sm hover:bg-blue-700 transform hover:scale-[1.02]
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300
                flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <FaShieldAlt className="h-4 w-4" />
                    <span>Sign In to Dashboard</span>
                  </>
                )}
              </button>
            </form>

            {/* Security Note */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                🔒 Your credentials are encrypted and securely transmitted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
