
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

      if (response.status === 204 || response.ok) {
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
        {
          method: "GET",
        }
      );

      if (response.status === 204 || response.ok) {
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

      if (
        errorMessage.toLowerCase().includes("invalid") ||
        errorMessage.toLowerCase().includes("expired")
      ) {
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
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message =
          data.message ||
          data.error ||
          `Login failed (${response.status})`;

        if (message.toLowerCase().includes("invalid")) {
          throw new Error("Invalid email or password.");
        }
        if (message.toLowerCase().includes("verify")) {
          throw new Error("Please verify your email before logging in.");
        }
        throw new Error(message);
      }

      // Save token and user if provided
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return { success: true, ...data };
    } catch (error) {
      if (error instanceof SyntaxError && error.message.includes("JSON")) {
        throw new Error("Unexpected server response. Please try again.");
      }
      if (error.message.toLowerCase().includes("network")) {
        throw new Error("Network error. Please try again.");
      }
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};

export default authService;