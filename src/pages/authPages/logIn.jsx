import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const { currentUser, refreshAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [retryCount, setRetryCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const MAX_RETRIES = 3;

  const [form, setForm] = useState({ email: "", password: "" });

  // ✅ Monitor network status periodically
  useEffect(() => {
    const checkNetworkStatus = () => {
      if (!navigator.onLine) {
        toast.error("No internet connection. Please check your network settings.", {
          id: 'offline-warning-login',
          duration: 8000,
          icon: '⚠️'
        });
      }
    };

    checkNetworkStatus();
    
    const interval = setInterval(checkNetworkStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard", { replace: true });
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleError = (error, attempt = 0) => {
    console.error('Login error (attempt ' + (attempt + 1) + '):', error);
    
    const isNetworkError = 
      error.message.toLowerCase().includes('network') || 
      error.message.toLowerCase().includes('failed to fetch') ||
      error.message.toLowerCase().includes('load resource') ||
      !navigator.onLine;
    
    if (isNetworkError) {
      if (attempt < MAX_RETRIES) {
        const nextAttempt = attempt + 1;
        setRetryCount(nextAttempt);
        
        toast.loading(
          `Connection issue. Retrying (${nextAttempt}/${MAX_RETRIES})...`,
          { id: 'network-retry-login', duration: 3000 }
        );
        
        setTimeout(() => {
          handleSubmit(null, nextAttempt);
        }, Math.pow(2, attempt) * 1000);
        
        return true; 
      } else {
        toast.error(
          "Unable to connect to server. Please check your internet connection and try again later.",
          { 
            id: 'network-error-login', 
            duration: 8000,
            icon: '📡'
          }
        );
        return false;
      }
    }
    
    const errorMessage = error.message.toLowerCase();
    
    if (errorMessage.includes('invalid') || errorMessage.includes('incorrect') || errorMessage.includes('401')) {
      setFormErrors({ password: "Invalid email or password" });
      toast.error("Invalid email or password. Please try again.", {
        duration: 6000,
        icon: '🔑'
      });
      return false;
    }
    
    // Email not verified
    if (errorMessage.includes('verify') || errorMessage.includes('verified')) {
      toast.custom((t) => (
        <div className="bg-white shadow-lg rounded-xl p-4 max-w-md border border-blue-200">
          <div className="flex items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <h3 className="font-bold text-gray-900">Verify your email</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Please check your inbox for the verification link. Didn't receive it?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    navigate('/auth/resend-verification', { state: { email: form.email } });
                  }}
                  className="flex-1 px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-hover transition"
                >
                  Resend verification
                </button>
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      ), {
        duration: Infinity,
        position: 'top-center'
      });
      return false;
    }
    
    // Account not found
    if (errorMessage.includes('not found') || errorMessage.includes('404') || errorMessage.includes('exist')) {
      setFormErrors({ email: "Account not found" });
      toast.error("No account found with this email. Please check your email or sign up.", {
        duration: 6000,
        icon: '🔍'
      });
      return false;
    }
    
    if (errorMessage.includes('rate') || errorMessage.includes('limit') || errorMessage.includes('429')) {
      toast.error("Too many login attempts. Please wait a few minutes before trying again.", {
        duration: 8000,
        icon: '⏳'
      });
      return false;
    }
    
    if (errorMessage.includes('server') || errorMessage.includes('500') || errorMessage.includes('internal')) {
      toast.error("Our servers are experiencing issues. Please try again in a few moments.", {
        duration: 7000,
        icon: '⚙️'
      });
      return false;
    }
    
    // Timeout error
    if (errorMessage.includes('timeout') || errorMessage.includes('timed out')) {
      toast.error("Request timed out. Please check your connection and try again.", {
        duration: 6000,
        icon: '⏱️'
      });
      return false;
    }
    
    // Generic error fallback
    toast.error(
      error.message || "We encountered an issue processing your request. Please try again.",
      {
        duration: 7000,
        icon: '❌',
        description: "If the problem persists, contact support@storehouse.com"
      }
    );
    return false;
  };

  const handleSubmit = async (e, retryAttempt = 0) => {
    if (e) e.preventDefault();
    
    // ✅ Check network connectivity
    if (!navigator.onLine) {
      toast.error("No internet connection. Please check your network settings and try again.", {
        duration: 8000,
        icon: '⚠️',
        id: 'no-internet-login'
      });
      return;
    }
    
    // ✅ Prevent duplicate submissions
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    // ✅ Validate form
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(form.email.trim())) {
      errors.email = "Invalid email format";
    }
    
    if (!form.password.trim()) {
      errors.password = "Password is required";
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      
      // Focus first error field
      const firstErrorField = errors.email ? 'email' : 'password';
      const fieldElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (fieldElement) {
        fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        fieldElement.focus({ preventScroll: true });
      }
      
      toast.error("Please correct the errors in the form before submitting.", {
        duration: 4000,
        icon: '📝'
      });
      
      setIsSubmitting(false);
      return;
    }
    
    const loginData = {
      email: form.email.trim().toLowerCase(),
      password: form.password,
    };
    
    setLoading(true);
    
    try {
      const result = await authService.login(loginData);
      
      refreshAuth();
      
      setForm({ email: "", password: "" });
      setFormErrors({});
      setRetryCount(0);
      setIsSubmitting(false);
      
      toast.success(
        `Welcome back, ${result.user.firstName || "there"}! 🎉`,
        { 
          duration: 5000,
          icon: '✅',
          id: 'login-success'
        }
      );
      
      const role = (result.user?.role || authService.getCurrentUser()?.role || '').toString().toLowerCase();
      const isAdmin = role === 'admin';

      const postLoginRedirect = localStorage.getItem('postLoginRedirect');
      if (postLoginRedirect) {
        try {
          const { pathname = '/', search = '', state } = JSON.parse(postLoginRedirect);

          // Prevent non-admin users from being redirected into the admin area
          if (pathname.startsWith('/admin') && !isAdmin) {
            localStorage.removeItem('postLoginRedirect');
            navigate('/dashboard', { replace: true });
            return;
          }

          // Admins are allowed to visit user pages as well; preserve redirect for valid paths
          localStorage.removeItem('postLoginRedirect');
          navigate(pathname + (search || ''), { state: state || {}, replace: true });
          return;
        } catch (error) {
          console.error('Invalid redirect data:', error);
          localStorage.removeItem('postLoginRedirect');
        }
      }

      // Default landing by role
      if (isAdmin) {
        navigate('/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
      
    } catch (error) {
      setIsSubmitting(false);
      setLoading(false);
      
      const willRetry = handleError(error, retryAttempt);
      
      if (!willRetry) {
        setRetryCount(0);
        setForm(prev => ({ ...prev, password: "" }));
      }
    }
  };

  return (
    <div className="min-h-screen w-full relative">
      <h1 className="text-white text-3xl font-bold text-center pt-18 z-10 relative">
        Sign in
      </h1>

      <div className="flex flex-col items-center justify-between py-8 px-4">
        <div className="flex-grow"></div>

        <div className="w-full max-w-md bg-white rounded-3xl p-6 border border-gray-300 shadow-xl z-10">
          <h2 className="text-center text-lg font-medium mb-5 text-black">
            Welcome Back To Storehouse
          </h2>

          {!navigator.onLine && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
              <div className="mt-0.5 text-amber-600 font-bold">⚠️</div>
              <div className="flex-1 text-amber-800 text-sm">
                <p className="font-medium">No internet connection</p>
                <p className="text-xs mt-1">Please check your network settings. You won't be able to log in until you're back online.</p>
              </div>
            </div>
          )}

          {retryCount > 0 && retryCount < MAX_RETRIES && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2">
              <div className="mt-0.5 text-blue-600 font-bold">🔁</div>
              <div className="flex-1 text-blue-800 text-sm">
                <p className="font-medium">Connection issue detected</p>
                <p className="text-xs mt-1">Attempting to reconnect ({retryCount}/{MAX_RETRIES})... Please stay on this page.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                Email {formErrors.email && <span className="text-red-500 ml-1">*</span>}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                disabled={loading || !navigator.onLine}
                placeholder="Enter your email"
                className={`w-full px-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  formErrors.email 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300'
                }`}
                autoComplete="email"
                aria-invalid={!!formErrors.email}
                aria-describedby={formErrors.email ? "emailError" : undefined}
              />
              {formErrors.email && (
                <p id="emailError" className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>•</span> {formErrors.email}
                </p>
              )}
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                Password {formErrors.password && <span className="text-red-500 ml-1">*</span>}
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                disabled={loading || !navigator.onLine}
                placeholder="Enter your password"
                className={`w-full px-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  formErrors.password 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300'
                }`}
                autoComplete="current-password"
                aria-invalid={!!formErrors.password}
                aria-describedby={formErrors.password ? "passwordError" : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                disabled={loading || !navigator.onLine}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div></div>
              <Link
                to="/auth/forgot-password"
                className={`text-xs hover:underline transition-colors ${
                  loading || !navigator.onLine
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-primary hover:text-hover"
                }`}
                aria-disabled={loading || !navigator.onLine}
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading || !navigator.onLine || isSubmitting || !form.email.trim() || !form.password.trim()}
              className={`w-full py-2.5 rounded-full font-medium text-sm transition-all duration-200 mb-4 ${
                loading || !navigator.onLine || isSubmitting || !form.email.trim() || !form.password.trim()
                  ? "bg-primary/50 cursor-not-allowed transform scale-100"
                  : "bg-primary hover:bg-hover active:bg-hover text-white shadow-sm hover:shadow-md transform hover:scale-[1.02]"
              } flex items-center justify-center`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>

            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              disabled={loading || !navigator.onLine}
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-full hover:bg-gray-50 active:bg-gray-100 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FcGoogle className="text-xl" />
              Sign in with Google
            </button>

            <p className="text-center text-xs mt-5 text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/auth/signup"
                className={`font-medium transition-colors ${
                  loading || !navigator.onLine
                    ? "text-primary/50 cursor-not-allowed"
                    : "text-primary hover:text-hover hover:underline"
                }`}
                aria-disabled={loading || !navigator.onLine}
              >
                Sign up
              </Link>
            </p>

            <p className="text-center text-xs mt-3 text-gray-500">
              By signing in, you agree to our{" "}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </form>
        </div>

        <div className="flex-grow"></div>
      </div>
    </div>
  );
}