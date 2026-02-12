import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import { Country, State } from "country-state-city";
import { FcGoogle } from "react-icons/fc";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { authService } from "../../services/authService.js";
import { useNavigate } from "react-router";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [states, setStates] = useState([]);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [retryCount, setRetryCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const MAX_RETRIES = 3;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const checkNetworkStatus = () => {
      if (!navigator.onLine) {
        toast.error("No internet connection. Please check your network settings.", {
          id: 'offline-warning',
          duration: 8000,
          icon: '⚠️'
        });
      }
    };

    checkNetworkStatus();
    
    const interval = setInterval(checkNetworkStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const passwordRules = {
    length: form.password.length >= 8,
    lowercase: /[a-z]/.test(form.password),
    uppercase: /[A-Z]/.test(form.password),
    number: /[0-9]/.test(form.password),
    special: /[^A-Za-z0-9]/.test(form.password),
  };

  const validateForm = () => {
    const errors = {};
    
    if (!form.firstName.trim()) {
      errors.firstName = "First name is required";
    } else if (form.firstName.trim().length < 2) {
      errors.firstName = "First name must be at least 2 characters";
    }
    
    if (!form.lastName.trim()) {
      errors.lastName = "Last name is required";
    } else if (form.lastName.trim().length < 2) {
      errors.lastName = "Last name must be at least 2 characters";
    }
    
    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Invalid email format";
    }
    
    if (!form.phone) {
      errors.phone = "Phone number is required";
    } else if (form.phone.length < 10) {
      errors.phone = "Invalid phone number";
    }
    
    if (!form.country) {
      errors.country = "Country is required";
    }
    
    if (!form.state) {
      errors.state = "State is required";
    }
    
    if (!form.password) {
      errors.password = "Password is required";
    } else {
      const pwd = form.password;
      if (pwd.length < 8) errors.password = "Password must be at least 8 characters";
      else if (!/[a-z]/.test(pwd)) errors.password = "Password must contain a lowercase letter";
      else if (!/[A-Z]/.test(pwd)) errors.password = "Password must contain an uppercase letter";
      else if (!/[0-9]/.test(pwd)) errors.password = "Password must contain a number";
      else if (!/[^A-Za-z0-9]/.test(pwd)) errors.password = "Password must contain a special character";
    }
    
    if (!form.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "country") {
      const selectedStates = State.getStatesOfCountry(value);
      setStates(selectedStates || []);
      setForm({ ...form, country: value, state: "" });
      setFormErrors(prev => ({ ...prev, country: undefined, state: undefined }));
      return;
    }

    if (name === "state") {
      setForm({ ...form, state: value });
      setFormErrors(prev => ({ ...prev, state: undefined }));
      return;
    }

    setForm({ ...form, [name]: value });
    setFormErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handlePhoneChange = (value) => {
    setForm({ ...form, phone: value || "" });
    setFormErrors(prev => ({ ...prev, phone: undefined }));
  };

  const handleError = (error, attempt = 0) => {
    console.error('Signup error (attempt ' + (attempt + 1) + '):', error);
    
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
          { id: 'network-retry', duration: 3000 }
        );
        
        setTimeout(() => {
          handleSubmit(null, nextAttempt);
        }, Math.pow(2, attempt) * 1000);
        
        return true; 
      } else {
        toast.error(
          "Unable to connect to server. Please check your internet connection and try again later.",
          { 
            id: 'network-error', 
            duration: 8000,
            icon: '📡'
          }
        );
        return false;
      }
    }
    
    const errorMessage = error.message.toLowerCase();
    
    if (errorMessage.includes('email') && (errorMessage.includes('exist') || errorMessage.includes('duplicate') || errorMessage.includes('already'))) {
      setFormErrors(prev => ({ ...prev, email: "Email already registered" }));
      toast.error("This email is already registered. Please log in or use a different email.", {
        duration: 6000,
        icon: '📧'
      });
      return false;
    }
    
    if (errorMessage.includes('phone') && (errorMessage.includes('exist') || errorMessage.includes('duplicate') || errorMessage.includes('already'))) {
      setFormErrors(prev => ({ ...prev, phone: "Phone number already registered" }));
      toast.error("This phone number is already registered with another account.", {
        duration: 6000,
        icon: '📱'
      });
      return false;
    }
    
    if (errorMessage.includes('password') && (errorMessage.includes('weak') || errorMessage.includes('strong') || errorMessage.includes('require'))) {
      toast.error("Password does not meet security requirements. Please use a stronger password.", {
        duration: 6000,
        icon: '🔒'
      });
      return false;
    }
    
    if (errorMessage.includes('email') && (errorMessage.includes('invalid') || errorMessage.includes('format'))) {
      setFormErrors(prev => ({ ...prev, email: "Invalid email format" }));
      toast.error("Please enter a valid email address (e.g., name@example.com).", {
        duration: 5000,
        icon: '✉️'
      });
      return false;
    }
    
    if (errorMessage.includes('required') || errorMessage.includes('missing') || errorMessage.includes('field')) {
      toast.error("Please complete all required fields marked with *.", {
        duration: 5000,
        icon: '📋'
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
    
    if (errorMessage.includes('timeout') || errorMessage.includes('timed out')) {
      toast.error("Request timed out. Please check your connection and try again.", {
        duration: 6000,
        icon: '⏱️'
      });
      return false;
    }
    
    if (errorMessage.includes('unauthorized') || errorMessage.includes('401')) {
      toast.error("Authentication failed. Please refresh the page and try again.", {
        duration: 6000,
        icon: '🔑'
      });
      return false;
    }
    
    if (errorMessage.includes('forbidden') || errorMessage.includes('403')) {
      toast.error("Access denied. Please contact support if you believe this is an error.", {
        duration: 6000,
        icon: '🚫'
      });
      return false;
    }
    
    // Not found error (404)
    if (errorMessage.includes('not found') || errorMessage.includes('404')) {
      toast.error("Service unavailable. Our team has been notified and is working on it.", {
        duration: 6000,
        icon: '🔍'
      });
      return false;
    }
    
    // Rate limit error
    if (errorMessage.includes('rate') || errorMessage.includes('limit') || errorMessage.includes('429')) {
      toast.error("Too many attempts. Please wait a few minutes before trying again.", {
        duration: 8000,
        icon: '⏳'
      });
      return false;
    }
    
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
    
    if (!navigator.onLine) {
      toast.error("No internet connection. Please check your network settings and try again.", {
        duration: 8000,
        icon: '⚠️',
        id: 'no-internet'
      });
      return;
    }
    
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    if (!validateForm()) {
      const errorKeys = Object.keys(formErrors);
      if (errorKeys.length > 0) {
        const firstErrorField = document.querySelector(`[name="${errorKeys[0]}"]`);
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstErrorField.focus({ preventScroll: true });
        }
      }
      
      toast.error("Please correct the errors in the form before submitting.", {
        duration: 4000,
        icon: '📝'
      });
      
      setIsSubmitting(false);
      return;
    }
    
    const pwd = form.password;
    const rulesMet = {
      length: pwd.length >= 8,
      lowercase: /[a-z]/.test(pwd),
      uppercase: /[A-Z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[^A-Za-z0-9]/.test(pwd),
    };
    
    if (!Object.values(rulesMet).every(Boolean)) {
      toast.error("Password does not meet security requirements. Hover over password field to see rules.", {
        duration: 5000,
        icon: '🔒'
      });
      setIsSubmitting(false);
      return;
    }
    
    const userData = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone,
      password: form.password,
      confirmPassword: form.confirmPassword,
    };
    
    setLoading(true);
    
    try {
      await authService.signup(userData);
      
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        state: "",
        password: "",
        confirmPassword: "",
      });
      setFormErrors({});
      setRetryCount(0);
      setIsSubmitting(false);
      
      toast.success(
        "Registration successful! 🎉 Please check your email to verify your account.",
        { 
          duration: 8000,
          icon: '✅',
          id: 'signup-success'
        }
      );
      
      // ✅ Redirect to verify email page after delay
      // setTimeout(() => {
      //   navigate('/auth/verify-email', {
      //     state: { email: userData.email, justRegistered: true }
      //   });
      // }, 2500);
      
    } catch (error) {
      setIsSubmitting(false);
      setLoading(false);
      
      const willRetry = handleError(error, retryAttempt);
      
      if (!willRetry) {
        setRetryCount(0);
      }
    }
  };

  return (
    <div className="min-h-screen w-full relative">
      <h1 className="text-white text-3xl font-bold text-center pt-3 z-10 relative">
        Sign up
      </h1>

      <div className="flex flex-col items-center justify-between min-h-screen py-2 px-4 sm:px-6">
        <div className="flex-grow"></div>

        <div className="w-full max-w-md bg-white rounded-3xl p-6 border border-gray-50 shadow-xl z-10">
          <h2 className="text-center text-sm font-medium mb-5 text-gray-600">
            Get started with Storehouse
          </h2>

          {/* Network Status Card - Only shown when offline */}
          {!navigator.onLine && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
              <div className="mt-0.5 text-amber-600 font-bold">⚠️</div>
              <div className="flex-1 text-amber-800 text-sm">
                <p className="font-medium">No internet connection</p>
                <p className="text-xs mt-1">Please check your network settings. You won't be able to create an account until you're back online.</p>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                First Name {formErrors.firstName && <span className="text-red-500 ml-1">*</span>}
              </label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                disabled={loading || !navigator.onLine}
              className={`w-full px-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  formErrors.firstName 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300'
                }`}
                placeholder="John"
                aria-invalid={!!formErrors.firstName}
                aria-describedby={formErrors.firstName ? "firstNameError" : undefined}
              />
              {formErrors.firstName && (
                <p id="firstNameError" className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>•</span> {formErrors.firstName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Last Name {formErrors.lastName && <span className="text-red-500 ml-1">*</span>}
              </label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                disabled={loading || !navigator.onLine}
              className={`w-full px-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  formErrors.lastName 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300'
                }`}
                placeholder="Doe"
                aria-invalid={!!formErrors.lastName}
                aria-describedby={formErrors.lastName ? "lastNameError" : undefined}
              />
              {formErrors.lastName && (
                <p id="lastNameError" className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>•</span> {formErrors.lastName}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email {formErrors.email && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              disabled={loading || !navigator.onLine}
              className={`w-full px-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                formErrors.email 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-gray-300'
              }`}
              placeholder="john@example.com"
              aria-invalid={!!formErrors.email}
              aria-describedby={formErrors.email ? "emailError" : undefined}
            />
            {formErrors.email && (
              <p id="emailError" className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <span>•</span> {formErrors.email}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Phone Number {formErrors.phone && <span className="text-red-500 ml-1">*</span>}
            </label>
            <PhoneInput
              international
              value={form.phone}
              onChange={handlePhoneChange}
              disabled={loading || !navigator.onLine}
              className={`!w-full !px-3 !py-2 !border !rounded-full text-sm ${
                formErrors.phone 
                  ? '!border-red-500 focus:!ring-red-200' 
                  : '!border-gray-300 focus:!ring-primary'
              }`}
              placeholder="+1 234 567 8900"
              aria-invalid={!!formErrors.phone}
              aria-describedby={formErrors.phone ? "phoneError" : undefined}
            />
            {formErrors.phone && (
              <p id="phoneError" className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <span>•</span> {formErrors.phone}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Country {formErrors.country && <span className="text-red-500 ml-1">*</span>}
              </label>
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                disabled={loading || !navigator.onLine}
                className={`w-full px-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  formErrors.country 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300'
                }`}
                aria-invalid={!!formErrors.country}
                aria-describedby={formErrors.country ? "countryError" : undefined}
              >
                <option value="">Select country</option>
                {Country.getAllCountries().map((c) => (
                  <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
                ))}
              </select>
              {formErrors.country && (
                <p id="countryError" className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>•</span> {formErrors.country}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                State {formErrors.state && <span className="text-red-500 ml-1">*</span>}
              </label>
              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                disabled={!form.country || states.length === 0 || loading || !navigator.onLine}
                className={`w-full px-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                  formErrors.state 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300'
                }`}
                aria-invalid={!!formErrors.state}
                aria-describedby={formErrors.state ? "stateError" : undefined}
              >
                <option value="">{states.length ? "Select state" : "No states available"}</option>
                {states.map((s) => (
                  <option key={s.isoCode} value={s.name}>{s.name}</option>
                ))}
              </select>
              {formErrors.state && (
                <p id="stateError" className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>•</span> {formErrors.state}
                </p>
              )}
            </div>
          </div>

          <div className="relative mb-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Password {formErrors.password && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              onFocus={() => setShowPasswordRules(true)}
              onBlur={() => setShowPasswordRules(false)}
              disabled={loading || !navigator.onLine}
              className={`w-full px-3 py-2 border rounded-full text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-primary ${
                formErrors.password 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-gray-300'
              }`}
              placeholder="••••••••"
              aria-invalid={!!formErrors.password}
              aria-describedby={formErrors.password ? "passwordError" : undefined}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>

          {showPasswordRules && (
            <div className="mb-3 p-2 bg-gray-50 rounded-lg text-[10px] border border-gray-200">
              <div className={`flex items-center gap-1 ${passwordRules.length ? "text-green-600" : "text-gray-500"}`}>
                <span className="font-bold">{passwordRules.length ? "✓" : "•"}</span> At least 8 characters
              </div>
              <div className={`flex items-center gap-1 ${passwordRules.lowercase ? "text-green-600" : "text-gray-500"}`}>
                <span className="font-bold">{passwordRules.lowercase ? "✓" : "•"}</span> Lowercase letter
              </div>
              <div className={`flex items-center gap-1 ${passwordRules.uppercase ? "text-green-600" : "text-gray-500"}`}>
                <span className="font-bold">{passwordRules.uppercase ? "✓" : "•"}</span> Uppercase letter
              </div>
              <div className={`flex items-center gap-1 ${passwordRules.number ? "text-green-600" : "text-gray-500"}`}>
                <span className="font-bold">{passwordRules.number ? "✓" : "•"}</span> Number
              </div>
              <div className={`flex items-center gap-1 ${passwordRules.special ? "text-green-600" : "text-gray-500"}`}>
                <span className="font-bold">{passwordRules.special ? "✓" : "•"}</span> Special character
              </div>
            </div>
          )}
          {formErrors.password && (
            <p id="passwordError" className="text-red-500 text-xs mb-3 flex items-center gap-1">
              <span>•</span> {formErrors.password}
            </p>
          )}

          <div className="relative mb-5">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Confirm Password {formErrors.confirmPassword && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
              disabled={loading || !navigator.onLine}
              className={`w-full px-3 py-2 border rounded-full text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-primary ${
                formErrors.confirmPassword 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-gray-300'
              }`}
              placeholder="••••••••"
              aria-invalid={!!formErrors.confirmPassword}
              aria-describedby={formErrors.confirmPassword ? "confirmPasswordError" : undefined}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          {formErrors.confirmPassword && (
            <p id="confirmPasswordError" className="text-red-500 text-xs mb-4 flex items-center gap-1">
              <span>•</span> {formErrors.confirmPassword}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !navigator.onLine || isSubmitting}
            className={`w-full py-2 rounded-full text-white text-sm mb-4 transition-all duration-200 ${
              loading || !navigator.onLine || isSubmitting
                ? 'bg-primary/50 cursor-not-allowed transform scale-100'
                : 'bg-primary hover:bg-hover transform hover:scale-[1.02]'
            } flex items-center justify-center`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
            ) : (
              "Sign up"
            )}
          </button>

          <button 
            className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !navigator.onLine}
          >
            <FcGoogle className="text-xl" /> Sign up with Google
          </button>

          <p className="text-center text-xs mt-5">
            Have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/auth/login")}
              className="text-primary hover:text-hover font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || isSubmitting}
            >
              Sign in
            </button>
          </p>
        </div>

        <div className="flex-grow"></div>
      </div>
    </div>
  );
}