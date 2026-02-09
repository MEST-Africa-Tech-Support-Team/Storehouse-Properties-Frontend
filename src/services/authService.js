const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const normalizeUser = (user = {}, { cacheBust = false } = {}) => {
  if (!user) return user;
  const out = { ...user };

  const photo = out.profilePhoto;
  if (photo && typeof photo === 'string') {
    const isAbsolute = /^(?:https?:)?\/\//i.test(photo);
    if (!isAbsolute && API_BASE_URL) {
      // join without duplicating slashes
      out.profilePhoto = `${API_BASE_URL.replace(/\/$/, '')}/${photo.replace(/^\//, '')}`;
    }

    if (cacheBust && out.profilePhoto) {
      const sep = out.profilePhoto.includes('?') ? '&' : '?';
      out.profilePhoto = `${out.profilePhoto}${sep}v=${Date.now()}`;
    }
  }

  return out;
};

export const authService = {
  
  signup: async (userData) => {
    try {
      const formData = new FormData();
      formData.append("firstName", userData.firstName);
      formData.append("lastName", userData.lastName);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      formData.append("password", userData.password);
      formData.append("confirmPassword", userData.confirmPassword);

      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        return {
          success: true,
          message: "Registration successful. Please check your email for verification.",
        };
      }

      let errorMessage = `Registration failed (${response.status})`;
      const text = await response.text().catch(() => "");
      if (text) {
        try {
          const json = JSON.parse(text);
          errorMessage = json.message || json.error || text;
        } catch {
          errorMessage = text;
        }
      }

      throw new Error(errorMessage);
    } catch (error) {
      if (error.message.toLowerCase().includes("network")) {
        throw new Error("Network error. Please try again.");
      }
      throw error;
    }
  },

  verifyEmail: async (token) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/users/verify-email?token=${encodeURIComponent(
          token.trim()
        )}`,
        { method: "GET" }
      );

      if (response.ok) {
        return { success: true, message: "Email verified successfully." };
      }

      let errorMessage = `Verification failed (${response.status})`;
      const text = await response.text().catch(() => "");
      if (text) {
        try {
          const json = JSON.parse(text);
          errorMessage = json.message || json.error || text;
        } catch {
          errorMessage = text;
        }
      }

      throw new Error(errorMessage);
    } catch (error) {
      if (error.message.toLowerCase().includes("network")) {
        throw new Error("Network error. Please try again.");
      }
      throw error;
    }
  },

  // Request a password reset email for the given email address
  forgotPassword: async (email) => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        return { success: true, message: data.message || 'Reset instructions sent to email' };
      }

      let errorMessage = `Request failed (${res.status})`;
      const text = await res.text().catch(() => '');
      if (text) {
        try {
          const json = JSON.parse(text);
          errorMessage = json.message || json.error || text;
        } catch {
          errorMessage = text;
        }
      }

      const err = new Error(errorMessage);
      throw err;
    } catch (error) {
      if (error.message && error.message.toLowerCase().includes('network')) {
        throw new Error('Network error. Please try again.');
      }
      throw error;
    }
  },

  // Reset password using token from email link
  resetPassword: async (token, password, confirmPassword) => {
    try {
      if (!token) throw new Error('Missing reset token');

      const res = await fetch(`${API_BASE_URL.replace(/\/$/, '')}/users/reset-password/${encodeURIComponent(token)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, confirmPassword }),
      });

      const text = await res.text().catch(() => '');
      let json = {};
      try { json = text ? JSON.parse(text) : {}; } catch (_) { json = {}; }

      if (res.ok) {
        return { success: true, message: json.message || 'Password has been reset' };
      }

      const errorMessage = json.message || json.error || text || `Reset failed (${res.status})`;
      const err = new Error(errorMessage);
      if (json.errors) err.details = json.errors;
      throw err;
    } catch (error) {
      if (error.message && error.message.toLowerCase().includes('network')) {
        throw new Error('Network error. Please try again.');
      }
      throw error;
    }
  },

  login: async ({ email, password }) => {
    try {
      const loginRes = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Safely parse response (may not be JSON on some errors)
      const rawText = await loginRes.text().catch(() => "");
      let loginData = {};
      if (rawText) {
        try { loginData = JSON.parse(rawText); } catch (_) { /* non-JSON response */ }
      }

      if (!loginRes.ok) {
        throw new Error(
          loginData.message ||
            loginData.error ||
            rawText ||
            `Login failed (${loginRes.status})`
        );
      }

      if (!loginData.token) {
        throw new Error("No authentication token received");
      }

      // 1. SAVE TOKEN IMMEDIATELY
      localStorage.setItem("authToken", loginData.token);

      // Fetch full profile from /users/me for complete user data (names, role, photo)
      let user = null;
      try {
        const profileRes = await fetch(`${API_BASE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${loginData.token}`,
            "Content-Type": "application/json",
          },
        });
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          user = profileData.user || profileData.data?.user || profileData;
        }
      } catch (_) {
        // Network hiccup — fall back to login response data
      }

      // Fallback: use user data from the login response if /users/me failed
      if (!user || !user.email) {
        user = loginData.user || loginData.data?.user || loginData.data || null;
      }

      if (!user) {
        throw new Error("Failed to load user profile");
      }

      const normalized = normalizeUser(user, { cacheBust: false });
      localStorage.setItem("user", JSON.stringify(normalized));

      return {
        success: true,
        token: loginData.token,
        user: normalized,
      };
    } catch (error) {
      // Clear local storage if anything in the process fails
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    if (!user) return null;
    try {
      const parsed = JSON.parse(user);
      return normalizeUser(parsed, { cacheBust: false });
    } catch (e) {
      localStorage.removeItem('user');
      return null;
    }
  },

  setCurrentUser: (user, { cacheBust = false } = {}) => {
    if (!user) return null;
    const normalized = normalizeUser(user, { cacheBust });
    localStorage.setItem("user", JSON.stringify(normalized));
    return normalized;
  },

  updateCurrentUser: (updates, { cacheBust = false } = {}) => {
    const existing = authService.getCurrentUser();
    if (!existing) return null;

    const updatedUser = { ...existing, ...updates };
    const normalized = normalizeUser(updatedUser, { cacheBust });
    localStorage.setItem("user", JSON.stringify(normalized));
    return normalized;
  },

  // Fetch fresh profile from /users/me and update localStorage
  getProfile: async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return null;

    try {
      const res = await fetch(`${API_BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) return authService.getCurrentUser();

      const data = await res.json();
      const user = data.user || data.data?.user || data;
      const normalized = normalizeUser(user, { cacheBust: false });
      localStorage.setItem("user", JSON.stringify(normalized));
      return normalized;
    } catch (_) {
      // Network error — return cached user
      return authService.getCurrentUser();
    }
  },

  getToken: () => localStorage.getItem("authToken"),

  isAuthenticated: () => !!localStorage.getItem("authToken"),

  refreshToken: async () => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No token available to refresh");

    const res = await fetch(`${API_BASE_URL}/users/refresh-token`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Token refresh failed");

    const data = await res.json();
    if (!data.token) throw new Error("No token returned");

    localStorage.setItem("authToken", data.token);
    return data.token;
  },
};

export default authService;