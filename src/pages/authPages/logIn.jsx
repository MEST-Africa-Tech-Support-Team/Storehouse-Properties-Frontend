import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast"; 
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Email and password are required");
      return;
    }
    toast.success("Signed in successfully! 🎉");
  };

  return (
    <div className="min-h-screen w-full relative">

      <h1 className="text-white text-3xl font-bold text-center pt-6 z-10 relative">Login</h1>

      <div className="flex flex-col items-center justify-between py-3 px-4">
        <div className="flex-grow"></div>

        <div className="w-full max-w-md bg-white rounded-3xl p-6 border border-gray-300 shadow-xl z-10">
          <h2 className="text-center text-sm font-medium mb-5 text-gray-600">
            Welcome Back To Storehouse
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-gray-500 placeholder:text-gray-400"
              />
            </div>

            <div className="relative mb-4">
              <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm text-gray-500 placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-400"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={form.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="rememberMe" className="text-xs text-gray-500">
                  Remember me
                </label>
              </div>
              <a href="/forgot-password" className="text-xs text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-medium text-sm transition mb-4"
            >
              Sign in
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition text-sm"
            >
              <FcGoogle className="text-xl" />
              Sign in with Google
            </button>

            <p className="text-center text-xs mt-5 text-gray-600">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-600 hover:underline font-medium">
                Sign up
              </a>
            </p>
          </form>
        </div>

        <div className="flex-grow"></div>
      </div>
    </div>
  );
}