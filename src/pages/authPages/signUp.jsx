import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast"; 
import { Country, State } from "country-state-city";
import { FcGoogle } from "react-icons/fc";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [states, setStates] = useState([]);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    password: "",
    confirmPassword: "",
  });

  const passwordRules = {
    length: form.password.length >= 8,
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

  const validate = () => {
    if (Object.values(form).some((v) => !v)) {
      toast.error("All fields are required");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!Object.values(passwordRules).every(Boolean)) {
      toast.error("Password does not meet requirements");
      return;
    }
    toast.success("Signup successful 🎉");
  };

  return (
    <div className="min-h-screen w-full relative">

      <h1 className="text-white text-3xl font-bold text-center pt-3 z-10 relative">Sign up</h1>

      <div className="flex flex-col items-center justify-between min-h-screen py-2 px-4">
        <div className="flex-grow"></div>

        <div className="w-full max-w-md bg-white rounded-3xl p-6 border border-gray-50 shadow-xl z-10">
          <h2 className="text-center text-sm font-medium mb-5 text-gray-600">
            Get started with Storehouse
          </h2>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label htmlFor="firstName" className="block text-xs font-medium text-gray-700 mb-1">First Name</label>
              <input
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-xs font-medium text-gray-700 mb-1">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label htmlFor="country" className="block text-xs font-medium text-gray-700 mb-1">Country</label>
              <select
                id="country"
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
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
              <label htmlFor="state" className="block text-xs font-medium text-gray-700 mb-1">State</label>
              <select
                id="state"
                name="state"
                value={form.state}
                onChange={handleChange}
                disabled={!form.country}
                className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
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

          <div className="relative mb-3">
            <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              onFocus={() => setShowPasswordRules(true)}
              onBlur={() => setShowPasswordRules(false)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-gray-400"
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>

          {showPasswordRules && (
            <div className="mb-3 p-2 bg-gray-50 rounded-lg text-[10px] space-y-0.5">
              <div className={`flex items-center gap-1 ${passwordRules.length ? "text-green-600" : "text-gray-500"}`}>
                {passwordRules.length ? "✓" : "✗"} At least 8 characters
              </div>
              <div className={`flex items-center gap-1 ${passwordRules.uppercase ? "text-green-600" : "text-gray-500"}`}>
                {passwordRules.uppercase ? "✓" : "✗"} One uppercase letter
              </div>
              <div className={`flex items-center gap-1 ${passwordRules.number ? "text-green-600" : "text-gray-500"}`}>
                {passwordRules.number ? "✓" : "✗"} One number
              </div>
              <div className={`flex items-center gap-1 ${passwordRules.special ? "text-green-600" : "text-gray-500"}`}>
                {passwordRules.special ? "✓" : "✗"} One special character
              </div>
            </div>
          )}

          <div className="mb-5">
            <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>

          <button
            onClick={validate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-medium text-sm transition mb-4"
          >
            Sign up
          </button>

          <button className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition text-sm">
            <FcGoogle className="text-xl" />
            Sign up with Google
          </button>

          <p className="text-center text-xs mt-5 text-gray-600">
            Have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline font-medium">
              Sign in
            </a>
          </p>
        </div>

        <div className="flex-grow"></div>
      </div>
    </div>
  );
}