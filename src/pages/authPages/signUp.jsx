import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import { Country, State } from "country-state-city";
import { FcGoogle } from "react-icons/fc";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { authService } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [states, setStates] = useState([]);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "+233",
    country: "GH",
    state: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (form.country) {
      setStates(State.getStatesOfCountry(form.country));
    }
  }, []);

  const passwordRules = {
    length: form.password.length >= 8,
    uppercase: /[A-Z]/.test(form.password),
    number: /[0-9]/.test(form.password),
    special: /[^A-Za-z0-9]/.test(form.password),
  };

  const allPasswordRulesMet = Object.values(passwordRules).every(Boolean);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "country") {
      setStates(State.getStatesOfCountry(value));
      setForm({ ...form, country: value, state: "" });
      return;
    }
    setForm({ ...form, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setForm({ ...form, phone: value || "+233" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image (JPEG, PNG, or JPG)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setProfilePhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone ||
      !form.country ||
      !form.state ||
      !form.password ||
      !form.confirmPassword
    ) {
      toast.error("All fields marked with * are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!allPasswordRulesMet) {
      toast.error("Password does not meet all requirements");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!form.phone || form.phone === "+233") {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (!form.country) {
      toast.error("Please select a country");
      return;
    }

    if (!form.state) {
      toast.error("Please select a state");
      return;
    }

    const signupData = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone,
      password: form.password,
      confirmPassword: form.confirmPassword,
    };

    if (profilePhoto) signupData.profilePhoto = profilePhoto;

    setLoading(true);

    try {
      const result = await authService.signup(signupData);

      toast.success(
        result.message ||
          "Account created successfully! Check your email for verification link.",
        { duration: 6000, icon: "🎉" }
      );

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "+233",
        country: "GH",
        state: "",
        password: "",
        confirmPassword: "",
      });
      setProfilePhoto(null);

      setTimeout(() => navigate("/auth/login"), 3000);
    } catch (error) {
      toast.error(error.message || "Signup failed. Please try again.", {
        duration: 5000,
      });
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative">
      <h1 className="text-white text-3xl font-bold text-center pt-3 z-10 relative">
        Sign up
      </h1>

      <div className="flex flex-col items-center justify-between min-h-screen py-2 px-4">
        <div className="flex-grow"></div>

        <div className="w-full max-w-md bg-white rounded-3xl p-6 border border-gray-50 shadow-xl z-10">
          <h2 className="text-center text-sm font-medium mb-5 text-gray-600">
            Get started with Storehouse
          </h2>

          {/* First Name / Last Name */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-full text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors disabled:bg-gray-50"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-full text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors disabled:bg-gray-50"
                placeholder="Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-full text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors disabled:bg-gray-50"
              placeholder="john@example.com"
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <PhoneInput
              international
              value={form.phone}
              onChange={handlePhoneChange}
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-full text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors disabled:bg-gray-50 [&>input]:p-0"
              placeholder="Enter phone number"
              defaultCountry="GH"
            />
          </div>

          {/* Profile Photo */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Profile Photo (Optional)
            </label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full text-xs text-gray-600 transition-colors">
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={loading}
                  className="hidden"
                />
              </label>
              {profilePhoto && (
                <span className="text-xs text-gray-500 truncate max-w-[120px]">
                  {profilePhoto.name}
                </span>
              )}
            </div>
          </div>

          {/* Country / State */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Country *
              </label>
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-full text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors disabled:bg-gray-50"
              >
                <option value="">Select country</option>
                {Country.getAllCountries().map((c) => (
                  <option key={c.isoCode} value={c.isoCode}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                State *
              </label>
              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                disabled={!form.country || loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-full text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors disabled:bg-gray-50"
              >
                <option value="">Select state</option>
                {states.map((s) => (
                  <option key={s.isoCode} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Password *
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                onFocus={() => setShowPasswordRules(true)}
                onBlur={() => setTimeout(() => setShowPasswordRules(false), 200)}
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-full text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors disabled:bg-gray-50 pr-10"
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {showPasswordRules && (
            <div className="mb-3 p-3 bg-gray-50 rounded-lg space-y-1 text-xs">
              {Object.entries(passwordRules).map(([rule, passed]) => {
                let text = "";
                switch (rule) {
                  case "length":
                    text = "At least 8 characters";
                    break;
                  case "uppercase":
                    text = "At least one uppercase letter";
                    break;
                  case "number":
                    text = "At least one number";
                    break;
                  case "special":
                    text = "At least one special character";
                    break;
                }
                return (
                  <div
                    key={rule}
                    className={`flex items-center gap-2 ${
                      passed ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <span className="font-medium">{passed ? "✓" : "✗"}</span>
                    <span>{text}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Confirm Password */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Confirm Password *
            </label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              className={`w-full px-3 py-2 border ${
                form.confirmPassword && form.password !== form.confirmPassword
                  ? "border-red-300"
                  : "border-gray-300"
              } rounded-full text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors disabled:bg-gray-50`}
              placeholder="Confirm your password"
            />
            {form.confirmPassword && form.password !== form.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <span>⚠</span>
                <span>Passwords do not match</span>
              </p>
            )}
          </div>

          {/* Signup Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || !allPasswordRulesMet}
            className={`w-full py-2.5 rounded-full text-sm mb-4 transition-all duration-200 ${
              loading || !allPasswordRulesMet
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            } text-white font-medium shadow-sm hover:shadow-md disabled:shadow-none`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating account...
              </span>
            ) : (
              "Sign up"
            )}
          </button>

          {/* Or continue with */}
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google Signup */}
          <button
            type="button"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-2.5 border border-gray-300 rounded-full text-sm hover:bg-gray-50 active:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FcGoogle className="text-lg" /> Sign up with Google
          </button>

          {/* Already have account */}
          <p className="text-center text-xs mt-5 text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/auth/login")}
              disabled={loading}
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors disabled:opacity-50"
            >
              Sign in
            </button>
          </p>

          {/* Terms */}
          <p className="text-center text-xs mt-3 text-gray-500">
            By signing up, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>

        <div className="flex-grow"></div>
      </div>
    </div>
  );
}
