import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { authService } from '../../services/authService';
import { CheckCircle } from 'lucide-react';

export default function EmailVerification() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

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
      } catch (error) {
        setError(error.message || 'Verification failed');
        toast.error('Email verification failed. Please try again.');
      } finally {
        setVerifying(false);
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-lg text-center">
        {verifying ? (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Verifying your email...</h2>
            <p className="text-gray-600">Please wait while we verify your email address.</p>
          </>
        ) : verified ? (
          <>
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Email Verified!</h2>
            <p className="text-gray-600 mb-6">
              Your email has been successfully verified. You can now login to your account.
            </p>
            <button
              onClick={() => navigate('/auth/login')}
              className="w-full py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Go to Login
            </button>
          </>
        ) : (
          <>
            <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl">✗</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => navigate('/auth/signup')}
              className="w-full py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Back to Signup
            </button>
          </>
        )}
      </div>
    </div>
  );
}