import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdEmail, MdArrowBack } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { authService } from '../../services/authService';

export default function CheckEmailPage() {
  const location = useLocation();
  const email = location.state?.email || new URLSearchParams(location.search).get('email') || '';
  const [isSending, setIsSending] = React.useState(false);

  const handleResend = async () => {
    if (!email) return toast.error('No email available to resend to');
    try {
      setIsSending(true);
      const res = await authService.forgotPassword(email);
      toast.success(res.message || 'Reset link resent');
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Failed to resend link');
    } finally {
      setIsSending(false);
    }
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

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Card header */}
            <div className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                  <MdEmail className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Check Your Email
              </h1>
              
              <p className="text-gray-600 text-base md:text-lg max-w-xs mx-auto">
                We have sent a password reset link to <span className="font-medium text-gray-900">{email}</span>
              </p>
            </div>

            {/* Card content */}
            <div className="p-8 pt-0">
              <button
                type="button"
                onClick={() => {
                  if (!email) return toast.error('No email address available');
                  window.open(`mailto:${email}`);
                }}
                disabled={!email}
                className="w-full bg-blue-600:bg-blue-700 text-white font-medium py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Open Email App
              </button>
              
              <div className="my-8 border-t border-gray-200" />
              
              <div className="text-center">
                <p className="text-gray-600 text-sm">
                  Didn't receive the email?
                </p>
                <button
                  onClick={handleResend}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Resend Link
                </button>
              </div>
            </div>

            {/* Card footer */}
            <div className="px-8 py-6 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-center">
                <Link 
                  to="/auth/forgot-password" 
                  className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  <MdArrowBack className="h-4 w-4 mr-1" />
                  Back to Forgot Password
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}