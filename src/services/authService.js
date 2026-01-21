// src/services/authService.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const authService = {
  signup: async (formData) => {
    try {
      const formDataToSend = new FormData();

      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("confirmPassword", formData.confirmPassword);

      if (formData.profilePhoto) {
        formDataToSend.append("profilePhoto", formData.profilePhoto);
      }

      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });

      if (response.status === 204) {
        return {
          success: true,
          message: "Registration successful. Please check your email for verification.",
        };
      }

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          return { success: true, ...data };
        }
        return { success: true, message: "Registration successful" };
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            errorData.error ||
            `Registration failed (${response.status})`
        );
      }

      throw new Error(`Registration failed (${response.status})`);
    } catch (error) {
      if (
        error.message.toLowerCase().includes("already exists") ||
        error.message.includes("409")
      ) {
        throw new Error("Email already registered.");
      }
      if (error.message.includes("400")) {
        throw new Error("Invalid input data.");
      }
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
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.status === 204) {
        return { success: true, message: "Email verified successfully." };
      }

      if (response.ok) {
        const text = await response.text();
        if (!text) {
          return { success: true, message: "Email verified successfully." };
        }
        try {
          return { success: true, ...JSON.parse(text) };
        } catch {
          return { success: true, message: "Email verified successfully." };
        }
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            errorData.error ||
            `Verification failed (${response.status})`
        );
      }

      throw new Error(`Verification failed (${response.status})`);
    } catch (error) {
      if (
        error.message.toLowerCase().includes("expired") ||
        error.message.toLowerCase().includes("invalid")
      ) {
        throw new Error("Verification link is invalid or expired.");
      }
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
        credentials: "include",
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid server response.");
      }

      const data = await response.json();

      if (!response.ok) {
        const message =
          data.message || data.error || `Login failed (${response.status})`;

        if (message.toLowerCase().includes("invalid")) {
          throw new Error("Invalid email or password.");
        }
        if (message.toLowerCase().includes("verify")) {
          throw new Error("Please verify your email before logging in.");
        }

        throw new Error(message);
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return { success: true, ...data };
    } catch (error) {
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
    return Boolean(localStorage.getItem("token"));
  },
};

export default authService;
