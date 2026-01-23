import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { authService } from '../../services/authService';
import { CheckCircle, XCircle, RotateCw } from 'lucide-react';

export default function EmailVerification() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      if (!token) {
        setError('Invalid verification link');
        setVerifying(false);
        toast.error('Invalid verification link');
        return;
      }

      try {
        await authService.verifyEmail(token);
        setVerified(true);
        toast.success('Email verified successfully!');
        setShowConfetti(true);
      } catch (err) {
        setError(err.message || 'Verification failed');
        toast.error('Email verification failed. Please try again.');
      } finally {
        setVerifying(false);
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
      
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-6 bg-red-500 rounded animate-fall`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative max-w-md w-full z-10">
        {verified && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md flex items-center gap-1">
              <CheckCircle size={14} /> Verified
            </div>
          </div>
        )}

        {/* Error Ribbon */}
        {!verifying && !verified && error && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-red-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md flex items-center gap-1">
              <XCircle size={14} /> Failed
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

          {verifying ? (
            <>
              <div className="relative inline-block">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 mx-auto mb-5"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <RotateCw className="h-8 w-8 text-blue-600 animate-pulse" />
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Verifying Your Email
              </h2>
              <p className="text-gray-600 text-sm">
                Almost there! We’re confirming your email address.
              </p>
            </>
          ) : verified ? (
            <>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-5">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Email Verified!</h2>
              <p className="text-gray-600 mb-7 px-4">
                Your account is now active. You can securely log in and start using Storehouse.
              </p>
              <button
                onClick={() => navigate('/auth/login')}
                className="w-full py-3.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Go to Login
              </button>
            </>
          ) : (
            <>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-5">
                <XCircle className="h-12 w-12 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Verification Failed</h2>
              <p className="text-red-600 font-medium mb-2">{error}</p>
              <p className="text-gray-600 mb-7 px-2 text-sm">
                The link may be expired or invalid. Please sign up again to receive a new verification email.
              </p>
              <button
                onClick={() => navigate('/auth/signup')}
                className="w-full py-3.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Back to Signup
              </button>
            </>
          )}
        </div>

        <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-blue-100 opacity-30 blur-xl"></div>
        <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-indigo-100 opacity-30 blur-xl"></div>
      </div>

      {/* Tailwind animation for confetti */}
      <style>
        {`
          @keyframes fall {
            0% { transform: translateY(0) rotate(0deg); }
            100% { transform: translateY(500px) rotate(360deg); }
          }
          .animate-fall {
            animation: fall 3s linear forwards;
          }
        `}
      </style>
    </div>
  );
}
