// src/services/authService.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const authService = {
  signup: async (formData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/register`, {
        method: "POST",
        body: formData, // multipart/form-data (DO NOT set Content-Type)
      });

      // Backend may return empty body on success or error JSON
      let data = null;
      const text = await res.text();
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = null;
      }

      if (!res.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            "Signup failed. Please check your details."
        );
      }

      return data;
    } catch (error) {
      // Network / CORS / unexpected errors
      throw new Error(
        error.message || "Unable to connect. Please try again."
      );
    }
  },

  login: async (payload) => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            "Invalid email or password"
        );
      }

      return data;
    } catch (error) {
      throw new Error(
        error.message || "Unable to connect. Please try again."
      );
    }
  },

  verifyEmail: async (token) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/users/verify-email?token=${token}`
      );

      if (!res.ok) {
        throw new Error("Email verification failed or token expired");
      }

      return true;
    } catch (error) {
      throw new Error(error.message || "Verification failed");
    }
  },
};
