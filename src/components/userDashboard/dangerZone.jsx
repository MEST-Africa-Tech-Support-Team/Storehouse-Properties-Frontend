import React, { useState } from 'react';
import { FaPause, FaTrash } from "react-icons/fa";
import toast from 'react-hot-toast';
import authService from '../../services/authService';

const DangerZone = () => {
  const [loading, setLoading] = useState(false);

  const currentUser = authService.getCurrentUser();
  const token = authService.getToken();

  if (!currentUser || !token) {
    return (
      <div className="bg-red-50 p-6 rounded-xl border border-red-200 mt-8 text-red-600">
        You must be logged in to manage your account.
      </div>
    );
  }

  // Custom toast with action buttons
  const showConfirmationToast = (actionType) => {
    toast.custom(
      (t) => (
        <div className="max-w-sm w-full px-4 py-3 rounded-xl shadow-lg shadow-red-100 border border-red-200 bg-red-50 flex flex-col gap-3 text-black">
          <div className="text-sm font-medium">
            {`Are you sure you want to ${actionType} your account?`}
          </div>
          <div className="flex justify-end gap-2">
            <button
              className="px-3 py-1.5 text-sm bg-gray-200 rounded-lg hover:bg-gray-300"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
            <button
              className={`px-3 py-1.5 text-sm rounded-lg text-white ${
                actionType === 'delete' ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-hover'
              }`}
              onClick={() => {
                toast.dismiss(t.id);
                if (actionType === 'delete') handleDelete();
                if (actionType === 'deactivate') handleDeactivate();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      ),
      { position: 'top-right', duration: 5000 }
    );
  };

  const showToast = (message, type = 'success') => {
    toast.custom(
      (t) => (
        <div
          className={`max-w-sm w-full px-4 py-3 rounded-xl shadow-md border flex items-center justify-between gap-4 ${
            type === 'success' ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
          }`}
        >
          <div className="text-gray-900 text-sm">{message}</div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-gray-500 hover:text-gray-700 font-bold"
          >
            ✕
          </button>
        </div>
      ),
      { duration: 5000, position: 'top-right' }
    );
  };

  const handleDeactivate = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/deactivate/${currentUser._id}`,
        {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = errorData.message || "Failed to deactivate account.";
        throw new Error(message);
      }

      showToast(`${currentUser.firstName || currentUser.email}, your account has been deactivated.`, 'success');
    } catch (err) {
      console.error("Deactivate account error:", err);
      showToast(err.message || "Failed to deactivate account.", 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/users/delete/${currentUser._id}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = errorData.message || "Failed to delete account.";
        throw new Error(message);
      }

      localStorage.removeItem("user");
      localStorage.removeItem("authToken");

      showToast(`${currentUser.firstName || currentUser.email}, your account has been deleted.`, 'success');

      setTimeout(() => window.location.href = "/", 1500);
    } catch (err) {
      console.error("Delete account error:", err);
      showToast(err.message || "Failed to delete account.", 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-red-50 p-6 rounded-xl border border-red-200 mt-8">
      <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
        <FaPause className="text-red-500" />
        Danger Zone
      </h3>
      <div className="space-y-3">
        <button
          onClick={() => showConfirmationToast('deactivate')}
          disabled={loading}
          className="w-full px-4 py-2 border border-red-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
        >
          <FaPause size={14} />
          Deactivate Account
        </button>
        <button
          onClick={() => showConfirmationToast('delete')}
          disabled={loading}
          className="w-full px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
        >
          <FaTrash size={14} />
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default DangerZone;
