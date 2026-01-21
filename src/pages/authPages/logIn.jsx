import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { authService } from "../../services/authService.js";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      toast.error("Email and password are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const credentials = {
        email: form.email.trim(),
        password: form.password,
      };

      await authService.login(credentials);

      toast.success("Signed in successfully! 🎉");
      navigate("/dashboard");
    } catch (error) {
      let errorMessage = error.message || "Login failed. Please try again.";

      if (
        errorMessage.toLowerCase().includes("invalid") ||
        errorMessage.toLowerCase().includes("credentials") ||
        errorMessage.includes("401")
      ) {
        errorMessage = "Invalid email or password.";
      } else if (
        errorMessage.toLowerCase().includes("verify") ||
        errorMessage.toLowerCase().includes("not verified")
      ) {
        errorMessage = "Please verify your email before logging in. Check your inbox for the verification link.";
      } else if (errorMessage.includes("404")) {
        errorMessage = "Account not found. Please check your email or sign up.";
      } else if (errorMessage.includes("429")) {
        errorMessage = "Too many login attempts. Please try again in a few minutes.";
      } else if (errorMessage.toLowerCase().includes("network")) {
        errorMessage = "Network error. Please check your connection and try again.";
      }

      toast.error(errorMessage);
      setForm((prev) => ({ ...prev, password: "" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative">
      <h1 className="text-white text-3xl font-bold text-center pt-18 z-10 relative">
        Login
      </h1>

      <div className="flex flex-col items-center justify-between py-8 px-4">
        <div className="flex-grow"></div>

        <div className="w-full max-w-md bg-white rounded-3xl p-6 border border-gray-300 shadow-xl z-10">
          <h2 className="text-center text-lg font-medium mb-5 text-black">
            Welcome Back To Storehouse
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-gray-500 placeholder:text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors"
                autoComplete="email"
              />
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                disabled={loading}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-gray-500 placeholder:text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div></div> 
              <Link
                to="/auth/forgot-password"
                className={`text-xs hover:underline transition-colors ${
                  loading ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading || !form.email.trim() || !form.password.trim()}
              className={`w-full py-2.5 rounded-full font-medium text-sm transition-all duration-200 mb-4 ${
                loading || !form.email.trim() || !form.password.trim()
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm hover:shadow-md"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
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
              disabled={loading}
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
                  loading ? 'text-blue-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800 hover:underline'
                }`}
              >
                Sign up
              </Link>
            </p>

            <p className="text-center text-xs mt-3 text-gray-500">
              By signing in, you agree to our{" "}
              <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
            </p>
          </form>
        </div>

        <div className="flex-grow"></div>
      </div>
    </div>
  );
}