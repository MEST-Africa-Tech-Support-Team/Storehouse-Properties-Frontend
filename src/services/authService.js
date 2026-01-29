const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
          message:
            "Registration successful. Please check your email for verification.",
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

  login: async ({ email, password }) => {
    try {
      const loginRes = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        throw new Error(
          loginData.message ||
            loginData.error ||
            `Login failed (${loginRes.status})`
        );
      }

      if (!loginData.token) {
        throw new Error("No authentication token received");
      }

      localStorage.setItem("authToken", loginData.token);

      const profileRes = await fetch(`${API_BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${loginData.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!profileRes.ok) {
        throw new Error("Failed to load user profile");
      }

      const profileData = await profileRes.json();

      localStorage.setItem("user", JSON.stringify(profileData.user));

      return {
        success: true,
        token: loginData.token,
        user: profileData.user,
      };
    } catch (error) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },

  /* =========================
     USER STORAGE HELPERS
  ========================= */

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  setCurrentUser: (user) => {
    if (!user) return;
    localStorage.setItem("user", JSON.stringify(user));
  },

  updateCurrentUser: (updates) => {
    const existing = authService.getCurrentUser();
    if (!existing) return;

    const updatedUser = { ...existing, ...updates };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return updatedUser;
  },

  /* =========================
     TOKEN HELPERS
  ========================= */

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
