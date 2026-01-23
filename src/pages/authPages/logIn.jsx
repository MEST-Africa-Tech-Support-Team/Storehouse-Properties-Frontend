// src/pages/auth/Login.jsx
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { currentUser, login, setCurrentUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ email: "", password: "" });

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard", { replace: true });
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
      // Login using AuthContext
      const result = await login({
        email: form.email.trim(),
        password: form.password,
      });

      // Backend should return full user object
      const user = result.user;

      // Compute initials
      const initials =
        (user.firstName?.charAt(0) || user.email?.charAt(0) || "U") +
        (user.lastName?.charAt(0) || user.email?.charAt(1) || "U");

      const userWithInitials = { ...user, initials: initials.toUpperCase() };

      // Update context and localStorage
      setCurrentUser(userWithInitials);
      localStorage.setItem("user", JSON.stringify(userWithInitials));

      toast.success(`Welcome back, ${user.firstName || "User"}! 🎉`);
      navigate("/dashboard");
    } catch (error) {
      let msg = error.message || "Login failed. Please try again.";
      if (msg.toLowerCase().includes("invalid") || msg.includes("401")) {
        msg = "Invalid email or password.";
      } else if (msg.toLowerCase().includes("verify")) {
        msg =
          "Please verify your email before logging in. Check your inbox for the verification link.";
      } else if (msg.includes("404")) {
        msg = "Account not found. Please check your email or sign up.";
      } else if (msg.includes("429")) {
        msg = "Too many login attempts. Please try again in a few minutes.";
      } else if (msg.toLowerCase().includes("network")) {
        msg = "Network error. Please check your connection and try again.";
      }

      toast.error(msg);
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
            {/* Email */}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors"
                autoComplete="email"
              />
            </div>

            {/* Password */}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors"
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

            {/* Forgot password */}
            <div className="flex items-center justify-between mb-6">
              <div></div>
              <Link
                to="/auth/forgot-password"
                className={`text-xs hover:underline transition-colors ${
                  loading
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:text-blue-800"
                }`}
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !form.email.trim() || !form.password.trim()}
              className={`w-full py-2.5 rounded-full font-medium text-sm transition-all duration-200 mb-4 ${
                loading || !form.email.trim() || !form.password.trim()
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm hover:shadow-md"
              }`}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            {/* Social login */}
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

            {/* Sign up link */}
            <p className="text-center text-xs mt-5 text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/auth/signup"
                className={`font-medium transition-colors ${
                  loading
                    ? "text-blue-400 cursor-not-allowed"
                    : "text-blue-600 hover:text-blue-800 hover:underline"
                }`}
              >
                Sign up
              </Link>
            </p>

            <p className="text-center text-xs mt-3 text-gray-500">
              By signing in, you agree to our{" "}
              <Link to="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-blue-600 hover:underline">
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
