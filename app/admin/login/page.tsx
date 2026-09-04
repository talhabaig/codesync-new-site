"use client";

import React, { useEffect, useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaEnvelope,
  FaShieldAlt,
} from "react-icons/fa";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });
  const { login, loading, error, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/admin/admindashboard");
    }
  }, [isAuthenticated, router]);

  const isValidEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      return;
    }

    if (password.length < 6) {
      return;
    }

    try {
      await login({ email, password });
      setEmail("");
      setPassword("");
    } catch {
      // toast handled by react-query mutation onError
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
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

          <div className="py-8 px-8">
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                <span className="font-medium text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSignin} className="space-y-6">
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
                    placeholder="admin@admin.com"
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

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Credentials are sent securely to the CodeSyncs API
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
