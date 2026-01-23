
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
          message: "Registration successful. Please check your email for verification.",
        };
      }

      let errorMessage = `Registration failed (${response.status})`;
      try {
        const text = await response.text();
        if (text) {
          try {
            const json = JSON.parse(text);
            errorMessage = json.message || json.error || text;
          } catch {
            errorMessage = text;
          }
        }
      } catch {}

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
        `${API_BASE_URL}/users/verify-email?token=${encodeURIComponent(token.trim())}`,
        { method: "GET" }
      );

      if (response.ok) {
        return { success: true, message: "Email verified successfully." };
      }

      let errorMessage = `Verification failed (${response.status})`;
      try {
        const text = await response.text();
        if (text) {
          try {
            const json = JSON.parse(text);
            errorMessage = json.message || json.error || text;
          } catch {
            errorMessage = text;
          }
        }
      } catch {}

      if (errorMessage.toLowerCase().includes("invalid") || errorMessage.toLowerCase().includes("expired")) {
        throw new Error("Verification link is invalid or expired.");
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

      const contentType = loginRes.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid server response during login");
      }

      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        const message = loginData.message || loginData.error || `Login failed (${loginRes.status})`;
        if (message.toLowerCase().includes("invalid")) {
          throw new Error("Invalid email or password.");
        }
        if (message.toLowerCase().includes("verify")) {
          throw new Error("Please verify your email before logging in.");
        }
        throw new Error(message);
      }

      if (!loginData.token) {
        throw new Error("No authentication token received from server");
      }

      // Save token immediately
      localStorage.setItem("authToken", loginData.token);

      // Fetch full user profile
      const profileRes = await fetch(`${API_BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${loginData.token}`,
          "Content-Type": "application/json"
        }
      });

      if (!profileRes.ok) throw new Error("Failed to load user profile");

      const userProfile = await profileRes.json();

      localStorage.setItem("user", JSON.stringify(userProfile));

      return { success: true, token: loginData.token, user: userProfile };
    } catch (error) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");

      if (error instanceof SyntaxError && error.message.includes("JSON")) {
        throw new Error("Unexpected server response. Please try again.");
      }
      if (error.message.toLowerCase().includes("network")) {
        throw new Error("Network error. Please check your connection and try again.");
      }
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  getToken: () => localStorage.getItem("authToken"),

  isAuthenticated: () => !!localStorage.getItem("authToken"),

  // ✅ Refresh token for silent login (optional, implement backend endpoint)
  refreshToken: async () => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No token available to refresh");

    const res = await fetch(`${API_BASE_URL}/users/refresh-token`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Token refresh failed");

    const data = await res.json();
    if (!data.token) throw new Error("No token returned from refresh endpoint");

    localStorage.setItem("authToken", data.token);
    return data.token;
  },
};

export default authService;
