import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { MdLock, MdCheck } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { authService } from '../../services/authService';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      const res = await authService.forgotPassword(email.trim());
      toast.success(res.message || 'Check your email for reset instructions');
      setIsSubmitted(true);

      // route to check-email and pass the email so UI can show it
      navigate('/auth/check-email', { state: { email: email.trim() } });
    } catch (err) {
      console.error(err);
      const message = err.message || 'Failed to send reset instructions';
      toast.error(message);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail('');
    setError('');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1501594907352-04c994ea1c55?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80")'
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

     
    
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                  <MdLock className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Forgot Password?
              </h1>
              
              <p className="text-gray-600 text-base md:text-lg max-w-xs mx-auto">
                No worries, we'll send you reset instructions to your email.
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="p-8 pt-0">
                <div className="mb-6">
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      error ? 'border-red-500' : 'border-gray-200'
                    }`}
                    aria-invalid={!!error}
                    aria-describedby={error ? "email-error" : undefined}
                  />
                  {error && (
                    <p id="email-error" className="mt-1 text-sm text-red-500">
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 rounded-full transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reset Password
                </button>
              </form>
            ) : (
              <div className="p-8 pt-0 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <MdCheck className="h-8 w-8 text-green-600" />
                  </div>
                </div>
              </div>
            )}

            <div className="px-8 py-6 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-center">
                <Link 
                  to="/auth/login" 
                  className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  <IoArrowBack className="h-4 w-4 mr-1" />
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}