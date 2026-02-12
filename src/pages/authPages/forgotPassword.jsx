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
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden">
            <div className="p-6 sm:p-8 text-center">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-light-primary/30 flex items-center justify-center">
                  <MdLock className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                </div>
              </div>
              
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Forgot Password?
              </h1>
              
              <p className="text-sm sm:text-base text-gray-600 max-w-xs mx-auto">
                Enter your email to receive reset instructions.
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
                <div className="mb-6">
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={`w-full px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm sm:text-base ${
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
                  className="w-full bg-primary hover:bg-hover text-white font-medium py-2.5 sm:py-3.5 rounded-full transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isLoading ? 'Sending...' : 'Reset Password'}
                </button>
              </form>
            ) : (
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 text-center">
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <MdCheck className="h-7 w-7 sm:h-8 sm:w-8 text-green-600" />
                  </div>
                </div>
              </div>
            )}

            <div className="px-6 sm:px-8 py-4 sm:py-6 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-center">
                <Link 
                  to="/auth/login" 
                  className="flex items-center text-primary hover:text-hover font-medium transition-colors text-sm sm:text-base"
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