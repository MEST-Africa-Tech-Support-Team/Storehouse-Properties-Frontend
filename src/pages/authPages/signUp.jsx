// src/pages/auth/Signup.jsx
import { useState } from "react";
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
  const [states, setStates] = useState([]);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const passwordRules = {
    length: form.password.length >= 8,
    lowercase: /[a-z]/.test(form.password),
    uppercase: /[A-Z]/.test(form.password),
    number: /[0-9]/.test(form.password),
    special: /[^A-Za-z0-9]/.test(form.password),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "country") {
      const selectedStates = State.getStatesOfCountry(value);
      setStates(selectedStates);
      setForm({ ...form, country: value, state: "" });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setForm({ ...form, phone: value || "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      toast.error("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
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
      toast.error("Password does not meet requirements");
      return;
    }

    const userData = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      password: form.password,
      confirmPassword: form.confirmPassword,
    };

    setLoading(true);
    try {
      await authService.signup(userData);
      toast.success("Registration successful! Please check your email to verify your account.");
     
    } catch (error) {
      toast.error(error.message || "Signup failed. Please try again.");
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

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-full text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-full text-sm"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-full text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <PhoneInput
              international
              value={form.phone}
              onChange={handlePhoneChange}
              disabled={loading}
              className="!w-full !px-3 !py-2 !border !border-gray-300 !rounded-full text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-full text-sm"
            >
              <option value="">Select country</option>
              {Country.getAllCountries().map((c) => (
                <option key={c.isoCode} value={c.isoCode}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              disabled={!form.country || loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-full text-sm"
            >
              <option value="">Select state</option>
              {states.map((s) => (
                <option key={s.isoCode} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative mb-3">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              onFocus={() => setShowPasswordRules(true)}
              onBlur={() => setShowPasswordRules(false)}
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-full text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400"
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>

          {showPasswordRules && (
            <div className="mb-3 p-2 bg-gray-50 rounded-lg text-[10px]">
              <div>{passwordRules.length ? "✓" : "✗"} 8 characters</div>
              <div>{passwordRules.lowercase ? "✓" : "✗"} Lowercase</div>
              <div>{passwordRules.uppercase ? "✓" : "✗"} Uppercase</div>
              <div>{passwordRules.number ? "✓" : "✗"} Number</div>
              <div>{passwordRules.special ? "✓" : "✗"} Special</div>
            </div>
          )}

          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-full text-sm mb-5"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-2 rounded-full bg-blue-600 text-white text-sm mb-4"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>

          <button className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-full text-sm">
            <FcGoogle /> Sign up with Google
          </button>

          <p className="text-center text-xs mt-5">
            Have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/auth/login")}
              className="text-blue-600"
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