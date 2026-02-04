import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { MdLock, MdVisibility, MdVisibilityOff, MdArrowBack, MdCheckCircle, MdWarning } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { authService } from '../../services/authService';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get email from state or URL params (prefer state passed from forgot-password)
  const params = new URLSearchParams(location.search);
  const tokenFromParams = params.get('token');
  const tokenFromRoute = (useParams && useParams().token) || tokenFromParams;
  const token = tokenFromRoute || location.state?.token || null;
  const email = location.state?.email || '';

  React.useEffect(() => {
    if (!token) {
      setErrors(prev => ({ ...prev, token: 'Invalid or missing reset token. Please request a new link.' }));
    }
  }, [token]);

  const validatePassword = (pwd) => {
    const errors = {};
    
    if (pwd.length < 8) {
      errors.length = 'Password must be at least 8 characters';
    }
    
    if (!/[A-Z]/.test(pwd)) {
      errors.uppercase = 'Must contain at least one uppercase letter';
    }
    
    if (!/[a-z]/.test(pwd)) {
      errors.lowercase = 'Must contain at least one lowercase letter';
    }
    
    if (!/[0-9]/.test(pwd)) {
      errors.number = 'Must contain at least one number';
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
      errors.special = 'Must contain at least one special character';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = {};
    
    if (!password) {
      validationErrors.password = 'Password is required';
    }
    
    if (!confirmPassword) {
      validationErrors.confirmPassword = 'Please confirm your password';
    }
    
    if (password && confirmPassword && password !== confirmPassword) {
      validationErrors.match = 'Passwords do not match';
    }
    
    const passwordErrors = validatePassword(password);
    if (Object.keys(passwordErrors).length > 0) {
      validationErrors.passwordStrength = passwordErrors;
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Clear errors
    setErrors({});

    if (!token) {
      const msg = 'Invalid or missing reset token. Request a new password reset.';
      toast.error(msg);
      setErrors(prev => ({ ...prev, token: msg }));
      return;
    }

    try {
      setIsLoading(true);
      const res = await authService.resetPassword(token, password, confirmPassword);
      toast.success(res.message || 'Password reset successfully');
      setIsSubmitted(true);

      // navigate to login (allow user to read success message briefly)
      setTimeout(() => handleSuccess(), 900);
    } catch (err) {
      console.error(err);
      // If server returned field-level errors, show them inline
      if (err.details && typeof err.details === 'object') {
        setErrors(err.details);
      }
      const message = err.message || 'Failed to reset password';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) strength++;
    
    if (strength <= 2) return { level: 'weak', color: 'bg-red-500', text: 'Weak' };
    if (strength <= 3) return { level: 'medium', color: 'bg-yellow-500', text: 'Medium' };
    return { level: 'strong', color: 'bg-green-500', text: 'Strong' };
  };

  const handleSuccess = () => {
    navigate('/login', { 
      state: { 
        message: 'Password reset successfully! Please login with your new password.',
        type: 'success'
      } 
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1501594907352-04c994ea1c55?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80")'
          }}
        />
      </div>
      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Card header */}
            <div className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                  <MdLock className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {isSubmitted ? 'Password Reset!' : 'Reset Password'}
              </h1>
              
              <p className="text-gray-600 text-base md:text-lg max-w-xs mx-auto">
                {isSubmitted 
                  ? 'Your password has been successfully reset. You can now login with your new password.' 
                  : 'Create a new secure password for your account'}
              </p>
            </div>

            {/* Card content */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="p-8 pt-0 space-y-6">
                {/* Password field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors(prev => ({ ...prev, password: '', passwordStrength: '' }));
                      }}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.password || errors.passwordStrength 
                          ? 'border-red-500' 
                          : password 
                          ? 'border-blue-500' 
                          : 'border-gray-200'
                      }`}
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <MdVisibilityOff className="h-5 w-5" />
                      ) : (
                        <MdVisibility className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {/* Password strength indicator */}
                  {password && (
                    <div className="mt-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`h-1 flex-1 rounded-full ${getPasswordStrength(password).color}`} />
                        <span className="text-xs font-medium text-gray-600">
                          {getPasswordStrength(password).text}
                        </span>
                      </div>
                      
                      {/* Password requirements */}
                      <div className="mt-2 space-y-1 text-xs">
                        {Object.entries({
                          length: password.length >= 8,
                          uppercase: /[A-Z]/.test(password),
                          lowercase: /[a-z]/.test(password),
                          number: /[0-9]/.test(password),
                          special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
                        }).map(([key, valid]) => (
                          <div key={key} className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${valid ? 'bg-green-500' : 'bg-gray-300'}`} />
                            <span className={`text-gray-600 ${valid ? 'line-through text-gray-400' : ''}`}>
                              {key === 'length' && 'At least 8 characters'}
                              {key === 'uppercase' && 'One uppercase letter'}
                              {key === 'lowercase' && 'One lowercase letter'}
                              {key === 'number' && 'One number'}
                              {key === 'special' && 'One special character (!@#$%^&*)'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <MdWarning className="h-4 w-4" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrors(prev => ({ ...prev, confirmPassword: '', match: '' }));
                      }}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.confirmPassword || errors.match
                          ? 'border-red-500'
                          : (confirmPassword && password === confirmPassword)
                          ? 'border-green-500'
                          : 'border-gray-200'
                      }`}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? (
                        <MdVisibilityOff className="h-5 w-5" />
                      ) : (
                        <MdVisibility className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <MdWarning className="h-4 w-4" />
                      {errors.confirmPassword}
                    </p>
                  )}

                  {errors.match && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <MdWarning className="h-4 w-4" />
                      {errors.match}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Resetting Password...
                    </span>
                  ) : (
                    'Reset Password'
                  )}
                </button>
              </form>
            ) : (
              <div className="p-8 pt-0 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <MdCheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Success!
                </h2>
                
                {email ? (
                  <div className="bg-blue-50 rounded-xl p-4 mb-6">
                    <p className="text-blue-800 font-medium">
                      <span className="font-bold">{email}</span>
                    </p>
                  </div>
                ) : (
                  <div className="bg-blue-50 rounded-xl p-4 mb-6">
                    <p className="text-blue-800 font-medium">You can now sign in with your new password.</p>
                  </div>
                )}

                <button
                  onClick={handleSuccess}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Go to Login
                </button>
              </div>
            )}

            {/* Card footer */}
            <div className="px-8 py-6 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-center">
                <Link 
                  to="/login" 
                  className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  <MdArrowBack className="h-4 w-4 mr-1" />
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